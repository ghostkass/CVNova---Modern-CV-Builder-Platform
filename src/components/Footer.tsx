import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl mb-4">
                Restez informé des dernières 
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {" "}nouveautés
                </span>
              </h3>
              <p className="text-slate-300 text-lg">
                Recevez nos conseils carrière, nouveaux modèles et fonctionnalités en avant-première
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Input 
                placeholder="Votre adresse email"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 flex-1"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700">
                S'abonner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Liens principaux */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* À propos */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl">CVNova</h2>
                <p className="text-slate-400 text-sm">Créez votre CV parfait</p>
              </div>
            </div>
            
            <p className="text-slate-300 mb-6 leading-relaxed">
              CVNova est la plateforme nouvelle génération pour créer des CV professionnels. 
              Avec notre IA intégrée et nos modèles modernes, démarquez-vous sur le marché du travail.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-3 text-cyan-400" />
                <span>contact@cvnova.fr</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-3 text-purple-400" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-3 text-pink-400" />
                <span>Paris, France</span>
              </div>
            </div>
          </div>

          {/* Produit */}
          <div>
            <h3 className="text-lg mb-6">Produit</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Créer un CV</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Modèles</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Exemples</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Assistant IA</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Lettres de motivation</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Score ATS</a></li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="text-lg mb-6">Ressources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Guides carrière</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Conseils entretien</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Tendances recrutement</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="text-lg mb-6">Entreprise</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Équipe</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Carrières</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Presse</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Partenaires</a></li>
              <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-slate-400">
              <span>&copy; 2025 Oumar BA CVNova. Tous droits réservés.</span>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
                <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm">Suivez-nous</span>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Facebook className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Twitter className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Instagram className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
                <a href="#" className="w-8 h-8 bg-slate-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group">
                  <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}