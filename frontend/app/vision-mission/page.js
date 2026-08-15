import Link from "next/link";
import { Eye, Target, Compass, Sparkles, GraduationCap, HeartHandshake, Building2 } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";

export const metadata = {
  title: "Vision & Mission | Bapu Seva Trust",
  description: "Explore the vision, mission, and strategic goals driving Bapu Seva Trust forward.",
};

const missionPillars = [
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

const goals = [
  "Reach 25,000+ children with quality learning resources by 2027",
  "Train and deploy 200+ skilled volunteers across Bihar & Delhi",
  "Conduct 100+ free health & awareness camps annually",
  "Launch 10 permanent learning centers in underserved districts",
  "Empower 5,000+ women through skill & livelihood programs",
];

export default function VisionMissionPage() {
  return (
    <>
      <PageHero
        subtitle="Our Purpose"
        title="Vision & Mission"
        description="The guiding principles that shape everything we do at Bapu Seva Trust — a clear roadmap for the change we want to create in the world."
      />

      {/* Vision */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Vision</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6 leading-tight">
                A society where no one is left behind.
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                  We envision a world where every child — regardless of where they were born or the circumstances of their family — has equal access to quality education, healthcare, and opportunity.
                </p>
                <p>
                  A society where women are empowered with the skills and confidence to lead, where elders are honored and connected to the next generation, and where compassion is the foundation of every community.
                </p>
                <p>
                  We dream of villages and neighborhoods where dignity is universal, learning is lifelong, and hope is never out of reach.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-3xl p-10 md:p-12 relative overflow-hidden" style={{ boxShadow: "var(--shadow-warm)" }}>
              <Eye className="w-16 h-16 text-primary mb-6" />
              <blockquote className="font-display text-2xl md:text-3xl text-foreground italic leading-snug mb-6">
                "Every child deserves a future shaped by opportunity, not limited by circumstance."
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-1 h-12 bg-primary rounded-full" />
                <div>
                  <p className="font-semibold text-foreground">Bapu Seva Trust</p>
                  <p className="text-sm text-muted-foreground">Founding Belief, 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Mission</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6">
              Three Pillars. One Purpose.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our mission is simple yet powerful — to uplift underserved communities through three interconnected pillars that together create lasting transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionPillars.map((pillar, i) => (
              <div
                key={pillar.title}
                className="bg-card rounded-2xl p-8 animate-fade-up"
                style={{ boxShadow: "var(--shadow-card)", animationDelay: `${0.15 * i}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-6">
                  <pillar.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl p-10 md:p-16 text-center" style={{ boxShadow: "var(--shadow-card)" }}>
            <Target className="w-14 h-14 text-primary mx-auto mb-6" />
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-4">Mission Statement</p>
            <p className="font-display text-2xl md:text-3xl text-foreground leading-snug">
              To provide quality education, healthcare, and empowerment opportunities to underserved communities across Bihar & Delhi — building self-reliant villages and neighborhoods where every individual can thrive with dignity.
            </p>
          </div>
        </div>
      </section>

      {/* Long-Term Goals */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Compass className="w-12 h-12 text-primary mb-6" />
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Looking Ahead</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-6">
                Our Long-Term Goals
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We measure our progress by the lives we touch. These are the bold targets we have set for ourselves over the coming years — milestones that will mark our journey toward our vision.
              </p>
            </div>
            <ul className="space-y-4">
              {goals.map((goal, i) => (
                <li
                  key={i}
                  className="flex items-start gap-4 bg-card rounded-xl p-5"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 font-display text-primary text-sm">
                    {i + 1}
                  </div>
                  <p className="text-foreground leading-relaxed pt-0.5">{goal}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-90" />
          <h2 className="font-display text-3xl md:text-5xl mb-4">Help Us Bring This Vision to Life</h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
            Big visions require many hands. Join us as a donor, volunteer, or partner — and help shape a more compassionate tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg">
              Support Our Mission
            </Link>
            <Link href="/get-involved" className="border-2 border-primary-foreground/60 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
