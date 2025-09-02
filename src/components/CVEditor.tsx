import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Languages, 
  Star,
  Plus,
  Download,
  Eye,
  Save,
  Palette,
  Share,
  CheckCircle,
  Loader2
} from "lucide-react";
import { motion } from "motion/react";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";

interface CVEditorProps {
  user: any;
  onNavigate: (page: string) => void;
}

interface CVData {
  id?: string;
  name: string;
  template: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    objective: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
  languages: string[];
  status: 'Brouillon' | 'Publié';
}

export default function CVEditor({ user, onNavigate }: CVEditorProps) {
  const [cvData, setCVData] = useState<CVData>({
    name: "Mon CV",
    template: "Modern Stack",
    personalInfo: {
      name: user?.user_metadata?.name || user?.name || "",
      email: user?.email || "",
      phone: "",
      location: "",
      objective: ""
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    status: 'Brouillon'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges || !user) return;

    const timeoutId = setTimeout(() => {
      handleSave(false); // Silent save
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [cvData, hasUnsavedChanges, user]);

  const handleSave = async (showToast = true) => {
    if (!user?.access_token) {
      toast.error("Vous devez être connecté pour sauvegarder");
      return;
    }

    setIsSaving(true);
    try {
      const url = cvData.id 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-a189b8f6/cvs/${cvData.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-a189b8f6/cvs`;
      
      const method = cvData.id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.access_token}`,
        },
        body: JSON.stringify(cvData),
      });

      if (!response.ok) {
        throw new Error('Failed to save CV');
      }

      const result = await response.json();
      
      if (!cvData.id) {
        setCVData(prev => ({ ...prev, id: result.cv.id }));
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      
      if (showToast) {
        toast.success("CV sauvegardé avec succès !");
      }
    } catch (error) {
      console.error('Error saving CV:', error);
      if (showToast) {
        toast.error("Erreur lors de la sauvegarde");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateCVData = (updates: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...updates }));
    setHasUnsavedChanges(true);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setCVData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
    setHasUnsavedChanges(true);
  };

  const addExperience = () => {
    const newExp = {
      id: crypto.randomUUID(),
      title: "",
      company: "",
      duration: "",
      description: ""
    };
    setCVData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
    setHasUnsavedChanges(true);
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
    setHasUnsavedChanges(true);
  };

  const removeExperience = (id: string) => {
    setCVData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
    setHasUnsavedChanges(true);
  };

  const addEducation = () => {
    const newEdu = {
      id: crypto.randomUUID(),
      degree: "",
      school: "",
      year: ""
    };
    setCVData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
    setHasUnsavedChanges(true);
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
    setHasUnsavedChanges(true);
  };

  const removeEducation = (id: string) => {
    setCVData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
    setHasUnsavedChanges(true);
  };

  const addSkill = (skill: string) => {
    if (!skill.trim() || cvData.skills.includes(skill.trim())) return;
    
    setCVData(prev => ({
      ...prev,
      skills: [...prev.skills, skill.trim()]
    }));
    setHasUnsavedChanges(true);
  };

  const removeSkill = (skill: string) => {
    setCVData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
    setHasUnsavedChanges(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl text-slate-900 mb-2">Connexion requise</h2>
          <p className="text-slate-600 mb-6">Vous devez être connecté pour créer un CV</p>
          <Button onClick={() => onNavigate("home")}>
            Retour à l'accueil
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Input 
                value={cvData.name}
                onChange={(e) => updateCVData({ name: e.target.value })}
                className="text-3xl text-slate-900 border-0 p-0 h-auto bg-transparent shadow-none focus:ring-0"
                placeholder="Nom de votre CV"
              />
              {isSaving && <Loader2 className="w-5 h-5 animate-spin text-purple-600" />}
              {lastSaved && !hasUnsavedChanges && <CheckCircle className="w-5 h-5 text-green-600" />}
            </div>
            <p className="text-slate-600">
              {lastSaved ? `Dernière sauvegarde: ${lastSaved.toLocaleTimeString()}` : "Non sauvegardé"}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center">
              <Palette className="w-4 h-4 mr-2" />
              Thème
            </Button>
            <Button variant="outline" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Aperçu
            </Button>
            <Button 
              onClick={() => handleSave(true)}
              disabled={isSaving}
              variant="outline" 
              className="flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
              <Download className="w-4 h-4 mr-2" />
              Télécharger PDF
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Éditeur */}
          <div className="space-y-6">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal" className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-1" />
                  Personnel
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center text-sm">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Expérience
                </TabsTrigger>
                <TabsTrigger value="education" className="flex items-center text-sm">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Formation
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center text-sm">
                  <Award className="w-4 h-4 mr-1" />
                  Compétences
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card className="p-6 space-y-4">
                  <h3 className="text-lg mb-4">Informations personnelles</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Nom complet</label>
                      <Input 
                        value={cvData.personalInfo.name}
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Email</label>
                      <Input 
                        type="email"
                        value={cvData.personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Téléphone</label>
                      <Input 
                        value={cvData.personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        placeholder="+33 6 12 34 56 78"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Localisation</label>
                      <Input 
                        value={cvData.personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        placeholder="Paris, France"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm mb-2">Objectif professionnel</label>
                    <Textarea 
                      className="min-h-24"
                      value={cvData.personalInfo.objective}
                      onChange={(e) => updatePersonalInfo('objective', e.target.value)}
                      placeholder="Décrivez vos objectifs professionnels..."
                    />
                    <Button variant="ghost" size="sm" className="mt-2 text-purple-600">
                      <Star className="w-4 h-4 mr-1" />
                      Améliorer avec l'IA
                    </Button>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">Expérience professionnelle</h3>
                    <Button size="sm" onClick={addExperience}>
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {cvData.experience.map((exp) => (
                      <div key={exp.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm">Expérience #{cvData.experience.indexOf(exp) + 1}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-600"
                          >
                            Supprimer
                          </Button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input 
                            placeholder="Titre du poste" 
                            value={exp.title}
                            onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                          />
                          <Input 
                            placeholder="Entreprise" 
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          />
                        </div>
                        <Input 
                          placeholder="Période (ex: 2021 - Présent)" 
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                        />
                        <Textarea 
                          placeholder="Description de vos missions et réalisations..." 
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        />
                      </div>
                    ))}
                    
                    {cvData.experience.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Aucune expérience ajoutée</p>
                        <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="education">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">Formation</h3>
                    <Button size="sm" onClick={addEducation}>
                      <Plus className="w-4 h-4 mr-1" />
                      Ajouter
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {cvData.education.map((edu) => (
                      <div key={edu.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm">Formation #{cvData.education.indexOf(edu) + 1}</h4>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-600"
                          >
                            Supprimer
                          </Button>
                        </div>
                        <Input 
                          placeholder="Diplôme obtenu" 
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                        />
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input 
                            placeholder="École/Université" 
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                          />
                          <Input 
                            placeholder="Année" 
                            value={edu.year}
                            onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                    
                    {cvData.education.length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                        <p>Aucune formation ajoutée</p>
                        <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
                      </div>
                    )}
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card className="p-6 space-y-4">
                  <h3 className="text-lg">Compétences & Langues</h3>
                  
                  <div>
                    <label className="block text-sm mb-2">Compétences techniques</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {cvData.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="bg-gradient-to-r from-cyan-100 to-purple-100 text-slate-700 cursor-pointer hover:bg-red-100"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill} ✕
                        </Badge>
                      ))}
                    </div>
                    <Input 
                      placeholder="Ajouter une compétence..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSkill(e.currentTarget.value);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">Langues</label>
                    <div className="space-y-2">
                      {cvData.languages.map((lang, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                          <span>{lang}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCVData(prev => ({
                              ...prev,
                              languages: prev.languages.filter((_, i) => i !== index)
                            }))}
                            className="text-red-600"
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Input 
                      placeholder="Ajouter une langue..."
                      className="mt-2"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          setCVData(prev => ({
                            ...prev,
                            languages: [...prev.languages, e.currentTarget.value.trim()]
                          }));
                          setHasUnsavedChanges(true);
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Aperçu CV */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-6"
          >
            <Card className="p-8 bg-white shadow-xl min-h-[800px]">
              <div className="space-y-6">
                {/* En-tête */}
                <div className="text-center border-b pb-6">
                  <h1 className="text-3xl text-slate-900 mb-2">
                    {cvData.personalInfo.name || "Votre nom"}
                  </h1>
                  <div className="text-slate-600 space-y-1">
                    <p>
                      {cvData.personalInfo.email && `${cvData.personalInfo.email}`}
                      {cvData.personalInfo.email && cvData.personalInfo.phone && " • "}
                      {cvData.personalInfo.phone}
                    </p>
                    {cvData.personalInfo.location && <p>{cvData.personalInfo.location}</p>}
                  </div>
                </div>

                {/* Objectif */}
                {cvData.personalInfo.objective && (
                  <div>
                    <h2 className="text-xl text-slate-900 mb-3 border-l-4 border-cyan-500 pl-3">
                      Objectif Professionnel
                    </h2>
                    <p className="text-slate-700 leading-relaxed">{cvData.personalInfo.objective}</p>
                  </div>
                )}

                {/* Expérience */}
                {cvData.experience.length > 0 && (
                  <div>
                    <h2 className="text-xl text-slate-900 mb-4 border-l-4 border-cyan-500 pl-3">
                      Expérience Professionnelle
                    </h2>
                    <div className="space-y-4">
                      {cvData.experience.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-slate-900">{exp.title || "Titre du poste"}</h3>
                            <span className="text-sm text-slate-500">{exp.duration}</span>
                          </div>
                          <p className="text-purple-600 mb-2">{exp.company || "Nom de l'entreprise"}</p>
                          <p className="text-slate-700 text-sm leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formation */}
                {cvData.education.length > 0 && (
                  <div>
                    <h2 className="text-xl text-slate-900 mb-4 border-l-4 border-purple-500 pl-3">
                      Formation
                    </h2>
                    <div className="space-y-3">
                      {cvData.education.map((edu) => (
                        <div key={edu.id}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-slate-900">{edu.degree || "Diplôme"}</h3>
                              <p className="text-slate-600">{edu.school || "École/Université"}</p>
                            </div>
                            <span className="text-sm text-slate-500">{edu.year}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compétences */}
                {(cvData.skills.length > 0 || cvData.languages.length > 0) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {cvData.skills.length > 0 && (
                      <div>
                        <h2 className="text-lg text-slate-900 mb-3">Compétences</h2>
                        <div className="flex flex-wrap gap-2">
                          {cvData.skills.map((skill, index) => (
                            <Badge key={index} className="bg-gradient-to-r from-cyan-100 to-purple-100 text-slate-700 border-0">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {cvData.languages.length > 0 && (
                      <div>
                        <h2 className="text-lg text-slate-900 mb-3">Langues</h2>
                        <div className="space-y-1">
                          {cvData.languages.map((lang, index) => (
                            <p key={index} className="text-slate-700 text-sm">{lang}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}