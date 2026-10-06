import Image from "next/image";

/** The CogniVerse Studio wordmark (header). Dark ink on light sections, light ink when the header sits over navy. */
export function Logo() {
  return (
    <>
      <picture className="logo logo--ink">
        <Image src="/brand/logo.webp" alt="" width={434} height={96} sizes="(max-width: 640px) 136px, 163px" loading="eager" aria-hidden />
      </picture>
      <picture className="logo logo--light">
        <Image src="/brand/logo-light.webp" alt="" width={434} height={96} sizes="(max-width: 640px) 136px, 163px" loading="eager" aria-hidden />
      </picture>
    </>
  );
}
