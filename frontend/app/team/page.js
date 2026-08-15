'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, MapPin, Users, Award, BookOpen, Heart, Shield, Sparkles, Filter, X } from "lucide-react";

import PageHero from "@/components/PageHero.jsx";

import { client } from "@/sanity/client";
import { TEAM_MEMBERS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";


// Mentors / Advisory Board
const mentors = [
  {
    name: "Dr. A.K. Sinha",
    role: "Senior Educational Advisor",
    bio: "Former University Professor & Social Reformer with over 30 years of experience in rural education policy.",
  },
  {
    name: "Dr. Sunita Rao",
    role: "Public Health Specialist",
    bio: "Epidemiologist advising Bapu Seva Trust on preventive healthcare camps and maternal nutrition programs.",
  },
  {
    name: "Prof. Harish Sharma",
    role: "Rural Sociology & Governance Mentor",
    bio: "Guiding community mobilization, Panchayati Raj alignment, and grassroots sustainable development.",
  },
];

// Trustees & Founder (Information from Official Trust Documents)
const trustees = [
  {
    name: "Ankit Shailesh Chaurasia",
    title: "Founder",
    age: 25,
    degree: "Master's in Sociology",
    bio: "Ankit Shailesh Chaurasia (25) is a social worker with a Master's degree in Sociology, actively engaged in community development and social impact initiatives. He is dedicated to empowering marginalized communities through programs focused on education, health awareness, and sustainable social development.",
    isFounder: true,
  },
  {
    name: "Rakesh Chourasia",
    title: "Trustee",
    age: 35,
    degree: "B.Tech in Electronics & Communication",
    bio: "Rakesh Chourasia (35) is a social worker with a B.Tech in Electronics and Communication, committed to community service and social impact. He works closely with communities to address social challenges and support sustainable and inclusive development initiatives.",
  },
  {
    name: "Savita Devi",
    title: "Trustee",
    age: 45,
    degree: "Social Worker & Community Lead",
    bio: "Savita Devi (45) is a dedicated social worker committed to serving underprivileged communities through grassroots initiatives focused on social welfare, community support, and empowerment of women and families.",
  },
  {
    name: "Ravi Ranjan Kumar",
    title: "Trustee",
    age: 27,
    degree: "B.Pharm Graduate",
    bio: "Ravi Ranjan Kumar (27), B.Pharm graduate with 1 year of industrial experience, committed to applying his pharmaceutical and technical expertise in grassroots social welfare, community health, and rural development initiatives.",
  },
  {
    name: "Praveen Kumar",
    title: "Trustee",
    age: 24,
    degree: "Grassroots Development Lead",
    bio: "Praveen Kumar (24), is a dedicated social worker passionate about grassroots development. With a strong focus on real change at the village level, he actively works to uplift marginalized sections and build stronger, self-reliant communities.",
  },
];

// Core Team Members (from official organization records)
const coreTeamMembers = [
  { name: "Rahul Kumar", role: "Field Program Coordinator", location: "Bihar" },
  { name: "Dablu Kumar", role: "Education Outreach Lead", location: "Bihar" },
  { name: "Vikash Kumar", role: "Youth Skill Trainer", location: "Navi Mumbai" },
  { name: "Vipin Kumar", role: "Community Organizer", location: "Delhi" },
  { name: "Pankaj Yadav", role: "Health Camp Coordinator", location: "Bihar" },
  { name: "Mohdeep", role: "Public Relations Officer", location: "Delhi" },
  { name: "Sanu Kumar", role: "Logistics Manager", location: "Bihar" },
  { name: "Surbhi Kumari", role: "Women's Workshop Instructor", location: "Navi Mumbai" },
  { name: "Ayush Kumar", role: "Digital & Tech Associate", location: "Delhi" },
  { name: "Chandan Kumar", role: "Field Operations Specialist", location: "Bihar" },
  { name: "Rajmund Kumar", role: "School Partnership Manager", location: "Bihar" },
  { name: "Neha Kumari", role: "Child Mentorship Associate", location: "Navi Mumbai" },
  { name: "Rajesh Kumar", role: "Ground Mobilizer", location: "Bihar" },
  { name: "Manik", role: "Technical & Web Operations Lead", location: "Delhi" },
  { name: "Ajay Kumar", role: "Relief & Distribution Lead", location: "Bihar" },
  { name: "Aditya Kumar", role: "Research & Documentation Lead", location: "Delhi" },
];

// Interns Database (Filtered by Timeline & Department)
const internsData = [
  {
    id: "int-1",
    name: "Priya Sharma",
    college: "Delhi University",
    department: "Research",
    timeline: "2024 - Present",
    period: "Jan 2024 - Jun 2024",
    project: "Baseline Survey on School Dropouts in Bihar",
  },
  {
    id: "int-2",
    name: "Aman Gupta",
    college: "IIT Bombay",
    department: "Education",
    timeline: "2024 - Present",
    period: "Feb 2024 - Present",
    project: "Digital Learning Curriculum Design for Rural Centers",
  },
  {
    id: "int-3",
    name: "Shreya Roy",
    college: "Kolkata University",
    department: "Healthcare & Camps",
    timeline: "2023 - 2024",
    period: "Aug 2023 - Jan 2024",
    project: "Maternal Health Awareness Campaign Data",
  },
  {
    id: "int-4",
    name: "Karan Verma",
    college: "Mumbai University",
    department: "Social Media & PR",
    timeline: "2023 - 2024",
    period: "Jun 2023 - Dec 2023",
    project: "Impact Storytelling & Video Documentation",
  },
  {
    id: "int-5",
    name: "Tanvi Patel",
    college: "TISS Mumbai",
    department: "Fundraising & CSR",
    timeline: "2023 - 2024",
    period: "Sep 2023 - Feb 2024",
    project: "CSR Grant Proposals & Corporate Outreach",
  },
  {
    id: "int-6",
    name: "Rohan Das",
    college: "Patna University",
    department: "Education",
    timeline: "2022 - 2023",
    period: "Nov 2022 - Apr 2023",
    project: "Book Distribution Logistics & School Tracking",
  },
  {
    id: "int-7",
    name: "Meera Nair",
    college: "JNU Delhi",
    department: "Research",
    timeline: "2022 - 2023",
    period: "Jan 2023 - Jul 2023",
    project: "Women Micro-Entrepreneurship Evaluation in Navi Mumbai",
  },
  {
    id: "int-8",
    name: "Siddharth Malhotra",
    college: "Amity University",
    department: "Social Media & PR",
    timeline: "2022 - 2023",
    period: "Mar 2022 - Oct 2022",
    project: "Public Awareness Drives & Graphic Campaigns",
  },
];

export default function TeamPage() {
  const [internSearch, setInternSearch] = useState("");
  const [timelineFilter, setTimelineFilter] = useState("All Timelines");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [sanityTeam, setSanityTeam] = useState([]);

  useEffect(() => {
    async function loadTeam() {
      try {
        const data = await client.fetch(TEAM_MEMBERS_QUERY);
        if (data && data.length > 0) {
          setSanityTeam(data);
        }
      } catch (err) {
        console.error("Sanity team fetch error:", err);
      }
    }
    loadTeam();
  }, []);

  const displayCoreTeam = sanityTeam.length > 0
    ? sanityTeam.map((m) => ({
        name: m.name,
        role: m.role || "Team Member",
        location: m.location || "India",
        image: m.image ? urlFor(m.image).url() : null,
      }))
    : coreTeamMembers;


  const timelines = ["All Timelines", "2024 - Present", "2023 - 2024", "2022 - 2023"];
  const departments = ["All Departments", "Research", "Education", "Healthcare & Camps", "Social Media & PR", "Fundraising & CSR"];

  const filteredInterns = internsData.filter((intern) => {
    const matchesTimeline = timelineFilter === "All Timelines" || intern.timeline === timelineFilter;
    const matchesDept = deptFilter === "All Departments" || intern.department === deptFilter;
    const matchesSearch =
      internSearch.trim() === "" ||
      intern.name.toLowerCase().includes(internSearch.toLowerCase()) ||
      intern.college.toLowerCase().includes(internSearch.toLowerCase()) ||
      intern.project.toLowerCase().includes(internSearch.toLowerCase());

    return matchesTimeline && matchesDept && matchesSearch;
  });

  return (
    <>
      <PageHero
        subtitle="People Behind The Mission"
        title="Our Leadership & Team"
        description="Meet the passionate mentors, trustees, founder, core team members, and interns driving social transformation across Bihar, Navi Mumbai & Delhi."
      />

      {/* SECTION 1: Mentors & Advisory Board */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              Strategic Guidance
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground font-bold">
              Our Advisory Mentors
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-2">
              Distinguished experts providing strategic vision and academic guidance to our programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mentors.map((mentor, i) => (
              <div
                key={mentor.name}
                className="bg-card rounded-2xl p-8 border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display text-xl font-bold mb-6">
                    {mentor.name[0]}
                  </div>
                  <h3 className="font-display text-xl text-foreground font-semibold mb-1">{mentor.name}</h3>
                  <p className="text-xs font-bold text-primary mb-4">{mentor.role}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                    {mentor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Meet The Trustees & Founder */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              Governance & Vision
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-extrabold">
              Meet The Trustees
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-3">
              The founding board dedicated to transparency, grassroots social welfare, and community empowerment.
            </p>
          </div>

          {/* Founder Highlight Card */}
          {trustees.filter(t => t.isFounder).map(founder => (
            <div
              key={founder.name}
              className="bg-card rounded-3xl p-8 sm:p-12 border-2 border-primary/30 shadow-xl mb-12 max-w-4xl mx-auto text-center relative overflow-hidden"
            >
              <span className="bg-primary text-primary-foreground text-xs font-bold uppercase px-4 py-1.5 rounded-full shadow-md inline-block mb-4">
                Founder
              </span>
              <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center font-display text-3xl font-bold mx-auto mb-6 shadow-md border-2 border-primary">
                {founder.name[0]}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-foreground font-bold mb-1">
                {founder.name} ({founder.age})
              </h3>
              <p className="text-xs font-bold text-primary mb-4">{founder.degree}</p>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                "{founder.bio}"
              </p>
            </div>
          ))}

          {/* Trustees Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustees.filter(t => !t.isFounder).map((t) => (
              <div
                key={t.name}
                className="bg-card rounded-2xl p-6 border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center"
              >
                <div>
                  <div className="w-16 h-16 rounded-full bg-secondary/20 text-secondary-foreground flex items-center justify-center font-display text-2xl font-bold mx-auto mb-4 border border-secondary/30">
                    {t.name[0]}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase bg-muted text-foreground px-3 py-1 rounded-full inline-block mb-3">
                    {t.title}
                  </span>
                  <h3 className="font-display text-lg text-foreground font-bold mb-1">
                    {t.name} ({t.age})
                  </h3>
                  <p className="text-[11px] font-semibold text-primary mb-3">{t.degree}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Team */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              On-The-Ground Champions
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-extrabold">
              Core Team
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mt-3">
              Our passionate team members leading execution, teaching, health drives, and logistics.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8">
            {displayCoreTeam.map((member) => (
              <div
                key={member.name}
                className="bg-card rounded-2xl p-6 text-center border border-border/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-between group"
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mb-4 border-2 border-primary/20 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center font-display text-2xl font-bold text-primary mb-4 border-2 border-primary/20 group-hover:scale-105 transition-transform">
                    {member.name[0]}
                  </div>
                )}
                <div>
                  <h3 className="font-display text-base sm:text-lg text-foreground font-semibold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
                  <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-0.5 rounded-full text-[10px] text-foreground font-medium">
                    <MapPin className="w-3 h-3 text-primary" /> {member.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: Interns & Alumni Network (With Dedicated Search & Filters) */}
      <section className="section-padding" style={{ background: "var(--gradient-section)" }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-2 block">
              Future Leaders
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground font-extrabold mb-3">
              Interns & Alumni Network
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Students and young professionals contributing research, tech, and outreach skills.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-card rounded-3xl p-6 border border-border/80 shadow-md mb-10 space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={internSearch}
                  onChange={(e) => setInternSearch(e.target.value)}
                  placeholder="Search intern name, college, or project..."
                  className="w-full bg-muted text-foreground placeholder:text-muted-foreground rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60"
                />
                {internSearch && (
                  <button
                    onClick={() => setInternSearch("")}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Timeline Filter */}
              <select
                value={timelineFilter}
                onChange={(e) => setTimelineFilter(e.target.value)}
                className="bg-muted text-foreground rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60 font-semibold"
              >
                {timelines.map((t) => (
                  <option key={t} value={t}>
                    Timeline: {t}
                  </option>
                ))}
              </select>

              {/* Department Filter */}
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="bg-muted text-foreground rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-border/60 font-semibold"
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    Department: {d}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interns Cards Grid */}
          {filteredInterns.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl border border-border max-w-xl mx-auto">
              <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-display text-lg text-foreground mb-1">No interns found</p>
              <p className="text-xs text-muted-foreground mb-4">
                No matching intern records found for your search criteria.
              </p>
              <button
                onClick={() => {
                  setInternSearch("");
                  setTimelineFilter("All Timelines");
                  setDeptFilter("All Departments");
                }}
                className="text-primary font-semibold text-xs hover:underline"
              >
                Reset Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredInterns.map((intern) => (
                <div
                  key={intern.id}
                  className="bg-card rounded-2xl p-6 border border-border/80 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                        {intern.department}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        {intern.timeline}
                      </span>
                    </div>

                    <h3 className="font-display text-lg text-foreground font-bold mb-1">{intern.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium mb-3">{intern.college}</p>
                    <p className="text-xs text-foreground/80 leading-relaxed italic bg-muted/50 p-2.5 rounded-lg border border-border/40 mb-4">
                      "{intern.project}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-primary" /> {intern.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="container-narrow">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Want to Join Our Team or Intern With Us?</h2>
          <p className="text-primary-foreground/90 text-lg max-w-xl mx-auto mb-10">
            We are always looking for dedicated volunteers, researchers, and interns to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-involved"
              className="bg-primary-foreground text-primary px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              Apply for Internship
            </Link>
            <Link
              href="/contact"
              className="border-2 border-primary-foreground/60 text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary-foreground/10 transition-all"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
