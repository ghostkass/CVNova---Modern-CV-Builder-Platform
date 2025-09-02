import { Button } from "./ui/button";
import { ArrowRight, Star, Users, Download, Zap } from "lucide-react";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center bg-gradient-to-r from-cyan-100 to-purple-100 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-amber-500 mr-2" />
                <span className="text-sm">Plateforme N°1 en France</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl text-slate-900 tracking-tight leading-tight">
                Créez un CV
                <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent"> 
                  {" "}éblouissant
                </span>
                <br />en quelques minutes
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Avec CVNova, transformez votre expérience en un CV professionnel qui impressionne les recruteurs. 
                IA intégrée, modèles modernes, et exportation parfaite.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Commencer gratuitement
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-slate-300 hover:bg-slate-50">
                Voir les exemples
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-slate-600">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-cyan-500" />
                <span>50,000+ utilisateurs</span>
              </div>
              <div className="flex items-center">
                <Download className="w-5 h-5 mr-2 text-purple-500" />
                <span>100,000+ CV créés</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 to-purple-600"></div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-100 to-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-slate-900">Marie Dubois</h3>
                    <p className="text-slate-600">Développeuse Front-end</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-slate-100 rounded-full">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-4/5"></div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-3/4"></div>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full w-5/6"></div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-sm">React</div>
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">TypeScript</div>
                  <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">Design</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-xl">
              <Star className="w-8 h-8 text-white" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}