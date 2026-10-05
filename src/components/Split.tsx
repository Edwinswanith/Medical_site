import { Fragment, type ElementType, type ReactNode } from "react";

/**
 * Text that rises word by word when it scrolls into view (the reveal observer in
 * Motion adds .is-in). Server-rendered, so the words are real text for readers and
 * search. Wrap a phrase in <em> by passing it in `em`.
 */
export function Split({
  as: Tag = "p",
  text,
  em,
  className = "",
  delay = 0,
}: {
  as?: ElementType;
  text: string;
  em?: string;
  className?: string;
  delay?: number;
}) {
  const words: ReactNode[] = [];
  let i = 0;
  const push = (chunk: string, italic: boolean) =>
    chunk
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => {
        const n = i++;
        // The space sits outside the inline-block, or it collapses.
        words.push(
          <Fragment key={n}>
            <span className="w">
              <span style={{ ["--i" as string]: n + delay }}>{italic ? <em>{w}</em> : w}</span>
            </span>{" "}
          </Fragment>,
        );
      });
  if (em && text.includes(em)) {
    const [a, b] = text.split(em);
    push(a, false);
    push(em, true);
    push(b, false);
  } else push(text, false);

  return (
    <Tag className={`split ${className}`} data-reveal>
      {words}
    </Tag>
  );
}
