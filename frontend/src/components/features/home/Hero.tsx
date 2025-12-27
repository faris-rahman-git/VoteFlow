
function Hero({children}: {children: React.ReactNode}) {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          Decision Making Made Simple with VoteFlow
        </h1>
        <p className="mt-6 text-pretty text-lg leading-8 text-muted-foreground">
          The easiest way to gather opinions, make decisions, and engage your
          audience. No sign-up required to get started.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            {children}
        </div>
      </div>
    </section>
  );
}

export default Hero;
