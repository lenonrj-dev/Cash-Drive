'use client'

import { motion } from 'framer-motion'

export default function SocialProof() {
  const brands = ["iFood", "Uber", "99", "Zé Delivery", "Lalamove"]

  return (
    <section className="py-10 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8"
        >
          Feito para quem vive na rua e precisa de controle rápido
        </motion.p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand} className="text-xl font-bold text-slate-600 flex items-center gap-2">
              <div className="w-6 h-6 bg-slate-300 rounded-full" aria-hidden />
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
