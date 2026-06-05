import Link from "next/link";

const features = [
  { icon: "🔍", title: "Scans 3 Platforms", desc: "LinkedIn, Naukri & NaukriGulf — all at once, automatically." },
  { icon: "🤖", title: "AI Job Matching", desc: "Only applies to jobs that actually match your profile. Zero spam applications." },
  { icon: "📝", title: "Auto Form Fill", desc: "Fills every application form with your details and answers screening questions." },
  { icon: "😴", title: "Runs While You Sleep", desc: "Set it up once. The bot runs on your PC 24/7 in full autopilot mode." },
  { icon: "📊", title: "Full Dashboard", desc: "See every application, match score, and job status in one place." },
  { icon: "📄", title: "ATS Resume Builder", desc: "Download an ATS-optimised resume built from your profile and job market data." },
];

const steps = [
  { num: "01", title: "Create Account & Pay", desc: "Sign up and subscribe for just ₹199/month. Cancel anytime." },
  { num: "02", title: "Download & Install", desc: "Download the app and run it on your Windows PC in minutes." },
  { num: "03", title: "Setup Your Profile", desc: "Upload your resume or fill your profile. Set your job preferences." },
  { num: "04", title: "Login to Platforms", desc: "Log into LinkedIn and Naukri inside the app once. Session is saved." },
  { num: "05", title: "Start Autopilot", desc: "Click Start Autopilot. The bot applies to matching jobs automatically." },
];

const testimonials = [
  { name: "Rahul M.", role: "Software Engineer, Pune", text: "Got 3 interview calls in the first week. I was applying manually for 2 months before this with almost no responses.", stars: 5 },
  { name: "Priya S.", role: "MBA Graduate, Bangalore", text: "This saved me hours every day. The AI only applies to relevant jobs so recruiters actually respond.", stars: 5 },
  { name: "Arjun K.", role: "Data Analyst, Hyderabad", text: "Finally got placed after using this for 3 weeks. The dashboard showing all my applications in one place is brilliant.", stars: 5 },
];

