import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Eye, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

const templates = [
  {
    id: 1,
    name: "Corporate Pro",
    category: "Corporate",
    description: "Design élégant pour cadres et managers",
    color: "from-blue-500 to-indigo-600",
    popularity: 4.8,
    uses: 15420,
    preview: "corporate"
  },
  {
    id: 2,
    name: "Creative Burst",
    category: "Créatif",
    description: "Pour designers et créatifs",
    color: "from-pink-500 to-purple-600",
    popularity: 4.9,
    uses: 12350,
    preview: "creative"
  },
  {
    id: 3,
    name: "Developer Edge",
    category: "Tech",
    description: "Spécialisé pour développeurs",
    color: "from-green-500 to-teal-600",
    popularity: 4.7,
    uses: 18950,
    preview: "developer"
  },
  {
    id: 4,
    name: "Minimal Clean",
    category: "Minimaliste",
    description: "Simplicité et élégance",
    color: "from-gray-500 to-slate-600",
    popularity: 4.6,
    uses: 9870,
    preview: "minimal"
  },
  {
    id: 5,
    name: "Modern Stack",
    category: "Moderne",
    description: "Tendance et contemporain",
    color: "from-cyan-500 to-blue-600",
    popularity: 4.8,
    uses: 11250,
    preview: "modern"
  },
  {
    id: 6,
    name: "Executive Suite",
    category: "Executive",
    description: "Pour dirigeants et cadres sup",
    color: "from-amber-500 to-orange-600",
    popularity: 4.5,
    uses: 7890,
    preview: "executive"
  }
];

const TemplatePreview = ({ template }: { template: any }) => {
  return (
    <div className={`w-full h-48 bg-gradient-to-br ${template.color} rounded-lg p-4 text-white relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-white/30"></div>
      
      {template.preview === "corporate" && (
        <div className="space-y-3">
          <div className="w-8 h-8 bg-white/20 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-3 bg-white/80 rounded w-3/4"></div>
            <div className="h-2 bg-white/60 rounded w-1/2"></div>
            <div className="h-2 bg-white/60 rounded w-2/3"></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="h-2 bg-white/40 rounded"></div>
            <div className="h-2 bg-white/40 rounded"></div>
            <div className="h-2 bg-white/40 rounded"></div>
            <div className="h-2 bg-white/40 rounded"></div>
          </div>
        </div>
      )}

      {template.preview === "creative" && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white/80 rounded"></div>
            <div className="w-6 h-6 bg-white/60 rounded-full"></div>
            <div className="w-6 h-6 bg-white/40 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-white/80 rounded w-2/3"></div>
            <div className="h-2 bg-white/60 rounded w-full"></div>
          </div>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-white/60 rounded-full"></div>
            <div className="w-4 h-4 bg-white/40 rounded-full"></div>
            <div className="w-4 h-4 bg-white/20 rounded-full"></div>
          </div>
        </div>
      )}

      {template.preview === "developer" && (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white/80 rounded-full"></div>
            <div className="h-2 bg-white/80 rounded w-1/3"></div>
          </div>
          <div className="space-y-1">
            <div className="h-3 bg-white/80 rounded w-5/6"></div>
            <div className="h-2 bg-white/60 rounded w-4/5"></div>
            <div className="h-2 bg-white/40 rounded w-3/4"></div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="px-2 py-1 bg-white/20 rounded text-xs">JS</div>
            <div className="px-2 py-1 bg-white/20 rounded text-xs">React</div>
            <div className="px-2 py-1 bg-white/20 rounded text-xs">Node</div>
          </div>
        </div>
      )}

      {template.preview === "minimal" && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="h-4 bg-white/80 rounded w-1/2 mx-auto"></div>
            <div className="h-2 bg-white/60 rounded w-1/3 mx-auto"></div>
          </div>
          <div className="space-y-3">
            <div className="h-px bg-white/30 w-full"></div>
            <div className="h-2 bg-white/60 rounded w-3/4"></div>
            <div className="h-2 bg-white/40 rounded w-2/3"></div>
            <div className="h-px bg-white/30 w-full"></div>
          </div>
        </div>
      )}

      {(template.preview === "modern" || template.preview === "executive") && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-white/20 rounded"></div>
            <div className="space-y-1">
              <div className="h-2 bg-white/80 rounded w-16"></div>
              <div className="h-2 bg-white/60 rounded w-12"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-white/80 rounded w-4/5"></div>
            <div className="h-2 bg-white/60 rounded w-full"></div>
            <div className="h-2 bg-white/40 rounded w-3/4"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function TemplateGallery() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-slate-900 mb-4">
            Modèles de CV 
            <span className="bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              {" "}Professionnels
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choisissez parmi nos modèles soigneusement conçus pour chaque secteur d'activité
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-slate-100 rounded-lg p-2">
            <Button variant="ghost" size="sm" className="bg-white shadow-sm">Tous</Button>
            <Button variant="ghost" size="sm">Corporate</Button>
            <Button variant="ghost" size="sm">Créatif</Button>
            <Button variant="ghost" size="sm">Tech</Button>
            <Button variant="ghost" size="sm">Minimaliste</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <TemplatePreview template={template} />
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                      <Button size="sm" variant="secondary">
                        <Eye className="w-4 h-4 mr-1" />
                        Aperçu
                      </Button>
                      <Button size="sm">
                        Utiliser ce modèle
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg text-slate-900">{template.name}</h3>
                    <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        <span className="text-sm">{template.popularity}</span>
                      </div>
                      <span className="text-sm text-slate-500">{template.uses.toLocaleString()} utilisations</span>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            Voir tous les modèles
          </Button>
        </div>
      </div>
    </section>
  );
}