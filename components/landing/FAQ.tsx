'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'O Cash Drive é para quem?',
      a: 'Para motoboys, entregadores de app, motoristas e qualquer profissional autônomo que precisa controlar ganhos na rua.'
    },
    {
      q: 'Consigo separar combustível do meu lucro?',
      a: 'Sim. Você registra o gasto e o app calcula o lucro líquido, mostrando o que sobra de verdade no bolso.'
    },
    {
      q: 'Funciona sem internet?',
      a: 'O app salva os dados no celular e sincroniza quando você tiver conexão, evitando perda de lançamentos.'
    },
    {
      q: 'Como funcionam os alertas de óleo?',
      a: 'Você define a frequência (ex.: 5.000 km) e o app avisa quando estiver chegando perto da troca.'
    }
  ]

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900">Perguntas frequentes</h2>
          <p className="mt-3 text-slate-600">
            Respostas rápidas para você decidir com segurança.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((item, idx) => (
            <div key={item.q} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="font-semibold text-slate-900">{item.q}</span>
                <ChevronDown
                  className={`text-slate-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === idx && (
                <div className="p-5 pt-0 text-slate-600 bg-slate-50/50 border-t border-slate-100">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
