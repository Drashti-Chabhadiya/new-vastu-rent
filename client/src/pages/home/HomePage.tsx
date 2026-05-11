import { BrowseByCategory, FeaturesBar, HeroSection, HowItWorks, OwnerCTA, PopularItems, StatsSection } from "#/features/home"

export function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <StatsSection />
      <BrowseByCategory />
      <PopularItems />
      <HowItWorks />
      <OwnerCTA />
      <FeaturesBar />
    </main>
  )
}

