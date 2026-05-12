import { Link } from 'react-router-dom';
import {
  Shield,
  CheckCircle,
  QrCode,
  FileText,
  Users,
  Building2,
  ArrowRight,
  Star,
  Globe,
  Lock,
  Zap,
  BarChart2,
  ChevronRight,
  Upload,
  Search,
  BadgeCheck,
  Clock,
  Award,
} from 'lucide-react';

const stats = [
  { label: 'Documents Attested', value: '41,267+', icon: <FileText className="h-5 w-5 text-blue-600" /> },
  { label: 'Verified Users', value: '14,872+', icon: <Users className="h-5 w-5 text-emerald-600" /> },
  { label: 'Approved Verifiers', value: '342', icon: <BadgeCheck className="h-5 w-5 text-purple-600" /> },
  { label: 'Partner Organizations', value: '47', icon: <Building2 className="h-5 w-5 text-amber-600" /> },
];

const steps = [
  {
    step: '01',
    title: 'Upload Your Document',
    description: 'Upload PDF, JPG, or PNG documents securely. Supports all official document types.',
    icon: <Upload className="h-6 w-6 text-blue-600" />,
    color: 'border-blue-200 bg-blue-50',
  },
  {
    step: '02',
    title: 'Select a Verifier',
    description: 'Choose from government-approved verifiers, professors, officers, or authorized officials.',
    icon: <Users className="h-6 w-6 text-purple-600" />,
    color: 'border-purple-200 bg-purple-50',
  },
  {
    step: '03',
    title: 'Pay & Request',
    description: 'Pay BDT 20 via bKash, card, or wallet. Your attestation request is instantly sent.',
    icon: <Zap className="h-6 w-6 text-amber-600" />,
    color: 'border-amber-200 bg-amber-50',
  },
  {
    step: '04',
    title: 'Get Attested PDF',
    description: 'Download your verified PDF with QR code, unique ID, and digital seal embedded.',
    icon: <BadgeCheck className="h-6 w-6 text-emerald-600" />,
    color: 'border-emerald-200 bg-emerald-50',
  },
];

const features = [
  {
    icon: <QrCode className="h-6 w-6 text-blue-600" />,
    title: 'QR-Based Verification',
    description: 'Every attested document gets a unique QR code. Scan to verify instantly anywhere, anytime.',
    bg: 'bg-blue-50',
  },
  {
    icon: <Lock className="h-6 w-6 text-purple-600" />,
    title: 'Tamper-Proof Records',
    description: 'Immutable attestation records with cryptographic integrity. Fraud detection built in.',
    bg: 'bg-purple-50',
  },
  {
    icon: <Globe className="h-6 w-6 text-emerald-600" />,
    title: 'Universal Acceptance',
    description: 'Accepted by banks, universities, embassies, and government offices across Bangladesh.',
    bg: 'bg-emerald-50',
  },
  {
    icon: <Clock className="h-6 w-6 text-amber-600" />,
    title: 'One-Time Attestation',
    description: 'Attest once, verify forever. No need to physically visit offices repeatedly.',
    bg: 'bg-amber-50',
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-red-500" />,
    title: 'Real-Time Dashboard',
    description: 'Track all your documents, attestation status, and payments in one place.',
    bg: 'bg-red-50',
  },
  {
    icon: <Shield className="h-6 w-6 text-slate-600" />,
    title: 'API Access for Orgs',
    description: 'Banks and institutions can verify documents programmatically via REST API.',
    bg: 'bg-slate-100',
  },
];

const testimonials = [
  {
    name: 'Dr. Fatema Begum',
    role: 'HR Manager, BRAC University',
    text: 'TrueDoc saved us countless hours verifying job applicant documents. The API integration is seamless.',
    rating: 5,
    avatar: 'FB',
  },
  {
    name: 'Mohammad Hasan',
    role: 'Student, BUET',
    text: 'Got my scholarship documents attested within 24 hours. The QR code on the certificate was immediately accepted by the embassy.',
    rating: 5,
    avatar: 'MH',
  },
  {
    name: 'Rina Akhter',
    role: 'Loan Officer, Dutch-Bangla Bank',
    text: 'We now verify all customer documents through TrueDoc API. Fraud cases dropped by 90%.',
    rating: 5,
    avatar: 'RA',
  },
];

const pricingHighlights = [
  { title: 'Per Attestation', price: '৳20', desc: 'Pay per document, no subscription needed' },
  { title: 'Verifier Activation', price: '৳100', desc: 'One-time fee for authorized verifiers' },
  { title: 'API per Verification', price: '৳2', desc: 'For organizations using the API' },
];

const trustBadges = ['256-bit encrypted', 'Govt. authorized', 'QR code included', 'Made for Bangladesh'];

