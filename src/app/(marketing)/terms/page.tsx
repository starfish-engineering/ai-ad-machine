export default function TermsPage() {
  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: December 1, 2025</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing or using AdPilot's services, you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not 
                agree with any of these terms, you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-600 mb-4">
                AdPilot provides a software-as-a-service (SaaS) platform for managing, 
                monitoring, and optimizing pay-per-click (PPC) advertising campaigns across 
                multiple platforms including Google Ads, Meta Ads, Microsoft Ads, and Amazon Ads.
              </p>
              <p className="text-gray-600">
                Our services include campaign monitoring, automated optimizations, reporting, 
                alerting, and analytics tools designed to help businesses improve their 
                paid media performance.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must be at least 18 years old to use our services</li>
                <li>You may not share your account with unauthorized users</li>
                <li>One person or entity may not maintain more than one free account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Ad Platform Authorization</h2>
              <p className="text-gray-600 mb-4">
                By connecting your ad accounts to AdPilot, you authorize us to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Access and retrieve data from your advertising accounts</li>
                <li>Make changes to your campaigns when you approve optimizations</li>
                <li>Store and process your advertising data as described in our Privacy Policy</li>
              </ul>
              <p className="text-gray-600 mt-4">
                You represent that you have the authority to grant these permissions for 
                the ad accounts you connect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Subscription and Payment</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Subscription fees are billed in advance on a monthly or annual basis</li>
                <li>All fees are non-refundable except as required by law</li>
                <li>We may change pricing with 30 days notice</li>
                <li>Failed payment may result in service suspension</li>
                <li>You are responsible for all taxes applicable to your subscription</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Acceptable Use</h2>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use the service for any illegal purpose</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Reverse engineer or decompile any part of the service</li>
                <li>Use automated systems to access the service (except approved APIs)</li>
                <li>Resell or redistribute the service without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600">
                All content, features, and functionality of AdPilot are owned by us and 
                are protected by international copyright, trademark, and other intellectual 
                property laws. You may not copy, modify, or distribute our content without 
                explicit permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
              <p className="text-gray-600">
                THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. WE DISCLAIM 
                ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED 
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND 
                NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SERVICE WILL BE UNINTERRUPTED, 
                SECURE, OR ERROR-FREE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-600">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ADPILOT SHALL NOT BE LIABLE FOR ANY 
                INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING 
                BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, 
                REGARDLESS OF WHETHER WE WERE ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600">
                We may terminate or suspend your account immediately, without prior notice, 
                for conduct that we believe violates these Terms or is harmful to other 
                users, us, or third parties, or for any other reason at our sole discretion. 
                Upon termination, your right to use the service will immediately cease.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these terms at any time. We will notify you 
                of any material changes by posting the new Terms on this page and updating 
                the "Last updated" date. Your continued use of the service after such 
                changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="mt-4 text-gray-600">
                <p>AdPilot Legal Team</p>
                <p>Email: legal@adpilot.com</p>
                <p>Address: 123 Marketing Lane, Suite 400, San Francisco, CA 94105</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

