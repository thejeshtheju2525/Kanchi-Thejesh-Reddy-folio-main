import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, ArrowDown, Code2,
  Database, Wrench, TestTube2, GitBranch, Layers, GraduationCap, Award,
  Briefcase, Send, Menu, X, ExternalLink, Sparkles,
} from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thejesh Reddy Kanchi — Junior Java Developer Portfolio" },
      { name: "description", content: "Junior Java Developer based in Chittoor, India. Core Java, SQL, Python, REST APIs, Agile. See projects, experience, and contact." },
      { property: "og:title", content: "Thejesh Reddy Kanchi — Junior Java Developer" },
      { property: "og:description", content: "Portfolio: projects, experience, skills, education." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const NAV = ["Home", "About", "Skills", "Experience", "Projects", "Education", "Contact"];

const TYPING_PHRASES = [
  "Junior Java Developer",
  "Core Java • SQL • Python",
  "Object-Oriented Thinker",
  "Clean Code Advocate",
];

function useTyping(phrases: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = phrases[i % phrases.length];
    const speed = del ? 40 : 80;
    const t = setTimeout(() => {
      const next = del ? cur.slice(0, text.length - 1) : cur.slice(0, text.length + 1);
      setText(next);
      if (!del && next === cur) setTimeout(() => setDel(true), 1400);
      else if (del && next === "") { setDel(false); setI(i + 1); }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, phrases]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-visible"); });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function GlowCursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <div ref={ref} className="glow-cursor hidden md:block" />;
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 2 + ((i * 7) % 5);
        const dur = 6 + ((i * 3) % 8);
        const delay = (i * 0.4) % 5;
        return (
          <span
            key={i}
            className="particle absolute rounded-full bg-primary/60"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size, height: size,
              boxShadow: "0 0 10px var(--primary)",
              ["--dur" as never]: `${dur}s`,
              ["--delay" as never]: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-smooth ${scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-transparent"}`}>
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid place-items-center w-9 h-9 rounded-lg bg-orange-gradient text-primary-foreground shadow-glow-sm">TK</span>
          <span className="hidden sm:inline">Thejesh<span className="text-primary">.</span></span>
        </a>
        <ul className="hidden md:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <li key={n}>
              <a href={`#${n.toLowerCase()}`} className="nav-link text-foreground/85 hover:text-foreground">{n}</a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-gradient text-primary-foreground font-semibold text-sm shadow-glow-sm hover:shadow-glow transition-smooth">
          <Sparkles className="w-4 h-4" /> Hire me
        </a>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <ul className="px-6 py-4 space-y-3">
            {NAV.map((n) => (
              <li key={n}>
                <a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block py-1 text-foreground/90">{n}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const typed = useTyping(TYPING_PHRASES);
  return (
    <section id="home" className="relative min-h-screen bg-hero flex items-center pt-24 pb-16 overflow-hidden">
      <Particles />
      <div className="relative mx-auto max-w-7xl px-6 grid lg:grid-cols-[1fr_auto] gap-12 items-center w-full">
        <div className="reveal">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Available for opportunities
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight">
            Hi, I'm <span className="text-gradient-orange">Thejesh Reddy Kanchi</span>
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-primary font-semibold min-h-[1.75rem]">
            <span className="typing-caret">{typed}</span>
          </p>
          <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">
            Passionate Java Developer focused on building scalable, efficient, and user-friendly software solutions.
            Skilled in Core Java, SQL, Python, and modern development practices.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/resume.pdf" download className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-gradient text-primary-foreground font-semibold shadow-glow-sm hover:shadow-glow transition-smooth">
              <Download className="w-4 h-4" /> Download Resume
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-smooth">
              <Mail className="w-4 h-4" /> Contact Me
            </a>
            <a href="https://github.com/thejeshtheju2525" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition-smooth">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <a href="https://github.com/thejeshtheju2525" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/kanchi-thejesh-reddy" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg border border-border hover:border-primary hover:text-primary transition-smooth">
              <Linkedin className="w-5 h-5" />
            </a>
            <span className="hidden sm:inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Chittoor, Andhra Pradesh</span>
          </div>
        </div>
        <div className="reveal mx-auto lg:mx-0">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-orange-gradient opacity-40 blur-2xl" aria-hidden />
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-1 bg-orange-gradient shadow-glow">
              <img
                src={profilePhoto}
                alt="Thejesh Reddy Kanchi"
                className="w-full h-full rounded-full object-cover bg-background"
              />
            </div>
          </div>
        </div>
      </div>
      <a href="#about" aria-label="Scroll" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary animate-bounce">
        <ArrowDown />
      </a>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-12 reveal">
      <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase">{kicker}</p>
      <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold">{title}</h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-orange-gradient" />
    </div>
  );
}

function About() {
  const facts = [
    { label: "Role", value: "Junior Java Developer" },
    { label: "Location", value: "Chittoor, AP" },
    { label: "Degree", value: "B.Tech CSE" },
    { label: "Graduation", value: "May 2026" },
  ];
  return (
    <section id="about" className="min-h-screen flex items-center py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="About" title="A bit about me" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 reveal">
            <p className="text-xl sm:text-2xl leading-relaxed text-foreground/90">
              I am a Computer Science graduate with hands-on experience in Java application development,
              object-oriented programming, SQL database integration, and Agile development practices.
              I enjoy solving real-world problems through clean code and continuously improving my technical skills.
            </p>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              My goal is to contribute to innovative software projects while growing as a full-stack developer —
              shipping software that's reliable, readable, and a pleasure to maintain.
            </p>
          </div>
          <div className="reveal grid grid-cols-2 gap-4">
            {facts.map((f) => (
              <div key={f.label} className="glow-card rounded-2xl p-6 min-h-[120px] flex flex-col justify-center">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</p>
                <p className="mt-1 font-semibold text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type SkillGroup = { icon: React.ReactNode; title: string; items: { name: string; level: number }[] };

const SKILLS: SkillGroup[] = [
  { icon: <Code2 />, title: "Programming", items: [
    { name: "Java", level: 90 }, { name: "Python", level: 75 }, { name: "SQL", level: 85 },
  ]},
  { icon: <Layers />, title: "Web Technologies", items: [
    { name: "HTML5", level: 90 }, { name: "CSS3", level: 85 }, { name: "JavaScript", level: 75 },
  ]},
  { icon: <Database />, title: "Concepts", items: [
    { name: "OOP", level: 90 }, { name: "Data Structures", level: 80 }, { name: "REST APIs", level: 75 }, { name: "SDLC", level: 80 },
  ]},
  { icon: <Wrench />, title: "Tools", items: [
    { name: "Git & GitHub", level: 85 }, { name: "IntelliJ / Eclipse", level: 85 }, { name: "MySQL", level: 80 },
  ]},
  { icon: <TestTube2 />, title: "Testing", items: [
    { name: "Manual Testing", level: 80 }, { name: "Unit Testing", level: 75 }, { name: "Bug Tracking", level: 80 },
  ]},
  { icon: <GitBranch />, title: "Methodologies", items: [
    { name: "Agile Scrum", level: 80 }, { name: "Code Reviews", level: 75 }, { name: "Sprint Planning", level: 75 },
  ]},
];

function Skills() {
  return (
    <section id="skills" className="min-h-screen py-28 px-6 bg-card/30">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Skills" title="What I work with" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILLS.map((g) => (
            <div key={g.title} className="glow-card rounded-2xl p-8 reveal min-h-[280px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary border border-primary/30">{g.icon}</span>
                <h3 className="font-semibold text-lg">{g.title}</h3>
              </div>
              <ul className="space-y-3">
                {g.items.map((s) => (
                  <li key={s.name}>
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/90">{s.name}</span>
                      <span className="text-primary font-medium">{s.level}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-orange-gradient shadow-glow-sm transition-all duration-700" style={{ width: `${s.level}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="min-h-screen flex items-center py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Experience" title="Where I've worked" />
        <div className="relative reveal">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-border" />
          <div className="relative pl-12 sm:pl-16">
            <span className="absolute left-2 sm:left-4 top-2 w-5 h-5 rounded-full bg-orange-gradient shadow-glow-sm grid place-items-center">
              <Briefcase className="w-3 h-3 text-primary-foreground" />
            </span>
            <div className="glow-card rounded-2xl p-8 sm:p-10 min-h-[360px]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl font-bold">Core Java Intern</h3>
                <span className="text-primary text-sm font-medium">May 2025 – July 2025</span>
              </div>
              <p className="mt-2 text-lg text-muted-foreground">Skill Intern · Bengaluru, Karnataka</p>
              <ul className="mt-8 space-y-4 text-lg text-foreground/90">
                {[
                  "Developed Java applications using OOP concepts and the Collections Framework.",
                  "Implemented exception handling and modular programming patterns.",
                  "Integrated SQL databases using JDBC with CRUD operations.",
                  "Participated in Agile sprint planning and daily standups.",
                  "Used Git for version control and collaborative development.",
                  "Performed testing and bug tracking activities.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-3 w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROJECTS = [
  {
    title: "Student Management System",
    tech: ["Java", "JDBC", "MySQL"],
    desc: "Console-based CRUD application for managing student records with database connectivity, validation, and exception handling.",
    features: ["Add / Update / Delete records", "Search students", "MySQL connectivity via JDBC", "Robust exception handling"],
    repo: "https://github.com/thejeshtheju2525",
  },
  {
    title: "Personal Portfolio Website",
    tech: ["HTML", "CSS", "JavaScript"],
    desc: "Fully responsive personal portfolio with modern UI/UX, smooth animations and cross-browser compatibility.",
    features: ["Responsive layout", "Cross-browser support", "Modern UI/UX", "Mobile optimised"],
    repo: "https://github.com/thejeshtheju2525",
  },
];

function Projects() {
  return (
    <section id="projects" className="min-h-screen flex items-center py-28 px-6 bg-card/30">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Projects" title="Things I've built" />
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((p) => (
            <article key={p.title} className="glow-card rounded-2xl overflow-hidden reveal flex flex-col min-h-[520px]">
              <div className="relative h-56 bg-hero overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage:
                    "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  maskImage: "radial-gradient(circle at center, black, transparent 70%)",
                }} />
                <div className="absolute inset-0 grid place-items-center">
                  <Code2 className="w-14 h-14 text-primary drop-shadow-[0_0_18px_var(--primary)]" />
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-muted-foreground">{p.desc}</p>
                <ul className="mt-4 grid grid-cols-2 gap-1.5 text-sm text-foreground/85">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><span className="text-primary">▸</span>{f}</li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-full border border-primary/40 text-primary bg-primary/10">{t}</span>
                  ))}
                </div>
                <div className="mt-6 flex gap-2 mt-auto pt-4">
                  <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-gradient text-primary-foreground text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-smooth">
                    <Github className="w-4 h-4" /> View Code
                  </a>
                  <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:border-primary hover:text-primary transition-smooth">
                    <ExternalLink className="w-4 h-4" /> Details
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="min-h-screen flex items-center py-28 px-6">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Education" title="Learning & credentials" />
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glow-card rounded-2xl p-8 sm:p-10 min-h-[220px] reveal">
            <div className="flex items-start gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-lg bg-primary/15 text-primary border border-primary/30 shrink-0">
                <GraduationCap />
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold">Bachelor of Technology — Computer Science</h3>
                <p className="text-lg sm:text-xl text-muted-foreground mt-2">Sreenivasa Institute of Technology &amp; Management Studies</p>
                <p className="text-primary text-lg mt-4 font-semibold">Graduated: May 2026</p>
              </div>
            </div>
          </div>
          <div className="glow-card rounded-2xl p-8 min-h-[220px] reveal">
            <div className="flex items-center gap-3 mb-3">
              <Award className="text-primary" />
              <h3 className="font-semibold">Certifications</h3>
            </div>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex gap-2"><span className="text-primary">▸</span> Data Visualization Using Tableau (2024)</li>
            </ul>
          </div>
          <div className="glow-card rounded-2xl p-8 min-h-[220px] reveal">
            <h3 className="font-semibold mb-3">Languages</h3>
            <ul className="space-y-2 text-foreground/90 text-sm">
              <li className="flex justify-between"><span>English</span><span className="text-primary">Professional</span></li>
              <li className="flex justify-between"><span>Telugu</span><span className="text-primary">Native</span></li>
              <li className="flex justify-between"><span>Tamil</span><span className="text-primary">Limited</span></li>
            </ul>
          </div>
          <div className="lg:col-span-2 glow-card rounded-2xl p-8 min-h-[220px] reveal">
            <h3 className="font-semibold mb-3">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {["Software Development","Cloud Computing","Artificial Intelligence","Open Source","Emerging Technologies"].map((i) => (
                <span key={i} className="text-sm px-3 py-1.5 rounded-full border border-primary/40 text-primary bg-primary/10">{i}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = fd.get("name");
    const email = fd.get("email");
    const message = fd.get("message");
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:kanchithejeshreddy@gmail.com?subject=Portfolio%20Contact&body=${body}`;
    setSent(true);
  };
  return (
    <section id="contact" className="min-h-screen flex items-center py-28 px-6 bg-card/30">
      <div className="mx-auto max-w-7xl">
        <SectionHeader kicker="Contact" title="Let's build something" />
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="reveal space-y-4">
            <p className="text-muted-foreground">
              Open to junior Java developer roles, internships, and collaborations. Reach out — I usually respond within a day.
            </p>
            <a href="mailto:kanchithejeshreddy@gmail.com" className="glow-card rounded-xl p-4 flex items-center gap-4 hover:translate-y-[-2px]">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary border border-primary/30"><Mail /></span>
              <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p><p className="font-medium">kanchithejeshreddy@gmail.com</p></div>
            </a>
            <a href="tel:+917013960572" className="glow-card rounded-xl p-4 flex items-center gap-4 hover:translate-y-[-2px]">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary border border-primary/30"><Phone /></span>
              <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p><p className="font-medium">+91 70139 60572</p></div>
            </a>
            <a href="https://linkedin.com/in/kanchi-thejesh-reddy" target="_blank" rel="noreferrer" className="glow-card rounded-xl p-4 flex items-center gap-4 hover:translate-y-[-2px]">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary border border-primary/30"><Linkedin /></span>
              <div><p className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</p><p className="font-medium">kanchi-thejesh-reddy</p></div>
            </a>
            <div className="glow-card rounded-xl p-4 flex items-center gap-4">
              <span className="grid place-items-center w-10 h-10 rounded-lg bg-primary/15 text-primary border border-primary/30"><MapPin /></span>
              <div><p className="text-xs uppercase tracking-wider text-muted-foreground">Location</p><p className="font-medium">Chittoor, Andhra Pradesh, India</p></div>
            </div>
          </div>
          <form onSubmit={onSubmit} className="glow-card rounded-2xl p-6 sm:p-8 reveal space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Name</label>
                <input name="name" required className="mt-1 w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-smooth" placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <input name="email" type="email" required className="mt-1 w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-smooth" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Subject</label>
              <input name="subject" className="mt-1 w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-smooth" placeholder="What's it about?" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Message</label>
              <textarea name="message" required rows={5} className="mt-1 w-full px-4 py-2.5 rounded-lg bg-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-smooth resize-none" placeholder="Tell me about your project or role..." />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-orange-gradient text-primary-foreground font-semibold shadow-glow-sm hover:shadow-glow transition-smooth">
              <Send className="w-4 h-4" /> {sent ? "Opening your mail app…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© 2026 Thejesh Reddy Kanchi. Built with passion and Java.</p>
        <div className="flex items-center gap-3">
          <a href="https://github.com/thejeshtheju2525" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded-lg hover:text-primary transition-smooth"><Github className="w-4 h-4" /></a>
          <a href="https://linkedin.com/in/kanchi-thejesh-reddy" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-lg hover:text-primary transition-smooth"><Linkedin className="w-4 h-4" /></a>
          <a href="mailto:kanchithejeshreddy@gmail.com" aria-label="Email" className="p-2 rounded-lg hover:text-primary transition-smooth"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  useReveal();
  return (
    <div className="bg-background text-foreground min-h-screen">
      <GlowCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
