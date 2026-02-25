import { Upload, ListChecks } from "lucide-react";
import Image from "next/image";

const features = [
  {
    name: "AI Generation",
    description: "Create high-quality LinkedIn content powered by AI and real-time web search.",
    icon: Upload,
  },
  {
    name: "Simple Queues",
    description: "Schedule posts effortlessly. Reliable queues keep your content consistent and on time.",
    icon: ListChecks,
  },
];

const techStack = [
  { name: "React", logo: "/tech/react.png" },
  { name: "Python", logo: "/tech/python.png" },
  { name: "AutoGen", logo: "/tech/autogen.png" },
  { name: "Dramatiq", logo: "/tech/dramatiq.png" },
  { name: "Redis", logo: "/tech/redis.png" },
];

export default function Features() {
  return (
    <>
      <section id="made-with" className="mt-15 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-funnel text-stone-600">
              Made with
            </h2>
            <p className="mt-2 font-funnel text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              Modern technology stack
            </p>
            <p className="mt-5 text-lg font-funnel text-stone-600">
              A modern stack optimized for AI workflows, async processing, and scalable delivery.
            </p>
          </div>

          <div className="mt-15 rounded-3xl border border-stone-200 overflow-hidden bg-white/60 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-stone-200">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center gap-3 h-32"
                >
                  <Image
                    src={tech.logo}
                    alt={tech.name}
                    width={36}
                    height={36}
                    className="opacity-90"
                  />
                  <span className="font-funnel text-sm font-semibold text-stone-800">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <section id="features" className="mt-15 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-funnel text-stone-600">
              Automate Smarter
            </h2>

            <p className="mt-2 font-funnel text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              Everything you need to grow on LinkedIn
            </p>

            <p className="mt-5 text-lg font-funnel text-stone-600">
              Save time, stay consistent, and build your professional presence
              with intelligent automation designed for creators and professionals.
            </p>
          </div>

          <div className="mx-auto mt-15 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-lg font-semibold font-funnel text-stone-900">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-stone-900 shadow-md">
                      <feature.icon className="h-6 w-6 text-stone-100" />
                    </div>
                    {feature.name}
                  </dt>

                  <dd className="mt-2 text-base font-funnel text-stone-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </section>
    </>
  );
}