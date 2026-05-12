import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';

const Register: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        role: searchParams.get('role') === 'verifier' ? 'VERIFIER' : 'CITIZEN'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await api.post('/accounts/register/', formData);
            navigate('/login');
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.detail || "Registration failed. Username or email might be taken.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="bg-white p-8 rounded-xl shadow-sm w-full max-w-xl border border-gray-100">
                <div className="mb-6 text-center">
                    <p className="text-sm font-semibold text-blue-600">Create your TrueDoc account</p>
                    <h2 className="mt-2 text-2xl font-bold text-gray-800">
                        {formData.role === 'VERIFIER' ? 'Verifier Activation' : formData.role === 'ORGANIZATION' ? 'Organization API Access' : 'Citizen Registration'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {formData.role === 'VERIFIER'
                            ? 'Verifier accounts require document review and a BDT 100 activation fee.'
                            : formData.role === 'ORGANIZATION'
                                ? 'Organizations can verify attested documents for BDT 2 per API call.'
                                : 'Citizens can upload documents and request attestation for BDT 20 each.'}
                    </p>
                </div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type="tel"
                        name="phone_number"
                        placeholder="Phone Number"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <select 
                        name="role" 
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="CITIZEN">Citizen</option>
                        <option value="VERIFIER">Verifier / Attestation Officer</option>
                        <option value="ORGANIZATION">Organization / API Client</option>
                    </select>

                    {formData.role === 'VERIFIER' && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                            After signup, upload your NID/service proof from profile verification. Admin approval is required before attesting documents.
                        </div>
                    )}

                    {formData.role === 'ORGANIZATION' && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
                            API keys and billing controls are part of the organization dashboard roadmap.
                        </div>
                    )}

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4 transition-colors">
                        Create Account
                    </button>
                    
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
