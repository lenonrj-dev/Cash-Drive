'use client'

import { useMemo, useState } from 'react'
import { Check, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/landing/ui/Button'
import Card from '@/components/landing/ui/Card'
import BillingCycleToggle from '@/components/common/BillingCycleToggle'
import { routes } from '@/lib/routes'
import { formatCurrencyBRL } from '@/lib/format'
import {
  PRICING,
  formatCycleSuffix,
  formatAnnualSavings,
  getAnnualSavingsCents,
  type BillingCycle
} from '@/lib/pricing'

const plans = [
  {
    key: 'basic',
    name: 'Básico',
    description: 'Ideal para quem quer controlar entradas, saídas e metas diárias.',
    highlight: false,
    features: [
      'Lançamentos ilimitados',
      'Metas diárias e semanais',
      'Contas e vencimentos',
      'Alertas de manutenção da moto'
    ]
  },
  {
    key: 'pro',
    name: 'Pro',
    description: 'Automatize o controle e receba alertas avançados na rotina.',
    highlight: true,
    features: [
      'Tudo do Básico',
      'Assistente inteligente no app',
      'Integração WhatsApp',
      'Notificações avançadas'
    ]
  }
]

export default function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')
  const annualBadge = useMemo(() => {
    const maxSavings = Math.max(
      getAnnualSavingsCents(PRICING.basic.monthlyCents, PRICING.basic.annualCents),
      getAnnualSavingsCents(PRICING.pro.monthlyCents, PRICING.pro.annualCents)
    )
    return `Economize até ${formatCurrencyBRL(maxSavings)}/ano`
  }, [])

  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-4 py-1.5 text-xs font-semibold text-teal-700">
            <Sparkles size={14} /> 15 dias grátis para testar
          </div>
          <h2 className="mt-5 text-3xl md:text-4xl font-bold text-slate-900">Planos que cabem no seu bolso</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Controle entradas e saídas na rua, acompanhe metas e evite surpresas com a moto. Sem letras miúdas.
          </p>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <BillingCycleToggle cycle={cycle} onChange={setCycle} variant="landing" annualBadge={annualBadge} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {plans.map((plan, idx) => {
            const priceCents =
              plan.key === 'basic'
                ? cycle === 'annual'
                  ? PRICING.basic.annualCents
                  : PRICING.basic.monthlyCents
                : cycle === 'annual'
                  ? PRICING.pro.annualCents
                  : PRICING.pro.monthlyCents
            const savings =
              plan.key === 'basic'
                ? formatAnnualSavings(PRICING.basic.monthlyCents, PRICING.basic.annualCents)
                : formatAnnualSavings(PRICING.pro.monthlyCents, PRICING.pro.annualCents)

            return (
              <motion.div
                key={plan.key}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: idx * 0.1 }}
              >
                <Card
                  className={`p-8 relative overflow-hidden ${
                    plan.highlight ? 'border-teal-200 shadow-2xl shadow-teal-200/40' : 'shadow-lg'
                  }`}
                >
                  {plan.highlight ? (
                    <span className="absolute right-6 top-6 rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold text-white">
                      Mais popular
                    </span>
                  ) : null}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Plano</p>
                      <h3 className="mt-2 text-2xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="mt-2 text-sm text-slate-600">{plan.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900 tabular-nums">
                      {formatCurrencyBRL(priceCents)}
                    </span>
                    <span className="text-sm text-slate-500">{formatCycleSuffix(cycle)}</span>
                  </div>

                  {cycle === 'annual' ? (
                    <div className="mt-3 inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                      {savings}
                    </div>
                  ) : null}

                  <div className="mt-2 text-xs text-slate-500">
                    {cycle === 'annual' ? 'Cobrança anual com desconto.' : 'Sem fidelidade no mensal.'}
                  </div>

                  <div className="mt-6">
                    <Button href={routes.auth.login} variant={plan.highlight ? 'primary' : 'secondary'} className="w-full">
                      {plan.highlight ? 'Ativar meu plano' : 'Começar agora'}
                    </Button>
                    <p className="mt-3 text-xs text-slate-500">
                      Cartão obrigatório para iniciar o trial. Cancelamento fácil.
                    </p>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-600">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex gap-2">
                        <Check size={16} className="mt-0.5 text-teal-600" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
