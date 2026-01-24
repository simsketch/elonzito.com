export default function Projects() {
  const projects = [
    {
      title: "TouchGuides",
      description: "A platform allowing hosts to create personalized recommendations for their guests, ensuring a unique and memorable stay.",
      link: "https://touchguides.com/"
    },
    {
      title: "Greenlight Dining",
      description: "On-demand dining mobile app and web portal using React Native, ReactJS, Node, MongoDB, and Webpack.",
      link: "https://github.com/simsketch/greenlight"
    },
    {
      title: "Cutetitos Match Game",
      description: "Mobile game that reached the Top 100 in the App Store Family Category.",
      link: "https://appadvice.com/app/cutetitos-stickers/1436535267"
    }
  ]

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center hidden">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <p className="text-blue-300 mb-4">{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                View Project
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

