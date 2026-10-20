export function SectionHeading({
  eyebrow,
  title,
  text,
  invert = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  invert?: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p
        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${invert ? "bg-white/10 text-violet-200" : "bg-primary-soft text-primary"}`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {text && <p className={`mt-4 text-lg leading-8 ${invert ? "text-white/70" : "text-muted"}`}>{text}</p>}
    </div>
  );
}
