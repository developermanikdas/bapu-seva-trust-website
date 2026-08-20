'use client';

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { BookOpen, Users, Heart, TrendingUp, MapPin, Play, ChevronLeft, ChevronRight, Globe, Shield, Sparkles, Award, CheckCircle, Handshake, Scale, DollarSign, Leaf, Map } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";
import heroImage from "@/assets/hero-image.jpg";
import programsHealth from "@/assets/programs-health.jpg";
import programsEmpowerment from "@/assets/programs-empowerment.jpg";
import programsBridges from "@/assets/programs-bridges.jpg";

import { client } from "@/sanity/client";
import { IMPACT_STORIES_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";


const stats = [
  { icon: BookOpen, number: "10,000+", label: "Books Distributed" },
  { icon: Users, number: "50+", label: "Active Volunteers" },
  { icon: Heart, number: "20+", label: "Health & Green Camps" },
  { icon: TrendingUp, number: "500+", label: "Students & Women Empowered" },
];

// Footprint States across India (Matches Inspiration Layout)
const footprintStates = [
  {
    id: "bihar",
    state: "Bihar",
    regionTag: "Rural Education & Health",
    headline: "Empowering Rural Classrooms & Health Camps",
    description: "Here in Bihar, our beliefs center around grassroots learning and health access for all. We run free evening learning centers for out-of-school dropouts, distribute textbooks across government schools, and organize free village medical checkups.",
    stats: [
      { number: "10,000+", label: "Books & Kits Distributed" },
      { number: "15+", label: "Villages Active" },
      { number: "500+", label: "Children Mentored" },
    ],
  },
  {
    id: "navi-mumbai",
    state: "Navi Mumbai",
    regionTag: "Women's Empowerment",
    headline: "Women's Vocational Skill & Financial Literacy",
    description: "In Navi Mumbai, Bapu Seva Trust empowers women with practical tailoring skills, micro-banking literacy, and digital tools — transforming homemakers into self-reliant entrepreneurs capable of supporting their children's education.",
    stats: [
      { number: "100+", label: "Women Trained" },
      { number: "5", label: "Skill Batches" },
      { number: "30+", label: "Micro-Businesses Started" },
    ],
  },
  {
    id: "delhi",
    state: "Delhi",
    regionTag: "Environmental Sustainability",
    headline: "Green Urban Drives & School Eco-Clubs",
    description: "Driving climate action in Delhi through urban tree plantation campaigns, plastic reduction awareness, clean water conservation, and establishing school eco-clubs that engage students in environmental stewardship.",
    stats: [
      { number: "5,000+", label: "Trees Planted" },
      { number: "10+", label: "School Eco-Clubs" },
      { number: "20+", label: "Green Campaigns" },
    ],
  },
  {
    id: "uttarakhand",
    state: "Uttarakhand",
    regionTag: "Mountain Relief & Aid",
    headline: "Remote Hill Relief & Winter Assistance",
    description: "Providing essential relief kits, warm winter clothing, clean water purification, and emergency aid to remote mountain villages during harsh weather conditions and local crises in Uttarakhand.",
    stats: [
      { number: "1,200+", label: "Relief Kits Delivered" },
      { number: "8", label: "Remote Hill Villages" },
      { number: "100%", label: "Direct Support" },
    ],
  },
];

const sdgGoals = [
  {
    number: "SDG 3",
    title: "Good Health & Well-being",
    color: "bg-emerald-600",
    description: "Free community medical checkup camps, hygiene education, AIDS & disease awareness, and nutritional support in rural & urban centers.",
  },
  {
    number: "SDG 4",
    title: "Quality Education",
    color: "bg-red-600",
    description: "Providing free study materials, learning centers for out-of-school dropouts, and after-school tutoring for first-generation students.",
  },
  {
    number: "SDG 5",
    title: "Gender Equality",
    color: "bg-amber-500",
    description: "Empowering women with vocational skill workshops, financial independence classes, legal awareness, and micro-business guidance.",
  },
  {
    number: "SDG 8",
    title: "Decent Work & Economic Growth",
    color: "bg-rose-700",
    description: "Fostering market-ready technical skills, youth computer literacy, and micro-entrepreneurship opportunities across communities.",
  },
  {
    number: "SDG 10",
    title: "Reduced Inequalities",
    color: "bg-fuchsia-600",
    description: "Bridging social and economic divides by uplifting marginalized families, rural children, and women across Bihar, Navi Mumbai, Delhi & Uttarakhand.",
  },
  {
    number: "SDG 17",
    title: "Partnerships for the Goals",
    color: "bg-sky-700",
    description: "Collaborating with local government schools, community bodies, volunteers, and corporate partners to scale sustainable impact.",
  },
];

// Video Success Stories
const videoStories = [
  {
    id: 1,
    title: "Riya's Journey: From School Dropout to Top Ranker",
    person: "Riya Kumari",
    location: "Bihar",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: typeof heroImage === 'string' ? heroImage : heroImage.src,
    caption: "See how free study materials and evening tutoring transformed Riya's academic future in rural Bihar.",
  },
  {
    id: 2,
    title: "Sunita's Story: Building a Tailoring Business",
    person: "Sunita Shinde",
    location: "Navi Mumbai",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    caption: "Watch Sunita share how women's skill workshops empowered her to achieve financial independence.",
  },
  {
    id: 3,
    title: "Green Future: 5,000 Trees Planted in Urban Centers",
    person: "Delhi Eco-Club",
    location: "Delhi",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    caption: "Highlights from our environmental sustainability drives engaging students and local residents.",
  },
  {
    id: 4,
    title: "Free Village Health Camp Impact",
    person: "Medical Volunteers",
    location: "Bihar",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    caption: "Providing free health checkups, medicine, and nutritional guidance to over 500 rural villagers.",
  },
];

export default function ImpactPage() {
  const [activeStateIndex, setActiveStateIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoScrollRef = useRef(null);

  // Auto-rotate state footprint every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveStateIndex((prev) => (prev + 1) % footprintStates.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentState = footprintStates[activeStateIndex];

  const scrollVideoLeft = () => {
    if (videoScrollRef.current) {
      videoScrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollVideoRight = () => {
    if (videoScrollRef.current) {
      videoScrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  return (
    <>
      <PageHero
        subtitle="Transforming Lives"
        title="Our Impact"
        description="Measurable progress, real stories, and sustainable development across Bihar, Navi Mumbai, Delhi & Uttarakhand."
      />

      {/* Impact Stats */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-card rounded-2xl p-8 text-center border border-border/70 shadow-md animate-fade-up"
                style={{ animationDelay: `${0.12 * i}s` }}
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-display text-3xl sm:text-4xl text-foreground font-bold mb-1">{stat.number}</p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSPIRED SECTION: "Our Footprint Across India" (High Contrast State Carousel Layout) */}
      <section
        className="section-padding bg-secondary text-white overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-extrabold mb-3">
              Our Footprint Across India
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto">
              The far-reaching impact of Bapu Seva Trust's work reflected through real regional metrics.
            </p>
          </div>

          {/* Interactive State Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {footprintStates.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStateIndex(idx)}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  activeStateIndex === idx
                    ? "bg-secondary text-secondary-foreground shadow-lg scale-105"
                    : "bg-white/10 text-white/90 hover:bg-white/20 border border-white/20"
                }`}
              >
                {st.state}
              </button>
            ))}
          </div>

          {/* Main Side-by-Side Container (No Text Overlaid On Images) */}
          <div className="grid md:grid-cols-12 gap-8 items-center bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-700 shadow-2xl backdrop-blur-md">
            
            {/* LEFT COLUMN: Clean Vector India Map Visual with Highlighted State */}
            <div className="md:col-span-5 flex flex-col items-center justify-center space-y-6">
              <div className="relative w-full max-w-xs sm:max-w-sm h-72 sm:h-80 flex items-center justify-center bg-slate-950/80 rounded-2xl p-4 border border-slate-700/80 shadow-inner">
                
                {/* Clean SVG Vector Map of India showing highlighted states */}
                <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-md">
                  {/* Outline Map Path Simulation */}
                  <path
                    d="M90 20 L110 25 L125 35 L140 40 L135 60 L145 75 L165 80 L180 90 L160 100 L140 105 L130 120 L115 135 L120 160 L100 190 L85 200 L75 180 L70 150 L60 130 L45 110 L35 90 L50 70 L65 50 L80 30 Z"
                    className="fill-slate-800/90 stroke-slate-600 stroke-[1.5]"
                  />
                  
                  {/* Uttarakhand North */}
                  <path
                    d="M90 20 L105 25 L115 35 L105 45 L95 40 L85 30 Z"
                    className={currentState.id === "uttarakhand" ? "fill-rose-400 stroke-white stroke-2 animate-pulse" : "fill-emerald-500/40 stroke-slate-600"}
                  />
                  
                  {/* Delhi / NCR */}
                  <circle
                    cx="95"
                    cy="60"
                    r="6"
                    className={currentState.id === "delhi" ? "fill-sky-400 stroke-white stroke-2 animate-ping" : "fill-sky-500/60 stroke-white"}
                  />

                  {/* Bihar */}
                  <path
                    d="M120 70 L145 72 L140 88 L118 85 Z"
                    className={currentState.id === "bihar" ? "fill-amber-400 stroke-white stroke-2 animate-pulse" : "fill-emerald-500/60 stroke-slate-600"}
                  />

                  {/* Maharashtra / Navi Mumbai */}
                  <path
                    d="M60 115 L95 118 L90 145 L55 135 Z"
                    className={currentState.id === "navi-mumbai" ? "fill-emerald-400 stroke-white stroke-2 animate-pulse" : "fill-emerald-500/50 stroke-slate-600"}
                  />

                  {/* Pin Markers */}
                  <circle cx="130" cy="78" r="4" className={currentState.id === "bihar" ? "fill-amber-300 stroke-white" : "fill-white/40"} />
                  <circle cx="75" cy="128" r="4" className={currentState.id === "navi-mumbai" ? "fill-emerald-300 stroke-white" : "fill-white/40"} />
                  <circle cx="95" cy="60" r="4" className={currentState.id === "delhi" ? "fill-sky-300 stroke-white" : "fill-white/40"} />
                  <circle cx="100" cy="35" r="4" className={currentState.id === "uttarakhand" ? "fill-rose-300 stroke-white" : "fill-white/40"} />
                </svg>

                <span className="absolute bottom-3 left-3 text-xs text-white font-bold bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
                  State: <strong className="text-secondary font-extrabold uppercase ml-1">{currentState.state}</strong>
                </span>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                {footprintStates.map((st, i) => (
                  <button
                    key={st.id}
                    onClick={() => setActiveStateIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      activeStateIndex === i ? "w-8 bg-secondary" : "w-2.5 bg-white/30"
                    }`}
                    aria-label={`Go to ${st.state}`}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: High-Contrast Content & Statistics Cards */}
            <div className="md:col-span-7 space-y-6">
              <div className="bg-slate-900/80 rounded-2xl p-6 sm:p-8 border border-slate-700/80 space-y-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="bg-secondary text-secondary-foreground text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    {currentState.regionTag}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-white font-extrabold leading-tight">
                  {currentState.headline}
                </h3>

                <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-normal">
                  {currentState.description}
                </p>

                {/* High-Contrast Impact Statistics Cards (Crisp Visibility) */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/80">
                  {currentState.stats.map((st, i) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-700 text-center shadow-inner">
                      <p className="font-display text-xl sm:text-3xl text-amber-300 font-extrabold mb-1 drop-shadow-sm">
                        {st.number}
                      </p>
                      <p className="text-xs sm:text-sm text-white font-bold leading-snug">
                        {st.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sustainable Development Goals (SDGs) Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
              <Globe className="w-3.5 h-3.5" /> UN Alignment
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">
              Sustainable Development Goals (SDGs)
            </h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
              Our initiatives directly contribute to the United Nations Sustainable Development Goals for holistic community progress.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sdgGoals.map((sdg) => (
              <div
                key={sdg.number}
                className="bg-card rounded-2xl p-6 border border-border/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm ${sdg.color}`}>
                      {sdg.number}
                    </span>
                    <Sparkles className="w-4 h-4 text-muted-foreground/60" />
                  </div>
                  <h3 className="font-display text-xl text-foreground font-semibold mb-2">{sdg.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{sdg.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Horizontal Scrollable Video Stories Section */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Video Testimonials</p>
              <h2 className="font-display text-3xl md:text-4xl text-foreground">Video Success Stories</h2>
              <p className="text-xs text-muted-foreground mt-1">Scroll horizontally to watch short video stories from the field.</p>
            </div>

            {/* Scroll Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollVideoLeft}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollVideoRight}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Video Cards Container */}
          <div
            ref={videoScrollRef}
            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none" }}
          >
            {videoStories.map((v) => (
              <div
                key={v.id}
                className="w-[310px] sm:w-[360px] shrink-0 snap-start bg-card rounded-2xl overflow-hidden border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* HTML5 Video Element with Controls & Poster Placeholder */}
                <div className="relative h-52 bg-black overflow-hidden group">
                  <video
                    controls
                    poster={v.poster}
                    preload="metadata"
                    className="w-full h-full object-cover"
                  >
                    <source src={v.videoUrl} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-md">
                    {v.location}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg text-foreground font-semibold mb-2 leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      "{v.caption}"
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs font-semibold text-primary">{v.person}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Video Story</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Be Part of the Next Success Story</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            Your support transforms real lives across Bihar, Navi Mumbai, Delhi & Uttarakhand. Help us expand our reach.
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
