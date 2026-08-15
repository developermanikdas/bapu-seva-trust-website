import Link from "next/link";
import { HandHeart, Building, GraduationCap, Search, Globe, HeartHandshake, Megaphone, CheckCircle } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";

export const metadata = {
  title: "Get Involved | Bapu Seva Trust",
  description: "Volunteer, partner, or intern with Bapu Seva Trust to make a difference across Bihar, Navi Mumbai & Delhi.",
};

const opportunities = [
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

const skillRoles = [
  {
    icon: Search,
    title: "Research Department",
    description: "Conduct field surveys, data analysis, program evaluation, and baseline studies to measure project impact.",
  },
  {
    icon: Globe,
    title: "Social Media & Outreach",
    description: "Create engaging digital content, capture impact stories, and grow our online community.",
  },
  {
    icon: HeartHandshake,
    title: "Fundraising and CSR / FCRA",
    description: "Lead corporate CSR proposals, FCRA compliance, donor stewardship, and sustainable funding grants.",
  },
  {
    icon: Megaphone,
    title: "Public Relations & Operational Development",
    description: "Manage media communications, press relations, field logistics, and operational program scaling.",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        subtitle="Join The Movement"
        title="Get Involved"
        description="There are many ways to contribute — whether you give your time, specialized skills, or resources across Bihar, Navi Mumbai & Delhi."
      />

      {/* Main Opportunities */}
      <section className="section-padding">
        <div className="container-narrow space-y-10">
          {opportunities.map((opp, i) => (
            <div
              key={opp.title}
              className="bg-card rounded-2xl p-8 md:p-10 border border-border/80 shadow-md animate-fade-up"
              style={{ animationDelay: `${0.15 * i}s` }}
            >
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <opp.icon className="w-12 h-12 text-primary mb-4" />
                  <h2 className="font-display text-2xl text-foreground font-semibold mb-3">{opp.title}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{opp.description}</p>
                  <Link
                    href="/contact"
                    className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-md"
                  >
                    {opp.cta} →
                  </Link>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">What You'll Do</h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {opp.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-xs text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skill-Based Roles */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Use Your Specialized Skills</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">Skill-Based Roles</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-3">
              Have a specific professional skill? Help us build capacity across our departments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillRoles.map((role) => (
              <div
                key={role.title}
                className="bg-card rounded-2xl p-6 text-center border border-border/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <role.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-lg text-foreground font-semibold mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-6">{role.description}</p>
                </div>
                <Link href="/contact" className="text-primary text-xs font-semibold hover:underline mt-auto">
                  Apply for Role →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Ready to Make a Difference?</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            Fill out our contact form and our team in Bihar, Navi Mumbai or Delhi will connect with you.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-primary-foreground text-primary px-10 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </>
  );
}
