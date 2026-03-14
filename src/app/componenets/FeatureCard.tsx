import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay, duration: 0.6 }}
      className="bg-white/90 backdrop-blur-sm border border-emerald-50 rounded-2xl p-6 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 transform hover:-translate-y-1 group"
    >
      <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-emerald-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed font-light">
        {description}
      </p>
    </motion.div>
  );
}
