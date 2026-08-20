'use client';

import { useState } from "react";
import Link from "next/link";
import { Heart, Wrench, ArrowRight, CheckCircle2, Facebook, Youtube, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Bapu-Seva-Trust/pfbid027TRqFGRj75sNpSnerJZWjTihgf2WbVaXz6kqZSJkTE1J9oWnaXjf5MUKSdAjxLokl/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/bapu_seva_trust" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/bapu-seva-trust-80640040b" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@bapusevatrust" },
  { icon: MessageCircle, label: "WhatsApp Channel", href: "https://www.whatsapp.com/channel/0029VaA3U1LCBtxFrwX5UJ1H" },
];

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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.warning("Invalid Email", { description: "Please enter a valid email address to subscribe." });
      return;
    }
    setIsSubscribed(true);
    toast.success("Subscribed to Updates!", {
      description: `Thank you for supporting Bapu Seva Trust! Updates will be sent to ${newsletterEmail}.`,
      duration: 5000,
    });
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-foreground text-background/80 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="font-display text-xl text-background mb-3 font-bold">Bapu Seva Trust</h3>
            <p className="text-sm leading-relaxed text-background/60 mb-4">
              Empowering lives and building hope since 2021. Serving communities across Bihar, Navi Mumbai & Delhi through education, healthcare, and community programs.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground text-background/70 flex items-center justify-center transition-all shadow-xs"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
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
            {isSubscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 p-2.5 rounded-lg text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox for updates.</span>
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-background/10 text-background placeholder:text-background/40 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Website Under Maintenance Section */}
        <div className="my-8 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-5 md:p-6 backdrop-blur-sm relative overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Wrench className="w-5 h-5 animate-pulse text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    Notice: Website Currently Under Active Maintenance
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                    Live Preview & Continuous Upgrade
                  </span>
                </div>
                <p className="text-xs text-background/70 leading-relaxed max-w-3xl">
                  The official digital portal for Bapu Seva Trust is undergoing scheduled system upgrades and UI refinements. All donation channels (80G tax benefits), financial transparency ledgers, and volunteer registration portals are fully active and secure.
                </p>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2 w-full md:w-auto justify-end">
              <Link
                href="/contact"
                className="text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/15 hover:bg-amber-500/25 px-3.5 py-2 rounded-xl border border-amber-500/30 transition-all flex items-center gap-1.5"
              >
                <span>Report Feedback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/50">
          <p>© {new Date().getFullYear()} Bapu Seva Trust. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-primary fill-primary" /> for a better tomorrow
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
