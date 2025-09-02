import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User, Download, Palette, Sparkles, LogOut, Settings } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";
import { toast } from "sonner@2.0.3";
import Auth from "./Auth";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: any;
  onUserChange: (user: any) => void;
}

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

export default function Header({ currentPage, onNavigate, user, onUserChange }: HeaderProps) {
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        onUserChange({
          ...session.user,
          access_token: session.access_token
        });
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        onUserChange({
          ...session.user,
          access_token: session.access_token
        });
      } else if (event === 'SIGNED_OUT') {
        onUserChange(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [onUserChange]);

  const handleAuthSuccess = (userData: any) => {
    onUserChange(userData);
    setShowAuth(false);
    toast.success("Connexion réussie !");
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onUserChange(null);
      onNavigate("home");
      toast.success("Déconnecté avec succès !");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Erreur lors de la déconnexion");
    }
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

  return (
    <>
      <header className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-400 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold tracking-tight">CVNova</h1>
              <p className="text-white/80 text-sm">Créez votre CV parfait</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate("templates")}
              className={`text-white/90 hover:text-white transition-colors ${
                currentPage === "templates" ? "text-white font-medium" : ""
              }`}
            >
              Modèles
            </button>
            <a href="#" className="text-white/90 hover:text-white transition-colors">Exemples</a>
            <a href="#" className="text-white/90 hover:text-white transition-colors">Conseils</a>
            {user && (
              <button
                onClick={() => onNavigate("dashboard")}
                className={`text-white/90 hover:text-white transition-colors ${
                  currentPage === "dashboard" ? "text-white font-medium" : ""
                }`}
              >
                Mes CV
              </button>
            )}
          </nav>

          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  onClick={() => onNavigate("editor")}
                  className="bg-white text-purple-600 hover:bg-white/90 shadow-lg"
                >
                  Créer un CV
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.user_metadata?.avatar_url} />
                        <AvatarFallback className="bg-white/20 text-white">
                          {getUserInitials(user.user_metadata?.name || user.name, user.email)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.user_metadata?.name || user.name || "Utilisateur"}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onNavigate("dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      Mes CV
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Paramètres
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowAuth(true)}
                >
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
                <Button 
                  className="bg-white text-purple-600 hover:bg-white/90 shadow-lg"
                  onClick={() => setShowAuth(true)}
                >
                  Créer mon CV
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {showAuth && (
        <Auth 
          onAuthSuccess={handleAuthSuccess}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}