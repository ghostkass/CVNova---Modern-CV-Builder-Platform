import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Edit, 
  Download, 
  Share, 
  Trash2, 
  Clock, 
  Calendar,
  TrendingUp,
  FileText,
  Star,
  ExternalLink,
  Copy
} from "lucide-react";
import { motion } from "motion/react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";

interface DashboardProps {
  user: any;
  onNavigate: (page: string) => void;
}

interface CV {
  id: string;
  name: string;
  template: string;
  createdAt: string;
  updatedAt: string;
  status: 'Publié' | 'Brouillon' | 'Archivé';
  isPublic?: boolean;
  shareId?: string;
  personalInfo: {
    name: string;
  };
}

const CVThumbnail = ({ type }: { type: string }) => {
  const colors = {
    modern: "from-cyan-500 to-blue-600",
    creative: "from-pink-500 to-purple-600",
    corporate: "from-blue-500 to-indigo-600",
    minimal: "from-gray-500 to-slate-600",
    developer: "from-green-500 to-teal-600"
  };

  return (
    <div className={`w-full h-32 bg-gradient-to-br ${colors[type as keyof typeof colors] || colors.modern} rounded-lg p-3 text-white relative overflow-hidden`}>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-white/30"></div>
      <div className="space-y-2">
        <div className="w-6 h-6 bg-white/20 rounded"></div>
        <div className="space-y-1">
          <div className="h-2 bg-white/80 rounded w-3/4"></div>
          <div className="h-2 bg-white/60 rounded w-1/2"></div>
          <div className="h-2 bg-white/40 rounded w-5/6"></div>
        </div>
        <div className="flex space-x-1 mt-3">
          <div className="h-1.5 bg-white/40 rounded w-8"></div>
          <div className="h-1.5 bg-white/40 rounded w-6"></div>
          <div className="h-1.5 bg-white/40 rounded w-10"></div>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalCvs: 0,
    totalViews: 0,
    totalDownloads: 0,
    avgScore: 0
  });

  useEffect(() => {
    loadCVs();
  }, [user]);

  const loadCVs = async () => {
    if (!user?.access_token) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-a189b8f6/cvs`, {
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load CVs');
      }

      const data = await response.json();
      setCvs(data.cvs || []);
      
      // Calculate stats
      setStats({
        totalCvs: data.cvs?.length || 0,
        totalViews: data.cvs?.reduce((acc: number, cv: any) => acc + (cv.views || 0), 0) || 0,
        totalDownloads: data.cvs?.reduce((acc: number, cv: any) => acc + (cv.downloads || 0), 0) || 0,
        avgScore: data.cvs?.length ? Math.round(data.cvs.reduce((acc: number, cv: any) => acc + (cv.score || 85), 0) / data.cvs.length) : 85
      });
    } catch (error) {
      console.error('Error loading CVs:', error);
      toast.error("Erreur lors du chargement des CV");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCV = async (cvId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce CV ?")) return;

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-a189b8f6/cvs/${cvId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete CV');
      }

      setCvs(prev => prev.filter(cv => cv.id !== cvId));
      toast.success("CV supprimé avec succès");
    } catch (error) {
      console.error('Error deleting CV:', error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleShareCV = async (cvId: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-a189b8f6/cvs/${cvId}/share`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to share CV');
      }

      const data = await response.json();
      
      // Copy to clipboard
      await navigator.clipboard.writeText(data.shareUrl);
      toast.success("Lien de partage copié !");
      
      // Update CV in state
      setCvs(prev => prev.map(cv => 
        cv.id === cvId 
          ? { ...cv, isPublic: true, shareId: data.shareId }
          : cv
      ));
    } catch (error) {
      console.error('Error sharing CV:', error);
      toast.error("Erreur lors du partage");
    }
  };

  const filteredCVs = cvs.filter(cv => 
    cv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cv.personalInfo?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "Aujourd'hui";
    if (diffDays === 2) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  const getUserInitials = (name: string | undefined, email: string | undefined) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                  {getUserInitials(user?.user_metadata?.name || user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl text-slate-900">
                  Bonjour, {user?.user_metadata?.name || user?.name || "Utilisateur"} ! 👋
                </h1>
                <p className="text-slate-600">Gérez vos CV et suivez vos performances</p>
              </div>
            </div>
            
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
              onClick={() => onNavigate("editor")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau CV
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Statistiques */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">CV créés</p>
                  <p className="text-2xl text-slate-900">{stats.totalCvs}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Vues totales</p>
                  <p className="text-2xl text-slate-900">{stats.totalViews}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-green-600">
                  <Eye className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Téléchargements</p>
                  <p className="text-2xl text-slate-900">{stats.totalDownloads}</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-purple-600">
                  <Download className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Score moyen</p>
                  <p className="text-2xl text-slate-900">{stats.avgScore}%</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-amber-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Rechercher vos CV..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filtrer
          </Button>
        </div>

        {/* Liste des CV */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-slate-900">Mes CV ({filteredCVs.length})</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Récents
              </Button>
            </div>
          </div>

          {filteredCVs.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg text-slate-900 mb-2">Aucun CV trouvé</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm ? "Aucun CV ne correspond à votre recherche." : "Commencez par créer votre premier CV !"}
              </p>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                onClick={() => onNavigate("editor")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer mon premier CV
              </Button>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCVs.map((cv, index) => (
                <motion.div
                  key={cv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="p-4">
                      <div className="relative mb-4">
                        <CVThumbnail type={cv.template.toLowerCase().replace(' ', '')} />
                        
                        <div className="absolute top-2 right-2">
                          <Button variant="ghost" size="sm" className="bg-black/20 hover:bg-black/30 text-white">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                        
                        <div className="absolute bottom-2 left-2">
                          <Badge 
                            className={`text-xs ${
                              cv.status === 'Publié' ? 'bg-green-100 text-green-700' :
                              cv.status === 'Brouillon' ? 'bg-amber-100 text-amber-700' :
                              'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {cv.status}
                          </Badge>
                        </div>

                        {cv.isPublic && (
                          <div className="absolute bottom-2 right-2">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Public
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg text-slate-900 group-hover:text-purple-600 transition-colors">
                            {cv.name}
                          </h3>
                          <p className="text-sm text-slate-600">{cv.template}</p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(cv.updatedAt)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-amber-500 fill-current" />
                            <span>85%</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 pt-2 border-t">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={() => onNavigate("editor")}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleShareCV(cv.id)}
                          >
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteCV(cv.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Conseils */}
        {cvs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Card className="p-6 bg-gradient-to-r from-cyan-50 to-purple-50 border-cyan-200">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-slate-900 mb-2">💡 Conseil du jour</h3>
                  <p className="text-slate-700 mb-4">
                    Vos CV ont un excellent score moyen de {stats.avgScore}% ! 
                    Pour les améliorer davantage, ajoutez des mots-clés spécifiques aux postes visés et mettez à jour régulièrement vos expériences.
                  </p>
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                    Optimiser mes CV
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}