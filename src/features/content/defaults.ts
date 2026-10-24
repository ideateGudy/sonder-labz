import { SectionKey, SectionData } from "./schemas";

export const defaults: { [K in SectionKey]: SectionData<K> } = {
  hero: {
    headline: "We build web, mobile and desktop software",
    description:
      "Sonder Labz designs and develops high-impact digital applications for ambitious businesses and founders.",
    primaryCta: "Start a project",
    secondaryCta: "See our work",
  },
  servicesIntro: {
    heading: "What we build",
    subheading:
      "Fullstack software architecture, mobile app engineering, and performant desktop systems.",
  },
  process: {
    heading: "How we work",
    subheading: "A transparent and sequenced process from discovery to production.",
    steps: [
      {
        number: "01",
        title: "Architecture & Discovery",
        body: "We map out user flows, technical constraints, data models, and interface mechanics before writing a line of code.",
      },
      {
        number: "02",
        title: "Sprint Development",
        body: "Rapid build iterations with continuous preview deployments. You test features in real-time as they are completed.",
      },
      {
        number: "03",
        title: "Hardening & Launch",
        body: "Rigorous accessibility, performance, and security testing followed by zero-downtime deployment and handover.",
      },
    ],
  },
  about: {
    heading: "Engineers who obsess over craft",
    story:
      "Sonder is the profound realisation that every individual around you has a life as vivid and complex as your own. At Sonder Labz, we translate that human insight into software that respects user attention, works reliably, and solves real problems. Led by dev.ideategudy.tech, we partner with founders and companies to bring products from idea to market.",
    values: [
      {
        title: "Zero Filler",
        description:
          "No bloated codebases, no fake vanity metrics, no generic agency buzzwords. Just honest engineering.",
      },
      {
        title: "Mobile First & Accessible",
        description:
          "Everything we build responds smoothly from small screens upward and conforms to WCAG 2.2 standards.",
      },
      {
        title: "Long-term Durability",
        description:
          "Modern tech stacks that scale cleanly without accumulating crippling technical debt.",
      },
    ],
  },
  cta: {
    heading: "Have a product in mind?",
    body: "Let's discuss requirements, architecture, and timeline for your upcoming project.",
    button: "Start a project",
  },
  footer: {
    tagline:
      "Sonder Labz designs and builds high-craft web, mobile and desktop applications for ambitious businesses and founders.",
    leadDeveloperUrl: "https://dev.ideategudy.tech",
  },
  privacy: {
    title: "Privacy Policy",
    lastUpdated: "October 2026",
    content:
      "Sonder Labz respects your privacy. We collect minimal information required to communicate with you when you contact us through our website. We do not sell your personal data or track you across third-party websites. Any information submitted via our contact form is used exclusively to respond to your inquiry.",
  },
  terms: {
    title: "Terms of Service",
    lastUpdated: "October 2026",
    content:
      "By using the Sonder Labz website, you agree to these standard terms. Content, trademarks, and code samples displayed on this site are property of Sonder Labz unless otherwise indicated. Service engagements are governed by separate commercial agreements signed between parties.",
  },
};
