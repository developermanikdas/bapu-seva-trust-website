'use client';

import { useState, useEffect } from "react";
import { FileText, Download, Shield, BarChart3, Lock, CheckCircle, Eye, X, Mail, Phone, User, Award, Globe, FileCheck } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";

import { client } from "@/sanity/client";
import { REPORTS_QUERY } from "@/sanity/queries";



const officialDocuments = [
  {
    id: "doc-reg",
    title: "Registration Certificate",
    category: "Legal & Registration",
    regNo: "Reg No: IV-1823/2021",
    type: "PDF",
    size: "1.2 MB",
    description: "Official Trust Registration Certificate issued under the Indian Trusts Act, 1882.",
  },
  {
    id: "doc-csr1",
    title: "CSR-1 Registration",
    category: "Legal & Registration",
    regNo: "MCA Reg No: CSR00034921",
    type: "PDF",
    size: "850 KB",
    description: "Ministry of Corporate Affairs (MCA) CSR-1 registration for corporate social responsibility partnerships.",
  },
  {
    id: "doc-12a",
    title: "12A Certificate",
    category: "Tax Exemption",
    regNo: "IT Dept Reg: AACTB9481E20211",
    type: "PDF",
    size: "1.0 MB",
    description: "Income Tax Department 12A tax-exempt organization certificate.",
  },
  {
    id: "doc-80g",
    title: "80G Certificate",
    category: "Tax Exemption",
    regNo: "IT Dept Reg: AACTB9481EF20212",
    type: "PDF",
    size: "950 KB",
    description: "Income Tax Department 80G certificate granting 50% tax deduction benefits to donors.",
  },
  {
    id: "doc-darpan",
    title: "NGO Darpan ID",
    category: "Legal & Registration",
    regNo: "NITI Aayog ID: BR/2021/0298412",
    type: "PDF",
    size: "620 KB",
    description: "NITI Aayog NGO Darpan official registration certificate.",
  },
  {
    id: "doc-annual-2024",
    title: "Annual Impact Report 2024",
    category: "Annual Reports",
    regNo: "Financial Year 2023-2024",
    type: "PDF",
    size: "3.4 MB",
    description: "Comprehensive annual performance, ground impact numbers, program highlights across Bihar, Navi Mumbai & Delhi.",
  },
  {
    id: "doc-audit-2024",
    title: "Audited Financial Statement 2023-24",
    category: "Audits & Financials",
    regNo: "Chartered Accountant Audit",
    type: "PDF",
    size: "2.1 MB",
    description: "Independent Chartered Accountant Audit Report, balance sheet, income & expenditure statement.",
  },
  {
    id: "doc-audit-2023",
    title: "Audited Financial Statement 2022-23",
    category: "Audits & Financials",
    regNo: "Chartered Accountant Audit",
    type: "PDF",
    size: "1.8 MB",
    description: "Independent audited financial disclosures for FY 2022-23.",
  },
  {
    id: "doc-advocacy",
    title: "Advocacy & Policy Framework",
    category: "Advocacy & Governance",
    regNo: "Public Policy Brief 2024",
    type: "PDF",
    size: "1.5 MB",
    description: "Community advocacy whitepaper, child rights protection policy, and women self-reliance policy framework.",
  },
];

