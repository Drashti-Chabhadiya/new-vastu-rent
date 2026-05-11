import { Search, ClipboardList, MessageSquareText, CalendarCheck, Home } from "lucide-react"

const steps = [
  {
    step: 1,
    icon: <Search className="h-6 w-6 text-brand-accent stroke-[1.5]" />,
    title: "1. Search",
    description: "Use filters to find what you need.",
  },
  {
    step: 2,
    icon: <ClipboardList className="h-6 w-6 text-brand-accent stroke-[1.5]" />,
    title: "2. Choose",
    description: "Explore details, check availability & price.",
  },
  {
    step: 3,
    icon: <MessageSquareText className="h-6 w-6 text-brand-accent stroke-[1.5]" />,
    title: "3. Connect",
    description: "Chat with the owner and clear your doubts.",
  },
  {
    step: 4,
    icon: <CalendarCheck className="h-6 w-6 text-brand-accent stroke-[1.5]" />,
    title: "4. Book",
    description: "Book the item for your required time.",
  },
  {
    step: 5,
    icon: <Home className="h-6 w-6 text-brand-accent stroke-[1.5]" />,
    title: "5. Rent & Enjoy",
    description: "Receive the item and enjoy your experience.",
  },
]

function StepConnector() {
  return (
    <div className="hidden flex-1 items-center lg:flex px-2 xl:px-4 pt-10">
      <div className="h-px w-full border-t-2 border-dashed border-brand-border" />
      <div className="w-2 h-2 rounded-full bg-brand-border ml-1 shrink-0" />
    </div>
  )
}

function MobileStepConnector() {
  return (
    <div className="flex h-8 justify-center lg:hidden my-2">
      <div className="w-px h-full border-l-2 border-dashed border-brand-border" />
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 sm:mb-12 text-center sm:text-left">
          How It Works
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-0 lg:justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center w-full lg:w-auto lg:flex-row lg:flex-1">
              <div className="flex flex-col items-center text-center max-w-[240px] lg:max-w-[200px]">
                <div className="mb-4">
                  <div className="flex h-[64px] w-[64px] sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full bg-cat-furniture-bg">
                    {step.icon}
                  </div>
                </div>
                <h3 className="mb-2 text-sm font-bold text-gray-900">{step.title}</h3>
                <p className="text-xs leading-relaxed text-gray-500 font-medium px-2 sm:px-4">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <>
                  <StepConnector />
                  <MobileStepConnector />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
