'use client';

import { useState } from "react";
import Link from "next/link";
import { Heart, Shield, CheckCircle, Lock, ChevronDown, ChevronUp, MapPin, Sparkles, Building2, CreditCard, QrCode, ArrowRight, Play, Users, Award, BookOpen, Leaf } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero.jsx";
import heroImage from "@/assets/hero-image.jpg";
import programsHealth from "@/assets/programs-health.jpg";
import programsEmpowerment from "@/assets/programs-empowerment.jpg";
import programsBridges from "@/assets/programs-bridges.jpg";

const preSetAmounts = [1000, 2500, 5000, 10000];

const impactStats = [
  { icon: BookOpen, stat: "10,000+", label: "Children Received Study Kits", desc: "Free textbooks & stationary distributed across schools" },
  { icon: Users, stat: "500+", label: "Out-of-School Dropouts Tutored", desc: "Free evening tutoring centers in Bihar & Delhi" },
  { icon: Heart, stat: "100+", label: "Women Trained in Tailoring", desc: "Vocational skills & micro-finance in Navi Mumbai" },
  { icon: Leaf, stat: "5,000+", label: "Trees Planted in Urban Drives", desc: "Green sustainability campaigns across Delhi" },
];

const photoMosaicStories = [
  { name: "Riya Kumari", age: 12, loc: "Bihar", title: "Empowered Student", img: typeof heroImage === 'string' ? heroImage : heroImage.src },
  { name: "Sunita Shinde", age: 34, loc: "Navi Mumbai", title: "Self-Reliant Entrepreneur", img: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src },
  { name: "Delhi Green Drive", age: "2024", loc: "Delhi", title: "5,000 Trees Campaign", img: typeof programsBridges === 'string' ? programsBridges : programsBridges.src },
  { name: "Village Health Camp", age: "2024", loc: "Bihar", title: "300+ Free Screenings", img: typeof programsHealth === 'string' ? programsHealth : programsHealth.src },
  { name: "Book Distribution", age: "2024", loc: "Bihar", title: "5 New Government Schools", img: typeof heroImage === 'string' ? heroImage : heroImage.src },
  { name: "Women's Micro-Finance", age: "2024", loc: "Navi Mumbai", title: "Financial Literacy Batch", img: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src },
];

