import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Merge, Split, RotateCw, Download, Upload, Info } from 'lucide-react';

const PDFAdvanced = () => {
    const [activeTab, setActiveTab] = useState('merge'); // merge, split, rotate, info

    // Merge state
    const [mergeFiles, setMergeFiles] = useState([]);

    // Split state
    const [splitFile, setSplitFile] = useState(null);
    const [pageRange, setPageRange] = useState('');

    // Rotate state
    const [rotateFile, setRotateFile] = useState(null);
    const [rotateAngle, setRotateAngle] = useState(90);

    // Info state
    const [infoFile, setInfoFile] = useState(null);
    const [pdfInfo, setPdfInfo] = useState(null);

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    const handleMergePDFs = async () => {
        if (mergeFiles.length < 2) {
            setError('Please select at least 2 PDF files');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        mergeFiles.forEach(file => formData.append('files', file));

        try {
            const response = await axios.post('/convert/pdf/merge', formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const url = URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'merged.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Merge failed');
            setStatus('error');
        }
    };

    const handleSplitPDF = async () => {
        if (!splitFile || !pageRange.trim()) {
            setError('Please select a file and specify pages');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', splitFile);
        formData.append('pages', pageRange);

        try {
            const response = await axios.post('/convert/pdf/split', formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const url = URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'split.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Split failed');
            setStatus('error');
        }
    };

    const handleRotatePDF = async () => {
        if (!rotateFile) {
            setError('Please select a file');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', rotateFile);
        formData.append('angle', rotateAngle);

        try {
            const response = await axios.post('/convert/pdf/rotate', formData, {
                responseType: 'blob',
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const url = URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'rotated.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Rotation failed');
            setStatus('error');
        }
    };

    const handleGetPDFInfo = async () => {
        if (!infoFile) {
            setError('Please select a file');
            return;
        }

        setStatus('processing');
        setError('');

        const formData = new FormData();
        formData.append('file', infoFile);

        try {
            const response = await axios.post('/convert/pdf/info', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setPdfInfo(response.data);
            setStatus('success');
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to read PDF');
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="text-primary" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-text">PDF Toolkit</h1>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Merge, split, rotate, and analyze PDF files
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                    {[
                        { id: 'merge', icon: Merge, label: 'Merge' },
                        { id: 'split', icon: Split, label: 'Split' },
                        { id: 'rotate', icon: RotateCw, label: 'Rotate' },
                        { id: 'info', icon: Info, label: 'Info' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setError('');
                                setPdfInfo(null);
                            }}
                            className={`py-3 px-4 rounded-lg font-semibold transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white'
                                    : 'bg-surface border border-border text-text hover:bg-surface-hover'
                                }`}
                        >
                            <tab.icon className="inline mr-2" size={20} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Merge PDFs */}
                {activeTab === 'merge' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Merge PDFs</h3>

                        <input
                            type="file"
                            accept=".pdf"
                            multiple
                            onChange={(e) => setMergeFiles(Array.from(e.target.files))}
                            className="hidden"
                            id="merge-input"
                        />
                        <label
                            htmlFor="merge-input"
                            className="block w-full py-12 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                        >
                            <Upload className="mx-auto mb-4 text-text-muted" size={48} />
                            <p className="text-text font-medium">Click to select PDFs</p>
                            <p className="text-sm text-text-muted mt-2">Select 2 or more PDF files</p>
                        </label>

                        {mergeFiles.length > 0 && (
                            <div className="mt-4">
                                <p className="font-medium mb-2">Selected files ({mergeFiles.length}):</p>
                                <ul className="space-y-1">
                                    {mergeFiles.map((file, idx) => (
                                        <li key={idx} className="text-sm text-text-muted">
                                            {idx + 1}. {file.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={handleMergePDFs}
                            disabled={status === 'processing' || mergeFiles.length < 2}
                            className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Merging...' : 'Merge PDFs'}
                        </button>
                    </div>
                )}

                {/* Split PDF */}
                {activeTab === 'split' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Split PDF</h3>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setSplitFile(e.target.files[0])}
                            className="hidden"
                            id="split-input"
                        />
                        <label
                            htmlFor="split-input"
                            className="block w-full py-12 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                        >
                            <Upload className="mx-auto mb-4 text-text-muted" size={48} />
                            <p className="text-text font-medium">
                                {splitFile ? splitFile.name : 'Click to select PDF'}
                            </p>
                        </label>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-text mb-2">
                                Page Range (e.g., 1-3,5,7-9)
                            </label>
                            <input
                                type="text"
                                value={pageRange}
                                onChange={(e) => setPageRange(e.target.value)}
                                placeholder="1-3,5,7-9"
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                            />
                            <p className="text-xs text-text-muted mt-1">
                                Enter page numbers to extract (comma-separated, ranges allowed)
                            </p>
                        </div>

                        <button
                            onClick={handleSplitPDF}
                            disabled={status === 'processing'}
                            className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Splitting...' : 'Split PDF'}
                        </button>
                    </div>
                )}

                {/* Rotate PDF */}
                {activeTab === 'rotate' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">Rotate PDF</h3>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setRotateFile(e.target.files[0])}
                            className="hidden"
                            id="rotate-input"
                        />
                        <label
                            htmlFor="rotate-input"
                            className="block w-full py-12 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                        >
                            <Upload className="mx-auto mb-4 text-text-muted" size={48} />
                            <p className="text-text font-medium">
                                {rotateFile ? rotateFile.name : 'Click to select PDF'}
                            </p>
                        </label>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-text mb-2">
                                Rotation Angle
                            </label>
                            <select
                                value={rotateAngle}
                                onChange={(e) => setRotateAngle(Number(e.target.value))}
                                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-text"
                            >
                                <option value={90}>90° Clockwise</option>
                                <option value={180}>180°</option>
                                <option value={270}>270° (90° Counter-clockwise)</option>
                            </select>
                        </div>

                        <button
                            onClick={handleRotatePDF}
                            disabled={status === 'processing'}
                            className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Rotating...' : 'Rotate PDF'}
                        </button>
                    </div>
                )}

                {/* PDF Info */}
                {activeTab === 'info' && (
                    <div className="bg-surface border border-border rounded-lg p-8">
                        <h3 className="text-xl font-semibold mb-4">PDF Information</h3>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setInfoFile(e.target.files[0])}
                            className="hidden"
                            id="info-input"
                        />
                        <label
                            htmlFor="info-input"
                            className="block w-full py-12 border-2 border-dashed border-border rounded-lg text-center cursor-pointer hover:border-primary transition-colors"
                        >
                            <Upload className="mx-auto mb-4 text-text-muted" size={48} />
                            <p className="text-text font-medium">
                                {infoFile ? infoFile.name : 'Click to select PDF'}
                            </p>
                        </label>

                        <button
                            onClick={handleGetPDFInfo}
                            disabled={status === 'processing'}
                            className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all disabled:opacity-50"
                        >
                            {status === 'processing' ? 'Reading...' : 'Get PDF Info'}
                        </button>

                        {pdfInfo && (
                            <div className="mt-6 p-4 bg-background rounded-lg">
                                <h4 className="font-semibold mb-3">PDF Details:</h4>
                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-text-muted">Pages:</dt>
                                        <dd className="text-text font-medium">{pdfInfo.pages}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-text-muted">Title:</dt>
                                        <dd className="text-text font-medium">{pdfInfo.title}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-text-muted">Author:</dt>
                                        <dd className="text-text font-medium">{pdfInfo.author}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-text-muted">Subject:</dt>
                                        <dd className="text-text font-medium">{pdfInfo.subject}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-text-muted">Creator:</dt>
                                        <dd className="text-text font-medium">{pdfInfo.creator}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-text-muted">Encrypted:</dt>
                                        <dd className="text-text font-medium">{pdfInfo.isEncrypted ? 'Yes' : 'No'}</dd>
                                    </div>
                                </dl>
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

                {/* Success Message */}
                {status === 'success' && !error && !pdfInfo && (
                    <div className="mt-6 p-4 bg-success-light border border-success/30 rounded-lg text-success">
                        Operation completed successfully! File downloaded.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFAdvanced;
