export default function PrivacyPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: December 1, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                AdPilot ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard 
                your information when you use our PPC management platform and services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Name and email address</li>
                <li>Company name and job title</li>
                <li>Billing information and payment details</li>
                <li>Phone number (optional)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ad Account Data</h3>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Campaign performance metrics</li>
                <li>Ad spend and budget information</li>
                <li>Keywords, ads, and audience data</li>
                <li>Conversion tracking data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Log files and device information</li>
                <li>IP address and browser type</li>
                <li>Pages viewed and features used</li>
                <li>Timestamps and session duration</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send billing information</li>
                <li>To analyze and optimize your ad campaigns</li>
                <li>To send product updates and marketing communications</li>
                <li>To respond to customer support inquiries</li>
                <li>To improve our platform and develop new features</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information. We may share your data with:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Service providers:</strong> Third-party vendors who help us operate our platform</li>
                <li><strong>Ad platforms:</strong> Google, Meta, Microsoft, Amazon to execute optimizations</li>
                <li><strong>Analytics providers:</strong> To help us understand usage patterns</li>
                <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement industry-standard security measures including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC 2 Type II compliance</li>
                <li>Access controls and authentication mechanisms</li>
                <li>24/7 infrastructure monitoring</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate personal information</li>
                <li>Delete your personal data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-600">
                We retain your personal information for as long as your account is active 
                or as needed to provide services. After account deletion, we may retain 
                certain data for up to 90 days for backup purposes and as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-600">
                If you have questions about this Privacy Policy or our data practices, 
                please contact us at:
              </p>
              <div className="mt-4 text-gray-600">
                <p>AdPilot Privacy Team</p>
                <p>Email: privacy@adpilot.com</p>
                <p>Address: 123 Marketing Lane, Suite 400, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

