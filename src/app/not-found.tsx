import JellyButton from "@/components/JellyButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 pt-24 text-center" data-flood="#FFD9E1">
      <p className="inflated font-display text-[clamp(120px,24vw,280px)] font-extrabold leading-none">404</p>
      <h1 className="mt-4 font-display text-4xl font-extrabold">This scoop rolled away.</h1>
      <p className="mt-3 text-lg text-plum/70">The page you&apos;re after isn&apos;t here. The ice cream is, though.</p>
      <div className="mt-8"><JellyButton href="/flavours" size="lg">Explore Flavours</JellyButton></div>
    </section>
  );
}
