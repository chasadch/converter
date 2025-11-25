import React, { useState } from 'react';
import axios from 'axios';
import { QrCode, Barcode, Download } from 'lucide-react';

const QRGenerator = () => {
    const [activeTab, setActiveTab] = useState('qr'); // 'qr' or 'barcode'

    // QR Code state
    const [qrData, setQrData] = useState('');
    const [qrImage, setQrImage] = useState(null);

    // Barcode state
    const [barcodeData, setBarcodeData] = useState('');
    const [barcodeType, setBarcodeType] = useState('code128');
    const [barcodeImage, setBarcodeImage] = useState(null);

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleGenerateQR = async () => {
        if (!qrData.trim()) {
            setError('Please enter some data');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('data', qrData);
        formData.append('size', 10);
        formData.append('border', 4);
        formData.append('fill_color', 'black');
        formData.append('back_color', 'white');

        try {
            const response = await axios.post('/generate/qr', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setQrImage(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'QR generation failed');
            setStatus('error');
        }
    };

    const handleGenerateBarcode = async () => {
        if (!barcodeData.trim()) {
            setError('Please enter some data');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('data', barcodeData);
        formData.append('barcode_type', barcodeType);

        try {
            const response = await axios.post('/generate/barcode', formData, {
                responseType: 'blob'
            });

            const url = URL.createObjectURL(response.data);
            setBarcodeImage(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Barcode generation failed');
            setStatus('error');
        }
    };

    const handleDownload = (imageUrl, filename) => {
        const a = document.createElement('a');
        a.href = imageUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <QrCode className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">QR Code & Barcode Generator</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Generate QR codes and barcodes for free
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('qr')}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${activeTab === 'qr'
                                ? 'bg-primary text-white'
                                : 'bg-surface border border-border text-text hover:bg-surface-hover'
                            }`}
                    >
                        <QrCode className="inline mr-2" size={20} />
                        QR Code
                    </button>
                    <button
                        onClick={() => setActiveTab('barcode')}
                        className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${activeTab === 'barcode'
                                ? 'bg-primary text-white'
                                : 'bg-surface border border-border text-text hover:bg-surface-hover'
                            }`}
                    >
                        <Barcode className="inline mr-2" size={20} />
                        Barcode
                    </button>
                </div>

                {/* QR Code Generator */}
                {activeTab === 'qr' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Generate QR Code</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Enter text or URL
                                </label>
                                <textarea
                                    value={qrData}
                                    onChange={(e) => setQrData(e.target.value)}
                                    placeholder="https://example.com or any text..."
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text resize-none"
                                    rows={4}
                                />
                            </div>

                            <button
                                onClick={handleGenerateQR}
                                disabled={status === 'processing'}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Generating...' : 'Generate QR Code'}
                            </button>
                        </div>

                        {qrImage && (
                            <div className="mt-6 text-center">
                                <img src={qrImage} alt="QR Code" className="mx-auto border border-border rounded-lg" />
                                <button
                                    onClick={() => handleDownload(qrImage, 'qrcode.png')}
                                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg"
                                >
                                    <Download size={20} />
                                    Download QR Code
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Barcode Generator */}
                {activeTab === 'barcode' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Generate Barcode</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Barcode Type
                                </label>
                                <select
                                    value={barcodeType}
                                    onChange={(e) => setBarcodeType(e.target.value)}
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                >
                                    <option value="code128">Code 128</option>
                                    <option value="code39">Code 39</option>
                                    <option value="ean13">EAN-13 (13 digits)</option>
                                    <option value="ean8">EAN-8 (8 digits)</option>
                                    <option value="upca">UPC-A (12 digits)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-text mb-2">
                                    Enter data
                                </label>
                                <input
                                    type="text"
                                    value={barcodeData}
                                    onChange={(e) => setBarcodeData(e.target.value)}
                                    placeholder="Enter barcode data..."
                                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                                />
                                <p className="text-xs text-text-muted mt-1">
                                    {barcodeType === 'ean13' && 'Enter exactly 13 digits'}
                                    {barcodeType === 'ean8' && 'Enter exactly 8 digits'}
                                    {barcodeType === 'upca' && 'Enter exactly 12 digits'}
                                </p>
                            </div>

                            <button
                                onClick={handleGenerateBarcode}
                                disabled={status === 'processing'}
                                className="w-full px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                            >
                                {status === 'processing' ? 'Generating...' : 'Generate Barcode'}
                            </button>
                        </div>

                        {barcodeImage && (
                            <div className="mt-6 text-center">
                                <img src={barcodeImage} alt="Barcode" className="mx-auto border border-border rounded-lg bg-white p-4" />
                                <button
                                    onClick={() => handleDownload(barcodeImage, `barcode_${barcodeType}.png`)}
                                    className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg"
                                >
                                    <Download size={20} />
                                    Download Barcode
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mt-6 p-4 bg-error-light border border-error/30 rounded-lg text-error">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QRGenerator;
