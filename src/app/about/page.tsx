import { BRAND, PROCESS } from "@/content/site";
import { PageJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TLink } from "@/components/TLink";
import { pageMetadata } from "@/lib/seo";

const title = "About our healthcare media studio";
const description = "CogniVerse Studio works with clinicians across the UK on websites, patient films and social content. See our approval process and the Prof. Hemant Sheth project.";
export const metadata = pageMetadata({ path: "/about", title, description });

export default function AboutPage() {
  return <>
    <PageJsonLd path="/about" type="AboutPage" name={title} description={description} />
    <section className="phero wrap editorial-hero"><Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "About", path: "/about" }]} /><h1 className="display-xl">A media partner for <em>your practice.</em></h1><p className="phero__intro lede">{BRAND.name} makes websites, patient education films, AI presenters and social content for consultants and private practices. We work with clients across the United Kingdom.</p></section>
    <div className="wrap section editorial-copy">
      <section><h2>Bring the work together</h2><p>Your website, films and social channels need to explain the same practice clearly. We plan the pages, procedure topics and formats together, so a full film on your website can also become a short for your social channels.</p><p>You can commission films for your current site, a website with films, or the Full media partner option. An AI presenter is optional and requires signed consent.</p><TLink className="arrow-link" href="/services">Explore the services <span aria-hidden>→</span></TLink></section>
      <section><h2>You approve the work</h2><p>{PROCESS.intro}</p><ol className="process-list">{PROCESS.steps.map(step => <li key={step.n}><h3>{step.name}</h3><p>{step.body}</p></li>)}</ol></section>
      <section><h2>Clinical content and AI disclosure</h2><p>Scripts are drafted from NHS, NICE and specialist sources for your review. Sources are named on each film, and nothing is published without your sign-off. We use no patient data in production. Clinician clones require signed consent and carry an on-screen AI-avatar disclosure.</p><p>The AI-generated concept footage on this website illustrates the approach. It is labelled separately from our approved client website work.</p></section>
      <section><h2>See a real website project</h2><p>Our approved Prof. Hemant Sheth project includes 22 pages, 10 procedure guides and four treatment groups for a consultant surgeon serving London and Hertfordshire.</p><TLink className="arrow-link" href="/work/prof-hemant-sheth">Read about the project <span aria-hidden>→</span></TLink></section>
      <section><h2>Start with a short call</h2><p>Tell us your specialty, what you have today and the work you need. Please share business details only, without patient information. {BRAND.responseTime}.</p><p><a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a> · <a className="ulink" href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a></p><TLink className="btn btn--signal" href="/contact">Book a call <span aria-hidden>→</span></TLink></section>
    </div>
  </>;
}
