import Image from "next/image";

/** The CogniVerse Studio mark: icon-only symbol from the logo. */
export function Mark({ className = "mark" }: { className?: string }) {
  return (
    <picture>
      <Image className={className} src="/brand/mark.webp" alt="" width={256} height={256} sizes="112px" loading="eager" aria-hidden />
    </picture>
  );
}
