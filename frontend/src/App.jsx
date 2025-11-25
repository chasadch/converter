import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
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
import PDFEditor from './pages/PDFEditor';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                } />
                <Route path="/documents" element={
                  <ProtectedRoute>
                    <Documents />
                  </ProtectedRoute>
                } />
                <Route path="/pdf-tools" element={
                  <ProtectedRoute>
                    <PdfTools />
                  </ProtectedRoute>
                } />
                <Route path="/pdf-advanced" element={
                  <ProtectedRoute>
                    <PDFAdvanced />
                  </ProtectedRoute>
                } />
                <Route path="/images" element={
                  <ProtectedRoute>
                    <Images />
                  </ProtectedRoute>
                } />
                <Route path="/bg-remover" element={
                  <ProtectedRoute>
                    <BackgroundRemover />
                  </ProtectedRoute>
                } />
                <Route path="/ocr" element={
                  <ProtectedRoute>
                    <OCR />
                  </ProtectedRoute>
                } />
                <Route path="/qr-generator" element={
                  <ProtectedRoute>
                    <QRGenerator />
                  </ProtectedRoute>
                } />
                <Route path="/hash-generator" element={
                  <ProtectedRoute>
                    <HashGenerator />
                  </ProtectedRoute>
                } />
                <Route path="/image-toolkit" element={
                  <ProtectedRoute>
                    <ImageToolkit />
                  </ProtectedRoute>
                } />
                <Route path="/dev-tools" element={
                  <ProtectedRoute>
                    <DevTools />
                  </ProtectedRoute>
                } />
                <Route path="/pdf-editor" element={
                  <ProtectedRoute>
                    <PDFEditor />
                  </ProtectedRoute>
                } />
                <Route path="/media" element={
                  <ProtectedRoute>
                    <Media />
                  </ProtectedRoute>
                } />
                <Route path="/archives" element={
                  <ProtectedRoute>
                    <Archives />
                  </ProtectedRoute>
                } />
                <Route path="/utils" element={
                  <ProtectedRoute>
                    <Utils />
                  </ProtectedRoute>
                } />

                {/* Catch all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

