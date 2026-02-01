'use client'

import { motion } from 'framer-motion'
import { Zap, Shield, Cloud, Smartphone } from 'lucide-react'

const items = [
  {
    icon: <Smartphone className="text-blue-600" />,
    title: 'WhatsApp e notificações',
    description: 'Receba alertas de metas, contas e manutenção direto no celular.'
  },
  {
    icon: <Cloud className="text-blue-600" />,
    title: 'Sincronização segura',
    description: 'Seus dados ficam protegidos e acessíveis em qualquer dispositivo.'
  },
  {
    icon: <Zap className="text-blue-600" />,
    title: 'Importação simplificada',
    description: 'Integre extratos e planilhas para acelerar lançamentos.'
  },
  {
    icon: <Shield className="text-blue-600" />,
    title: 'Privacidade em primeiro lugar',
    description: 'Você controla quem vê seu saldo e quando compartilhar dados.'
  }
]

export default function Integrations() {
  return (
    <section className="bg-white border-t border-slate-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">Integrações</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Conecte o Cash Drive ao seu dia</h2>
            <p className="mt-3 text-slate-600 max-w-xl">
              Integrações pensadas para acelerar sua rotina: alertas rápidos, importação de dados e segurança em cada
              etapa.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="rounded-full border border-slate-200 px-3 py-1">Pix</span>
            <span className="rounded-full border border-slate-200 px-3 py-1">Bancos digitais</span>
            <span className="rounded-full border border-slate-200 px-3 py-1">Planilhas</span>
            <span className="rounded-full border border-slate-200 px-3 py-1">WhatsApp</span>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.08 }}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                {item.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
