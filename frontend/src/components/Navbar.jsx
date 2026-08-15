'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Users, FileText, Heart, Globe, BookOpen, MapPin, Newspaper, PhoneCall, Sparkles } from "lucide-react";
import logoImg from "@/assets/logo.png";

const navigationItems = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Overview & Story", href: "/about", icon: BookOpen, desc: "Our journey, values & grassroots story" },
      { label: "Our Leadership & Team", href: "/team", icon: Users, desc: "Mentors, Trustees, Core Team & Interns" },
      { label: "Vision & Mission", href: "/vision-mission", icon: Sparkles, desc: "Our core ethos and 2030 vision" },
      { label: "Legal Docs & Reports", href: "/reports", icon: FileText, desc: "12A, 80G, CSR-1, Audits & Darpan ID" },
    ],
  },
  {
    label: "Our Work",
    href: "/programs",
    dropdown: [
      { label: "Programs & Drives", href: "/programs", icon: Heart, desc: "Education, Health, Environment & Empowerment" },
      { label: "Real Impact & SDGs", href: "/impact", icon: Globe, desc: "India map, UN SDGs & Video Stories" },
    ],
  },
  {
    label: "Get Involved",
    href: "/get-involved",
    dropdown: [
      { label: "Volunteer & Skill Roles", href: "/get-involved", icon: Users, desc: "Research, CSR, PR & Field work" },
      { label: "News & Campaigns", href: "/news", icon: Newspaper, desc: "Active drives, news & ground reports" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState({});
  const pathname = usePathname();

  const toggleMobileSubmenu = (label) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/95 backdrop-blur-md border-b border-border flex items-center">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src={typeof logoImg === 'string' ? logoImg : logoImg.src}
            alt="Bapu Seva Trust Logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
            width={40}
            height={40}
          />
          <span className="font-display text-xl sm:text-2xl text-foreground tracking-tight group-hover:text-primary transition-colors">
            Bapu Seva Trust
          </span>
        </Link>

        {/* Desktop Navigation Menu (Broad 5 Categories + Donate Button) */}
        <div className="hidden lg:flex items-center gap-8">
          {navigationItems.map((item) => {
            const hasDropdown = Boolean(item.dropdown);

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => hasDropdown && setHoveredDropdown(item.label)}
                onMouseLeave={() => hasDropdown && setHoveredDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 ${
                    pathname === item.href || (hasDropdown && item.dropdown.some(sub => pathname === sub.href))
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{item.label}</span>
                  {hasDropdown && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        hoveredDropdown === item.label ? "rotate-180 text-primary" : "text-muted-foreground"
                      }`}
                    />
                  )}
                </Link>

                {/* Dropdown Menu Popup */}
                {hasDropdown && hoveredDropdown === item.label && (
                  <div className="absolute top-full left-0 w-72 pt-2 animate-fade-in z-50">
                    <div className="bg-card rounded-2xl p-3 border border-border/80 shadow-2xl space-y-1">
                      {item.dropdown.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = pathname === sub.href;

                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setHoveredDropdown(null)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                              isSubActive
                                ? "bg-primary/10 text-primary font-semibold"
                                : "hover:bg-muted text-foreground"
                            }`}
                          >
                            <SubIcon className={`w-5 h-5 shrink-0 mt-0.5 ${isSubActive ? "text-primary" : "text-muted-foreground"}`} />
                            <div>
                              <p className="text-xs font-bold leading-tight">{sub.label}</p>
                              <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{sub.desc}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/donate"
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-md hover:scale-[1.02]"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-foreground p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border px-6 py-6 shadow-2xl animate-fade-in max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-3">
            {navigationItems.map((item) => {
              const hasDropdown = Boolean(item.dropdown);
              const isExpanded = mobileExpanded[item.label];

              return (
                <div key={item.label} className="border-b border-border/50 pb-2">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => !hasDropdown && setOpen(false)}
                      className={`text-sm font-semibold transition-colors ${
                        pathname === item.href
                          ? "text-primary font-bold"
                          : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>

                    {hasDropdown && (
                      <button
                        onClick={() => toggleMobileSubmenu(item.label)}
                        className="p-1 text-muted-foreground hover:text-foreground"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180 text-primary" : ""}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Submenu Accordion */}
                  {hasDropdown && isExpanded && (
                    <div className="mt-2 ml-3 pl-3 border-l-2 border-primary/30 space-y-2 py-1">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className={`block text-xs py-1.5 transition-colors ${
                            pathname === sub.href
                              ? "text-primary font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="mt-4 text-center bg-primary text-primary-foreground px-5 py-3.5 rounded-xl text-sm font-bold shadow-md"
            >
              Donate Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
