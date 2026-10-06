import Image from "next/image";

/**
 * The CogniVerse Studio wordmark (header). Always the light artwork on a navy badge: the thin cyan
 * "STUDIO" line has almost no contrast on the pale page background, and the badge reads on both
 * light and navy header tones.
 */
export function Logo() {
  return (
    <picture className="logo">
      <Image src="/brand/logo-light.webp" alt="" width={434} height={96} sizes="(max-width: 640px) 150px, 180px" loading="eager" aria-hidden />
    </picture>
  );
}
