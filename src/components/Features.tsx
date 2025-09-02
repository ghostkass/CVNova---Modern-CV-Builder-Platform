import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Wand2, 
  Download, 
  Cloud, 
  Palette, 
  Smartphone, 
  Brain, 
  Users, 
  Lock,
  Zap,
  Target,
  Globe,
  Award
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Wand2,
    title: "Éditeur Drag & Drop",
    description: "Interface intuitive avec glisser-déposer pour organiser vos sections facilement",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: Brain,
    title: "Assistant IA Intégré",
    description: "IA qui vous aide à rédiger et améliorer le contenu de votre CV automatiquement",
    color: "from-cyan-400 to-cyan-600"
  },
  {
    icon: Palette,
    title: "Thèmes Personnalisables",
    description: "Plus de 50 modèles professionnels avec couleurs et polices personnalisables",
    color: "from-pink-400 to-pink-600"
  },
  {
    icon: Download,
    title: "Export PDF Haute Qualité",
    description: "Téléchargement instantané en PDF optimisé pour impression et envoi",
    color: "from-green-400 to-green-600"
  },
  {
    icon: Cloud,
    title: "Sauvegarde Cloud",
    description: "Vos CV sont automatiquement sauvegardés et accessibles partout",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: Smartphone,
    title: "100% Responsive",
    description: "Interface parfaitement adaptée à tous les appareils et écrans",
    color: "from-indigo-400 to-indigo-600"
  },
  {
    icon: Target,
    title: "Score ATS",
    description: "Analysez la compatibilité de votre CV avec les systèmes de recrutement",
    color: "from-amber-400 to-amber-600"
  },
  {
    icon: Globe,
    title: "CV en Ligne",
    description: "Créez un lien public de votre CV et un QR Code pour un partage facile",
    color: "from-teal-400 to-teal-600"
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Partagez votre CV avec des mentors pour recevoir des conseils",
    color: "from-orange-400 to-orange-600"
  }
];

const stats = [
  { number: "50,000+", label: "Utilisateurs actifs" },
  { number: "100,000+", label: "CV créés" },
  { number: "95%", label: "Taux de satisfaction" },
  { number: "50+", label: "Modèles disponibles" }
];

export default function Features() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl text-slate-900 mb-6">
              Fonctionnalités
              <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
                {" "}Avancées
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              CVNova intègre les dernières technologies pour vous offrir la meilleure expérience de création de CV
            </p>
          </motion.div>
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Grille des fonctionnalités */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl text-slate-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Fonctionnalité mise en avant */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="p-8 lg:p-12 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    Nouveau
                  </Badge>
                </div>
                
                <h3 className="text-3xl lg:text-4xl">
                  IA Générative Intégrée
                </h3>
                
                <p className="text-white/90 text-lg leading-relaxed">
                  Notre nouvelle IA analyse votre profil et génère automatiquement du contenu personnalisé pour chaque section de votre CV. Optimisé pour les mots-clés du secteur et les tendances du recrutement.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center bg-white/20 rounded-lg px-4 py-3">
                    <Award className="w-5 h-5 mr-3" />
                    <span>Suggestions intelligentes</span>
                  </div>
                  <div className="flex items-center bg-white/20 rounded-lg px-4 py-3">
                    <Lock className="w-5 h-5 mr-3" />
                    <span>100% sécurisé</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="text-white/70 text-sm">Assistant IA</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-white/30 rounded-lg p-3 text-sm">
                      "Analysez mon profil de développeur React..."
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 text-sm text-white/80">
                      ✨ Voici 3 améliorations suggérées pour votre CV :
                      <br />• Mettre en avant votre expertise TypeScript
                      <br />• Ajouter vos certifications AWS
                      <br />• Reformuler votre objectif professionnel
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}