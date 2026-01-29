'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-[var(--color-ink)] text-[var(--color-bone)] border-t border-[var(--color-bone)]/10">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="font-display text-2xl tracking-wider">
            EZ<span className="text-[var(--color-rust)]">.</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-[var(--color-rust)] transition-all"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Phone */}
          <a href="tel:+15615039444" className="font-mono text-xs opacity-50 hover:opacity-100 hover:text-[var(--color-rust)] transition-all">
            561.503.9444
          </a>

          {/* Copyright */}
          <div className="font-mono text-xs opacity-40">
            &copy; {currentYear} Elon Zito
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 pt-8 border-t border-[var(--color-bone)]/5 text-center">
          <p className="font-serif italic text-sm opacity-30">
            Designed with intention. Built with precision.
          </p>
        </div>
      </div>
    </footer>
  )
}
