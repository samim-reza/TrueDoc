import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BadgeCheck, Building2, Clock, CreditCard, FileText, ShieldCheck, Upload } from 'lucide-react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DocumentsDashboard from './pages/DocumentsDashboard';
import UploadDocument from './pages/UploadDocument';
import PublicVerification from './pages/PublicVerification';
import Pricing from './pages/Pricing';

const Dashboard = () => (
  <div className="space-y-6">
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-900 to-blue-900 px-6 py-7 text-white">
        <p className="text-sm font-medium text-blue-200">TrueDoc Workspace</p>
        <h1 className="mt-2 text-2xl font-bold">Manage digital attestation from one place</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          Upload scanned documents, request an approved verifier, and share one permanent verification number with banks,
          schools, scholarship offices, and employers.
        </p>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-4">
        {[
          ['Upload', 'Add PDF, JPG, or PNG files', Upload, 'bg-blue-50 text-blue-700'],
          ['Pay BDT 20', 'One request per document', CreditCard, 'bg-emerald-50 text-emerald-700'],
          ['Verifier Review', 'Teacher, officer, or cadre approval', ShieldCheck, 'bg-purple-50 text-purple-700'],
          ['Verify Forever', 'QR and number lookup', BadgeCheck, 'bg-amber-50 text-amber-700'],
        ].map(([title, text, Icon, color]) => (
          <div key={title as string} className="rounded-lg border border-slate-200 p-4">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="font-semibold text-slate-900">{title as string}</p>
            <p className="mt-1 text-sm text-slate-500">{text as string}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-4 border-t border-slate-200 bg-slate-50 p-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4">
          <div className="flex items-center gap-2 text-blue-700"><FileText className="h-4 w-4" /><span className="text-sm font-semibold">Citizen</span></div>
          <p className="mt-2 text-xs text-slate-500">Pays BDT 20 per document attestation.</p>
        </div>
        <div className="rounded-lg bg-white p-4">
          <div className="flex items-center gap-2 text-purple-700"><ShieldCheck className="h-4 w-4" /><span className="text-sm font-semibold">Verifier</span></div>
          <p className="mt-2 text-xs text-slate-500">Pays BDT 100 activation and becomes accountable for approvals.</p>
        </div>
        <div className="rounded-lg bg-white p-4">
          <div className="flex items-center gap-2 text-emerald-700"><Building2 className="h-4 w-4" /><span className="text-sm font-semibold">Organization</span></div>
          <p className="mt-2 text-xs text-slate-500">Pays BDT 2 per API verification call.</p>
        </div>
      </div>
    </section>

    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Total Documents</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">Live</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Pending Reviews</p>
        <p className="mt-2 flex items-center gap-2 text-3xl font-bold text-amber-600"><Clock className="h-6 w-6" /> Queue</p>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">Public Verification</p>
        <p className="mt-2 text-3xl font-bold text-emerald-600">Ready</p>
      </div>
    </div>

    <DocumentsDashboard />
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<DocumentsDashboard />} />
          <Route path="/upload" element={<UploadDocument />} />
          <Route path="/verify" element={<PublicVerification />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* We will add more routes here as we progress */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
