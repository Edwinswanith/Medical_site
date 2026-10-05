import { JsonLd } from "./JsonLd";
import { absolute } from "@/lib/site-url";
import { TLink } from "./TLink";

export function Breadcrumbs({ items }: { items: { label: string; path: string }[] }) {
  return <>
    <nav className="breadcrumbs label" aria-label="Breadcrumb"><ol>{items.map((item, i) => <li key={item.path}>{i === items.length - 1 ? <span aria-current="page">{item.label}</span> : <TLink href={item.path}>{item.label}</TLink>}</li>)}</ol></nav>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${absolute(items.at(-1)!.path)}#breadcrumbs`, itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.label, item: absolute(item.path) })) }} />
  </>;
}
