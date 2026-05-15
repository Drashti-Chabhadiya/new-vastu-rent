import { ArrowUpRight, Calendar, Clock, Search, Tag } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { Link } from "@tanstack/react-router";
import featureNook from "../../../../public/assets/feature-nook.jpg";
import catFurniture from "../../../../public/assets/cat-furniture.jpg";
import catOutdoor from "../../../../public/assets/cat-outdoor.jpg";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const posts = [
  {
    id: 1,
    tag: "Living",
    title: "The art of the seasonal swap: Rotating your decor",
    excerpt: "Discover the secrets to keeping your home fresh and inspired through the changing seasons with minimal effort and maximum impact.",
    date: "May 12, 2024",
    readTime: "5 min",
    img: featureNook,
    author: "Elena Rossi"
  },
  {
    id: 2,
    tag: "Hosts",
    title: "Inside Anneli's lending atelier in Copenhagen",
    excerpt: "Meet the neighbor who turned her passion for Scandinavian design into a community resource for everyone in her district.",
    date: "May 08, 2024",
    readTime: "8 min",
    img: catFurniture,
    author: "Marcus Lind"
  },
  {
    id: 3,
    tag: "Impact",
    title: "What 25,000 kg of CO₂ looks like in rental impact",
    excerpt: "Measuring the environmental difference of circular consumption in our local neighborhoods through data-driven storytelling.",
    date: "April 28, 2024",
    readTime: "12 min",
    img: catOutdoor,
    author: "Sarah Chen"
  },
  {
    id: 4,
    tag: "Guides",
    title: "How to perfectly photograph your rental items",
    excerpt: "A comprehensive guide to capturing the beauty and utility of your belongings to attract more borrowers.",
    date: "April 15, 2024",
    readTime: "6 min",
    img: featureNook,
    author: "David Kim"
  }
];

export function JournalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative border-b border-border/50 bg-surface/30 px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="max-w-3xl"
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-primary">
              — Our Journal
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-tight text-foreground">
              Stories of objects, people, and shared spaces.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Exploring the intersection of circular living, community heritage, and the beauty of well-kept things.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter/Search Bar */}
      <section className="sticky top-[80px] z-30 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 px-6 py-4 md:flex-row md:items-center md:px-10">
          <div className="flex items-center gap-6 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {["All Stories", "Living", "Impact", "Hosts", "Guides"].map((filter, i) => (
              <button
                key={filter}
                className={`text-[13px] font-medium whitespace-nowrap transition-colors hover:text-primary ${
                  i === 0 ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stories..."
              className="h-10 w-full rounded-full border border-border bg-surface/50 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/5 md:w-[300px]"
            />
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((p, idx) => (
            <motion.div 
              variants={fadeUp} 
              key={p.id}
              className={idx === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <Link to="/about" className="group block">
                <div className={`relative overflow-hidden rounded-[2.5rem] bg-surface ${idx === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
                  <div className="absolute bottom-6 left-6">
                    <span className="rounded-full bg-background/95 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-foreground backdrop-blur-md">
                      {p.tag}
                    </span>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {p.date}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" />
                    {p.readTime}
                  </span>
                </div>

                <h2 className={`mt-5 font-display tracking-tight text-foreground transition-colors group-hover:text-primary ${
                  idx === 0 ? "text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1]" : "text-2xl leading-tight"
                }`}>
                  {p.title}
                </h2>
                
                <p className={`mt-4 text-muted-foreground leading-relaxed ${
                  idx === 0 ? "max-w-2xl text-lg line-clamp-3" : "text-base line-clamp-2"
                }`}>
                  {p.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[13px] font-bold text-foreground transition-all group-hover:gap-3 group-hover:text-primary">
                  Read story <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <div className="mt-24 flex justify-center">
          <button className="rounded-full border border-border px-10 py-4 text-[14px] font-bold transition-all hover:bg-foreground hover:text-background active:scale-95">
            Load more stories
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 md:px-10 md:pb-32">
        <div className="rounded-[3rem] bg-foreground px-6 py-20 text-center text-background md:px-10 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-tight">
              Get the latest stories delivered to your inbox.
            </h2>
            <p className="mt-6 text-lg text-background/70">
              Join 5,000+ neighbors who receive our weekly dispatch on circular living and design.
            </p>
            <form className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Email address"
                className="h-14 w-full rounded-full border border-background/20 bg-background/5 px-8 text-background outline-none transition-all focus:border-background sm:w-[350px]"
              />
              <button className="h-14 w-full rounded-full bg-background px-10 text-[14px] font-bold text-foreground transition-all hover:opacity-90 active:scale-95 sm:w-auto">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
