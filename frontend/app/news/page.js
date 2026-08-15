'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, ArrowRight, MapPin, X, Sparkles } from "lucide-react";

import PageHero from "@/components/PageHero.jsx";
import heroImage from "@/assets/hero-image.jpg";
import programsHealth from "@/assets/programs-health.jpg";
import programsEmpowerment from "@/assets/programs-empowerment.jpg";
import programsBridges from "@/assets/programs-bridges.jpg";

import { client } from "@/sanity/client";
import { NEWS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";


const ongoingCampaigns = [
  {
    id: "camp-1",
    title: "Every child deserves to learn. Help them thrive.",
    category: "Ongoing Campaigns",
    location: "Bihar & Delhi",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    excerpt: "Education empowers every future. Donate to Bapu Seva Trust to support quality learning, textbooks, and free evening tutoring for out-of-school dropouts.",
    cta: "Support Campaign",
  },
  {
    id: "camp-2",
    title: "Join us in empowering women toward self-reliance.",
    category: "Ongoing Campaigns",
    location: "Navi Mumbai",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    excerpt: "Our tailoring and financial literacy batches in Navi Mumbai equip women with micro-skills to launch small businesses and educate their children.",
    cta: "Support Campaign",
  },
  {
    id: "camp-3",
    title: "10,000 Saplings Drive: Let's build green communities.",
    category: "Ongoing Campaigns",
    location: "Delhi & Bihar",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    excerpt: "Join our environmental sustainability campaign planting trees, conserving clean water, and establishing school eco-clubs across urban and rural centers.",
    cta: "Support Campaign",
  },
];

const allNewsPosts = [
  {
    id: "post-1",
    title: "Bapu Seva Trust Volunteers Clean School Premises & Plant Trees",
    date: "March 15, 2025",
    category: "Event Reports",
    image: typeof programsBridges === 'string' ? programsBridges : programsBridges.src,
    excerpt: "Our volunteers came together for a school beautification and environmental drive in rural Bihar, cleaning classrooms, painting walls, and planting 200+ trees on campus.",
  },
  {
    id: "post-2",
    title: "Why Girls' Education Matters — And What We're Doing About It",
    date: "February 28, 2025",
    category: "Awareness",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    excerpt: "Educating girls is one of the most powerful tools for development. Here's how Bapu Seva Trust is working to bridge the gender gap in education across Bihar & Navi Mumbai.",
  },
  {
    id: "post-3",
    title: "Health Camp Success: 300+ Medical Screenings in One Day",
    date: "February 10, 2025",
    category: "Event Reports",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    excerpt: "Our biggest health camp yet brought together doctors, nurses, and volunteers to provide free checkups, eye exams, and medicine to over 300 community members.",
  },
  {
    id: "post-4",
    title: "Book Distribution Drive Reaches 5 New Government Schools",
    date: "January 20, 2025",
    category: "Success Stories",
    image: typeof heroImage === 'string' ? heroImage : heroImage.src,
    excerpt: "We expanded our book distribution program to five new government schools in Bihar and Delhi, benefiting 800+ students with free textbooks and stationery.",
  },
  {
    id: "post-5",
    title: "Women's Empowerment Workshop: Skills for Financial Independence",
    date: "January 5, 2025",
    category: "Success Stories",
    image: typeof programsEmpowerment === 'string' ? programsEmpowerment : programsEmpowerment.src,
    excerpt: "Our latest workshop taught 30 women in Navi Mumbai practical tailoring skills, micro-banking, and digital tools — empowering them toward economic independence.",
  },
  {
    id: "post-6",
    title: "Year in Review: 2024 Impact & Transparency Highlights",
    date: "December 20, 2024",
    category: "Reports",
    image: typeof programsHealth === 'string' ? programsHealth : programsHealth.src,
    excerpt: "2024 was our most impactful year yet. From 10,000+ books distributed to 20+ health & green camps organized, here are the highlights of what we achieved together.",
  },
];

const categories = [
  "All",
  "Ongoing Campaigns",
  "Event Reports",
  "Awareness",
  "Success Stories",
  "Reports",
];

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sanityNews, setSanityNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await client.fetch(NEWS_QUERY);
        if (data && data.length > 0) {
          setSanityNews(data);
        }
      } catch (err) {
        console.error("Sanity news fetch error:", err);
      }
    }
    loadNews();
  }, []);

  const displayPosts = sanityNews.length > 0
    ? sanityNews.map((n, i) => ({
        id: n._id || `sanity-${i}`,
        title: n.title,
        date: n.publishedAt ? new Date(n.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recent",
        category: n.category || "Field Update",
        image: n.mainImage ? urlFor(n.mainImage).url() : (typeof heroImage === 'string' ? heroImage : heroImage.src),
        excerpt: n.excerpt,
      }))
    : allNewsPosts;

  const filterPost = (item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  };

  const filteredCampaigns = ongoingCampaigns.filter(filterPost);
  const filteredPosts = displayPosts.filter(filterPost);


  return (
    <>
      <PageHero
        subtitle="News & Updates"
        title="Campaigns, News & Stories"
        description="Stay informed on active campaigns, ground reports, success stories, and impact updates across Bihar, Navi Mumbai & Delhi."
      />

      {/* Sleek Search & Category Filter Section (No Scrollbars, Fully Responsive) */}
      <section className="bg-card border-b border-border py-8">
        <div className="container-narrow space-y-6">
          {/* Centered Search Bar */}
          <div className="relative max-w-xl mx-auto w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search active campaigns, news, articles, or keywords..."
              className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/80 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Clean Wrap Filter Pills (No Scrollbars) */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 border border-border/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ONGOING CAMPAIGNS WHICH NEED YOUR SUPPORT Section (Theme Cohesive Colors) */}
      {(selectedCategory === "All" || selectedCategory === "Ongoing Campaigns") &&
        filteredCampaigns.length > 0 && (
          <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
            <div className="container-narrow">
              <div className="text-center mb-12">
                <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block animate-fade-up">
                  Active Causes
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-bold text-balance">
                  Ongoing Campaigns Which Need Your Support
                </h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-3">
                  Your direct support empowers children, women, and eco-systems today.
                </p>
              </div>

              {/* Inspiration Campaign Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {filteredCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    className="bg-card rounded-3xl overflow-hidden border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-60 overflow-hidden bg-muted">
                        <img
                          src={camp.image}
                          alt={camp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={600}
                          height={400}
                        />
                        <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-md">
                          Ongoing Campaign
                        </span>
                        <span className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-secondary" /> {camp.location}
                        </span>
                      </div>

                      <div className="p-7">
                        <h3 className="font-display text-xl sm:text-2xl text-foreground font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                          {camp.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6">
                          {camp.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-7 pb-7 pt-0">
                      <Link
                        href="/donate"
                        className="block text-center bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl text-sm hover:opacity-90 transition-opacity shadow-md hover:scale-[1.02]"
                      >
                        {camp.cta} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Latest News & Articles Grid */}
      {(selectedCategory === "All" || selectedCategory !== "Ongoing Campaigns") && (
        <section className="section-padding">
          <div className="container-narrow">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Ground Reports</p>
              <h2 className="font-display text-3xl md:text-5xl text-foreground">Latest News & Event Reports</h2>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border max-w-xl mx-auto">
                <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-display text-lg text-foreground mb-1">No articles found</p>
                <p className="text-xs text-muted-foreground mb-4">
                  No matching posts found for "{searchQuery}". Try clearing search or selecting another category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-primary font-semibold text-xs hover:underline"
                >
                  Clear Search & Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {filteredPosts.map((post, i) => (
                  <article
                    key={post.id}
                    className="bg-card rounded-2xl overflow-hidden border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-up flex flex-col justify-between group"
                    style={{ animationDelay: `${0.1 * i}s` }}
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-muted">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={600}
                          height={400}
                        />
                        <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] uppercase font-bold px-2.5 py-1 rounded-full shadow-md">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="font-display text-lg text-foreground font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-0">
                      <span className="text-primary text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Stay Connected With Us</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            Subscribe to our newsletter to receive regular updates on ground programs in Bihar, Navi Mumbai & Delhi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg">
              Contact Team
            </Link>
            <Link href="/donate" className="border-2 border-primary-foreground/60 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
