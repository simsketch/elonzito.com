export default function Skills() {
  const skillCategories = [
    {
      category: "Expert",
      skills: [
        "JavaScript", "Node.js", "React", "Vue", "Svelte", "Next.js", "MongoDB",
        "React Native", "Expo", "iOS",
        ".NET", "C#", "MSSQL", ".NET Core",
        "PHP", "MySQL", "Laravel - LAMP",
        "AWS", "Serverless", "Docker", "Kubernetes", "Terraform",
        "Adobe Creative Suite", "WordPress", "WooCommerce",
        "DevOps", "Heroku", "Digital Ocean", "Vercel", "Linux", "Supabase", "VPC"
      ]
    },
    {
      category: "Experienced",
      skills: [
        "Python", "Generative AI", "LLMs", "RAG", "Vector DBs",
        "AngularJS", "Angular", "GraphQL", "Ionic Framework",
        "Python", "Django", "Flask", "Elixir"
      ]
    },
    {
      category: "Skillful",
      skills: ["CRM", "Salesforce", "Zoho", "FreshSales"]
    },
    {
      category: "Beginner",
      skills: ["Kotlin", "Flutter", "Dart", "Android"]
    }
  ]

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center hidden">Skills</h2>
        {skillCategories.map((category, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <span key={i} className="bg-blue-500/20 backdrop-blur-md text-blue-300 px-3 py-1 rounded-full text-sm transform hover:scale-110 transition-all duration-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

