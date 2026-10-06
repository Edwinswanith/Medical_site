import Image from "next/image";

type Props = { url: string; src: string; alt: string; w: number; h: number; sizes?: string; priority?: boolean; className?: string };

/** A screenshot in the same browser frame the home hero uses. */
export function BrowserFrame({ url, src, alt, w, h, sizes = "(max-width: 899px) 90vw, 48vw", priority = false, className = "" }: Props) {
  return (
    <figure className={`sp-frame notch ${className}`.trim()}>
      <div className="chrome" aria-hidden>
        <span />
        <span />
        <span />
        <i>{url}</i>
      </div>
      <Image src={src} alt={alt} width={w} height={h} sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
    </figure>
  );
}
