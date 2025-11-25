import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Documents from './pages/Documents';
import Images from './pages/Images';
import Media from './pages/Media';
import Archives from './pages/Archives';
import Utils from './pages/Utils';
import BackgroundRemover from './pages/BackgroundRemover';
import PdfTools from './pages/PdfTools';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <Router>
        <div className="flex min-h-screen bg-background text-text font-sans selection:bg-primary/30 transition-colors duration-300">
          {/* Background Blobs */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse-soft"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[50%] left-[50%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px] animate-float"></div>
          </div>

          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

          {/* Mobile Header / Hamburger */}
          <div className="fixed top-4 left-4 z-30 md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-3 bg-surface/80 backdrop-blur-md border border-border rounded-xl shadow-lg hover:bg-surface transition-all hover:scale-105"
            >
              <Menu size={24} />
            </button>
          </div>

          <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
            <div className="p-4 md:p-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/pdf-tools" element={<PdfTools />} />
                <Route path="/images" element={<Images />} />
                <Route path="/bg-remover" element={<BackgroundRemover />} />
                <Route path="/media" element={<Media />} />
                <Route path="/archives" element={<Archives />} />
                <Route path="/utils" element={<Utils />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
