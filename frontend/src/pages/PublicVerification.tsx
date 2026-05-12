import React, { useState } from 'react';
import { BadgeCheck, Search, ShieldX } from 'lucide-react';
import api from '../api';

const PublicVerification: React.FC = () => {
    const [qrCode, setQrCode] = useState('');
    const [verificationResult, setVerificationResult] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!qrCode.trim()) return;

        setLoading(true);
        setError('');
        setVerificationResult(null);
        setSearched(true);

        try {
            const response = await api.get(`/verification/public/${encodeURIComponent(qrCode.trim())}/`);
            setVerificationResult(response.data);
            setLoading(false);
            
        } catch (err: any) {
            console.error(err);
            if (err.response?.status === 404) {
                setVerificationResult({
                    is_valid: false,
                    message: 'No attested document was found for this verification number.',
                });
            } else {
                setError(err.response?.data?.detail || 'Verification failed. Please check the code and try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-8 text-center text-white">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-white/10">
                    <Search className="h-7 w-7" />
                </div>
                <h2 className="mb-2 text-3xl font-bold">Public Document Verification</h2>
                <p className="text-slate-300">Enter the TrueDoc verification number printed on the attested document.</p>
            </div>
            
            <div className="p-8">
            <form onSubmit={handleVerify} className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row">
                    <input
                        type="text"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={qrCode}
                        onChange={(e) => setQrCode(e.target.value)}
                        placeholder="e.g. TD-2026-A1B2C3D4"
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={loading || !qrCode.trim()}
                        className={`rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700 ${loading || !qrCode.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </div>
            </form>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded mb-6 text-center border border-red-100">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {searched && !loading && verificationResult && (
                <div className={`p-6 rounded-lg border flex items-start gap-4 ${verificationResult.is_valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                    {verificationResult.is_valid ? (
                        <>
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <BadgeCheck className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-green-800 mb-4">Document is Authentic!</h3>
                                <div className="space-y-2 text-green-900">
                                    <p><span className="font-semibold">Document:</span> {verificationResult.document_title}</p>
                                    <p><span className="font-semibold">Citizen Name:</span> {verificationResult.citizen_name}</p>
                                    <p><span className="font-semibold">Verified By:</span> {verificationResult.verified_by || 'Approved verifier'}</p>
                                    <p><span className="font-semibold">Attested At:</span> {new Date(verificationResult.attested_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="bg-red-100 p-3 rounded-full text-red-600">
                                <ShieldX className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-800 mb-2">Verification Failed</h3>
                                <p className="text-red-700">{verificationResult.message}</p>
                            </div>
                        </>
                    )}
                </div>
            )}
            
            <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                <p>Organizations can later use this same lookup through the paid API at BDT 2 per call.</p>
            </div>
            </div>
        </div>
    );
};

export default PublicVerification;
