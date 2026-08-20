'use client';

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Youtube, Instagram, Linkedin, Building2, User, ChevronDown, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import PageHero from "@/components/PageHero.jsx";

const mainOffices = [
  {
    city: "Registered Head Office — Bihar",
    address: "Madanpur, Aurangabad, Bihar - 824208",
    phone: "+91 7870726323",
    whatsapp: "7870726323 / 9004531826",
    email: "info@bapusevatrust.org",
    hours: "Mon - Sat, 9:00 AM - 6:30 PM",
  },
  {
    city: "Headquarters & Policy — Delhi",
    address: "Bapu Seva Trust, Connaught Place, New Delhi - 110001",
    phone: "+91 7870726323",
    whatsapp: "7870726323",
    email: "info@bapusevatrust.org",
    hours: "Mon - Sat, 9:00 AM - 6:00 PM",
  },
  {
    city: "Regional Outreach — Navi Mumbai",
    address: "Bapu Seva Trust, Sector 15, Vashi, Navi Mumbai - 400703",
    phone: "+91 9004531826",
    whatsapp: "9004531826",
    email: "info@bapusevatrust.org",
    hours: "Mon - Sat, 9:30 AM - 6:00 PM",
  },
];

const stateOfficesData = {
  "BIHAR": {
    stateName: "BIHAR",
    orgName: "Bapu Seva Trust — Registered Head Office",
    address: "Madanpur, Aurangabad, Bihar - 824208",
    landmark: "Main Road Madanpur",
    person: "Ankit Chaurasia (Founder)",
    phone: "7870726323",
    email: "info@bapusevatrust.org",
  },
  "WEST BENGAL": {
    stateName: "WEST BENGAL",
    orgName: "Bapu Seva Trust — West Bengal Chapter",
    address: "AE-547, 1st Floor, AE Block, Sector 1, Salt Lake City, Kolkata - 700064",
    landmark: "Near Quality More (Annapurna Sweets)",
    person: "Manoj Thakur",
    phone: "9775483940",
    email: "info@bapusevatrust.org",
  },
  "MUMBAI": {
    stateName: "MUMBAI",
    orgName: "Bapu Seva Trust — Navi Mumbai Chapter",
    address: "Sector 15, Near Railway Station, Vashi, Navi Mumbai - 400703",
    landmark: "Near Vashi Plaza",
    person: "Ananya Verma",
    phone: "9004531826",
    email: "info@bapusevatrust.org",
  },
  "DELHI": {
    stateName: "DELHI",
    orgName: "Bapu Seva Trust — Delhi Head Office",
    address: "Connaught Place, Block B, Inner Circle, New Delhi - 110001",
    landmark: "Near Rajiv Chowk Metro Gate 3",
    person: "Dr. Vikram Patel",
    phone: "7870726323",
    email: "info@bapusevatrust.org",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "https://www.facebook.com/people/Bapu-Seva-Trust/pfbid027TRqFGRj75sNpSnerJZWjTihgf2WbVaXz6kqZSJkTE1J9oWnaXjf5MUKSdAjxLokl/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/bapu_seva_trust" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/bapu-seva-trust-80640040b" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@bapusevatrust" },
  { icon: MessageCircle, label: "WhatsApp Channel", href: "https://www.whatsapp.com/channel/0029VaA3U1LCBtxFrwX5UJ1H" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedState, setSelectedState] = useState("BIHAR");

  const currentStateOffice = stateOfficesData[selectedState];

  return (
    <>
      <PageHero
        subtitle="Reach Out"
        title="Contact Us"
        description="Have questions, want to volunteer, or need assistance? Connect with our central offices or regional state leaders below."
      />

      {/* 3 Main Offices Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest uppercase text-sm mb-2">Our Presence</p>
            <h2 className="font-display text-3xl md:text-5xl text-foreground">Our 3 Main Offices</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mainOffices.map((office) => (
              <div
                key={office.city}
                className="bg-card rounded-2xl p-8 border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl text-foreground font-semibold mb-4">{office.city}</h3>
                  <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <span>{office.phone}</span>
                    </p>
                    {office.whatsapp && (
                      <p className="flex items-center gap-2.5">
                        <MessageCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>WhatsApp: {office.whatsapp}</span>
                      </p>
                    )}
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-semibold">{office.email}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary shrink-0" />
                      <span>{office.hours}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Contact Form Section with Embedded Minimal State Office Selector */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-start">
            
            {/* Left Column: Direct Message & Compact State Directory */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Get In Touch</span>
                <h2 className="font-display text-2xl sm:text-3xl text-foreground font-bold mb-3">Send Us a Direct Message</h2>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Whether you have a general query, want to partner with us, or are interested in volunteering in Bihar, West Bengal, Navi Mumbai, or Delhi — reach out directly using the form or connect with our state coordinators below.
                </p>
              </div>

              {/* Compact & Minimal State Office Directory with Dropdown */}
              <div className="bg-card rounded-2xl p-4 sm:p-5 border border-border/80 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-border/60">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    State Office Directory
                  </span>

                  {/* Modern Compact Dropdown */}
                  <div className="relative w-full sm:w-52">
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full bg-muted text-foreground border border-border/70 font-bold text-xs rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-xs cursor-pointer"
                    >
                      <option value="BIHAR">Bihar (Head Office)</option>
                      <option value="WEST BENGAL">West Bengal (Kolkata)</option>
                      <option value="MUMBAI">Navi Mumbai (Vashi)</option>
                      <option value="DELHI">Delhi (Central Office)</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground absolute right-2.5 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Minimal State Details */}
                {currentStateOffice && (
                  <div className="text-xs space-y-2 pt-1 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-foreground text-xs">{currentStateOffice.orgName}</span>
                      <span className="text-[11px] text-muted-foreground font-medium">Lead: <strong>{currentStateOffice.person}</strong></span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {currentStateOffice.address} {currentStateOffice.landmark && `(Near ${currentStateOffice.landmark})`}
                    </p>
                    <div className="flex items-center gap-4 text-[11px] pt-1 text-muted-foreground flex-wrap">
                      <a href={`tel:${currentStateOffice.phone}`} className="text-primary font-semibold hover:underline flex items-center gap-1">
                        <Phone className="w-3 h-3" /> {currentStateOffice.phone}
                      </a>
                      <a href={`mailto:${currentStateOffice.email}`} className="text-primary font-semibold hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {currentStateOffice.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">Follow Our Journey</h3>
                <div className="flex gap-2.5 flex-wrap">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-xs"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
                toast.success("Message Sent Successfully!", {
                  description: "Thank you for reaching out. Our representative will contact you within 24 hours.",
                  duration: 5000,
                });
              }}
              className="bg-card rounded-2xl p-6 sm:p-8 space-y-4 border border-border/80 shadow-md"
            >
              <h3 className="font-display text-xl text-foreground mb-1">Message Form</h3>
              {submitted ? (
                <div className="text-center py-12">
                  <p className="text-primary text-4xl mb-3">✓</p>
                  <p className="font-display text-xl text-foreground">Message Sent Successfully!</p>
                  <p className="text-muted-foreground text-sm mt-2">Our state representative will contact you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-primary text-sm font-semibold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/50"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/50"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/50"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number (optional)"
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/50"
                  />
                  <select
                    className="w-full bg-muted text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/50"
                    defaultValue=""
                  >
                    <option value="" disabled>Select State / Subject</option>
                    <option>Bihar — General / Volunteer Inquiry</option>
                    <option>West Bengal — General / Volunteer Inquiry</option>
                    <option>Mumbai / Navi Mumbai — General Inquiry</option>
                    <option>Delhi — General Inquiry</option>
                    <option>CSR / Donation Inquiry</option>
                  </select>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    required
                    className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none border border-border/50"
                  />
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-md"
                  >
                    Send Message
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