const faqs = [
  {
    q: "How can I donate to Bapu Seva Trust?",
    a: "You can donate online using UPI, Credit/Debit cards, Net Banking, or direct Bank Wire Transfer. Simply select your contribution amount on this page and proceed.",
  },
  {
    q: "Will I get an 80G tax exemption receipt for my donation?",
    a: "Yes! All Indian donations to Bapu Seva Trust are 50% tax-deductible under Section 80G of the Income Tax Act. An official 80G receipt with your PAN details will be emailed automatically.",
  },
  {
    q: "How will my donation be utilized?",
    a: "100% of public donations directly fund our ground programs — buying textbooks for underprivileged students, conducting medical checkup camps, planting saplings, and supplying tailoring kits for women.",
  },
  {
    q: "Can I choose a specific program or region (Bihar, Navi Mumbai, Delhi) to support?",
    a: "Yes! In the quick donation form, you can select specific program designations such as Education, Healthcare, Women's Empowerment, or Environmental Sustainability.",
  },
  {
    q: "What if I need an urgent 80G certificate for income tax filing?",
    a: "Your digital 80G receipt is generated instantly upon successful payment. If you require a physical signed copy, our accounts team can post it to your address upon request.",
  },
  {
    q: "How do I contact support if I have donation or payment questions?",
    a: "You can reach our donation helpline directly at +91 7870726323 or email us at info@bapusevatrust.org. We respond promptly within 24 hours.",
  },
];

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function DonatePage() {
  const [citizenship, setCitizenship] = useState("Indian");
  const [frequency, setFrequency] = useState("One-Time");
  const [amount, setAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState("");
  const [cause, setCause] = useState("General Fund & Where Needed Most");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPan, setDonorPan] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [showUpiQrModal, setShowUpiQrModal] = useState(false);
  const [serverQrCode, setServerQrCode] = useState(null);

  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:5000";

  const handleAmountSelect = (val) => {
    setAmount(val);
    setCustomAmount(String(val));
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    setAmount(Number(val) || 0);
  };

  const toggleUpiQrModal = async () => {
    const nextState = !showUpiQrModal;
    setShowUpiQrModal(nextState);

    if (nextState) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/payment/create-qr`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, cause }),
        });
        const qrData = await res.json();
        if (qrData.qrCodeUrl) {
          setServerQrCode(qrData.qrCodeUrl);
        }
      } catch (e) {
        console.error("Error fetching server QR code:", e);
      }
    }
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      toast.warning("Missing Amount", { description: "Please enter or select a valid donation amount." });
      return;
    }
    if (!donorName || !donorEmail) {
      toast.warning("Donor Details Required", { description: "Please fill in your name and email address for your 80G receipt." });
      return;
    }

    setIsProcessing(true);

    try {
      const isSDKLoaded = await loadRazorpayScript();
      if (!isSDKLoaded) {
        toast.error("SDK Error", { description: "Failed to load Razorpay SDK. Please check your internet connection." });
        setIsProcessing(false);
        return;
      }

      const isMonthly = frequency === "Monthly";
      const endpoint = isMonthly
        ? `${BACKEND_URL}/api/payment/create-subscription`
        : `${BACKEND_URL}/api/payment/create-order`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: "INR",
          cause,
          donorName,
          donorEmail,
          donorPan,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to initialize payment request.");
      }

      // Configured Razorpay Modal Options with explicit UPI / QR Code blocks and Subscription support
      const options = {
        key: data.key,
        name: "Bapu Seva Trust",
        description: isMonthly ? `Monthly Subscription: ${cause}` : `One-Time Donation: ${cause}`,
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: {
          color: "#3B82F6",
        },
        config: {
          display: {
            blocks: {
              utib: {
                name: "Pay via UPI & QR Code",
                instruments: [
                  { method: "upi" },
                  { method: "card" },
                  { method: "netbanking" },
                  { method: "wallet" },
                ],
              },
            },
            sequence: ["block.utib"],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        handler: async function (response) {
          try {
            const verifyEndpoint = isMonthly
              ? `${BACKEND_URL}/api/payment/verify-subscription`
              : `${BACKEND_URL}/api/payment/verify-signature`;

            const verifyRes = await fetch(verifyEndpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(
                isMonthly
                  ? {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_subscription_id: response.razorpay_subscription_id,
                    razorpay_signature: response.razorpay_signature,
                  }
                  : {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }
              ),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success("Payment Received!", { description: "Thank you for your generous contribution to Bapu Seva Trust." });
              setPaymentSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id || response.razorpay_subscription_id,
                amount,
                donorName,
                donorEmail,
                cause,
                type: isMonthly ? "Monthly Subscription" : "One-Time Donation",
              });
            } else {
              toast.error("Verification Issue", { description: "Payment verification failed. Please contact support." });
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Verification Error", { description: "Error verifying payment signature." });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      if (isMonthly) {
        options.subscription_id = data.subscriptionId;
      } else {
        options.amount = data.amount;
        options.currency = data.currency;
        options.order_id = data.orderId;
      }

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error("Payment Failed", { description: error.message || "Failed to initiate Razorpay payment." });
      setIsProcessing(false);
    }
  };

  return (
    <>
      <PageHero
        subtitle="Transform Lives With Dignity"
        title="Support Bapu Seva Trust"
        description="Your generosity fuels education, health, women's empowerment, and green environments across Bihar, Navi Mumbai & Delhi."
      />

      {/* Hero Grid Section: Left Impact & Video Banner | Right Quick Donation Card */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid lg:grid-cols-12 gap-10 items-start">

            {/* LEFT COLUMN: Featured Hero Story Banner & Intro */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl group bg-black">
                <img
                  src={typeof heroImage === 'string' ? heroImage : heroImage.src}
                  alt="Bapu Seva Trust Ground Impact"
                  className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  width={1200}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full w-max mb-2">
                    Serving Bihar, Navi Mumbai & Delhi
                  </span>
                  <h2 className="font-display text-2xl sm:text-4xl text-white font-extrabold leading-tight">
                    Let's Help Our Communities Live With <span className="text-secondary">Dignity And Respect</span>
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  <strong className="text-foreground">Bapu Seva Trust</strong> carries out grassroots developmental initiatives in education, rural healthcare, women's skill empowerment, environmental sustainability, and disaster relief.
                </p>
                <p>
                  From distributing study kits to out-of-school dropouts in Bihar to training women micro-entrepreneurs in Navi Mumbai and planting 5,000+ saplings in Delhi, your support reaches those who need it most.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-card p-4 rounded-2xl border border-border/80 shadow-sm flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-xs">80G Tax Exemption</p>
                    <p className="text-[11px] text-muted-foreground">50% Tax Benefits for Donors</p>
                  </div>
                </div>
                <div className="bg-card p-4 rounded-2xl border border-border/80 shadow-sm flex items-center gap-3">
                  <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-foreground text-xs">100% Transparency</p>
                    <p className="text-[11px] text-muted-foreground">Audited Balance Sheets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Inspiration Quick Donation Card */}
            <div className="lg:col-span-5 bg-card rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-2xl space-y-6 sticky top-24">
              <form onSubmit={handleDonateSubmit} className="space-y-5">

                {/* Citizenship Selector */}
                <div className="flex items-center justify-between bg-muted p-1.5 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setCitizenship("Indian")}
                    className={`w-1/2 py-2 rounded-lg transition-all ${citizenship === "Indian"
                        ? "bg-primary text-primary-foreground shadow-md font-bold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    ● Indian Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => setCitizenship("Foreign")}
                    className={`w-1/2 py-2 rounded-lg transition-all ${citizenship === "Foreign"
                        ? "bg-primary text-primary-foreground shadow-md font-bold"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    ○ Foreign Citizen (FCRA)
                  </button>
                </div>

                {/* Frequency Selector */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency("One-Time")}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${frequency === "One-Time"
                        ? "bg-primary/10 border-primary text-primary shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    Give One-Time
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("Monthly")}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${frequency === "Monthly"
                        ? "bg-primary/10 border-primary text-primary shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    Give Monthly
                  </button>
                </div>

                {/* Pre-set Amount Pills */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2">Select Donation Amount</label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {preSetAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => handleAmountSelect(amt)}
                        className={`py-2.5 rounded-xl text-xs font-extrabold transition-all border ${amount === amt && !customAmount
                            ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                            : "bg-background border-border text-foreground hover:bg-muted"
                          }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input */}
                  <input
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter Your Own Amount (₹)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60 font-semibold"
                  />
                </div>

                {/* Cause Selector */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1.5">Designate To A Cause</label>
                  <select
                    value={cause}
                    onChange={(e) => setCause(e.target.value)}
                    className="w-full bg-muted text-foreground rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60 font-semibold"
                  >
                    <option>General Fund & Where Needed Most</option>
                    <option>Education & School Study Kits (Bihar & Delhi)</option>
                    <option>Women's Skill & Tailoring Batches (Navi Mumbai)</option>
                    <option>Environmental 10,000 Trees Campaign</option>
                    <option>Free Village Medical Checkup Camps</option>
                  </select>
                </div>

                {/* Donor Details for 80G Receipt */}
                <div className="space-y-2 pt-1 border-t border-border/60">
                  <input
                    type="text"
                    required
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Full Name (As per PAN)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                  />
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Email Address (For 80G Receipt)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                  />
                  <input
                    type="text"
                    value={donorPan}
                    onChange={(e) => setDonorPan(e.target.value)}
                    placeholder="PAN Number (Optional for 80G Tax Exemption)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-2.5 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                  />
                </div>

                {/* 80G Tax Notice Alert */}
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-[11px] text-muted-foreground leading-tight flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    Donations are <strong>50% tax exempt under Section 80G</strong>. An official 80G certificate will be sent to your email instantly.
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-primary text-primary-foreground font-extrabold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>Connecting to Razorpay...</>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" /> Proceed To Donate ₹{amount ? amount.toLocaleString() : 0} →
                    </>
                  )}
                </button>
              </form>

              {/* Direct Banking & Dynamic UPI QR Code */}
              <div className="pt-4 border-t border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Instant UPI & QR Code
                  </p>
                  <button
                    type="button"
                    onClick={toggleUpiQrModal}
                    className="text-xs text-primary font-extrabold hover:underline flex items-center gap-1.5 bg-primary/10 px-3 py-1 rounded-lg border border-primary/20"
                  >
                    <QrCode className="w-4 h-4" /> {showUpiQrModal ? "Hide QR" : "Show Instant UPI QR"}
                  </button>
                </div>

                {/* Dynamic UPI QR Code Display Card */}
                {showUpiQrModal && (
                  <div className="bg-muted p-4 rounded-2xl border-2 border-primary/30 flex flex-col items-center text-center space-y-3 animate-in fade-in zoom-in duration-200">
                    <p className="text-xs font-bold text-foreground">
                      Scan with Google Pay, PhonePe, Paytm or BHIM
                    </p>
                    <div className="bg-white p-3 rounded-2xl shadow-lg border border-border">
                      <img
                        src={
                          serverQrCode ||
                          `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                            `upi://pay?pa=7870726323@upi&pn=Bapu%20Seva%20Trust&am=${amount || 2500}&cu=INR&tn=Donation%20to%20Bapu%20Seva%20Trust`
                          )}`
                        }
                        alt="Bapu Seva Trust Dynamic UPI QR Code"
                        className="w-44 h-44 object-contain"
                      />
                    </div>
                    <div className="text-[11px] text-muted-foreground space-y-1">
                      <p>
                        UPI / Phone: <strong className="text-foreground">7870726323</strong>
                      </p>
                      <p>
                        Amount: <strong className="text-primary font-extrabold text-xs">₹{amount ? amount.toLocaleString() : 0}</strong>
                      </p>
                    </div>
                  </div>
                )}

                <div className="bg-muted/60 p-3.5 rounded-2xl border border-border/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">UPI / Paytm / GPay / PhonePe:</span>
                    <span className="font-bold text-primary bg-background px-2.5 py-1 rounded-md border border-border/40">7870726323</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Bank Name:</span>
                    <span className="font-semibold text-foreground">Punjab National Bank</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-semibold text-foreground">BAPU SEVA TRUST</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Account No (A/C No):</span>
                    <span className="font-mono font-bold text-foreground bg-background/80 px-2 py-0.5 rounded border border-border/40">6347000100046658</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">IFSC Code:</span>
                    <span className="font-mono font-bold text-foreground bg-background/80 px-2 py-0.5 rounded border border-border/40">PUNJB0634700</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-border/40">
                    <span className="text-muted-foreground">Official Email:</span>
                    <span className="font-semibold text-primary">info@bapusevatrust.org</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground text-center pt-1 font-medium italic">
                    "Eligible for tax exemptions under sections 12A and 80G • Reg: BR/2021/0290486"
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: "This is the impact YOU helped us make in 2024-25" */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              REAL GROUND IMPACT
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-extrabold mb-3">
              This is the impact YOU helped us make in 2024-25
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Your support empowers children, women, and eco-systems across India.
            </p>

            {/* Total Highlight Metric */}
            <div className="mt-8 bg-card rounded-3xl p-8 max-w-md mx-auto border-2 border-primary/20 shadow-lg text-center">
              <p className="font-display text-4xl sm:text-5xl text-primary font-extrabold mb-1">50,000+</p>
              <p className="text-sm font-bold text-foreground uppercase tracking-wider">Lives Transformed Across India</p>
            </div>
          </div>

          {/* 4 Impact Stat Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((st, i) => (
              <div
                key={st.label}
                className="bg-card rounded-2xl p-6 border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <st.icon className="w-10 h-10 text-primary mb-4" />
                  <p className="font-display text-3xl text-foreground font-bold mb-1">{st.stat}</p>
                  <p className="font-bold text-foreground text-sm mb-2 leading-snug">{st.label}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: "Impact Stories — The Change You've Made" Photo Grid */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              IMPACT STORIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-3">
              The Change You've Made
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Together we have been able to touch the lives of thousands of children and families.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {photoMosaicStories.map((story, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden bg-muted h-64 sm:h-72 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-md w-max mb-1">
                    {story.loc}
                  </span>
                  <h3 className="font-display text-lg font-bold leading-tight">{story.title}</h3>
                  <p className="text-xs text-white/80">{story.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Partners */}
      <section className="section-padding bg-muted/40 border-y border-border">
        <div className="container-narrow text-center space-y-6">
          <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm block">
            OUR PARTNERS & CSR SUPPORTERS
          </span>
          <h2 className="font-display text-2xl sm:text-4xl text-foreground font-bold">
            Bapu Seva Trust is able to carry out its work on ground due to the generosity of our partners.
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            We collaborate with government schools, corporate CSR divisions, and local municipal bodies to scale program impact.
          </p>
          <Link
            href="/get-involved"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-md"
          >
            Become a Partner →
          </Link>
        </div>
      </section>

      {/* SECTION 5: Frequently Asked Questions (FAQ Accordion) */}
      <section className="section-padding">
        <div className="container-narrow max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              DONOR TRANSPARENCY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-bold mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm">
              Everything you need to know about donating, 80G receipts, and impact tracking.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border/80 shadow-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-display text-base sm:text-lg text-foreground font-semibold">
                      {faq.q}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 mt-1">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Be Part of the Change Today</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            Every rupee creates hope for children, women, and communities across Bihar, Navi Mumbai & Delhi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg">
              Contact Team
            </Link>
            <Link href="/reports" className="border-2 border-primary-foreground/60 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              View Legal Disclosures & Audits
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Success Receipt Modal */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mb-2 border border-emerald-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="font-display text-2xl font-bold">Donation Successful!</h3>
              <p className="text-xs text-muted-foreground">
                Thank you, <strong className="text-foreground">{paymentSuccess.donorName}</strong>. Your payment has been verified.
              </p>
            </div>

            <div className="bg-muted p-4 rounded-2xl space-y-2 text-xs border border-border/60">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount Paid:</span>
                <span className="font-extrabold text-primary text-sm">₹{paymentSuccess.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Payment ID:</span>
                <span className="font-mono text-[11px] font-semibold">{paymentSuccess.paymentId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-mono text-[11px] font-semibold">{paymentSuccess.orderId}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border/40">
                <span className="text-muted-foreground">Designated Cause:</span>
                <span className="font-semibold text-right max-w-[200px] truncate">{paymentSuccess.cause}</span>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed text-center">
              An official 80G tax exemption receipt has been processed for <strong>{paymentSuccess.donorEmail}</strong>.
            </div>

            <button
              onClick={() => setPaymentSuccess(null)}
              className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-all text-sm"
            >
              Close Receipt
            </button>
          </div>
        </div>
      )}
    </>
  );
}
