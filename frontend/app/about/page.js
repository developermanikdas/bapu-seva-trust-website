'use client';

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, Users, Award, MapPin, ArrowRight, Mail, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";
import heroImage from "@/assets/hero-image.jpg";
import programsHealth from "@/assets/programs-health.jpg";
import programsEmpowerment from "@/assets/programs-empowerment.jpg";
import programsBridges from "@/assets/programs-bridges.jpg";

const corePillars = [
  {
    title: "Compassionate Action",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    tag: "Empathy & Relief",
    description: "Every program begins at the grass-root level by listening to community needs in Bihar, Navi Mumbai & Delhi.",
    impact: "Over 10,000+ individuals reached directly",
  },
  {
    title: "Sustainable Impact",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    tag: "Education & Skills",
    description: "Empowering women with micro-skills and providing out-of-school children with study materials to break poverty cycles.",
    impact: "500+ mentored students & self-reliant women",
  },
  {
    title: "Community First",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    tag: "Intergenerational",
    description: "Creating bonds between elders and young children to foster emotional wellbeing and life wisdom.",
    impact: "300+ connected families across centers",
  },
  {
    title: "Uncompromising Integrity",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    tag: "100% Transparency",
    description: "Maintaining strict financial accountability and public reporting for every rupee entrusted to our trust.",
    impact: "Audited annual reports & open records",
  },
];

const teamMembers = [
  {
    name: "Rajesh Sharma",
    role: "Founder & Managing Trustee",
    location: "Bihar & Delhi",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    bio: "Passionate social worker with 10+ years of grassroots development experience in rural education and community health.",
  },
  {
    name: "Ananya Verma",
    role: "Co-Founder & Head of Women's Empowerment",
    location: "Navi Mumbai",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    bio: "Leads skill development and financial literacy programs empowering women to achieve economic independence.",
  },
  {
    name: "Dr. Vikram Patel",
    role: "Medical Programs Director",
    location: "Delhi & Bihar",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    bio: "Organizes free health checkups, hygiene awareness workshops, and nutritional aid in underserved villages.",
  },
  {
    name: "Pooja Sundaram",
    role: "Education & Mentorship Lead",
    location: "Bihar",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    bio: "Coordinates learning centers and book distribution drives for out-of-school and first-generation learners.",
  },
  {
    name: "Sanjay Deshmukh",
    role: "Community Outreach Manager",
    location: "Navi Mumbai",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    bio: "Drives grassroots volunteer engagement, local partnership campaigns, and urban community relief.",
  },
  {
    name: "Sunita Roy",
    role: "Volunteer Coordinator",
    location: "Delhi",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    bio: "Manages youth volunteer orientation, workshop logistics, and intergenerational Senior & Child Bridges programs.",
  },
];

const milestones = [
  { year: "2021", title: "Trust Established", description: "Bapu Seva Trust was officially registered with a core team of passionate volunteers." },
  { year: "2022", title: "First Health Camp", description: "Organized our inaugural health camp in rural Bihar, serving 500+ villagers." },
  { year: "2023", title: "10,000 Books Drive", description: "Reached 10,000+ books distributed across government schools in Bihar and Delhi." },
  { year: "2024", title: "Navi Mumbai Expansion", description: "Launched women's empowerment & skill training workshops in Navi Mumbai." },
];

export default function AboutPage() {
  const [showAllTeam, setShowAllTeam] = useState(false);

  const visibleTeam = showAllTeam ? teamMembers : teamMembers.slice(0, 3);

  return (
    <>
      <PageHero
        subtitle="Who We Are"
        title="About Bapu Seva Trust"
        description="Building A Progressive & Uplifted Society — Empowering women, nurturing children, and transforming futures across Bihar, Navi Mumbai & Delhi."
      />

      {/* Main Story & Identity */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Mission & Identity</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Grassroots Action for Real Community Transformation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2021, Bapu Seva Trust began with a focused mandate: to ensure no child is deprived of education and no woman is left without financial self-reliance.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Today, our operations span rural & semi-urban communities in **Bihar**, **Navi Mumbai**, and **Delhi**, operating free health camps, after-school learning centers, and skill workshops.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">Registered NGO Trust</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">10,000+ Lives Uplifted</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">100% Public Transparency</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-medium text-foreground">50+ Active Volunteers</span>
                </div>
              </div>
            </div>

            {/* Banner Card with Image */}
            <div className="bg-card rounded-3xl overflow-hidden border border-border/80 shadow-lg">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={typeof heroImage === 'string' ? heroImage : heroImage.src}
                  alt="Bapu Seva Trust Community Gathering"
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                />
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Serving Bihar, Navi Mumbai & Delhi
                </span>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-foreground">Our Core Promise</h3>
                    <p className="text-xs text-muted-foreground">Empowering individuals to create lasting change.</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic text-sm leading-relaxed border-l-2 border-primary pl-4">
                  "When you educate a child and empower a woman, you uplift an entire generation."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars with Rich Images (Replacing Plain Icons) */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Foundation</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">Core Pillars of Our Work</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-3">
              Grounding our vision with real images of impact across Bihar, Navi Mumbai, and Delhi.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {corePillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="bg-card rounded-2xl overflow-hidden shadow-md border border-border/60 flex flex-col group animate-fade-up"
                style={{ animationDelay: `${0.12 * i}s` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={600}
                    height={400}
                  />
                  <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                    {pillar.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-4">{pillar.description}</p>
                  </div>
                  <div className="bg-muted/60 p-2.5 rounded-lg mt-auto">
                    <p className="text-[11px] font-semibold text-foreground text-center">{pillar.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members Section with "View All Team Members" Button */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Leadership & Team</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Dedicated leaders and community organizers driving change across Bihar, Navi Mumbai & Delhi.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            {visibleTeam.map((member, i) => (
              <div
                key={member.name}
                className="bg-card rounded-2xl overflow-hidden border border-border/80 shadow-md group hover:shadow-xl transition-all duration-300 animate-fade-up flex flex-col"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                    loading="lazy"
                    width={600}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm mb-1">
                      <MapPin className="w-3 h-3" /> {member.location}
                    </span>
                    <h3 className="font-display text-xl text-white font-bold">{member.name}</h3>
                    <p className="text-xs text-white/80 font-medium">{member.role}</p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between bg-card">
                  <p className="text-muted-foreground text-xs leading-relaxed mb-6">{member.bio}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <span className="text-xs font-semibold text-primary">Bapu Seva Trust</span>
                    <div className="flex items-center gap-2">
                      <Link href="/contact" aria-label={`Email ${member.name}`} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
                        <Mail className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* "View All Team Members" Interactive Button */}
          <div className="text-center">
            <button
              onClick={() => setShowAllTeam(!showAllTeam)}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              <span>{showAllTeam ? "Show Core Leadership" : "View All Team Members"}</span>
              {showAllTeam ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Timeline</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">Our Journey So Far</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {milestones.map((m) => (
              <div key={m.year} className="bg-card rounded-2xl p-6 border border-border/60 shadow-sm relative space-y-2">
                <span className="font-display text-3xl text-primary font-bold block">{m.year}</span>
                <h4 className="font-display text-lg text-foreground font-semibold">{m.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Want to Join Our Team?</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            We are always looking for passionate volunteers, organizers, and partners across Bihar, Navi Mumbai & Delhi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-involved" className="bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg">
              Become a Volunteer
            </Link>
            <Link href="/contact" className="border-2 border-primary-foreground/60 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
