import { ShieldCheck, Info, Smartphone, QrCode, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const ApkDownloadSection = () => {
  const installSteps = [
    { title: 'Download APK', description: 'Click the button below to start the download.' },
    { title: 'Allow Unknown Sources', description: 'Go to Settings > Security and enable "Install from Unknown Sources".' },
    { title: 'Install & Open', description: 'Tap on the downloaded file and follow the prompts to install.' },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-24 px-6 bg-grain">
      {/* Decorative Background Elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content: Info & Download */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 font-sans"
              >
                Mobile Experience
              </motion.span>
              <h1 className="text-5xl lg:text-6xl font-display text-foreground leading-tight">
                Get Our <span className="text-primary">Android App</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-xl leading-relaxed font-sans">
                Experience the best of Vastu Rent on your mobile device. List properties, search rentals, and manage bookings on the go with our fast and secure app.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.a
                href="/app-release.apk"
                download="VastuRent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 transition-all hover:shadow-primary/40 font-sans"
              >
                <div className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs opacity-80 font-medium mb-1 uppercase tracking-tighter">Download for Android</span>
                  <span className="text-xl">Download APK</span>
                </div>
              </motion.a>

              <div className="flex flex-col gap-2 font-sans">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Safe & Secure Download</span>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <span>Version: <b className="text-foreground">v1.0.0</b></span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span>Size: <b className="text-foreground">18.5 MB</b></span>
                </div>
              </div>
            </div>

            {/* Install Steps */}
            <div className="pt-8 border-t border-border font-sans">
              <h3 className="text-lg font-display text-foreground mb-6 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Installation Steps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {installSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">{step.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content: QR & Phone Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative lg:ml-auto"
          >
            {/* Glassmorphism Card */}
            <div className="relative z-10 p-8 rounded-[2.5rem] bg-white backdrop-blur-xl border border-border shadow-soft">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 bg-white rounded-3xl shadow-inner relative overflow-hidden group border border-border">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <QrCode className="w-48 h-48 text-foreground" />
                </div>
                <h3 className="text-xl font-display text-foreground mb-2">Scan to Download</h3>
                <p className="text-muted-foreground text-sm max-w-[200px] font-sans">
                  Point your camera at the QR code to install directly on your phone.
                </p>
                
                <div className="mt-8 flex flex-wrap justify-center gap-3 font-sans">
                  <span className="px-4 py-2 bg-primary-soft/30 rounded-full text-xs text-primary font-medium border border-primary/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Verified by Google
                  </span>
                  <span className="px-4 py-2 bg-primary-soft/30 rounded-full text-xs text-primary font-medium border border-primary/10 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Virus Free
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Shadow */}
            <div className="absolute -inset-4 bg-primary/5 rounded-[3rem] -z-10 blur-xl" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ApkDownloadSection;
