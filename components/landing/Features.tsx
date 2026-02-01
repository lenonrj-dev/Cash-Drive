'use client'

import React from 'react'
import { Zap, TrendingUp, Calendar, Fuel, Shield, HelpCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Features() {
  const features = [
    { icon: <Zap />, title: 'Lançamentos rápidos', text: 'Registre ganhos e gastos em segundos, mesmo entre uma corrida e outra.' },
    { icon: <TrendingUp />, title: 'Metas inteligentes', text: 'Defina metas diárias e semanais e acompanhe o progresso em tempo real.' },
    { icon: <Calendar />, title: 'Contas e vencimentos', text: 'Cadastre boletos e parcelas da moto. O app avisa o que já foi pago.' },
    { icon: <Fuel />, title: 'Controle da moto', text: 'Registre km inicial/final e veja seu consumo por litro automaticamente.' },
    { icon: <Shield />, title: 'Alertas de manutenção', text: 'Receba lembretes de troca de óleo e revisões para evitar surpresas.' },
    { icon: <HelpCircle />, title: 'Suporte dedicado', text: 'Atendimento direto para te ajudar a usar o app e interpretar seus números.' }
  ]

  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Tudo o que você precisa para lucrar mais
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Ferramentas simples, desenhadas para uso rápido e com foco no que importa: dinheiro no bolso.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 mb-4 bg-blue-50 w-12 h-12 flex items-center justify-center rounded-xl">
                {React.cloneElement(feat.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
