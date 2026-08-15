'use client';

import { useState, useRef, useEffect } from "react";

import Link from "next/link";
import { BookOpen, Heart, Leaf, Lightbulb, Briefcase, HandHeart, ChevronLeft, ChevronRight, MapPin, Calendar, CheckCircle, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";
import programsHealth from "@/assets/programs-health.jpg";
import programsEmpowerment from "@/assets/programs-empowerment.jpg";
import programsBridges from "@/assets/programs-bridges.jpg";
import heroImage from "@/assets/hero-image.jpg";

import { client } from "@/sanity/client";
import { PROGRAMS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";

const categories = ["All", "Education", "Healthcare", "Environment", "Empowerment", "Livelihood"];


// Current & Upcoming Programs dataset
const currentPrograms = [
  {
    id: 1,
    title: "10,000 Saplings Green Drive 2025",
    category: "Environment",
    status: "Ongoing",
    statusColor: "bg-emerald-500 text-white",
    location: "Bihar & Navi Mumbai",
    date: "Feb 2025 - Apr 2025",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    description: "Planting native trees in government schools and community gardens to build green zones and combat pollution.",
    progress: 75,
    progressText: "7,500 / 10,000 Saplings Planted",
  },
  {
    id: 2,
    title: "Free Rural Health Checkup & Dental Camp",
    category: "Healthcare",
    status: "Upcoming",
    statusColor: "bg-amber-500 text-white",
    location: "Rural Bihar",
    date: "March 10 - 15, 2025",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    description: "Multi-specialty free health checkups, blood tests, eye examinations, and free medicine distribution.",
    progress: 90,
    progressText: "450 / 500 Screenings Registered",
  },
  {
    id: 3,
    title: "Women's Micro-Skills & Tailoring Batch",
    category: "Empowerment",
    status: "Ongoing",
    statusColor: "bg-emerald-500 text-white",
    location: "Navi Mumbai",
    date: "Jan 2025 - Mar 2025",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    description: "3-month intensive tailoring, financial literacy, and digital micro-business training for women.",
    progress: 60,
    progressText: "30 / 50 Women Enrolled",
  },
  {
    id: 4,
    title: "After-School Learning & Book Drive",
    category: "Education",
    status: "Ongoing",
    statusColor: "bg-emerald-500 text-white",
    location: "Bihar & Delhi",
    date: "Year-Round 2025",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    description: "Free evening tutoring centers and textbook kits for first-generation school dropouts.",
    progress: 85,
    progressText: "8,500 / 10,000 Books Distributed",
  },
  {
    id: 5,
    title: "Youth Digital Literacy & Computer Center",
    category: "Livelihood",
    status: "Upcoming",
    statusColor: "bg-amber-500 text-white",
    location: "Delhi",
    date: "April 2025 Onwards",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    description: "Free basic computer skills, coding fundamentals, and resume-building workshops for job-seeking youth.",
    progress: 40,
    progressText: "20 / 50 Seats Reserved",
  },
  {
    id: 6,
    title: "Clean Water & Eco-Sanitation Drive",
    category: "Environment",
    status: "Upcoming",
    statusColor: "bg-amber-500 text-white",
    location: "Navi Mumbai & Bihar",
    date: "May 2025",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    description: "Installing clean drinking water filters and conducting community hygiene & sanitation workshops.",
    progress: 50,
    progressText: "₹50,000 / ₹1,00,000 Raised",
  },
];

// Main Core Programs
const corePrograms = [
  {
    icon: BookOpen,
    title: "Education Program",
    tag: "Education",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    description: "Running learning centers for school dropouts and distributing books & stationery to government schools.",
    details: [
      "Free learning centers for out-of-school children",
      "Book distribution drives in government schools across Bihar & Delhi",
      "Mentorship programs connecting students with educated volunteers",
      "After-school tutoring and homework help for first-generation learners",
      "School supplies and uniform support for underprivileged students",
    ],
    impact: "10,000+ books distributed, 500+ students mentored",
  },
  {
    icon: Heart,
    title: "Health & Awareness Camps",
    tag: "Healthcare",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    description: "Community health checkups, disease awareness programs, hygiene & nutrition workshops.",
    details: [
      "Free community health checkup camps in rural areas",
      "AIDS, anemia, and disease awareness programs",
      "Hygiene and sanitation education workshops",
      "Nutrition guidance for mothers and children",
      "Mental health awareness and counseling support",
    ],
    impact: "20+ community camps organized, 2,000+ health screenings",
  },
  {
    icon: Leaf,
    title: "Environmental Sustainability",
    tag: "Environment",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    description: "Tree plantation drives, clean water awareness, plastic-free campaigns, and eco-friendly community workshops.",
    details: [
      "Tree plantation and urban greening drives in rural & urban centers",
      "Plastic waste reduction and eco-recycling workshops",
      "Clean water conservation and sanitation awareness programs",
      "School eco-club initiatives engaging children in nature protection",
      "Solar energy and sustainable farming guidance for rural families",
    ],
    impact: "5,000+ saplings planted, 15+ clean green drives",
  },
  {
    icon: Lightbulb,
    title: "Women's Empowerment",
    tag: "Empowerment",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    description: "Skill development, financial literacy, and awareness programs for women in underserved communities.",
    details: [
      "Vocational training and tailoring skill workshops",
      "Financial literacy and savings group programs",
      "Legal awareness and rights education",
      "Self-reliance and entrepreneurship guidance",
      "Micro-business support and market linkage",
    ],
    impact: "100+ women trained, 10+ skill workshops",
  },
];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sanityPrograms, setSanityPrograms] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const data = await client.fetch(PROGRAMS_QUERY);
        if (data && data.length > 0) {
          setSanityPrograms(data);
        }
      } catch (err) {
        console.error("Sanity fetch error:", err);
      }
    }
    loadPrograms();
  }, []);

  const displayCurrentPrograms = sanityPrograms.length > 0
    ? sanityPrograms.map((p, index) => ({
        id: p._id || index,
        title: p.title,
        category: p.tag || "Education",
        status: p.featured ? "Ongoing" : "Upcoming",
        statusColor: p.featured ? "bg-emerald-500 text-white" : "bg-amber-500 text-white",
        location: p.location || "Bihar, Navi Mumbai & Delhi",
        date: "Year-Round 2025",
        image: p.mainImage ? urlFor(p.mainImage).url() : (typeof heroImage === 'string' ? heroImage : heroImage.src),
        description: p.shortDescription,
        progress: 80,
        progressText: p.beneficiariesCount ? `${p.beneficiariesCount} Reached` : "Active Drive",
      }))
    : currentPrograms;

  const filteredCurrentPrograms = displayCurrentPrograms.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <>
      <PageHero
        subtitle="Impact Initiatives"
        title="Our Programs"
        description="Empowering communities across Bihar, Navi Mumbai & Delhi through Education, Healthcare, Environmental Sustainability, and Women's Empowerment."
      />

      {/* Current & Upcoming Programs Section (Horizontal Scroll + Category Filters) */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Active & Future Drives
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">Current & Upcoming Programs</h2>
            </div>

            {/* Scroll Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollLeft}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {filteredCurrentPrograms.length === 0 ? (
              <div className="w-full text-center py-12 bg-card rounded-2xl border border-border">
                <p className="text-muted-foreground text-sm">No current programs found in this category.</p>
              </div>
            ) : (
              filteredCurrentPrograms.map((prog) => (
                <div
                  key={prog.id}
                  className="w-[300px] sm:w-[340px] shrink-0 snap-start bg-card rounded-2xl overflow-hidden border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={prog.image}
                        alt={prog.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={600}
                        height={400}
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-md ${prog.statusColor}`}>
                          {prog.status}
                        </span>
                      </div>
                      <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-secondary" /> {prog.location}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        <span>{prog.date}</span>
                      </div>
                      <h3 className="font-display text-lg text-foreground font-semibold mb-2 leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-4 line-clamp-3">
                        {prog.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="space-y-1.5 mb-4">
                        <div className="flex justify-between text-[11px] font-medium">
                          <span className="text-foreground">Progress</span>
                          <span className="text-primary font-bold">{prog.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${prog.progress}%` }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{prog.progressText}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-0">
                    <Link
                      href="/contact"
                      className="block text-center bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground py-2.5 rounded-xl text-xs font-semibold transition-colors"
                    >
                      Support / Join Drive →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Main Programs List */}
      <section className="section-padding">
        <div className="container-narrow space-y-20">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Core Pillars</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">Our 4 Main Program Pillars</h2>
          </div>

          {corePrograms.map((program, i) => (
            <div
              key={program.title}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border/80">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-72 md:h-96 object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {program.tag}
                  </span>
                </div>
              </div>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <program.icon className="w-10 h-10 text-primary mb-4" />
                <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">{program.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{program.description}</p>
                <ul className="space-y-3 mb-6">
                  {program.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="text-primary font-bold mt-0.5 shrink-0">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-muted/60 rounded-xl px-5 py-3 inline-block border border-border/60">
                  <p className="text-sm font-semibold text-foreground">{program.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Want to Support a Program?</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            Your contribution directly fuels these programs across Bihar, Navi Mumbai & Delhi. Donate, volunteer, or partner with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate" className="bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg">
              Donate Now
            </Link>
            <Link href="/get-involved" className="border-2 border-primary-foreground/60 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              Join As Volunteer
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
