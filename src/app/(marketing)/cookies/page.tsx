import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <main className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: November 1, 2025</p>

          <div className="prose prose-gray max-w-none">
            <p>
              This Cookie Policy explains how Draper (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) uses cookies and 
              similar tracking technologies when you visit our website at draperads.com and use our services.
            </p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) 
              when you visit a website. They help the website remember your preferences and understand 
              how you interact with the site.
            </p>

            <h2>Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core 
              functionality such as security, network management, and account access. You cannot 
              opt out of these cookies.
            </p>
            <ul>
              <li><strong>Session cookies:</strong> Maintain your logged-in state</li>
              <li><strong>Security cookies:</strong> Protect against fraud and unauthorized access</li>
              <li><strong>Load balancing cookies:</strong> Ensure optimal server performance</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand how visitors interact with our website. This 
              helps us improve our services and user experience.
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> Tracks page views, session duration, and user behavior</li>
              <li><strong>Mixpanel:</strong> Analyzes user interactions with specific features</li>
            </ul>

            <h3>Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as remembering 
              your preferences and settings.
            </p>
            <ul>
              <li><strong>Language preferences:</strong> Remember your language selection</li>
              <li><strong>Theme preferences:</strong> Remember your display preferences</li>
              <li><strong>Feature preferences:</strong> Remember your dashboard configuration</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>
              Marketing cookies track your online activity to help advertisers deliver more relevant 
              advertising or to limit how many times you see an ad. These cookies can share that 
              information with other organizations or advertisers.
            </p>
            <ul>
              <li><strong>Google Ads:</strong> Conversion tracking and remarketing</li>
              <li><strong>LinkedIn Insight:</strong> B2B advertising and analytics</li>
              <li><strong>Meta Pixel:</strong> Social media advertising optimization</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages. We do not 
              control these third-party cookies. Please refer to the respective privacy policies 
              of these third parties for more information:
            </p>
            <ul>
              <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
              <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">LinkedIn Privacy Policy</a></li>
              <li><a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</a></li>
            </ul>

            <h2>How to Manage Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to control cookies through their settings. You can set your 
              browser to:
            </p>
            <ul>
              <li>Block all cookies</li>
              <li>Block third-party cookies</li>
              <li>Clear cookies when you close your browser</li>
              <li>Notify you when a cookie is set</li>
            </ul>
            <p>
              Please note that blocking certain cookies may impact the functionality of our website 
              and services.
            </p>

            <h3>Cookie Preference Center</h3>
            <p>
              When you first visit our website, you will see a cookie consent banner that allows 
              you to accept or customize your cookie preferences. You can change your preferences 
              at any time by clicking the &quot;Cookie Settings&quot; link in the footer of our website.
            </p>

            <h3>Opt-Out Links</h3>
            <p>
              You can also opt out of specific tracking services directly:
            </p>
            <ul>
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-Out</a></li>
              <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance Opt-Out</a></li>
              <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">Your Online Choices (EU)</a></li>
            </ul>

            <h2>Cookie Retention</h2>
            <p>
              Different cookies have different retention periods:
            </p>
            <ul>
              <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
              <li><strong>Analytics cookies:</strong> Typically retained for 13-26 months</li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices 
              or for other operational, legal, or regulatory reasons. We will notify you of any 
              material changes by posting the new policy on this page and updating the &quot;Last updated&quot; 
              date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please 
              contact us at:
            </p>
            <ul>
              <li>Email: privacy@draperads.com</li>
              <li>Address: 123 Marketing Street, Suite 100, San Francisco, CA 94105</li>
            </ul>

            <h2>Related Policies</h2>
            <p>
              For more information about how we collect and use your personal information, please 
              see our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
            <p>
              For information about our terms of service, please see our{' '}
              <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </div>
    </main>
  );
}

