export default function Experience() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "uShip",
      period: "Jan 2022 — Present",
      location: "Remote - Austin, TX",
      highlights: [
        "Architected enterprise-scale GenAI solutions leveraging Document Loaders, Text Embeddings, RAG, vector stores, and LLM frameworks",
        "Led development of AI-powered products using OpenAI Vision API, Python, BeautifulSoup, FastAPI, Flask and custom PyTorch models",
        "Designed and maintained full-stack applications using Next.js, Node.js while implementing microservices architecture",
        "Built and maintained containerized deployment architecture using Docker, Kubernetes, and IaC tools"
      ]
    },
    {
      title: "Principal Software Engineer",
      company: "Ambrose Health",
      period: "Oct 2019 — Dec 2021",
      location: "Deerfield Beach, FL",
      highlights: [
        "Architected and implemented distributed microservices architecture using AWS services",
        "Designed and built mission-critical integration platforms connecting diverse systems",
        "Established robust CI/CD pipelines with blue/green deployment strategies",
        "Created modular frontend applications using React, Angular, and Vue"
      ]
    },
    {
      title: "Software Engineer",
      company: "Extreme Reach",
      period: "Jan 2013 — Oct 2019",
      location: "Remote - Needham, MA",
      highlights: [
        "Led development of high-traffic media platforms for ABC & Fox News using AngularJS and .NET/C#",
        "Architected and optimized cross-platform infrastructure using configuration management tools",
        "Developed automated testing and web scraping solutions using Puppeteer for quality assurance",
        "Built scalable database architecture using MySQL and MS SQL Server"
      ]
    },
    {
      title: "Senior Frontend Developer",
      company: "Adopt-a-Pet",
      period: "Feb 2019 — Oct 2019",
      location: "Contract - Claremont, CA",
      highlights: [
        "Architected and developed high-performance search engine using Vue.js, Vuex, Apollo GraphQL, Hasura, and PostgreSQL",
        "Led mobile-first redesign of web platform with device-specific optimizations",
        "Established comprehensive testing strategy using Cypress, Selenium, and Jest",
        "Enhanced search algorithm efficiency through implementation of advanced filtering and fuzzy matching"
      ]
    },
    {
      title: "Senior Front End Developer",
      company: "Basic Fun!",
      period: "Aug 2018 — Feb 2019",
      location: "Contract - Boca Raton, FL",
      highlights: [
        "Architected and developed brand-focused web platforms using React with custom hooks",
        "Built scalable multi-brand infrastructure using Laravel PHP",
        "Created and optimized responsive email campaigns using Adobe Creative Suite",
        "Implemented SEO-optimized content strategy through technical copywriting and metadata optimization"
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">{exp.title}</h3>
              <p className="text-blue-300 mb-4">{exp.company} | {exp.period} | {exp.location}</p>
              <ul className="list-disc pl-5 space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-gray-200">{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

