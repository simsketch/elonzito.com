export default function Contact() {
  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center hidden">Get in Touch</h2>
        <p className="text-center mb-8">
          Feel free to reach out for collaborations or just a friendly hello
        </p>
        <div className="text-center">
          <a href="mailto:simsketch@gmail.com" className="text-blue-300 hover:text-blue-400 transition-colors duration-300">simsketch@gmail.com</a>
          <p className="mt-2">Phone: (561) 503-9444</p>
          <p className="mt-2">Location: Syracuse, NY</p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <a href="https://github.com/simsketch" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors duration-300">
            GitHub
          </a>
          <a href="https://codepen.io/simsketch" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors duration-300">
            CodePen
          </a>
          <a href="https://stackoverflow.com/users/1579789/simsketch" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-400 transition-colors duration-300">
            Stack Overflow
          </a>
        </div>
      </div>
    </section>
  )
}

