'use client';

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin, Building2, User, ChevronDown } from "lucide-react";
import PageHero from "@/components/PageHero.jsx";

const mainOffices = [
  {
    city: "Headquarters — Delhi",
    address: "Bapu Seva Trust, Connaught Place, New Delhi - 110001",
    phone: "+91 98100 54321",
    email: "delhi@bapuseva.org",
    hours: "Mon - Sat, 9:00 AM - 6:00 PM",
  },
  {
    city: "Regional Office — Bihar",
    address: "Bapu Seva Trust, Boring Road, Patna, Bihar - 800001",
    phone: "+91 98350 12345",
    email: "bihar@bapuseva.org",
    hours: "Mon - Sat, 9:30 AM - 6:00 PM",
  },
  {
    city: "Regional Office — Navi Mumbai",
    address: "Bapu Seva Trust, Sector 15, Vashi, Navi Mumbai - 400703",
    phone: "+91 98200 67890",
    email: "mumbai@bapuseva.org",
    hours: "Mon - Sat, 9:30 AM - 6:00 PM",
  },
];

const stateOfficesData = {
  "WEST BENGAL": {
    stateName: "WEST BENGAL",
    orgName: "Bapu Seva Trust — West Bengal Chapter",
    address: "AE-547, 1st Floor, AE Block, Sector 1, Salt Lake City, Kolkata - 700064",
    landmark: "Near Quality More (Annapurna Sweets)",
    person: "Manoj Thakur",
    phone: "9775483940",
    email: "westbengal@bapuseva.org",
  },
  "BIHAR": {
    stateName: "BIHAR",
    orgName: "Bapu Seva Trust — Bihar Chapter",
    address: "Boring Road, Near Main Chowk, Patna, Bihar - 800001",
    landmark: "Near Central Library",
    person: "Rajesh Sharma",
    phone: "9835012345",
    email: "bihar@bapuseva.org",
  },
  "MUMBAI": {
    stateName: "MUMBAI",
    orgName: "Bapu Seva Trust — Navi Mumbai Chapter",
    address: "Sector 15, Near Railway Station, Vashi, Navi Mumbai - 400703",
    landmark: "Near Vashi Plaza",
    person: "Ananya Verma",
    phone: "9820067890",
    email: "mumbai@bapuseva.org",
  },
  "DELHI": {
    stateName: "DELHI",
    orgName: "Bapu Seva Trust — Delhi Head Office",
    address: "Connaught Place, Block B, Inner Circle, New Delhi - 110001",
    landmark: "Near Rajiv Chowk Metro Gate 3",
    person: "Dr. Vikram Patel",
    phone: "9810054321",
    email: "delhi@bapuseva.org",
  },
};

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedState, setSelectedState] = useState("WEST BENGAL");

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
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <span>{office.email}</span>
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

      {/* STATE OFFICES Section (State-Wise Contact Selection) */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow max-w-4xl">
          <div className="bg-card rounded-3xl p-8 sm:p-12 border border-border/80 shadow-xl space-y-8">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl text-foreground font-bold tracking-tight uppercase border-b border-border/80 pb-4 mb-6">
                STATE OFFICES
              </h2>

              {/* Location Select Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
                <label className="font-medium text-foreground text-sm sm:text-base">
                  Location
                </label>
                <div className="relative w-full sm:w-72">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full bg-background border border-border text-foreground font-semibold text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-primary shadow-sm uppercase"
                  >
                    {Object.keys(stateOfficesData).map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-muted-foreground absolute right-4 top-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Selected State Office Card */}
            {currentStateOffice && (
              <div className="bg-muted/40 rounded-2xl p-6 sm:p-8 border border-border/60 space-y-4 animate-fade-in">
                <h3 className="font-display text-xl sm:text-2xl text-foreground font-bold uppercase tracking-wide">
                  {currentStateOffice.stateName}
                </h3>

                <div className="space-y-3 text-sm leading-relaxed text-foreground">
                  <div>
                    <span className="font-bold text-foreground block mb-0.5">Address:</span>
                    <p className="text-muted-foreground font-normal">{currentStateOffice.orgName}</p>
                    <p className="text-muted-foreground font-normal">{currentStateOffice.address}</p>
                    {currentStateOffice.landmark && (
                      <p className="text-muted-foreground font-normal italic text-xs mt-0.5">
                        Near — {currentStateOffice.landmark}
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <span className="font-bold text-foreground">State responsible Person: </span>
                    <span className="text-muted-foreground font-medium">{currentStateOffice.person}</span>
                  </div>

                  <div>
                    <span className="font-bold text-foreground">Phone Number: </span>
                    <a href={`tel:${currentStateOffice.phone}`} className="text-primary font-semibold hover:underline">
                      {currentStateOffice.phone}
                    </a>
                  </div>

                  <div>
                    <span className="font-bold text-foreground">Email: </span>
                    <a href={`mailto:${currentStateOffice.email}`} className="text-primary font-semibold hover:underline">
                      {currentStateOffice.email}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* General Contact Form Section */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Details & Social */}
            <div>
              <h2 className="font-display text-2xl text-foreground mb-6">Send Us a Direct Message</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Whether you have a general query, want to partner with us, or are interested in volunteering in West Bengal, Bihar, Navi Mumbai, or Delhi — reach out using the form.
              </p>

              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Follow Our Journey</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-sm"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="bg-card rounded-2xl p-8 space-y-5 border border-border/80 shadow-md"
            >
              <h3 className="font-display text-xl text-foreground mb-2">Message Form</h3>
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
                    <option>West Bengal — General / Volunteer Inquiry</option>
                    <option>Bihar — General / Volunteer Inquiry</option>
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
