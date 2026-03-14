import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Testimonial({ quote, name, role, avatar }: { quote: string; name: string; role: string; avatar?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col gap-6 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={64} className="text-emerald-500 transform rotate-180" />
      </div>
      
      <p className="text-gray-600 italic leading-relaxed relative z-10 text-lg">"{quote}"</p>
      
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          {avatar ? (
            <ImageWithFallback src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-emerald-600 font-medium">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}