const ButtonLink = ({
  to,
  children,
  variant = 'primary',
  iconLeft,
  iconRight,
}: {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'light' | 'dark' | 'outline';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white shadow-lg shadow-blue-950/20 hover:bg-blue-700',
    light: 'border border-white bg-white text-blue-700 hover:bg-blue-50',
    dark: 'border border-slate-600 text-slate-300 hover:bg-slate-800',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700',
  };

  return (
    <Link
      to={to}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition ${variants[variant]}`}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Link>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-24 pb-20">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/20 px-4 py-1.5 text-xs font-medium text-blue-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              Bangladesh's First Digital Attestation Platform
            </div>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
              Attest Once.{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Verify Forever.
              </span>
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Replace manual document attestation with secure digital verification. Trusted by government offices,
              banks, and universities across Bangladesh.
            </p>
            <p className="mb-10 text-sm text-slate-400">
              সত্যিকারের ডিজিটাল সনদ সত্যায়ন — দ্রুত, নিরাপদ, বিশ্বাসযোগ্য
            </p>

            <div className="mb-12 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/register" iconRight={<ArrowRight className="h-5 w-5" />}>
                Start Free — Upload Document
              </ButtonLink>
              <ButtonLink to="/verify" variant="dark" iconLeft={<Search className="h-5 w-5" />}>
                Verify a Document
              </ButtonLink>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-400">
              {trustBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-1">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-300" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                <div className="mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600">
              How It Works
            </span>
            <h2 className="mt-4 mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">Simple 4-Step Process</h2>
            <p className="mx-auto max-w-xl text-slate-500">From upload to verified PDF in as little as 24 hours.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute top-8 left-[75%] z-0 hidden h-0.5 w-[calc(100%-60px)] bg-slate-200 md:block" />
                )}
                <div className={`relative z-10 rounded-xl border p-5 ${step.color}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-lg bg-white p-2.5 shadow-sm">{step.icon}</div>
                    <span className="text-2xl font-black text-slate-200">{step.step}</span>
                  </div>
                  <h3 className="mb-2 font-semibold text-slate-800">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-14 text-center">
            <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-600">
              Platform Features
            </span>
            <h2 className="mt-4 mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">Everything You Need</h2>
            <p className="mx-auto max-w-xl text-slate-500">
              Built for Bangladesh's digital future: secure, scalable, and trusted.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-slate-200 p-6 transition-all hover:border-slate-300 hover:shadow-md"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg} transition-transform group-hover:scale-105`}>
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-slate-800">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-200">Instant Verification</span>
            <h2 className="mt-3 mb-4 text-3xl font-bold sm:text-4xl">Verify Any Document in Seconds</h2>
            <p className="mb-6 leading-relaxed text-blue-100">
              Banks, universities, and employers can instantly verify the authenticity of any TrueDoc-attested document.
              Simply enter the verification ID or scan the QR code.
            </p>
            <ul className="mb-8 space-y-3">
              {[
                'Enter verification number or scan QR code',
                'See verifier details and timestamp',
                'View original document preview',
                'Check if revoked or valid',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-blue-100">
                  <CheckCircle className="h-4 w-4 shrink-0 text-blue-300" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink to="/verify" variant="light" iconRight={<ArrowRight className="h-4 w-4" />}>
              Try Verification
            </ButtonLink>
          </div>

          <div className="rounded-xl bg-white p-6 text-slate-800 shadow-2xl">
            <div className="mb-5 flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-emerald-700">Document Verified — Valid</span>
            </div>

            <div className="mb-4 rounded-xl border border-slate-200 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <FileText className="h-6 w-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">HSC Certificate 2019</p>
                  <p className="text-xs text-slate-500">Educational Certificate • PDF</p>
                  <p className="mt-1 text-xs text-slate-500">Owner: Abdul Karim</p>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[10px] font-semibold uppercase text-slate-500">Verification ID</p>
                <p className="mt-1 break-all font-mono text-xs font-bold text-slate-800">TD-2026-A1B2C3D4</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-[10px] font-semibold uppercase text-slate-500">Attested On</p>
                <p className="mt-1 text-xs font-bold text-slate-800">May 13, 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
              <Award className="h-8 w-8 shrink-0 text-emerald-600" />
              <div>
                <p className="text-xs font-semibold text-emerald-800">Attested by Dr. Ahmed Hassan</p>
                <p className="text-[10px] text-emerald-600">Assoc. Professor, BUET • Approved Verifier</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-600">
              Simple Pricing
            </span>
            <h2 className="mt-4 mb-3 text-3xl font-bold text-slate-800 sm:text-4xl">Pay Only for What You Use</h2>
            <p className="text-slate-500">No monthly subscriptions. Fair, transparent pricing in BDT.</p>
          </div>

          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {pricingHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-blue-200 hover:shadow-md"
              >
                <p className="mb-2 text-sm text-slate-500">{item.title}</p>
                <p className="mb-1 text-4xl font-black text-blue-600">{item.price}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <ButtonLink to="/pricing" variant="outline" iconRight={<ChevronRight className="h-4 w-4" />}>
              View Full Pricing Details
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-slate-800">Trusted Across Bangladesh</h2>
            <p className="text-slate-500">What our users are saying</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-xl border border-slate-200 p-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-slate-600">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-bold text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-slate-900 to-blue-950 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-600">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Ready to Go Digital?</h2>
          <p className="mb-8 text-lg text-slate-300">
            Join 14,000+ citizens and 47 organizations already using TrueDoc for secure document attestation.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink to="/register" iconRight={<ArrowRight className="h-5 w-5" />}>
              Create Free Account
            </ButtonLink>
            <ButtonLink to="/register?role=verifier" variant="dark">
              Register as Verifier
            </ButtonLink>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-white">TrueDoc</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400">
                Bangladesh's premier digital document attestation platform. Secure, fast, trusted.
              </p>
            </div>
            {[
              ['Platform', 'Home', 'Verify Document', 'Pricing', 'API Docs'],
              ['For Users', 'Register as Citizen', 'Become a Verifier', 'Organization API', 'Payment Methods'],
              ['Legal', 'Privacy Policy', 'Terms of Service', 'Security', 'Contact Us'],
            ].map(([title, ...links]) => (
              <div key={title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
                <div className="space-y-2">
                  {links.map((link) => (
                    <p key={link} className="cursor-pointer text-sm text-slate-500 transition-colors hover:text-slate-300">
                      {link}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 sm:flex-row">
            <p className="text-xs text-slate-500">© 2026 TrueDoc Bangladesh. All rights reserved.</p>
            <p className="text-xs text-slate-500">Proudly made in Bangladesh</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
