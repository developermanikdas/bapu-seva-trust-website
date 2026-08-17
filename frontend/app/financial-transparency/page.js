'use client';

import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero.jsx";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Users,
  FileText,
  PlusCircle,
  Search,
  Filter,
  RefreshCw,
  ShieldCheck,
  Building2,
  Calendar,
  CheckCircle,
  Download,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Lock,
} from "lucide-react";

export default function FinancialTransparencyPage() {
  const [data, setData] = useState({
    summary: {
      totalInflow: 0,
      totalOutflow: 0,
      netBalance: 0,
      donorCount: 0,
      expenseCount: 0,
    },
    transactions: [],
    expenses: [],
  });

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMethod, setFilterMethod] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [filterCause, setFilterCause] = useState("ALL");

  const [showCashModal, setShowCashModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingCash, setIsSubmittingCash] = useState(false);
  const [adminToken, setAdminToken] = useState(null);

  // Cash Form State
  const [cashDonorName, setCashDonorName] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [cashCause, setCashCause] = useState("General Fund & Where Needed Most");
  const [cashDonorEmail, setCashDonorEmail] = useState("");
  const [cashDonorPan, setCashDonorPan] = useState("");
  const [cashNotes, setCashNotes] = useState("");

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

  const fetchFinancialData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/payment/transactions`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Error fetching transparency data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData();
    const token = localStorage.getItem("bst_admin_token");
    if (token) {
      setAdminToken(token);
    }
  }, []);

  const handleOpenCashModal = () => {
    const token = localStorage.getItem("bst_admin_token");
    if (!token) {
      if (confirm("Recording cash donations requires Staff Admin 2FA Authentication. Would you like to log in to the Staff Portal (/portal-access)?")) {
        window.location.href = "/portal-access";
      }
      return;
    }
    setShowCashModal(true);
  };

  // Handle Manual Cash Donation Submission
  const handleCashSubmit = async (e) => {
    e.preventDefault();
    if (!cashDonorName || !cashAmount || Number(cashAmount) <= 0) {
      alert("Please enter a valid donor name and amount.");
      return;
    }

    const token = localStorage.getItem("bst_admin_token");
    if (!token) {
      alert("Authentication token missing. Please log in to the Staff Portal.");
      window.location.href = "/portal-access";
      return;
    }

    setIsSubmittingCash(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/payment/record-cash`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

      const json = await res.json();

      if (res.ok && json.success) {
        alert("Cash donation successfully recorded into public ledger!");
        setShowCashModal(false);
        setCashDonorName("");
        setCashAmount("");
        setCashDonorEmail("");
        setCashDonorPan("");
        setCashNotes("");
        fetchFinancialData();
      } else {
        alert(json.error || "Failed to record cash donation.");
      }
    } catch (err) {
      console.error("Cash record error:", err);
      alert("Network error while recording cash donation.");
    } finally {
      setIsSubmittingCash(false);
    }
  };

  // Combine Inflow & Outflow safely
  const combinedList = [
    ...(data.transactions || []).map((t) => {
      const parsedDate = t.date ? new Date(t.date) : new Date();
      return {
        id: t._id || t.transactionId || `tx_${Math.random()}`,
        date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
        name: t.donorName || t.name || "Anonymous Donor",
        category: t.cause || "Donation Inflow",
        amount: Number(t.amount) || 0,
        type: "INFLOW",
        mode: t.paymentMethod || "Online",
        ref: t.transactionId || t._id || "REF",
      };
    }),
    ...(data.expenses || []).map((e) => {
      const parsedDate = e.date ? new Date(e.date) : new Date();
      return {
        id: e._id || e.invoiceNumber || `exp_${Math.random()}`,
        date: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
        name: e.title || "Program Expenditure",
        category: `${e.category || 'Program'} (${e.location || 'India'})`,
        amount: Number(e.amount) || 0,
        type: "OUTFLOW",
        mode: "Program Expense",
        ref: e.invoiceNumber || "EXP-REF",
      };
    }),
  ];

  // Robust Search, Tab & Filter Logic
  const filteredItems = combinedList
    .filter((item) => {
      // 1. Tab Filter
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "inflow" && item.type === "INFLOW") ||
        (activeTab === "outflow" && item.type === "OUTFLOW") ||
        (activeTab === "cash" && (item.mode === "Cash" || item.mode === "CASH"));

      // 2. Payment Method Filter
      const matchesMethod =
        filterMethod === "ALL" ||
        item.mode.toLowerCase().includes(filterMethod.toLowerCase());

      // 3. Cause Filter
      const matchesCause =
        filterCause === "ALL" ||
        item.category.toLowerCase().includes(filterCause.toLowerCase());

      // 4. Search Bar
      const query = (searchQuery || "").toLowerCase();
      const nameStr = (item.name || "").toLowerCase();
      const catStr = (item.category || "").toLowerCase();
      const refStr = (item.ref || "").toLowerCase();
      const matchesSearch =
        nameStr.includes(query) || catStr.includes(query) || refStr.includes(query);

      return matchesTab && matchesMethod && matchesCause && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "oldest") return a.date - b.date;
      if (sortBy === "highest") return b.amount - a.amount;
      if (sortBy === "lowest") return a.amount - b.amount;
      return b.date - a.date; // default: newest first
    });

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <>
      <div className="print:hidden">
        <PageHero
          subtitle="Radical Integrity & Accountable Governance"
          title="Public Financial Transparency"
          description="Every rupee received and spent is published live for complete donor trust, audited accountability, and 80G tax governance."
        />
      </div>

      <section className="section-padding">
        <div className="container-narrow space-y-8">
          
          {/* Printable Header */}
          <div className="hidden print:block text-center border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold">BAPU SEVA TRUST</h1>
            <p className="text-sm text-gray-600">Official Financial Statement & Public Audit Ledger</p>
            <p className="text-xs text-gray-500 mt-1">Generated on: {new Date().toLocaleDateString('en-IN')}</p>
          </div>

          {/* Top Metric Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-card p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Donations (Inflow)</p>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  ₹{(data.summary?.totalInflow || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Program Expenses (Outflow)</p>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  ₹{(data.summary?.totalOutflow || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Trust Net Balance</p>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  ₹{(data.summary?.netBalance || 0).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="bg-card p-5 rounded-2xl border border-border/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Verified Donors</p>
                <p className="font-display text-2xl font-extrabold text-foreground">
                  {data.summary?.donorCount || 0} Supporters
                </p>
              </div>
            </div>
          </div>

          {/* Action Toolbar & Filters */}
          <div className="print:hidden bg-card p-4 sm:p-6 rounded-3xl border border-border/80 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-muted p-1 rounded-xl text-xs font-semibold overflow-x-auto">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "all" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All Activity ({combinedList.length})
                </button>
                <button
                  onClick={() => setActiveTab("inflow")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "inflow" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Donation Inflow (₹)
                </button>
                <button
                  onClick={() => setActiveTab("outflow")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "outflow" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Program Expenses (₹)
                </button>
                <button
                  onClick={() => setActiveTab("cash")}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    activeTab === "cash" ? "bg-primary text-primary-foreground font-bold shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Cash Records
                </button>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchFinancialData}
                  disabled={isLoading}
                  className="bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 font-bold px-3.5 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm"
                  title="Refresh live ledger from MongoDB"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  {isLoading ? "Refreshing..." : "Refresh"}
                </button>

                <button
                  onClick={handleExportPDF}
                  className="bg-muted hover:bg-muted/80 text-foreground border border-border font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-primary" /> Export (PDF)
                </button>
              </div>

            </div>

            {/* Filter Controls Row ("Filter By...") */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/60">
              
              {/* Search Bar */}
              <div className="relative sm:col-span-1">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search donor name, category..."
                  className="w-full bg-background border border-border/70 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Payment Method Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
                >
                  <option value="ALL">Filter by Mode: All Payment Methods</option>
                  <option value="Cash">Cash Payments</option>
                  <option value="Online">Razorpay Online</option>
                  <option value="Bank">Bank Wire Transfer</option>
                  <option value="Expense">Program Expenses</option>
                </select>
              </div>

              {/* Sort Order Dropdown */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-background border border-border/70 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary font-semibold"
                >
                  <option value="newest">Sort By: Newest First</option>
                  <option value="oldest">Sort By: Oldest First</option>
                  <option value="highest">Sort By: Highest Amount (₹)</option>
                  <option value="lowest">Sort By: Lowest Amount (₹)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Live Data Table */}
          <div className="bg-card rounded-3xl border border-border/80 shadow-md overflow-hidden">
            <div className="p-5 border-b border-border/60 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">Live Public Transparency Ledger</h3>
                <p className="text-xs text-muted-foreground">Showing verified incoming donations and outgoing program expenditures.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchFinancialData}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} /> Sync
                </button>
                <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                  ● Live Sync Active
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-sm text-muted-foreground flex flex-col items-center justify-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                <span>Fetching live records from MongoDB database...</span>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="p-12 text-center text-sm text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">No financial records found matching your filters.</p>
                <p className="text-xs text-muted-foreground">Try clearing search filters or click "Refresh" to re-sync with MongoDB.</p>
                <button
                  onClick={fetchFinancialData}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary/20"
                >
                  🔄 Refresh Live Feed
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/60 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border">
                    <tr>
                      <th className="px-6 py-3.5">Date & Time</th>
                      <th className="px-6 py-3.5">Donor / Beneficiary Name</th>
                      <th className="px-6 py-3.5">Category / Purpose</th>
                      <th className="px-6 py-3.5">Payment Method</th>
                      <th className="px-6 py-3.5 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60 font-medium">
                    {filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                          {item.date.toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 font-bold text-foreground">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {item.category}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              item.mode.toLowerCase().includes("cash")
                                ? "bg-amber-500/10 text-amber-700 border border-amber-500/20"
                                : item.type === "INFLOW"
                                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                                : "bg-blue-500/10 text-blue-700 border border-blue-500/20"
                            }`}
                          >
                            {item.mode}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right font-extrabold text-sm whitespace-nowrap">
                          {item.type === "INFLOW" ? (
                            <span className="text-emerald-600 flex items-center justify-end gap-1">
                              +₹{item.amount.toLocaleString()} <ArrowUpRight className="w-4 h-4" />
                            </span>
                          ) : (
                            <span className="text-rose-600 flex items-center justify-end gap-1">
                              -₹{item.amount.toLocaleString()} <ArrowDownRight className="w-4 h-4" />
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Manual Cash Entry Modal */}
      {showCashModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card text-card-foreground border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h3 className="font-display text-lg font-bold">Record Manual Cash Donation</h3>
                <p className="text-xs text-muted-foreground">Add direct cash contributions to the public ledger.</p>
              </div>
              <button
                onClick={() => setShowCashModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCashSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Donor Full Name *</label>
                <input
                  type="text"
                  required
                  value={cashDonorName}
                  onChange={(e) => setCashDonorName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full bg-muted border border-border/70 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full bg-muted border border-border/70 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Designated Program / Cause</label>
                <select
                  value={cashCause}
                  onChange={(e) => setCashCause(e.target.value)}
                  className="w-full bg-muted border border-border/70 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
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
                    placeholder="email@domain.com"
                    className="w-full bg-muted border border-border/70 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">PAN (For 80G)</label>
                  <input
                    type="text"
                    value={cashDonorPan}
                    onChange={(e) => setCashDonorPan(e.target.value)}
                    placeholder="ABCDE1234F"
                    className="w-full bg-muted border border-border/70 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Admin / Staff Note</label>
                <input
                  type="text"
                  value={cashNotes}
                  onChange={(e) => setCashNotes(e.target.value)}
                  placeholder="e.g. Received at Bihar center event"
                  className="w-full bg-muted border border-border/70 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCashModal(false)}
                  className="px-4 py-2 rounded-xl text-xs border border-border hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCash}
                  className="bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs hover:bg-emerald-800 disabled:opacity-50"
                >
                  {isSubmittingCash ? "Recording..." : "Save Cash Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
