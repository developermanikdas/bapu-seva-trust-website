'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Target, Compass, Sparkles, GraduationCap, HeartHandshake, Building2 } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";
import { fetchVisionMissionData } from "@/sanity/queries";

const defaultMissionPillars = [
  {
    icon: GraduationCap,
    title: "Educate",
    description:
      "Provide free books, learning materials, and dedicated mentorship to underserved children — ensuring no child is denied a chance to learn because of poverty.",
  },
  {
    icon: HeartHandshake,
    title: "Empower",
    description:
      "Support women and girls through skill development, awareness drives, and health initiatives that build confidence, independence, and dignity.",
  },
  {
    icon: Building2,
    title: "Enable",
    description:
      "Build sustainable community infrastructure — learning centers, health camps, and intergenerational bridges — that continues to serve long after we step back.",
  },
];

const defaultGoals = [
  "Reach 25,000+ children with quality learning resources by 2027",
  "Train and deploy 200+ skilled volunteers across Bihar & Delhi",
  "Conduct 100+ free health & awareness camps annually",
  "Launch 10 permanent learning centers in underserved districts",
  "Empower 5,000+ women through skill & livelihood programs",
];

export default function VisionMissionPage() {
  const [sanityData, setSanityData] = useState(null);

  useEffect(() => {
    fetchVisionMissionData().then((res) => {
      if (res) setSanityData(res);
    });
  }, []);

  const heroSubtitle = sanityData?.heroSubtitle || "Our Purpose";
  const heroTitle = sanityData?.heroTitle || "Vision & Mission";
  const heroDescription = sanityData?.heroDescription || "The guiding principles that shape everything we do at Bapu Seva Trust — a clear roadmap for the change we want to create in the world.";
  const visionTitle = sanityData?.visionTitle || "A society where no one is left behind.";
  const visionDescription = sanityData?.visionDescription || "We envision a world where every child — regardless of where they were born or the circumstances of their family — has equal access to quality education, healthcare, and opportunity.";

  const pillars = sanityData?.missionPillars && sanityData.missionPillars.length > 0
    ? sanityData.missionPillars
    : defaultMissionPillars;

  return (
    <>
      <PageHero
        subtitle={heroSubtitle}
        title={heroTitle}
        description={heroDescription}
      />

      {/* Vision */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Vision</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6 leading-tight">
                {visionTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>{visionDescription}</p>
                <p>
                  We believe that dignity is not a luxury — it is a right. By addressing the root causes of educational exclusion, health disparities, and economic vulnerability, we work toward permanent, sustainable community upliftment.
                </p>
              </div>
            </div>

            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground font-semibold">Vision Summary</h3>
                  <p className="text-sm text-muted-foreground">Bihar • Navi Mumbai • Delhi</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Equal access to learning for every first-generation student
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Economic self-reliance for marginalized women
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span> Green environments & healthcare for rural communities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Pillars */}
      <section className="section-padding bg-muted/40 border-y border-border">
        <div className="container-narrow">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Mission</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">How We Create Impact</h2>
            <p className="text-muted-foreground text-lg">
              Three core pillars guide our ground operations in Bihar, Navi Mumbai, and Delhi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border/80 shadow-sm space-y-4 hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-display text-2xl text-foreground font-semibold">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-foreground text-background p-8 md:p-12 rounded-3xl space-y-6">
              <div className="flex items-center gap-3">
                <Compass className="w-8 h-8 text-primary" />
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Roadmap</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-background">Strategic Goals</h3>
              <p className="text-background/80 leading-relaxed text-sm">
                Clear, measurable benchmarks drive our accountability to our communities and donors.
              </p>
            </div>

            <div className="space-y-4">
              {defaultGoals.map((goal, idx) => (
                <div key={idx} className="bg-card p-5 rounded-2xl border border-border/80 flex items-start gap-4 shadow-sm">
                  <span className="font-display text-xl text-primary font-bold shrink-0">0{idx + 1}</span>
                  <p className="text-foreground text-sm font-medium leading-snug">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
