/** The CogniVerse Studio icon (header, intro). Decorative: the brand name sits beside it as text. */
export function Mark({ className = "mark" }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/brand/studio-icon.webp" type="image/webp" />
      <img className={className} src="/brand/studio-icon.png" alt="" width={168} height={168} aria-hidden />
    </picture>
  );
}
