'use client'

import { Wallet, BarChart3, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import Card from '@/components/landing/ui/Card'

export default function Problem() {
  const problems = [
    {
      icon: <Wallet className="text-red-500" size={32} />,
      title: 'Dinheiro entra, mas some',
      desc: 'Sem anotar gastos pequenos (café, lanche, gorjeta), o lucro real do dia vira um mistério.'
    },
    {
      icon: <BarChart3 className="text-orange-500" size={32} />,
      title: 'Metas sem controle',
      desc: 'Rodar sem saber quanto falta para bater a meta da semana faz você trabalhar mais e ganhar menos.'
    },
    {
      icon: <AlertTriangle className="text-yellow-500" size={32} />,
      title: 'Manutenção surpresa',
      desc: 'Esquecer a troca de óleo ou kit relação pode custar o lucro de uma semana inteira.'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            O desafio financeiro de quem roda o dia inteiro
          </h2>
          <p className="text-lg text-slate-600">
            Você faz dinheiro, mas não sabe para onde ele vai? O Cash Drive resolve os três maiores gargalos do dia a
            dia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
            >
              <Card className="p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
