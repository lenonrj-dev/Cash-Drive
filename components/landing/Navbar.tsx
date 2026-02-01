'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/landing/ui/Button'
import { routes } from '@/lib/routes'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#how', label: 'Como funciona' },
    { href: '#features', label: 'Recursos' },
    { href: '#pricing', label: 'Preços' },
    { href: '#faq', label: 'FAQ' }
  ]

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Cash Drive</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href={routes.auth.login}
              className="text-slate-900 font-semibold text-sm hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
            >
              Entrar
            </a>
            <Button href={routes.auth.login} variant="primary" className="py-2.5 px-5 text-sm">
              Começar agora
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-600 font-medium p-2 hover:bg-slate-50 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button href={routes.auth.login} variant="primary" className="w-full justify-center">
            Começar agora
          </Button>
        </div>
      )}
    </nav>
  )
}
