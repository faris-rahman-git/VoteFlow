import { BarChart3, Users, Zap } from "lucide-react";

function Features() {
  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Powerful Features
          </h2>
          <p className="mt-2 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need for perfect voting
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <Zap className="h-5 w-5 flex-none text-primary" />
                Real-time Results
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">
                  Watch votes pour in with instant updates and dynamic
                  visualizations.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <Users className="h-5 w-5 flex-none text-primary" />
                Anonymous Voting
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">
                  Encourage honest feedback with secure, private, and anonymous
                  voting options.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                <BarChart3 className="h-5 w-5 flex-none text-primary" />
                Insightful Data
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                <p className="flex-auto">
                  Beautifully rendered charts and statistics to help you
                  understand your data.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export default Features;
