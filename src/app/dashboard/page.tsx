"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  email: string;
  license_key: string;
  subscription_status: string;
  subscription_expires_at: string | null;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [copied, setCopied] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    fetch("/api/me")
      .then((r) => {
        if (r.status === 401) { router.push("/auth/login"); return null; }
        return r.json();
      })
      .then((data) => data && setUser(data));
  }, [router]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  async function handlePayment() {
    setPayLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { alert("Payment error: " + (data.error || "Unknown error")); return; }

      const rzp = new (window as any).Razorpay({
        key: data.key_id,
        order_id: data.order_id,
        amount: data.amount,
        currency: data.currency,
        name: "ApplyWhileYouSleep",
        description: "30-day subscription - Rs.199",
        theme: { color: "#2563eb" },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          if (verifyRes.ok) {
            alert("Payment successful! Your subscription is now active.");
            window.location.reload();
          } else {
            alert("Payment received but verification failed. Please contact support.");
          }
        },
      });
      rzp.open();
    } catch {
      alert("Payment setup failed. Please try again.");
    } finally {
      setPayLoading(false);
    }
  }

  function copyKey() {
    if (!user) return;
    navigator.clipboard.writeText(user.license_key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isActive = user?.subscription_status === "active" || user?.subscription_status === "trial";
  const statusColor = isActive ? "text-green-400" : "text-red-400";
  const statusLabel = {
    active: "Active",
    trial: "Trial",
    inactive: "Not Activated",
    expired: "Expired",
  }[user?.subscription_status || "inactive"] ?? "Unknown";

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />

      <div className="min-h-screen">
        <nav className="border-b border-gray-800 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
          <span className="font-bold">
            <span className="text-white">Apply</span>
            <span className="text-blue-400">WhileYouSleep</span>
          </span>
          <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm transition">
            Logout
          </button>
        </nav>

        <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
          <h1 className="text-2xl font-bold">My Account</h1>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Subscription</h2>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Status</div>
                <div className={`font-semibold text-lg ${statusColor}`}>{statusLabel}</div>
                {user.subscription_expires_at && (
                  <div className="text-gray-400 text-sm">
                    {isActive ? "Renews" : "Expired"}{" "}
                    {new Date(user.subscription_expires_at).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </div>
                )}
              </div>
              {!isActive && (
                <button
                  onClick={handlePayment}
                  disabled={payLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg font-semibold transition"
                >
                  {payLoading ? "Loading..." : "Pay Rs.199 / month"}
                </button>
              )}
              {isActive && (
                <span className="text-green-400 text-sm font-medium">Subscription active</span>
              )}
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-1">Your License Key</h2>
            <p className="text-gray-400 text-sm mb-4">
              Enter this key in the app when prompted on first launch.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <code className="bg-gray-800 px-4 py-2 rounded-lg text-blue-300 font-mono text-lg tracking-widest">
                {user.license_key}
              </code>
              <button
                onClick={copyKey}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-1">Download the App</h2>
            <p className="text-gray-400 text-sm mb-4">
              Windows 10/11 only. Download the installer and double-click it — everything installs automatically.
            </p>
            {isActive ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://github.com/aiaverainfotech-cyber/applywhileyousleep-website/releases/download/v1.3.3/ApplyWhileYouSleep-Install.bat"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition text-center"
                >
                  Download Installer for Windows (.bat)
                </a>
                <a
                  href="https://github.com/aiaverainfotech-cyber/applywhileyousleep-website/releases/download/v1.3.3/READ-ME-FIRST.txt"
                  className="inline-block px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition text-center text-sm"
                >
                  READ-ME-FIRST.txt (Instructions)
                </a>
              </div>
            ) : (
              <div className="text-gray-500 text-sm">Activate your subscription to unlock the download.</div>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4">Setup Instructions</h2>
            <ol className="space-y-3 text-sm text-gray-300 list-decimal list-inside">
              <li>Click <strong>Download Installer</strong> above — saves <code className="text-blue-300">ApplyWhileYouSleep-Install.bat</code></li>
              <li>Double-click the downloaded file to run the installer</li>
              <li>The installer sets up everything automatically (Python, Node.js, app files)</li>
              <li>On first launch, enter your license key: <code className="text-blue-300">{user.license_key}</code></li>
              <li>Upload your resume or fill your profile manually.</li>
              <li>Click the Login Setup tab to log into LinkedIn and Naukri.</li>
              <li>Set your job preferences and click Start Autopilot.</li>
            </ol>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">Account Details</h2>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Email: <span className="text-white">{user.email}</span></div>
              <div>Member since: <span className="text-white">{new Date(user.created_at).toLocaleDateString("en-IN")}</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}