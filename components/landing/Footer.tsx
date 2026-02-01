import { routes } from '@/lib/routes'

export default function Footer() {
  const productLinks = [
    { label: 'Recursos', href: '#features' },
    { label: 'Como funciona', href: '#how' },
    { label: 'Preços', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ]
  const supportLinks = [
    { label: 'Suporte', href: '/suporte' },
    { label: 'Planos', href: routes.public.pricing },
    { label: 'Entrar', href: routes.auth.login }
  ]
  const legalLinks = [
    { label: 'Privacidade', href: routes.public.privacidade },
    { label: 'Termos', href: routes.public.termos },
    { label: 'FAQ', href: routes.public.faq }
  ]

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="text-xl font-bold text-white">Cash Drive</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              O painel financeiro pensado para quem vive na rua, com metas claras e contas sempre em dia.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Produto</h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© 2026 Cash Drive. Feito com cuidado para entregadores.</p>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">Atendimento: suporte@cashdrive.com</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