const stats = [
  { value: "500+", label: "Active Users" },
  { value: "25,000+", label: "Applications Sent" },
  { value: "3 Platforms", label: "LinkedIn, Naukri, NaukriGulf" },
  { value: "₹199/mo", label: "Less than a meal out" },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0f1e] text-white">

      {/* Nav */}
      <nav className="border-b border-gray-800/60 px-6 py-4 sticky top-0 bg-[#0a0f1e]/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-white">Apply</span>
            <span className="text-xl font-bold text-blue-400">WhileYouSleep</span>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/auth/login" className="px-4 py-2 text-gray-400 hover:text-white text-sm transition">
              Login
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative max-w-5xl mx-auto text-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none" />
        <div className="inline-flex items-center gap-2 bg-blue-600/15 text-blue-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-blue-500/30">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
          500+ job seekers already using this
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          Stop Applying Manually.
          <br />
          <span className="text-blue-400">Let AI Do It For You.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          ApplyWhileYouSleep scans LinkedIn, Naukri & NaukriGulf, matches jobs to your profile,
          and auto-applies — all from your own PC, using your own account. <strong className="text-white">Safe, private, and fully automatic.</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Link href="/auth/signup" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/25">
            Start for ₹199/month →
          </Link>
          <a href="#how-it-works" className="px-8 py-4 border border-gray-700 hover:border-blue-500 hover:text-blue-400 rounded-xl font-semibold text-lg transition">
            See How It Works
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span>✓ No credit card risk — cancel anytime</span>
          <span>✓ Your data stays on your PC</span>
          <span>✓ Works with your existing accounts</span>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-800/60 bg-gray-900/40 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-white mb-1">{s.value}</div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Job Hunting is Exhausting. It Does Not Have to Be.</h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Most job seekers spend 3-4 hours a day applying manually. Here is what changes when you use ApplyWhileYouSleep.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-950/30 border border-red-900/40 rounded-2xl p-6">
            <div className="text-red-400 font-bold text-lg mb-4">❌ Without ApplyWhileYouSleep</div>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                "3-4 hours wasted daily on manual applications",
                "Miss hundreds of jobs posted while you sleep",
                "Copy-paste the same details on every form",
                "Forget which jobs you applied to",
                "Apply to wrong jobs and get ignored",
              ].map(i => <li key={i} className="flex gap-2"><span className="text-red-400 mt-0.5">✗</span>{i}</li>)}
            </ul>
          </div>
          <div className="bg-green-950/30 border border-green-900/40 rounded-2xl p-6">
            <div className="text-green-400 font-bold text-lg mb-4">✅ With ApplyWhileYouSleep</div>
            <ul className="space-y-3 text-sm text-gray-300">
              {[
                "Bot applies to 15-20 matched jobs every single day",
                "Never miss a job — scans round the clock",
                "Forms filled automatically with your saved profile",
                "Full dashboard with every application tracked",
                "AI matching ensures only relevant jobs get applied",
              ].map(i => <li key={i} className="flex gap-2"><span className="text-green-400 mt-0.5">✓</span>{i}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">Everything You Need to Land Your Next Job</h2>
        <p className="text-gray-400 text-center mb-12">One tool. Three platforms. Full automation.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-900/70 border border-gray-800 hover:border-blue-800 rounded-xl p-6 transition group">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-3xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Up and Running in Under 10 Minutes</h2>
        <p className="text-gray-400 text-center mb-12">No technical knowledge needed. Just download and follow the steps.</p>
        <div className="space-y-5">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-5 items-start bg-gray-900/50 border border-gray-800 rounded-xl px-6 py-5">
              <div className="text-blue-400 font-extrabold text-xl w-10 shrink-0">{s.num}</div>
              <div>
                <div className="font-semibold text-base">{s.title}</div>
                <div className="text-gray-400 text-sm mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-4">Real People. Real Results.</h2>
        <p className="text-gray-400 text-center mb-12">Job seekers across India are landing interviews faster with ApplyWhileYouSleep.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-4">
              <div className="flex gap-0.5 text-yellow-400 text-sm">{"★★★★★"}</div>
              <p className="text-gray-300 text-sm leading-relaxed italic">&quot;{t.text}&quot;</p>
              <div className="mt-auto">
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-gray-500 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust / Safety */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-blue-950/40 to-gray-900 border border-blue-900/40 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-2 text-center">Your Account is 100% Safe</h2>
          <p className="text-gray-400 text-center text-sm mb-8 max-w-lg mx-auto">
            We know account safety is your biggest concern. Here is exactly how we protect you.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🖥️", title: "Runs on Your PC", desc: "The bot runs entirely on your computer. No third-party servers ever touch your account." },
              { icon: "🔒", title: "Your Login, Your Session", desc: "You log in yourself inside the app. We never see or store your LinkedIn or Naukri password." },
              { icon: "🐢", title: "Human-Like Speed", desc: "Applies at a natural pace with random delays so your account looks completely normal to platforms." },
            ].map(b => (
              <div key={b.title}>
                <div className="text-4xl mb-3">{b.icon}</div>
                <div className="font-semibold mb-1">{b.title}</div>
                <div className="text-gray-400 text-sm">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-md mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-3">Simple, Honest Pricing</h2>
        <p className="text-gray-400 mb-10">One plan. Everything included. No hidden fees.</p>
        <div className="bg-gray-900 border border-blue-500/50 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
          <div className="text-gray-400 mb-1 text-sm uppercase tracking-wide font-medium">Monthly Plan</div>
          <div className="text-6xl font-extrabold mb-1">₹199</div>
          <div className="text-gray-400 text-sm mb-8">per month · cancel anytime · no commitment</div>
          <ul className="text-left space-y-3 mb-8 text-sm text-gray-300">
            {[
              "Unlimited job applications",
              "LinkedIn + Naukri + NaukriGulf",
              "AI job matching & auto form fill",
              "24/7 autopilot mode",
              "ATS resume builder",
              "Career coach & skill gap analysis",
              "Full application history dashboard",
              "Priority support",
            ].map((item) => (
              <li key={item} className="flex gap-2 items-center">
                <span className="text-blue-400">✓</span> {item}
              </li>
            ))}
          </ul>
          <Link href="/auth/signup" className="block w-full py-3.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-base transition shadow-lg shadow-blue-600/20">
            Start Applying on Autopilot →
          </Link>
          <p className="text-gray-500 text-xs mt-4">Cancel anytime. No questions asked.</p>
        </div>
      </section>

      {/* System Requirements */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">System Requirements</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-semibold text-green-400 mb-4">Minimum Requirements</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {[
                "Windows 10 or Windows 11",
                "4 GB RAM or more",
                "2 GB free storage space",
                "Internet connection (any broadband)",
                "Any modern laptop or PC (2018 or newer)",
              ].map(r => <li key={r} className="flex gap-2"><span className="text-green-400">✓</span>{r}</li>)}
            </ul>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-semibold text-yellow-400 mb-4">Good to Know</h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {[
                "App runs on YOUR computer — your account stays safe",
                "PC must be ON for autopilot to work",
                "You log into LinkedIn/Naukri yourself (one time only)",
                "Applies at a natural pace to stay safe on all platforms",
                "Windows only for now — Mac version coming soon",
              ].map(r => <li key={r} className="flex gap-2"><span className="text-yellow-400">→</span>{r}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-center mb-3">Common Questions</h2>
        <p className="text-gray-400 text-center text-sm mb-10">Everything you need to know before getting started.</p>
        <div className="space-y-4">
          {[
            { q: "Will my LinkedIn or Naukri account get banned?", a: "No. The app applies at a human-like pace with random delays, from your own IP address and your own account. This is far safer than manually bulk applying in one sitting. We recommend 15-20 applications per day for best results." },
            { q: "Do I need to keep my laptop on all the time?", a: "Only when you want autopilot running. You can also manually start a scan at any time. Many users just run it overnight while they sleep — that is exactly what it is built for." },
            { q: "Is my resume and personal data safe?", a: "Yes. 100%. Everything stays on your own computer. We never store your resume, your LinkedIn password, or any personal information on our servers. Your data is yours." },
            { q: "What if the app does not work on my laptop?", a: "We support any Windows 10/11 PC with 4GB RAM. If you face any issues, reach out to our support and we will personally help you get set up." },
            { q: "How is this different from applying manually?", a: "Manual applying takes 3-4 hours daily and you miss hundreds of jobs posted while you are offline. Our bot runs 24/7, scans all three platforms, and applies while you sleep, work, or do anything else." },
            { q: "Can I cancel anytime?", a: "Yes. Cancel anytime from your account dashboard. No contracts, no cancellation fees, no questions asked." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-5 transition">
              <div className="font-semibold text-white mb-2">{q}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-b from-blue-950/50 to-gray-900/50 border border-blue-900/40 rounded-2xl p-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Your Next Job is Waiting.</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Stop spending hours on job portals. Let the bot apply while you focus on what matters — interview prep, upskilling, and living your life.</p>
          <Link href="/auth/signup" className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/25">
            Get Started for ₹199/month →
          </Link>
          <p className="text-gray-500 text-sm mt-4">Join 500+ job seekers already on autopilot.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="font-semibold">
            <span className="text-white">Apply</span>
            <span className="text-blue-400">WhileYouSleep</span>
          </div>
          <div className="flex gap-6">
            <Link href="/auth/login" className="hover:text-gray-300 transition">Login</Link>
            <Link href="/auth/signup" className="hover:text-gray-300 transition">Sign Up</Link>
          </div>
          <div>© {new Date().getFullYear()} ApplyWhileYouSleep · Built for serious job seekers</div>
        </div>
      </footer>

    </main>
  );
}