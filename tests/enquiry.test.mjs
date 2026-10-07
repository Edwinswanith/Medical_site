import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateEnquiry } from '../src/lib/enquiry.ts';

const valid = { name: ' Test clinician ', email: 'test@example.invalid', consent: true };
test('rejects malformed JSON shapes without throwing', () => {
  for (const body of [null, [], 4, 'text', { ...valid, name: {} }]) assert.equal(validateEnquiry(body).ok, false);
});
test('requires permission and valid contact details', () => {
  for (const override of [{ consent: false }, { consent: 'on' }, { email: 'invalid' }, { name: '' }, { phone: 'wrong' }]) assert.equal(validateEnquiry({ ...valid, ...override }).ok, false);
});
test('rejects oversize text and honeypot submissions', () => {
  assert.equal(validateEnquiry({ ...valid, message: 'x'.repeat(2001) }).ok, false);
  assert.equal(validateEnquiry({ ...valid, company: 'bot' }).ok, false);
});
test('trims valid details and accepts UK phone formatting', () => {
  const result = validateEnquiry({ ...valid, phone: '+44 (0)7436 194150' });
  assert.equal(result.ok, true);
  assert.equal(result.enquiry.name, 'Test clinician');
  assert.equal(result.enquiry.message, '');
});
test('field checks for the form match the server rules', async () => {
  const { fieldError } = await import('../src/lib/enquiry.ts');
  assert.equal(fieldError('name', '  '), 'Please add your name.');
  assert.equal(fieldError('email', ''), 'Please add your email address.');
  assert.equal(fieldError('email', 'not-an-email'), 'Please check the email address.');
  assert.equal(fieldError('email', ' test@example.invalid '), '');
  assert.equal(fieldError('phone', ''), '');
  assert.equal(fieldError('phone', 'wrong'), 'Please check the phone number.');
  assert.equal(fieldError('phone', '+44 (0)7436 194150'), '');
  assert.equal(fieldError('message', 'x'.repeat(2001)), 'Please keep this under 2000 characters.');
  assert.equal(fieldError('org', 'Clinic'), '');
});
test('every field error agrees with validateEnquiry', async () => {
  const { fieldError } = await import('../src/lib/enquiry.ts');
  const valid = { name: 'Test clinician', email: 'test@example.invalid', consent: true };
  for (const [name, value] of [['name', ''], ['email', 'x@'], ['phone', 'abc'], ['message', 'x'.repeat(2001)]]) {
    assert.notEqual(fieldError(name, value), '');
    assert.equal(validateEnquiry({ ...valid, [name]: value }).ok, false);
  }
});
