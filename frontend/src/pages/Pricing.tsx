import { BadgeCheck, Building2, CreditCard, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    title: 'Citizen Attestation',
    price: '৳20',
    description: 'Per document request',
    icon: CreditCard,
    points: ['Upload scanned PDF, JPG, or PNG', 'Choose an approved verifier', 'Download QR-backed attested copy'],
  },
  {
    title: 'Verifier Activation',
    price: '৳100',
    description: 'One-time account verification',
    icon: ShieldCheck,
    points: ['Submit identity and service proof', 'Receive citizen requests', 'Accountable approval history'],
  },
  {
    title: 'Organization API',
    price: '৳2',
    description: 'Per verification lookup',
    icon: Building2,
    points: ['Search verification number', 'Confirm attestation status', 'Integrate with office workflows'],
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">TrueDoc Pricing</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Simple fees for a national attestation workflow</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          TrueDoc is designed as a practical SaaS for Bangladesh: citizens pay for attestation, verifiers activate once,
          and organizations pay only when they verify.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <div key={plan.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{plan.title}</h2>
              <div className="mt-4 flex items-end gap-2">
                <span className="text-4xl font-black text-blue-600">{plan.price}</span>
                <span className="pb-1 text-sm text-slate-500">{plan.description}</span>
              </div>
              <div className="mt-6 space-y-3">
                {plan.points.map((point) => (
                  <p key={point} className="flex items-center gap-2 text-sm text-slate-600">
                    <BadgeCheck className="h-4 w-4 text-emerald-600" />
                    {point}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-6 text-center">
        <h2 className="text-xl font-semibold text-slate-900">Ready to test the MVP flow?</h2>
        <p className="mt-2 text-sm text-slate-600">Create a citizen or verifier account and run through upload, request, attestation, and public verification.</p>
        <Link to="/register" className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
          Create Account
        </Link>
      </div>
    </div>
  );
}
