'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Heart, Leaf, Lightbulb, Briefcase, HandHeart, MapPin, Quote } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import programsHealth from "@/assets/programs-health.jpg";
import programsEmpowerment from "@/assets/programs-empowerment.jpg";
import programsBridges from "@/assets/programs-bridges.jpg";

import { client } from "@/sanity/client";
import { PROGRAMS_QUERY, IMPACT_STORIES_QUERY, HOME_PAGE_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";


const programs = [
  {
    icon: BookOpen,
    title: "Education Program",
    description: "Running learning centers for school dropouts and distributing books & supplies across schools.",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    tag: "Education",
  },
  {
    icon: Heart,
    title: "Health & Awareness Camps",
    description: "Free medical checkups, disease awareness drives, hygiene & nutrition workshops in underserved areas.",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    tag: "Healthcare",
  },
  {
    icon: Leaf,
    title: "Environmental Sustainability",
    description: "Tree plantation drives, clean water awareness, plastic-free campaigns, and eco-friendly workshops.",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    tag: "Environment",
  },
  {
    icon: Lightbulb,
    title: "Women's Empowerment",
    tag: "Empowerment",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    description: "Skill development workshops, financial literacy classes, and self-reliance guidance for women.",
  },
  {
    icon: Briefcase,
    title: "Skill & Livelihood Training",
    description: "Vocational education and career mentorship equipping rural youth with market-ready job skills.",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    tag: "Livelihood",
  },
  {
    icon: HandHeart,
    title: "Emergency & Disaster Relief",
    description: "Essential food ration kits, warm clothing, and emergency aid during local crises and harsh seasons.",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    tag: "Relief",
  },
];

const impactStories = [
  {
    name: "Riya Kumari",
    age: 12,
    location: "Bihar",
    role: "Student Beneficiary",
    quote: "I had to drop out due to lack of books. Bapu Seva Trust gave me free study kits and tutoring. Now I rank 1st in my class!",
    impact: "Secured top class rank & mentorship",
  },
  {
    name: "Sunita Shinde",
    age: 34,
    location: "Navi Mumbai",
    role: "Women's Empowerment Member",
    quote: "The tailoring & micro-finance workshop helped me launch my small tailor business. Today I comfortably pay for my children's school fees.",
    impact: "Self-reliant entrepreneur",
  },
  {
    name: "Ram Prasad Verma",
    age: 71,
    location: "Delhi",
    role: "Environmental Community Lead",
    quote: "Participating in tree plantation drives with young school children brought joy and renewed purpose back to my life.",
    impact: "Planted 500+ trees in urban neighborhood",
  },
  {
    name: "Manoj Kumar",
    age: 19,
    location: "Bihar",
    role: "Skill Development Trainee",
    quote: "The free computer and vocational training center gave me the practical skills I needed to land my first full-time job.",
    impact: "Employed technical technician",
  },
];

export default function HomePage() {
  // Programs Carousel index
  const [progIndex, setProgIndex] = useState(0);

  // Stories Carousel index & Auto-rotate
  const [storyIndex, setStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic Sanity states
  const [sanityHome, setSanityHome] = useState(null);
  const [sanityPrograms, setSanityPrograms] = useState([]);
  const [sanityStories, setSanityStories] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [homeData, progData, storyData] = await Promise.all([
          client.fetch(HOME_PAGE_QUERY),
          client.fetch(PROGRAMS_QUERY),
          client.fetch(IMPACT_STORIES_QUERY),
        ]);
        if (homeData) setSanityHome(homeData);
        if (progData && progData.length > 0) setSanityPrograms(progData);
        if (storyData && storyData.length > 0) setSanityStories(storyData);
      } catch (err) {
        console.error("Sanity homepage fetch error:", err);
      }
    }
    loadData();
  }, []);

  const displayPrograms = sanityPrograms.length > 0
    ? sanityPrograms.map((p) => ({
        icon: BookOpen,
        title: p.title,
        description: p.shortDescription,
        image: p.mainImage ? urlFor(p.mainImage).url() : (typeof programsHealth === 'string' ? programsHealth : programsHealth.src),
        tag: p.tag || "Programs",
      }))
    : programs;

  const displayStories = sanityStories.length > 0
    ? sanityStories.map((s) => ({
        name: s.name || "Anonymous",
        age: s.age || 20,
        location: s.location || "Bihar",
        role: s.role || "Beneficiary",
        quote: s.quote || "",
        impact: s.impactOutcome || "",
      }))
    : impactStories;


  const prevProgram = () => {
    setProgIndex((prev) => (prev === 0 ? Math.max(0, displayPrograms.length - 3) : prev - 1));
  };

  const nextProgram = () => {
    setProgIndex((prev) => (prev >= displayPrograms.length - 3 ? 0 : prev + 1));
  };

  const prevStory = () => {
    setStoryIndex((prev) => (prev === 0 ? displayStories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setStoryIndex((prev) => (prev === displayStories.length - 1 ? 0 : prev + 1));
  };

  // Auto-move stories every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setStoryIndex((prev) => (prev === displayStories.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, displayStories]);


  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img
            src={typeof heroImage === 'string' ? heroImage : heroImage.src}
            alt="Bapu Seva Trust Volunteers with village children"
            className="w-full h-full object-cover scale-105 filter contrast-[1.05]"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto my-auto">
          <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-md border border-primary-foreground/30 px-4 py-1.5 rounded-full mb-6 animate-fade-up">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-primary-foreground font-medium tracking-wide text-xs sm:text-sm">
              Since 2021 · Serving Bihar, Navi Mumbai & Delhi
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Empowering Lives,<br />Building Hope
          </h1>

          <p className="text-primary-foreground/90 font-body text-lg sm:text-xl md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.4s" }}>
            "Building A Progressive & Uplifted Society Empowering women Nurturing children Transforming futures"
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <Link href="/donate" className="bg-primary text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-xl hover:scale-105">
              Donate Now
            </Link>
            <Link href="/get-involved" className="border-2 border-primary-foreground/80 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              Volunteer With Us
            </Link>
            <Link href="/programs" className="border-2 border-primary-foreground/80 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              Our Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Brief About */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">About Us</p>
          <h2 className="font-display text-3xl md:text-5xl text-foreground mb-6 text-balance">
            A Trust Built on Compassion & Action
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Bapu Seva Trust was established in 2021 with a dedicated vision to uplift underserved communities across Bihar, Navi Mumbai, and Delhi. We believe in grassroots action, complete transparency, and holistic empowerment.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10 text-left">
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <span className="text-primary font-display text-2xl font-bold block mb-1">Bihar</span>
              <p className="text-xs text-muted-foreground">Rural learning centers, book distribution & health checkups</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <span className="text-primary font-display text-2xl font-bold block mb-1">Navi Mumbai</span>
              <p className="text-xs text-muted-foreground">Women's skill workshops & community outreach</p>
            </div>
            <div className="bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
              <span className="text-primary font-display text-2xl font-bold block mb-1">Delhi</span>
              <p className="text-xs text-muted-foreground">Environmental sustainability, tree plantation & food aid</p>
            </div>
          </div>
          <Link href="/about" className="inline-block bg-secondary text-secondary-foreground px-8 py-3 rounded-xl font-semibold hover:bg-secondary/90 transition-colors shadow-md">
            Learn Our Full Story →
          </Link>
        </div>
      </section>

      {/* Programs Carousel Section with Navigation Arrows */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Our Work</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground">Explore Our Programs</h2>
            </div>
            {/* Nav Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevProgram}
                aria-label="Previous Programs"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextProgram}
                aria-label="Next Programs"
                className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {displayPrograms.slice(progIndex, progIndex + 3).map((p, i) => (
              <div
                key={p.title}
                className="bg-card rounded-2xl overflow-hidden group animate-fade-up flex flex-col h-full border border-border/60"
                style={{ boxShadow: "var(--shadow-card)", animationDelay: `${0.1 * i}s` }}
              >

                <div className="relative h-56 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {p.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <p.icon className="w-5 h-5 text-primary" />
                      <h3 className="font-display text-xl text-foreground">{p.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">{p.description}</p>
                  </div>
                  <Link href="/programs" className="text-primary text-sm font-semibold hover:underline mt-auto inline-flex items-center gap-1">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/programs" className="inline-block bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md">
              View All 6 Programs →
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stories Carousel (Auto Move) */}
      <section
        className="section-padding overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-3">Real Transformation</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-3">Stories of Change</h2>
            <p className="text-muted-foreground text-sm">Lives impacted across Bihar, Navi Mumbai & Delhi</p>
          </div>

          {/* Active Story Card */}
          {displayStories[storyIndex] && (
            <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-14 relative" style={{ boxShadow: "var(--shadow-warm)" }}>
              <Quote className="absolute top-8 right-8 w-16 h-16 text-primary/10" />

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 border-b border-border/60 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xl font-bold shadow-md">
                    {displayStories[storyIndex]?.name?.charAt(0) || "S"}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground">{displayStories[storyIndex].name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {displayStories[storyIndex].role} · Age {displayStories[storyIndex].age}
                    </p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 bg-secondary/15 text-secondary-foreground px-4 py-1.5 rounded-full text-xs font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{displayStories[storyIndex].location}</span>
                </div>
              </div>

              <blockquote className="font-display text-xl md:text-2xl text-foreground leading-relaxed italic mb-8">
                "{displayStories[storyIndex].quote}"
              </blockquote>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/40">
                <div className="bg-muted/60 px-4 py-2 rounded-xl inline-block">
                  <p className="text-xs font-semibold text-foreground">
                    Key Outcome: <span className="text-primary font-normal">{displayStories[storyIndex].impact}</span>
                  </p>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevStory}
                    aria-label="Previous Story"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-1.5">
                    {displayStories.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setStoryIndex(i)}
                        aria-label={`Go to story ${i + 1}`}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          storyIndex === i ? "w-7 bg-primary" : "w-2.5 bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextStory}
                    aria-label="Next Story"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}


          <div className="text-center mt-10">
            <Link href="/impact" className="text-primary font-semibold hover:underline">
              Read All Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-5xl mb-4">Be Part of the Future</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            Together we can empower women, nurture children, and transform lives across Bihar, Navi Mumbai & Delhi.
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
