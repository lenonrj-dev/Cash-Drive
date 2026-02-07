'use client'

import { motion } from 'framer-motion'

export default function Newsletter() {
  return (
    <section className="py-20 bg-teal-700 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto px-4 text-center relative z-10"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Receba dicas para lucrar mais na rua</h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          Sem spam. Apenas estratégias de rotas, manutenção preventiva e gestão financeira para entregadores.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter-email">
            Seu melhor e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Seu melhor e-mail"
            className="flex-1 h-12 px-5 rounded-full border border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-700 focus:border-teal-500"
          />
          <button className="h-12 bg-teal-600 text-white px-8 rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-700">
            Quero receber
          </button>
        </form>
        <p className="text-teal-200 text-xs mt-4">Seus dados estão seguros conosco.</p>
      </motion.div>
    </section>
  )
}
