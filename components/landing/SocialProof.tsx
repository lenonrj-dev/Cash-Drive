'use client'

import { motion } from 'framer-motion'

export default function SocialProof() {
  const brands = [
    {
      name: 'iFood',
      src: 'https://res.cloudinary.com/dwf2uc6ot/image/upload/v1770506604/ifood_q753ld.png'
    },
    {
      name: 'Uber',
      src: 'https://res.cloudinary.com/dwf2uc6ot/image/upload/v1770506607/Uber_gxfgko.png'
    },
    {
      name: '99',
      src: 'https://res.cloudinary.com/dwf2uc6ot/image/upload/v1770506610/99_fi4dp7.png'
    },
    {
      name: 'Zé Delivery',
      src: 'https://res.cloudinary.com/dwf2uc6ot/image/upload/v1770506430/zedelivery_oo61he.png'
    },
    {
      name: 'Lalamove',
      src: 'https://res.cloudinary.com/dwf2uc6ot/image/upload/v1770506402/lalamove_luffov.png'
    }
  ]

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

        <div className="flex flex-wrap justify-center gap-8 md:gap-16 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand) => (
            <div key={brand.name} className="text-xl font-bold text-slate-600 flex items-center gap-2">
              <img
                src={brand.src}
                alt={`Logo da ${brand.name}`}
                width={24}
                height={24}
                loading="lazy"
                decoding="async"
                className="w-6 h-6 object-contain"
              />
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
