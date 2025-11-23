import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Documents from './pages/Documents';
import Images from './pages/Images';
import Media from './pages/Media';
import Archives from './pages/Archives';
import Utils from './pages/Utils';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-text font-sans selection:bg-primary/30">
        {/* Background Blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        </div>

        <Sidebar />

        <main className="flex-1 ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/images" element={<Images />} />
            <Route path="/media" element={<Media />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/utils" element={<Utils />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
