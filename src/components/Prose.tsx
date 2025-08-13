import clsx from "clsx";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        className,
        "prose prose-sm prose-blue max-w-none prose-p:text-secondary dark:prose-p:text-neutral-200 prose-headings:text-primary dark:prose-headings:text-white prose-strong:text-primary dark:prose-strong:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-primary dark:prose-code:text-white prose-code:bg-neutral-100 dark:prose-code:bg-neutral-800 prose-blockquote:border-l-neutral-200 dark:prose-blockquote:border-l-neutral-700 prose-blockquote:text-neutral-700 dark:prose-blockquote:text-neutral-200 prose-li:text-secondary dark:prose-li:text-neutral-200 transition-colors duration-200"
      )}
    >
      {children}
    </div>
  );
}
