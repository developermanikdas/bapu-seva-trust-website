'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { HandHeart, Building, GraduationCap, Search, Globe, HeartHandshake, Megaphone, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";
import { fetchGetInvolvedData } from "@/sanity/queries";

const defaultOpportunities = [
  {
    icon: HandHeart,
    title: "Volunteer With Us",
    description: "Join our education, health, environmental, or women's empowerment programs on the ground. Make a direct impact in communities.",
    details: [
      "Teaching and tutoring at evening learning centers",
      "Organizing and assisting at health & green checkup camps",
      "Mentoring students in government schools",
      "Helping with book distribution and tree plantation drives",
      "Community outreach and sanitation awareness campaigns",
    ],
    cta: "Apply to Volunteer",
  },
  {
    icon: Building,
    title: "Partner With Us",
    description: "We collaborate with government schools, corporate CSR divisions & local bodies for larger-scale impact programs.",
    details: [
      "Corporate CSR partnerships & FCRA grants",
      "School collaboration & eco-club programs",
      "Local government joint sanitation initiatives",
      "Co-branded community development projects",
      "Resource sharing and capacity building",
    ],
    cta: "Become a Partner",
  },
  {
    icon: GraduationCap,
    title: "Internships",
    description: "Gain real-world experience in social development while making a meaningful difference across Bihar, Navi Mumbai & Delhi.",
    details: [
      "Field research and data collection",
      "Program design and impact evaluation",
      "Communications, PR and social media",
      "Fundraising, CSR grants and donor management",
      "Operational event coordination",
    ],
    cta: "Apply for Internship",
  },
];

export default function GetInvolvedPage() {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    fetchGetInvolvedData().then((res) => {
      if (res) setSanityData(res);
    });
  }, []);

  const heroSubtitle = sanityData?.heroSubtitle || "Partner With Us For Change";
  const heroTitle = sanityData?.heroTitle || "Get Involved";
  const heroDescription = sanityData?.heroDescription || "Whether as an individual volunteer, corporate CSR partner, or institutional supporter, your involvement directly touches thousands of lives across Bihar, Navi Mumbai & Delhi.";

  return (
    <>
      <PageHero
        subtitle={heroSubtitle}
        title={heroTitle}
        description={heroDescription}
      />

      {/* Main Opportunities */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-3 gap-8">
            {defaultOpportunities.map((opp, idx) => (
              <div key={idx} className="bg-card p-8 rounded-2xl border border-border/80 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <opp.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground font-semibold">{opp.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{opp.description}</p>
                  
                  <ul className="space-y-2 pt-2 border-t border-border/40 text-xs text-muted-foreground">
                    {opp.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl text-center text-xs hover:opacity-90 transition-opacity block shadow-sm"
                >
                  {opp.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR & Corporate Support Notice */}
      <section className="section-padding bg-muted/40 border-y border-border">
        <div className="container-narrow max-w-3xl text-center space-y-6">
          <span className="text-primary font-bold tracking-widest uppercase text-xs sm:text-sm block">
            CORPORATE CSR COMPLIANCE
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground font-bold">
            {sanityData?.csrTitle || "Corporate CSR & Institutional Alliances"}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {sanityData?.csrDescription || "Partner with Bapu Seva Trust under Companies Act Section 135 CSR mandate. We provide 80G tax receipts, auditable project milestones, and impact metrics across education, healthcare, and green drives."}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold text-xs hover:opacity-90 transition-opacity shadow-md"
          >
            Contact CSR Team →
          </Link>
        </div>
      </section>
    </>
  );
}
