import {
  Categories,
  Editorial,
  HeroSection,
  HowItWorks,
  Journal,
  OwnerCTA,
} from '#/features/home'

export function HomePage() {
  return (
    <main className="bg-background">
      <HeroSection />
      <Categories />
      <Editorial />
      <HowItWorks />
      <Journal />
      <OwnerCTA />
    </main>
  )
}