export default function ReportsPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userName, setUserName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [sanityReports, setSanityReports] = useState([]);

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await client.fetch(REPORTS_QUERY);
        if (data && data.length > 0) {
          setSanityReports(data);
        }
      } catch (err) {
        console.error("Sanity reports fetch error:", err);
      }
    }
    loadReports();
  }, []);

  const displayDocs = sanityReports.length > 0
    ? sanityReports.map((r, i) => ({
        id: r._id || `report-${i}`,
        title: r.title,
        category: r.category || "Annual Reports",
        regNo: r.year ? `Financial Year ${r.year}` : "Official Document",
        type: "PDF",
        size: "Document",
        description: r.summary || "Official report document from Bapu Seva Trust.",
        fileUrl: r.fileUrl || r.externalUrl,
      }))
    : officialDocuments;


  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
    if (isUnlocked) {
      // Direct action if already unlocked
      triggerDownload(doc);
    } else {
      // Open gate modal
      setShowModal(true);
    }
  };

  const handleGateSubmit = (e) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    setIsUnlocked(true);
    setShowModal(false);

    if (selectedDoc) {
      triggerDownload(selectedDoc);
    }
  };

  const triggerDownload = (doc) => {
    alert(`[Access Granted] Opening document: ${doc.title} (${doc.regNo}). In production, this opens the official PDF.`);
  };

  const categories = ["All", "Legal & Registration", "Tax Exemption", "Annual Reports", "Audits & Financials", "Advocacy & Governance"];

  const filteredDocs = displayDocs.filter((doc) => activeTab === "All" || doc.category === activeTab);


  return (
    <>
      <PageHero
        subtitle="Transparency & Disclosure"
        title="Official Documents & Reports"
        description="Access our legal registration certificates, 80G/12A tax clearances, NITI Aayog Darpan ID, audited financials, and annual reports."
      />

      {/* Access Status Banner */}
      <section className="bg-card border-b border-border py-4">
        <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            {isUnlocked ? (
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 font-semibold px-3 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Access Unlocked — {userEmail}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 font-semibold px-3 py-1 rounded-full border border-amber-500/20">
                <Lock className="w-3.5 h-3.5 text-amber-600" /> Enter Email to View & Download Official Documents
              </span>
            )}
          </div>
          <p className="text-muted-foreground">
            Complete transparency across Bihar, Navi Mumbai & Delhi
          </p>
        </div>
      </section>

      {/* Transparency Highlights */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-card rounded-2xl p-8 text-center border border-border/80 shadow-sm">
              <Shield className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl text-foreground font-semibold mb-2">100% Tax Compliant</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Registered under 12A, 80G tax deductions, CSR-1 MCA clearance, and NITI Aayog NGO Darpan portal.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 text-center border border-border/80 shadow-sm">
              <BarChart3 className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl text-foreground font-semibold mb-2">Audited Statements</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Independent Chartered Accountant audit reports published annually with full income and expense disclosures.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 text-center border border-border/80 shadow-sm">
              <FileCheck className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl text-foreground font-semibold mb-2">Advocacy & Governance</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Public advocacy policy documents, child protection policies, and ethics frameworks.
              </p>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === cat
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-muted text-muted-foreground hover:text-foreground border border-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Official Documents Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-card rounded-2xl p-6 border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary/10 text-primary text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold">
                      {doc.type} · {doc.size}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3">
                    <FileText className="w-7 h-7 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display text-lg text-foreground font-bold leading-snug group-hover:text-primary transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-[11px] font-semibold text-primary/90 mt-0.5">{doc.regNo}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                    {doc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleDocClick(doc)}
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold py-2.5 px-4 rounded-xl hover:opacity-90 transition-all shadow-sm"
                  >
                    {isUnlocked ? (
                      <>
                        <Download className="w-3.5 h-3.5" /> View / Download PDF
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5" /> Enter Details to Access
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gated Access Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-3xl p-8 max-w-md w-full border border-border shadow-2xl relative animate-scale-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="font-display text-2xl text-foreground font-bold mb-2">Access Official Documents</h3>
            <p className="text-muted-foreground text-xs leading-relaxed mb-6">
              To view or download legal disclosures (12A, 80G, CSR-1, Darpan ID, Audits), please provide your details below.
            </p>

            <form onSubmit={handleGateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Email Address <span className="text-primary">* Mandatory</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="+91 98765 43210 (Optional)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Full Name <span className="text-muted-foreground font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-md mt-2"
              >
                Unlock & View Documents →
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
