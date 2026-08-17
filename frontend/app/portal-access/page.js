'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  UserCheck,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  ArrowRight,
  LogOut,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function PortalAccessPage() {
  const [step, setStep] = useState(1); // Step 1: Credentials, Step 2: 2FA PIN, Step 3: Admin Console
  const [username, setUsername] = useState("admin@bapuseva.org");
  const [password, setPassword] = useState("Password@123");
  const [twoFactorPin, setTwoFactorPin] = useState("");
  const [tempSessionId, setTempSessionId] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [adminToken, setAdminToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);

  // Cash Donation Form State inside Admin Console
  const [cashDonorName, setCashDonorName] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [cashCause, setCause] = useState("General Fund & Where Needed Most");
  const [cashDonorEmail, setCashDonorEmail] = useState("");
  const [cashDonorPan, setCashDonorPan] = useState("");
  const [cashNotes, setCashNotes] = useState("");
  const [isSubmittingCash, setIsSubmittingCash] = useState(false);
  const [cashSuccessMsg, setCashSuccessMsg] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const savedToken = localStorage.getItem("bst_admin_token");
    if (savedToken) {
      verifyActiveSession(savedToken);
    }
  }, []);

  const verifyActiveSession = async (token) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const json = await res.json();
        setAdminToken(token);
        setAdminUser(json.user);
        setStep(3);
      } else {
        localStorage.removeItem("bst_admin_token");
      }
    } catch (e) {
      console.error("Session check error:", e);
    }
  };

  // Step 1: Submit Credentials
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed.");
      }

      setTempSessionId(data.tempSessionId);
      setStep(2);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Submit 2FA Security PIN
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!twoFactorPin || twoFactorPin.length < 6) {
      setErrorMsg("Please enter a valid 6-digit 2FA Security PIN.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tempSessionId,
          pin: twoFactorPin,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "2FA Verification failed.");
      }

      localStorage.setItem("bst_admin_token", data.adminToken);
      setAdminToken(data.adminToken);
      setAdminUser(data.user);
      setStep(3);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Cash Donation Entry as Authenticated Admin
  const handleCashSubmit = async (e) => {
    e.preventDefault();
    setCashSuccessMsg("");
    setErrorMsg("");

    if (!cashDonorName || !cashAmount || Number(cashAmount) <= 0) {
      setErrorMsg("Please enter a valid donor name and amount.");
      return;
    }

    setIsSubmittingCash(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/payment/record-cash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          donorName: cashDonorName,
          amount: Number(cashAmount),
          cause: cashCause,
          donorEmail: cashDonorEmail,
          donorPan: cashDonorPan,
          notes: cashNotes,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to record cash donation.");
      }

      setCashSuccessMsg(`Success! Recorded ₹${Number(cashAmount).toLocaleString()} cash donation from ${cashDonorName}.`);
      setCashDonorName("");
      setCashAmount("");
      setCashDonorEmail("");
      setCashDonorPan("");
      setCashNotes("");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmittingCash(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("bst_admin_token");
    setAdminToken(null);
    setAdminUser(null);
    setStep(1);
    setTwoFactorPin("");
  };

  return (
    <section className="section-padding bg-muted/30 min-h-[85vh] flex items-center justify-center">
      <div className="container-narrow max-w-xl">
        
        {/* STEP 1: LOGIN FORM */}
        {step === 1 && (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3 border border-primary/20">
                <Lock className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                TRUST GOVERNANCE PORTAL
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Staff Authentication
              </h2>
              <p className="text-xs text-muted-foreground">
                Restricted access endpoint. Enter authorized credentials to proceed to 2FA verification.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleStep1Submit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Username / Trust Email</label>
                <input
                  type="email"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-muted border border-border/80 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Account Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-muted border border-border/80 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
                />
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-[11px] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                <span>Default Credentials pre-filled for demonstration: <strong>admin@bapuseva.org</strong> / <strong>Password@123</strong></span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground font-extrabold py-3.5 rounded-xl text-xs hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoading ? "Authenticating..." : <>Continue to 2FA PIN →</>}
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: TWO-FACTOR AUTHENTICATION (2FA PIN) */}
        {step === 2 && (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                <KeyRound className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                STEP 2 OF 2: SECURITY PIN
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                Two-Factor Authentication
              </h2>
              <p className="text-xs text-muted-foreground">
                Enter your 6-digit 2FA Security PIN code to unlock staff admin actions.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleStep2Submit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-center">6-Digit Security PIN Code</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={twoFactorPin}
                  onChange={(e) => setTwoFactorPin(e.target.value)}
                  placeholder="849201"
                  className="w-full bg-muted border-2 border-primary/40 rounded-xl px-4 py-3.5 text-center text-2xl tracking-[0.5em] font-mono font-extrabold text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 text-[11px] text-amber-800 dark:text-amber-300 text-center">
                Default 2FA PIN Code: <strong>849201</strong>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 border border-border rounded-xl py-3 text-xs font-bold hover:bg-muted"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-2/3 bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs hover:bg-emerald-800 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isLoading ? "Verifying 2FA..." : <>Unlock Staff Portal →</>}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: STAFF ADMIN CONSOLE */}
        {step === 3 && adminUser && (
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-500/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground">Staff Admin Console</h3>
                  <p className="text-xs text-muted-foreground">Logged in as: <strong className="text-foreground">{adminUser.username}</strong></p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="bg-destructive/10 text-destructive hover:bg-destructive/20 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>

            {/* Quick Actions & Navigation Link */}
            <div className="bg-muted/70 p-4 rounded-2xl border border-border/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-foreground">Live Financial Transparency Ledger</p>
                <p className="text-[11px] text-muted-foreground">View real-time public transactions and export audit reports.</p>
              </div>
              <Link
                href="/financial-transparency"
                className="bg-primary text-primary-foreground font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm hover:opacity-90"
              >
                Go to Dashboard <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Record Offline Cash Donation Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-foreground">Record Offline / Cash Donation</h4>
              </div>

              {cashSuccessMsg && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>{cashSuccessMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleCashSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Donor Full Name *</label>
                  <input
                    type="text"
                    required
                    value={cashDonorName}
                    onChange={(e) => setCashDonorName(e.target.value)}
                    placeholder="e.g. Subhash Chandra"
                    className="w-full bg-muted border border-border/70 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Cash Amount (₹) *</label>
                  <input
                    type="number"
                    required
                    value={cashAmount}
                    onChange={(e) => setCashAmount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full bg-muted border border-border/70 rounded-xl px-3.5 py-2.5 text-xs font-extrabold focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Designated Program / Cause</label>
                  <select
                    value={cashCause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full bg-muted border border-border/70 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option>General Fund & Where Needed Most</option>
                    <option>Education & School Study Kits (Bihar & Delhi)</option>
                    <option>Women's Skill & Tailoring Batches (Navi Mumbai)</option>
                    <option>Environmental 10,000 Trees Campaign</option>
                    <option>Free Village Medical Checkup Camps</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold mb-1">Donor Email (Optional)</label>
                    <input
                      type="email"
                      value={cashDonorEmail}
                      onChange={(e) => setCashDonorEmail(e.target.value)}
                      placeholder="donor@gmail.com"
                      className="w-full bg-muted border border-border/70 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">PAN Number (Optional)</label>
                    <input
                      type="text"
                      value={cashDonorPan}
                      onChange={(e) => setCashDonorPan(e.target.value)}
                      placeholder="ABCDE1234F"
                      className="w-full bg-muted border border-border/70 rounded-xl px-3.5 py-2 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Staff Audit Notes</label>
                  <input
                    type="text"
                    value={cashNotes}
                    onChange={(e) => setCashNotes(e.target.value)}
                    placeholder="e.g. Received at Bihar center event"
                    className="w-full bg-muted border border-border/70 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingCash}
                  className="w-full bg-emerald-700 text-white font-extrabold py-3 rounded-xl text-xs hover:bg-emerald-800 transition-all shadow-md"
                >
                  {isSubmittingCash ? "Submitting Record..." : "Record Cash Donation into Public Ledger"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
