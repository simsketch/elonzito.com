'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    title: "Solutions Architect",
    company: "Yoyo Code",
    period: "May 2025 — Present",
    location: "Remote — Syracuse, NY",
    highlights: [
      "Designed and deployed enterprise-scale AI automation pipelines using n8n, Claude Code, MCP, OpenAI Agents SDK integrated with multi-modal AI services (KlingAI, Midjourney, Hugging Face)—reduced manual workflows by 80%",
      "Built production-ready agentic systems leveraging Mastra.js, LangChain, Agency Swarm, and CrewAI for complex multi-agent orchestration",
      "Implemented RAG solutions on AWS Bedrock and Microsoft Autogen Framework for complex document processing and retrieval"
    ]
  },
  {
    title: "Senior Product Engineer (R+D)",
    company: "Innovative Solutions",
    period: "May 2024 — May 2025",
    location: "Remote — Rochester, NY",
    highlights: [
      "Architected and shipped multi-tenant AI platform \"Tailwinds\" (Python + FastAPI, Next.js, AWS Amplify) with Auth0-based SSO, custom user-management microservice, and RAG-powered data-scraping workflow",
      "Built full DevOps automation: reusable Terraform modules for ECS/Fargate clusters, ALB/NLB, Route 53, and ACM; CI/CD pipelines that promote Docker images from ECR to prod in <10 min with zero downtime",
      "Led WatsonX, Amazon Q, and Langfuse integrations, exposing generative-AI chatflows as pluggable APIs; delivered POCs that unlocked two six-figure sales conversations",
      "Designed container strategy for DarcyAI—converting monolith to micro-containers, eliminating EC2 dependency",
      "Implemented IBM App Connect enterprise flows linking Salesforce, bespoke ERP, and Tailwinds AI; reduced manual data-sync effort by 20 hrs/week with 99.9% SLA compliance",
      "Orchestrated vulnerability-remediation program across eight repos, closing high/critical CVEs within 24 hrs and passing SOC2/Vanta penetration audit"
    ]
  },
  {
    title: "Senior Software Engineer",
    company: "uShip",
    period: "Jan 2022 — Jun 2024",
    location: "Remote — Austin, TX",
    highlights: [
      "Architected enterprise-scale GenAI solutions leveraging Document Loaders, Text Embeddings, RAG, vector stores (Pinecone, Weaviate), and Agentic frameworks using Amazon Bedrock and OpenAI",
      "Led development of AI-powered products using OpenAI Vision API, Python, BeautifulSoup, FastAPI, Flask and custom PyTorch models",
      "Heavy focus on accessibility (a11y) ensuring WCAG 2.1 AA compliance with semantic HTML, ARIA roles, and tools like Axe and Lighthouse",
      "Designed full-stack applications using Next.js, Node.js with microservices architecture serving 100K+ daily requests with Auth0 authentication",
      "Built containerized deployment architecture using Docker, Kubernetes, and IaC tools (Terraform, AWS CDK, CloudFormation)"
    ]
  },
  {
    title: "Principal Software Engineer",
    company: "Ambrose Health",
    period: "Oct 2019 — Dec 2021",
    location: "Deerfield Beach, FL",
    highlights: [
      "Architected distributed microservices using AWS services with API gateway patterns, caching strategies, and horizontal scaling while managing a team of four engineers",
      "Built mission-critical integration platforms connecting ShipEngine, PrintNode, Zoho CRM, FreshSales, and custom e-signature solutions with WebSocket and JWT authentication",
      "Established CI/CD pipelines with blue/green deployment strategies and Docker container orchestration via ECS",
      "Created React Native mobile app leveraging Expo for health monitoring, syncing EHR records using HL7 and FHIR protocols"
    ]
  },
  {
    title: "Software Engineer",
    company: "Extreme Reach",
    period: "Jan 2013 — Oct 2019",
    location: "Remote — Needham, MA",
    highlights: [
      "Led development of high-traffic media platforms for ABC & Fox News using AngularJS and .NET/C# with JW Player integration across AWS and GCP",
      "Architected cross-platform infrastructure using Ansible, Chef, Symfony (PHP), and modern CI practices",
      "Developed automated testing and web scraping solutions using Puppeteer, integrating Twitter APIs and RSS feeds",
      "Built scalable database architecture using MySQL and MS SQL Server with Entity Framework 6 and LINQ"
    ]
  },
  {
    title: "Senior Frontend Developer",
    company: "Adopt-a-Pet",
    period: "Feb 2019 — Oct 2019",
    location: "Contract — Claremont, CA",
    highlights: [
      "Architected high-performance search engine using Vue.js, Vuex, Apollo GraphQL, Hasura, and PostgreSQL—40% faster search, 65% increase in engagement",
      "Led mobile-first redesign reducing bounce rate by 25% and increasing mobile conversion by 35%",
      "Established comprehensive testing with Cypress, Selenium, and Jest achieving 90% coverage",
      "Enhanced search with Elastic Search fuzzy matching leading to 1.5x growth in successful pet adoption matches"
    ]
  },
  {
    title: "Senior Front End Developer",
    company: "Basic Fun!",
    period: "Aug 2018 — Feb 2019",
    location: "Contract — Boca Raton, FL",
    highlights: [
      "Architected brand-focused web platforms using React with Prismic and WordPress headless CMS for basicfun.com",
      "Built multi-brand infrastructure using Laravel PHP for Lite-Brite, K'NEX, Pound Puppies, and Star Wars Science",
      "Developed custom Prismic CMS components enabling marketing teams to manage multilingual content across 12+ brand websites",
      "Established design system using Figma and Adobe XD for My Little Pony, Koosh, and Strawberry Shortcake properties"
    ]
  },
  {
    title: "Lead Developer",
    company: "Core Data",
    period: "Jun 2017 — Jul 2018",
    location: "Contract — Nicosia, Cyprus",
    highlights: [
      "Led team of 5 developers as Technical Team Lead for cryptocurrency and gaming platforms using React, Redux, and WebSocket",
      "Designed custom eCommerce platform with secure cryptocurrency payment processing, wallet integrations, and PCI compliance",
      "Mentored junior developers through complex implementations in PHP and Python for transaction processing and game mechanics",
      "Designed responsive UI components and animation systems using three.js and GSAP"
    ]
  },
  {
    title: "Data Engineer",
    company: "MJ Freeway",
    period: "Apr 2017 — Jun 2017",
    location: "Contract — Denver, CO",
    highlights: [
      "Engineered robust data recovery system following a corporate espionage incident using custom regex patterns and string manipulation",
      "Architected automated database restoration pipeline for hundreds of thousands of SQL backups, reducing manual processing by 80%",
      "Led development of high-performance data processing system using Lumen (PHP) and Python",
      "Developed sophisticated data forensics tools to trace database corruption supporting legal proceedings"
    ]
  },
  {
    title: "UI Engineer",
    company: "4th Down Software",
    period: "Sep 2015 — Apr 2016",
    location: "Remote — Martinsville, NJ",
    highlights: [
      "Led end-to-end design and development of enterprise mobile applications with high-fidelity prototypes using Adobe Creative Suite and Sketch",
      "Architected custom iPad application framework bridging native iOS with web technologies through UIWebView integration",
      "Created extensive library of Vegas-style games using React and Redux with Meteor/Node.js and Python backends",
      "Implemented comprehensive testing strategies using Mocha and Selenium across multiple casino properties"
    ]
  },
  {
    title: "Web Designer",
    company: "J&R Marketing",
    period: "Jun 2012 — Jan 2013",
    location: "Deerfield Beach, FL",
    highlights: [
      "Led comprehensive UI/UX design initiatives across web and mobile platforms using Sketch and Adobe Creative Suite",
      "Designed high-converting email marketing campaigns and landing pages with brand consistency",
      "Overhauled eCommerce experience with mobile-first design principles increasing mobile traffic and conversion rates"
    ]
  },
  {
    title: "Web Developer",
    company: "PhoneGuard",
    period: "Jul 2011 — Jun 2012",
    location: "Boca Raton, FL",
    highlights: [
      "Led development of high-profile mobile campaign featuring Justin Bieber across Android, web, and social platforms",
      "Built rich media experiences using jQuery Mobile and HTML5 Canvas for Android 2.3-4.0",
      "Developed .NET solutions integrating with Facebook Open Graph API and Twitter REST API"
    ]
  },
  {
    title: "Creative Director",
    company: "Strategic Marketing",
    period: "Jan 2011 — Jun 2011",
    location: "Palm Beach Gardens, FL",
    highlights: [
      "Directed comprehensive brand identity projects including print collateral, packaging, logo design, and visual style guides",
      "Spearheaded UI/UX design for eCommerce platforms enhancing conversion rates",
      "Conceptualized and executed multi-channel marketing campaigns across email, social media, landing pages, and print"
    ]
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const displayedExperiences = showAll ? experiences : experiences.slice(0, 6)

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 bg-[var(--color-ink)] text-[var(--color-bone)] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-bone) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-editorial relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div
              className={`${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
            >
              <span className="number-indicator text-[var(--color-bone)]/50">02</span>
              <h2 className="heading-section mt-2">Experience</h2>
              <div className="w-12 h-1 bg-[var(--color-rust)] mt-4" />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p
              className={`font-serif text-xl md:text-2xl leading-relaxed opacity-70 max-w-2xl ${
                isVisible ? 'animate-reveal-up delay-100 opacity-100' : 'opacity-0'
              }`}
            >
              14+ years of building products, leading teams, and pushing the boundaries
              of what&apos;s possible with code.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {displayedExperiences.map((exp, index) => (
            <div
              key={index}
              className={`group grid lg:grid-cols-12 gap-8 py-12 border-t border-[var(--color-bone)]/10 hover:bg-[var(--color-bone)]/5 transition-colors duration-300 ${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 2) * 50}ms` }}
            >
              {/* Left column - Meta */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <div className="font-mono text-xs uppercase tracking-wider opacity-50">
                  {exp.period}
                </div>
                <h3 className="font-display text-2xl tracking-wide group-hover:text-[var(--color-rust)] transition-colors">
                  {exp.title}
                </h3>
                <div className="font-serif italic text-lg opacity-80">
                  {exp.company}
                </div>
                <div className="font-mono text-xs opacity-40 mt-1">
                  {exp.location}
                </div>
              </div>

              {/* Right column - Details */}
              <div className="lg:col-span-8">
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="font-mono text-sm leading-relaxed opacity-70 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[var(--color-rust)] before:rounded-full"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Show more/less button */}
        {experiences.length > 6 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-sm uppercase tracking-widest px-8 py-4 border border-[var(--color-bone)]/30 hover:border-[var(--color-rust)] hover:text-[var(--color-rust)] transition-colors"
            >
              {showAll ? 'Show Less' : `Show All ${experiences.length} Positions`}
            </button>
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-[var(--color-bone)]/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border border-[var(--color-bone)]/10" style={{ transform: 'rotate(45deg)' }} />
    </section>
  )
}
