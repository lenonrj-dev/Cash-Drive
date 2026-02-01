import type { Metadata } from 'next'
import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import SocialProof from '@/components/landing/SocialProof'
import Problem from '@/components/landing/Problem'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import Pricing from '@/components/landing/Pricing'
import Integrations from '@/components/landing/Integrations'
import FAQ from '@/components/landing/FAQ'
import Newsletter from '@/components/landing/Newsletter'
import Footer from '@/components/landing/Footer'

export const metadata: Metadata = {
  title: 'Cash Drive | Controle financeiro para motoboys e entregadores',
  description:
    'Controle entradas e saídas, acompanhe metas diárias, cuide da moto e mantenha as contas em dia com o Cash Drive.',
  openGraph: {
    title: 'Cash Drive | Controle financeiro para motoboys e entregadores',
    description:
      'Controle entradas e saídas, acompanhe metas diárias, cuide da moto e mantenha as contas em dia com o Cash Drive.',
    type: 'website',
    url: 'https://cash-drive.vercel.app'
  }
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Cash Drive',
    applicationCategory: 'FinanceApplication',
    description:
      'Dashboard financeiro para motoboys e entregadores: controle de entradas, saídas, metas e manutenção da moto.',
    operatingSystem: 'Web',
    offers: [
      { '@type': 'Offer', price: '9.90', priceCurrency: 'BRL', name: 'Plano Básico' },
      { '@type': 'Offer', price: '14.90', priceCurrency: 'BRL', name: 'Plano Pro' }
    ]
  }

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <Hero />
      <SocialProof />
      <Problem />
      <Features />
      <HowItWorks />
      <Pricing />
      <Integrations />
      <FAQ />
      <Newsletter />
      <Footer />
    </main>
  )
}
