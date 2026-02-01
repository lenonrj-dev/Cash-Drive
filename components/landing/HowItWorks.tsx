'use client'

import { TrendingUp, Fuel } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HowItWorks() {
  const steps = [
    { step: '01', title: 'Inicie o dia', text: 'Registre a km inicial e veja quanto falta para sua meta.' },
    { step: '02', title: 'Lance corridas e gastos', text: 'Abasteceu ou fez uma entrega grande? Lance na hora.' },
    { step: '03', title: 'Feche o caixa', text: 'Informe a km final e veja seu lucro líquido real.' },
    { step: '04', title: 'Analise a semana', text: 'Compare dias lucrativos e corte custos com dados claros.' }
  ]

  return (
    <section id="how" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
              Do início ao fim do dia,
              <br />
              o controle total.
            </h2>
            <div className="space-y-8">
              {steps.map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-50 text-slate-400 font-bold flex items-center justify-center border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                    <p className="text-slate-600">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-4 transform translate-x-4 border border-slate-100">
              <div className="flex justify-between mb-4">
                <span className="font-bold text-slate-700">Meta do dia</span>
                <span className="text-blue-600 font-bold">R$ 200,00</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-3/4" />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-6 transform -translate-x-4 border border-slate-100 relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold">Corrida app X</p>
                  <p className="text-xs text-slate-500">14:30 • Dinheiro</p>
                </div>
                <div className="ml-auto font-bold text-green-600">+ R$ 15,90</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Fuel className="text-red-600" />
                </div>
                <div>
                  <p className="font-bold">Abastecimento</p>
                  <p className="text-xs text-slate-500">Posto Shell • 5L</p>
                </div>
                <div className="ml-auto font-bold text-red-600">- R$ 28,50</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
