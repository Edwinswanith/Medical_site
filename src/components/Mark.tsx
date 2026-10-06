/** The CogniVerse Studio mark: icon-only symbol from the logo. */
export function Mark({ className = "mark" }: { className?: string }) {
  return (
    <picture>
      <source srcSet="/brand/mark.webp" type="image/webp" />
      <img className={className} src="/brand/mark.png" alt="" width={256} height={256} aria-hidden />
    </picture>
  );
}
