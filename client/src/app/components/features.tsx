import {  Upload, ListChecks } from "lucide-react";

const features = [
  {
    name: "Publish faster",
    description:
      "Schedule and publish LinkedIn posts instantly. We handle the automation.",
    icon: Upload,
  },
  {
    name: "Simple Queues",
    description:
      "Plan your week or month in minutes. Our smart queues keep your posts consistent and on time.",
    icon: ListChecks,
  },
];

export default function Features() {
  return (
    <div id='features' className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-funnel text-zinc-600">Automate Smarter</h2>
          <p className="mt-2 font-funnel text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to grow on LinkedIn
          </p>
          <p className="mt-5 text-lg font-funnel text-zinc-600">
            Save time, stay consistent, and build your brand effortlessly. Our automation tools help you post smarter, not harder.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-lg font-semibold font-funnel text-gray-900">
                  <div className="absolute top-0 left-0 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900">
                    <feature.icon className="h-6 w-6 text-zinc-100" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base font-funnel text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}