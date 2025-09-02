import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import TemplateGallery from "./components/TemplateGallery";
import CVEditor from "./components/CVEditor";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { Toaster } from "sonner@2.0.3";

type PageType = "home" | "editor" | "dashboard" | "templates";

export default function App() {
  const [currentPage, setCurrentPage] =
    useState<PageType>("home");
  const [user, setUser] = useState<any>(null);

  const handleNavigate = (page: PageType) => {
    // Redirect to home if trying to access protected pages without auth
    if ((page === "editor" || page === "dashboard") && !user) {
      setCurrentPage("home");
      return;
    }
    setCurrentPage(page);
  };

  const handleUserChange = (userData: any) => {
    setUser(userData);
    // If user logs out while on protected page, redirect to home
    if (
      !userData &&
      (currentPage === "editor" || currentPage === "dashboard")
    ) {
      setCurrentPage("home");
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "editor":
        return (
          <CVEditor user={user} onNavigate={handleNavigate} />
        );
      case "dashboard":
        return (
          <Dashboard user={user} onNavigate={handleNavigate} />
        );
      case "templates":
        return (
          <div className="pt-20">
            <TemplateGallery />
          </div>
        );
      default:
        return (
          <>
            <Hero />
            <Features />
            <TemplateGallery />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onUserChange={handleUserChange}
      />

      {/* Navigation de développement */}
      <div className="fixed top-20 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 space-y-2">
        <div className="text-xs text-slate-600 mb-2">
          Navigation Dev
        </div>
        <button
          onClick={() => handleNavigate("home")}
          className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
            currentPage === "home"
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Accueil
        </button>
        <button
          onClick={() => handleNavigate("editor")}
          className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
            currentPage === "editor"
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Éditeur CV {!user && "🔒"}
        </button>
        <button
          onClick={() => handleNavigate("dashboard")}
          className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
            currentPage === "dashboard"
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Dashboard {!user && "🔒"}
        </button>
        <button
          onClick={() => handleNavigate("templates")}
          className={`block w-full text-left px-2 py-1 rounded text-sm transition-colors ${
            currentPage === "templates"
              ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Modèles
        </button>

        {user && (
          <div className="pt-2 border-t border-slate-200">
            <div className="text-xs text-green-600 mb-1">
              ✓ Connecté
            </div>
            <div className="text-xs text-slate-500 truncate">
              {user.email}
            </div>
          </div>
        )}
      </div>

      <main>{renderPage()}</main>

      <Footer />
      <Toaster />
    </div>
  );
}