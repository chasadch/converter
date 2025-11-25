import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Documents from './pages/Documents';
import Images from './pages/Images';
import Media from './pages/Media';
import Archives from './pages/Archives';
import Utils from './pages/Utils';
import BackgroundRemover from './pages/BackgroundRemover';
import PdfTools from './pages/PdfTools';
import OCR from './pages/OCR';
import QRGenerator from './pages/QRGenerator';
import PDFAdvanced from './pages/PDFAdvanced';
import HashGenerator from './pages/HashGenerator';
import ImageToolkit from './pages/ImageToolkit';
import DevTools from './pages/DevTools';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-text transition-colors duration-300">
          {/* Background Blobs */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-soft"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          </div>

          <Navbar />

          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/pdf-tools" element={<PdfTools />} />
              <Route path="/pdf-advanced" element={<PDFAdvanced />} />
              <Route path="/images" element={<Images />} />
              <Route path="/bg-remover" element={<BackgroundRemover />} />
              <Route path="/ocr" element={<OCR />} />
              <Route path="/qr-generator" element={<QRGenerator />} />
              <Route path="/hash-generator" element={<HashGenerator />} />
              <Route path="/image-toolkit" element={<ImageToolkit />} />
              <Route path="/dev-tools" element={<DevTools />} />
              <Route path="/media" element={<Media />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/utils" element={<Utils />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
