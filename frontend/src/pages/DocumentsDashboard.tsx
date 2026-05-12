import React, { useState, useEffect } from 'react';
import { BadgeCheck, Check, FileText, Loader2, Send, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';

interface Document {
    id: string;
    title: string;
    description?: string;
    document_type: string;
    file: string;
    uploaded_at: string;
    attestations: Attestation[];
}

interface Attestation {
    id: string;
    status: string;
    verification_number: string | null;
    verifier: number;
    verifier_name: string | null;
    requested_at: string;
    attested_at: string | null;
}

interface Verifier {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    designation: string | null;
    workplace: string | null;
    is_verifier_approved: boolean;
}

const DocumentsDashboard: React.FC = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [verifiers, setVerifiers] = useState<Verifier[]>([]);
    const [selectedVerifier, setSelectedVerifier] = useState('');
    const [loading, setLoading] = useState(true);
    const [workingId, setWorkingId] = useState('');
    const [message, setMessage] = useState('');
    const role = localStorage.getItem('role') || 'CITIZEN';

    useEffect(() => {
        fetchDocuments();
        fetchVerifiers();
    }, []);

    const fetchDocuments = async () => {
        try {
            if (role === 'VERIFIER') {
                const response = await api.get('/verification/attestations/');
                setDocuments(response.data.map((item: any) => ({
                    id: item.document,
                    title: item.document_title,
                    document_type: item.document_type,
                    file: '',
                    uploaded_at: item.requested_at,
                    attestations: [item],
                })));
            } else {
                const response = await api.get('/documents/');
                setDocuments(response.data);
            }
        } catch (error) {
            console.error('Error fetching documents', error);
            setMessage('Could not load documents. Please make sure the Django API is running.');
        } finally {
            setLoading(false);
        }
    };

    const fetchVerifiers = async () => {
        try {
            const response = await api.get('/accounts/verifiers/');
            setVerifiers(response.data);
            if (response.data[0]) {
                setSelectedVerifier(String(response.data[0].id));
            }
        } catch (error) {
            console.error('Error fetching verifiers', error);
        }
    };

    const requestAttestation = async (documentId: string) => {
        if (!selectedVerifier) {
            setMessage('Select a verifier before requesting attestation.');
            return;
        }

        setWorkingId(documentId);
        setMessage('');
        try {
            await api.post('/verification/attestations/', {
                document: documentId,
                verifier: selectedVerifier,
            });
            setMessage('Attestation requested. BDT 20 payment is marked for the MVP flow.');
            await fetchDocuments();
        } catch (error: any) {
            console.error(error);
            setMessage(error.response?.data?.detail || 'Could not request attestation.');
        } finally {
            setWorkingId('');
        }
    };

    const updateAttestation = async (attestationId: string, action: 'attest' | 'reject') => {
        setWorkingId(attestationId);
        setMessage('');
        try {
            await api.post(`/verification/attestations/${attestationId}/${action}/`);
            setMessage(action === 'attest' ? 'Document attested with a permanent verification number.' : 'Document rejected.');
            await fetchDocuments();
        } catch (error: any) {
            console.error(error);
            setMessage(error.response?.data?.detail || 'Could not update attestation.');
        } finally {
            setWorkingId('');
        }
    };

    const latestAttestation = (document: Document) => document.attestations?.[0];

    const StatusBadge = ({ status }: { status: string }) => {
        const colors: Record<string, string> = {
            'PENDING': 'bg-yellow-100 text-yellow-800',
            'ATTESTED': 'bg-green-100 text-green-800',
            'REJECTED': 'bg-red-100 text-red-800',
            'NOT_REQUESTED': 'bg-slate-100 text-slate-700',
        };
        const colorClass = colors[status] || 'bg-gray-100 text-gray-800';
        
        return (
            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
                {status}
            </span>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                        {role === 'VERIFIER' ? 'Verifier Review Queue' : 'My Documents'}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        {role === 'VERIFIER'
                            ? 'Review citizen requests and issue a QR-backed verification number.'
                            : 'Documents you have uploaded for one-time attestation.'}
                    </p>
                </div>
                {role !== 'VERIFIER' && (
                    <Link to="/upload" className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                        <FileText className="h-5 w-5" />
                        Upload Document
                    </Link>
                )}
            </div>

            {message && <div className="border-b border-blue-100 bg-blue-50 px-6 py-3 text-sm text-blue-700">{message}</div>}

            {role !== 'VERIFIER' && verifiers.length > 0 && (
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Default verifier for requests</label>
                    <select
                        value={selectedVerifier}
                        onChange={(event) => setSelectedVerifier(event.target.value)}
                        className="w-full max-w-lg rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    >
                        {verifiers.map((verifier) => (
                            <option key={verifier.id} value={verifier.id}>
                                {(verifier.first_name || verifier.last_name) ? `${verifier.first_name} ${verifier.last_name}` : verifier.username}
                                {verifier.designation ? `, ${verifier.designation}` : ''}
                                {verifier.workplace ? ` (${verifier.workplace})` : ''}
                                {verifier.is_verifier_approved ? ' - approved' : ' - pending approval'}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            
            {loading ? (
                <div className="flex items-center justify-center gap-2 p-8 text-center text-gray-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Loading documents...
                </div>
            ) : documents.length === 0 ? (
                <div className="p-12 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {role === 'VERIFIER' ? 'No citizen has requested you yet.' : 'Get started by uploading your first document.'}
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {documents.map((doc) => {
                                const attestation = latestAttestation(doc);
                                const status = attestation?.status || 'NOT_REQUESTED';
                                return (
                                    <tr key={`${doc.id}-${attestation?.id || 'document'}`}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{doc.title}</div>
                                            <div className="text-sm text-gray-500">ID: {doc.id.substring(0, 8)}...</div>
                                            {attestation?.verifier_name && <div className="mt-1 text-xs text-slate-500">Verifier: {attestation.verifier_name}</div>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{doc.document_type.replaceAll('_', ' ')}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {attestation?.verification_number ? (
                                                <span className="font-mono text-emerald-700">{attestation.verification_number}</span>
                                            ) : (
                                                <span>{new Date(doc.uploaded_at).toLocaleDateString()}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {role === 'VERIFIER' && attestation?.status === 'PENDING' ? (
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => updateAttestation(attestation.id, 'attest')}
                                                        disabled={workingId === attestation.id}
                                                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                        Attest
                                                    </button>
                                                    <button
                                                        onClick={() => updateAttestation(attestation.id, 'reject')}
                                                        disabled={workingId === attestation.id}
                                                        className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                                                    >
                                                        <X className="h-4 w-4" />
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : attestation ? (
                                                <span className="inline-flex items-center gap-1 text-slate-500">
                                                    <BadgeCheck className="h-4 w-4" />
                                                    Requested
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => requestAttestation(doc.id)}
                                                    disabled={workingId === doc.id || !selectedVerifier}
                                                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                                >
                                                    <Send className="h-4 w-4" />
                                                    Request Attestation
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DocumentsDashboard;
