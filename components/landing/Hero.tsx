'use client'

import { Zap, AlertTriangle, TrendingUp, Fuel } from 'lucide-react'
import { motion } from 'framer-motion'
import Button from '@/components/landing/ui/Button'
import Badge from '@/components/landing/ui/Badge'
import { routes } from '@/lib/routes'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[1000px] bg-gradient-to-b from-teal-50 via-white to-white rounded-[100%] -z-10 blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Badge>Novo: alertas automáticos de manutenção da moto</Badge>

          <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            Controle financeiro na rua,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
              em tempo real.
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Registre entradas e saídas, acompanhe metas diárias, controle o consumo da moto e mantenha as contas em dia —
            tudo no mesmo painel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Button href={routes.auth.login} variant="primary" className="w-full sm:w-auto text-lg px-8 h-14">
              Entrar e testar grátis
            </Button>
            <Button href={routes.auth.login} variant="secondary" className="w-full sm:w-auto text-lg px-8 h-14 gap-2">
              <Zap size={20} className="text-teal-600" />
              Ver planos
            </Button>
          </div>
        </motion.div>

        <div className="relative mx-auto max-w-5xl group perspective-1000">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />

          <div className="relative bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden aspect-[16/10] transform transition-transform duration-700 hover:scale-[1.01] hover:rotate-x-2">
            <div className="bg-slate-800/50 backdrop-blur-md p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="h-2 w-32 bg-slate-700 rounded-full" />
            </div>

            <div className="p-6 grid grid-cols-12 gap-6 h-full text-left">
              <div className="col-span-2 hidden md:block space-y-4 border-r border-white/5 pr-4">
                <div className="h-8 w-8 bg-teal-600 rounded-lg mb-8" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-2 w-full bg-slate-800 rounded-full" />
                ))}
              </div>

              <div className="col-span-12 md:col-span-10 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white text-xl font-bold">Bom dia, Gabriel! 🌍️</h3>
                    <p className="text-slate-400 text-sm">Sua meta diária está 85% completa.</p>
                  </div>
                  <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm font-medium border border-green-500/20">
                    R$ 254,00 Hoje
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                    <p className="text-slate-400 text-xs mb-1">Ganhos (set)</p>
                    <p className="text-white text-2xl font-bold">R$ 4.250</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                    <p className="text-slate-400 text-xs mb-1">Despesas</p>
                    <p className="text-white text-2xl font-bold">R$ 1.100</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className="absolute right-2 top-2 text-yellow-500 animate-pulse">
                      <AlertTriangle size={16} />
                    </div>
                    <p className="text-slate-400 text-xs mb-1">Próxima revisão</p>
                    <p className="text-white text-xl font-bold">em 450 km</p>
                  </div>
                </div>

                <div className="bg-slate-800/30 rounded-xl border border-white/5 h-64 flex items-end justify-between p-6 gap-2">
                  {[30, 45, 25, 60, 75, 50, 80, 95, 55, 40, 65, 85].map((h, i) => (
                    <div
                      key={i}
                      className="w-full bg-teal-600/20 rounded-t-sm hover:bg-teal-500 transition-colors relative group"
                      style={{ height: `${h}%` }}
                    >
                      <div className="absolute bottom-0 w-full bg-teal-600 h-1/2 opacity-50 rounded-t-sm" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -right-8 top-20 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hidden lg:block animate-bounce delay-700">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Meta semanal</p>
                <p className="text-sm font-bold text-slate-900">112% atingida</p>
              </div>
            </div>
          </div>

          <div className="absolute -left-8 bottom-20 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 hidden lg:block animate-bounce delay-1000">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-lg text-red-600">
                <Fuel size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500">Consumo médio</p>
                <p className="text-sm font-bold text-slate-900">32 km/L</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
