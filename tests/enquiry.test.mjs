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
