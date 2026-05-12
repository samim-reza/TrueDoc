import React, { useState } from 'react';
import { FileUp, ShieldCheck } from 'lucide-react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const UploadDocument: React.FC = () => {
    const [title, setTitle] = useState('');
    const [documentType, setDocumentType] = useState('NID');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!file) {
            setError('Please select a file to upload');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('document_type', documentType);
        formData.append('file', file);

        try {
            await api.post('/documents/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/dashboard');
            
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || 'Failed to upload document');
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-white">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/10">
                    <FileUp className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold">Upload New Document</h2>
                <p className="mt-2 text-sm text-slate-300">
                    Add a clean scan or image. After upload, request a verifier and pay BDT 20 from your dashboard.
                </p>
            </div>
            
            <div className="p-8">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
            
            <form onSubmit={handleUpload} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. My National ID Card"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                    <select
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        required
                    >
                        <option value="NID">National ID</option>
                        <option value="PASSPORT">Passport</option>
                        <option value="DRIVING_LICENSE">Driving License</option>
                        <option value="BIRTH_CERTIFICATE">Birth Certificate</option>
                        <option value="ACADEMIC_CERTIFICATE">Academic Certificate</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload File (PDF, JPG, PNG)</label>
                    <div className="mt-1 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                        <div className="space-y-1 text-center">
                            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                {file ? file.name : "PNG, JPG, PDF up to 10MB"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/dashboard')}
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Uploading...' : 'Upload Document'}
                    </button>
                </div>
            </form>
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                <p>For best results, upload the original scan. Blurry, cropped, or edited files should be rejected by the verifier.</p>
            </div>
            </div>
        </div>
    );
};

export default UploadDocument;
