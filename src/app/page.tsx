import Link from "next/link";

const features = [
  { icon: "🔍", title: "Scans 3 Platforms", desc: "LinkedIn, Naukri & NaukriGulf — all at once, automatically." },
  { icon: "🤖", title: "AI Job Matching", desc: "Only applies to jobs that match your profile. No spam applications." },
  { icon: "📝", title: "Auto Form Fill", desc: "Fills every application form with your details and answers screening questions." },
  { icon: "😴", title: "Runs While You Sleep", desc: "Set it up once. The bot runs on your PC 24/7 in autopilot mode." },
  { icon: "📊", title: "Full Dashboard", desc: "See every application, match score, and job status in one place." },
  { icon: "📄", title: "ATS Resume Builder", desc: "Download an ATS-optimised resume built from your profile and job market data." },
];

const steps = [
  { num: "01", title: "Create Account & Pay", desc: "Sign up and subscribe for ₹199/month." },
  { num: "02", title: "Download & Install", desc: "Download the app and run it on your Windows PC." },
  { num: "03", title: "Setup Profile", desc: "Upload your resume or fill your profile. Set your job preferences." },
  { num: "04", title: "Login to Platforms", desc: "Log into LinkedIn and Naukri inside the app once. Session saved." },
  { num: "05", title: "Start Autopilot", desc: "Click Start Autopilot. The bot applies to matching jobs automatically." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">Apply</span>
          <span className="text-2xl font-bold text-blue-400">WhileYouSleep</span>
        </div>
        <div className="flex gap-3">
          <Link href="/auth/login" className="px-4 py-2 text-gray-300 hover:text-white transition">
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <div className="inline-block bg-blue-600/20 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">
          AI-Powered Job Automation
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Apply to 100s of Jobs
          <br />
          <span className="text-blue-400">While You Sleep</span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Our bot scans LinkedIn, Naukri & NaukriGulf, matches jobs to your profile,
          and auto-applies — all from your own computer, using your own account.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold text-lg transition"
          >
            Start for ₹199/month
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 border border-gray-700 hover:border-gray-500 rounded-xl font-semibold text-lg transition"
          >
            See How It Works
          </a>
        </div>
        <p className="text-gray-500 text-sm mt-4">No cloud. Runs on your PC. Your account, your data.</p>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Land Your Next Job</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="space-y-6">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6 items-start">
              <div className="text-blue-400 font-bold text-2xl w-10 shrink-0">{s.num}</div>
              <div>
                <div className="font-semibold text-lg">{s.title}</div>
                <div className="text-gray-400 text-sm mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-md mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Simple Pricing</h2>
        <div className="bg-gray-900 border border-blue-500/40 rounded-2xl p-8">
          <div className="text-gray-400 mb-2">Monthly Plan</div>
          <div className="text-5xl font-bold mb-1">₹199</div>
          <div className="text-gray-400 text-sm mb-6">per month · cancel anytime</div>
          <ul className="text-left space-y-3 mb-8 text-sm text-gray-300">
            {[
              "Unlimited job applications",
              "LinkedIn + Naukri + NaukriGulf",
              "AI job matching & form fill",
              "Autopilot mode (24/7)",
              "ATS resume builder",
              "Career coach & skill gap analysis",
              "Full application history dashboard",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-center">
                <span className="text-blue-400">✓</span> {item}
              </li>
            ))}
          </ul>
          <Link
            href="/auth/signup"
            className="block w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} ApplyWhileYouSleep · Built for serious job seekers
      </footer>
    </main>
  );
}
