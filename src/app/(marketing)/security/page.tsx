import { Shield, Lock, Server, Eye, FileCheck, Users, Clock, CheckCircle2 } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Encryption',
    description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.',
  },
  {
    icon: Server,
    title: 'Infrastructure',
    description: 'Hosted on SOC 2 compliant cloud infrastructure with multi-region redundancy.',
  },
  {
    icon: Eye,
    title: 'Access Control',
    description: 'Role-based access control, SSO integration, and comprehensive audit logging.',
  },
  {
    icon: FileCheck,
    title: 'Compliance',
    description: 'SOC 2 Type II certified. GDPR and CCPA compliant data handling practices.',
  },
  {
    icon: Users,
    title: 'Team Security',
    description: 'All employees undergo background checks and security awareness training.',
  },
  {
    icon: Clock,
    title: 'Monitoring',
    description: '24/7 infrastructure monitoring with automated threat detection and response.',
  },
];

const certifications = [
  { name: 'SOC 2 Type II', description: 'Annual audit of security controls' },
  { name: 'GDPR', description: 'EU data protection compliance' },
  { name: 'CCPA', description: 'California privacy compliance' },
  { name: 'ISO 27001', description: 'Information security management' },
];

const practices = [
  'Regular penetration testing by third-party security firms',
  'Vulnerability scanning and patch management',
  'Multi-factor authentication for all team members',
  'Encrypted backups with 30-day retention',
  'Incident response plan with 24-hour notification',
  'Vendor security assessments',
  'Secure development lifecycle (SDLC)',
  'Code review and static analysis',
];

export default function SecurityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Security at AdPilot
            </h1>
            <p className="text-xl text-slate-300">
              Your data security is our top priority. We implement industry-leading 
              security practices to protect your information and maintain your trust.
            </p>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise-grade security
            </h2>
            <p className="text-xl text-gray-600">
              Built from the ground up with security in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Certifications & Compliance
            </h2>
            <p className="text-xl text-gray-600">
              We maintain certifications and comply with regulations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Practices */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our security practices
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We continuously monitor, test, and improve our security posture 
                to stay ahead of threats and protect your data.
              </p>
              <ul className="space-y-3">
                {practices.map((practice) => (
                  <li key={practice} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Report a vulnerability</h3>
              <p className="text-blue-100 mb-6">
                We appreciate responsible disclosure of security vulnerabilities. 
                If you discover a security issue, please report it to our security team.
              </p>
              <a
                href="mailto:security@adpilot.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                security@adpilot.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Data Handling */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How we handle your data
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data minimization</h3>
                <p className="text-gray-600">
                  We only collect and store the data necessary to provide our services. 
                  We don't sell your data or use it for purposes beyond what you've authorized.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data retention</h3>
                <p className="text-gray-600">
                  We retain your data only as long as your account is active. Upon account 
                  deletion, your data is purged from our systems within 90 days.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data portability</h3>
                <p className="text-gray-600">
                  You can export your data at any time through our dashboard or by 
                  contacting support. We provide data in standard formats for easy migration.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Third-party access</h3>
                <p className="text-gray-600">
                  We carefully vet all third-party service providers and require them to 
                  meet our security standards. Access to your data is strictly limited 
                  to what's necessary for service delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Questions about security?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Our security team is happy to answer your questions and provide 
              additional documentation upon request.
            </p>
            <a
              href="mailto:security@adpilot.com"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Contact Security Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

