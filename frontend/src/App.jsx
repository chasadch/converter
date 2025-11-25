import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Documents from './pages/Documents';
import Images from './pages/Images';
import Media from './pages/Media';
import Archives from './pages/Archives';
import Utils from './pages/Utils';
import BackgroundRemover from './pages/BackgroundRemover';
import PdfTools from './pages/PdfTools';
import VideoTools from './pages/VideoTools';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-background text-text font-sans selection:bg-primary/30">
        {/* Background Blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        </div>

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Mobile Header / Hamburger */}
        <div className="fixed top-4 left-4 z-30 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-surface/80 backdrop-blur-md border border-border rounded-xl shadow-lg hover:bg-surface transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        <main className="flex-1 md:ml-64 min-h-screen transition-all duration-300">
          <div className="p-4 md:p-0"> {/* Add padding for mobile content */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/pdf-tools" element={<PdfTools />} />
              <Route path="/images" element={<Images />} />
              <Route path="/bg-remover" element={<BackgroundRemover />} />
              <Route path="/media" element={<Media />} />
              <Route path="/video-tools" element={<VideoTools />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/utils" element={<Utils />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
