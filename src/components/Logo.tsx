/** The CogniVerse Studio wordmark (header). Dark ink on light sections, light ink when the header sits over navy. */
export function Logo() {
  return (
    <>
      <picture className="logo logo--ink">
        <source srcSet="/brand/logo.webp" type="image/webp" />
        <img src="/brand/logo.png" alt="" width={434} height={96} aria-hidden />
      </picture>
      <picture className="logo logo--light">
        <source srcSet="/brand/logo-light.webp" type="image/webp" />
        <img src="/brand/logo-light.png" alt="" width={434} height={96} aria-hidden />
      </picture>
    </>
  );
}
