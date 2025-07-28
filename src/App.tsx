
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { UnifiedModalProvider } from '@/components/modals/unified/UnifiedModalProvider';
import { EnhancedSecurityProvider } from '@/components/security/EnhancedSecurityProvider';
import { GlobalNotificationManager } from '@/components/common/GlobalNotificationManager';

import { AIAutoFillGlobalManager } from '@/components/ai/AIAutoFillGlobalManager';
import '@/utils/realActionHandler'; // Initialiser le gestionnaire d'actions réelles
import { initializeUniversalButtonHandlers } from '@/utils/universalButtonHandler';
import { realFunctionalSystem } from '@/utils/realFunctionalButtons';
import { initializeSampleData } from '@/data/sampleData';
import { useAppStore } from '@/stores/appStore';

function App() {
  // 🔥 INDICATEUR BRANCHE LYO - CHANGEMENTS ACTIFS
  const [showLyoBanner, setShowLyoBanner] = React.useState(true);
  
  // Initialiser les handlers universels et les données d'exemple au démarrage
  React.useEffect(() => {
    initializeUniversalButtonHandlers();
    
    // Initialiser les données d'exemple seulement si le store est vide
    const store = useAppStore.getState();
    if (store.legalTexts.length === 0) {
      initializeSampleData();
    }

    // SYSTÈME RÉELLEMENT FONCTIONNEL - BRANCHE LYO
    setTimeout(() => {
      realFunctionalSystem.initialize();
      console.log('🎯 BRANCHE LYO: Tous les boutons sont maintenant RÉELLEMENT fonctionnels');
    }, 2000);
  }, []);

  return (
    <EnhancedSecurityProvider>
      <UnifiedModalProvider>
          <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
            <div className="min-h-screen bg-gray-50">
              {/* 🔥 BANNIÈRE TEST BRANCHE LYO */}
              {showLyoBanner && (
                <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-center font-bold relative">
                  🔥 BRANCHE LYO ACTIVE - Dictionnaires juridiques + 2 nouveaux formulaires bibliothèque 🔥
                  <button 
                    onClick={() => setShowLyoBanner(false)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 px-2 py-1 rounded text-sm"
                  >
                    ✕
                  </button>
                </div>
              )}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/:section" element={<Index />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Toaster />
              <AIAutoFillGlobalManager />
              <GlobalNotificationManager />
            </div>
          </BrowserRouter>
        </UnifiedModalProvider>
    </EnhancedSecurityProvider>
  );
}

export default App;

// TEST LYO: Vérification des changements
console.log('🔥 BRANCHE LYO ACTIVE - Changements dictionnaires et bibliothèque appliqués');
