'use client';

import Link from "next/link";
import { Heart } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Vision & Mission", href: "/vision-mission" },
    { label: "Programs", href: "/programs" },
    { label: "Impact Stories", href: "/impact" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Donate", href: "/donate" },
  ],
  resources: [
    { label: "News & Blog", href: "/news" },
    { label: "Live Financial Transparency", href: "/financial-transparency" },
    { label: "Reports & Disclosures", href: "/reports" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-foreground text-background/80 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-display text-xl text-background mb-4">Bapu Seva Trust</h3>
            <p className="text-sm leading-relaxed text-background/60">
              Empowering lives and building hope since 2021. Serving communities across Bihar & Delhi through education, healthcare, and community programs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-background mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-background/60 mb-3">Stay updated on our impact.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-background/10 text-background placeholder:text-background/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© 2025 Bapu Seva Trust. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for a better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
