import { Zap,  BarChart, Globe } from 'lucide-react';

const features = [
  {
    title: "Lightning Fast Workflow",
    desc: "Automate repetitive tasks and focus on creating content that matters.",
    icon: <Zap className="text-amber-500" />,
    color: "bg-amber-50"
  },
  {
    title: "Real-time Analytics",
    desc: "Deep dive into your audience metrics with our custom-built engine.",
    icon: <BarChart className="text-indigo-500" />,
    color: "bg-indigo-50"
  },
  {
    title: "Global Distribution",
    desc: "Deploy your content to every major platform with a single click.",
    icon: <Globe className="text-emerald-500" />,
    color: "bg-emerald-50"
  }
];

export const Features = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">Everything you need to scale</h2>
        <p className="text-slate-500 mt-4">Built by creators, for creators.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className="group">
            <div className={`w-12 h-12 ${f.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              {f.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);