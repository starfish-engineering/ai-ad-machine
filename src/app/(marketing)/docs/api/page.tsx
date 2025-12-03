import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  Code,
  Key,
  Webhook,
  Database,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

const endpoints = [
  {
    category: 'Accounts',
    items: [
      { method: 'GET', path: '/v1/accounts', description: 'List all connected ad accounts' },
      { method: 'GET', path: '/v1/accounts/{id}', description: 'Get account details' },
      { method: 'GET', path: '/v1/accounts/{id}/metrics', description: 'Get account performance metrics' },
    ],
  },
  {
    category: 'Campaigns',
    items: [
      { method: 'GET', path: '/v1/campaigns', description: 'List all campaigns' },
      { method: 'GET', path: '/v1/campaigns/{id}', description: 'Get campaign details' },
      { method: 'PATCH', path: '/v1/campaigns/{id}', description: 'Update campaign settings' },
      { method: 'GET', path: '/v1/campaigns/{id}/metrics', description: 'Get campaign metrics' },
    ],
  },
  {
    category: 'Rules',
    items: [
      { method: 'GET', path: '/v1/rules', description: 'List all automation rules' },
      { method: 'POST', path: '/v1/rules', description: 'Create a new rule' },
      { method: 'PATCH', path: '/v1/rules/{id}', description: 'Update a rule' },
      { method: 'DELETE', path: '/v1/rules/{id}', description: 'Delete a rule' },
    ],
  },
  {
    category: 'Alerts',
    items: [
      { method: 'GET', path: '/v1/alerts', description: 'List all alerts' },
      { method: 'GET', path: '/v1/alerts/{id}', description: 'Get alert details' },
      { method: 'PATCH', path: '/v1/alerts/{id}/acknowledge', description: 'Acknowledge an alert' },
    ],
  },
  {
    category: 'Reports',
    items: [
      { method: 'GET', path: '/v1/reports', description: 'List all reports' },
      { method: 'POST', path: '/v1/reports', description: 'Generate a new report' },
      { method: 'GET', path: '/v1/reports/{id}', description: 'Get report data' },
    ],
  },
];

const features = [
  {
    icon: Key,
    title: 'Authentication',
    description: 'Secure API key authentication with scoped permissions.',
  },
  {
    icon: Database,
    title: 'RESTful Design',
    description: 'Clean, predictable URLs and standard HTTP methods.',
  },
  {
    icon: Webhook,
    title: 'Webhooks',
    description: 'Real-time notifications for events in your account.',
  },
  {
    icon: Code,
    title: 'SDKs',
    description: 'Official libraries for Python, Node.js, and PHP.',
  },
];

const codeExample = `const Draper = require('@draper/sdk');

const client = new Draper({
  apiKey: process.env.DRAPER_API_KEY,
});

// Get all campaigns
const campaigns = await client.campaigns.list({
  accountId: 'acc_123',
  status: 'active',
});

// Create an automation rule
const rule = await client.rules.create({
  name: 'Pause low performers',
  conditions: [
    { metric: 'ctr', operator: 'lt', value: 0.5 },
    { metric: 'clicks', operator: 'gt', value: 100 },
  ],
  actions: [
    { type: 'pause_campaign' },
    { type: 'send_notification' },
  ],
});`;

export default function ApiDocsPage() {
  return (
    <main className="pt-32">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-gray-200">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-full blur-3xl opacity-10" />
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 mb-4">
                  <Code className="w-4 h-4" />
                  API Reference
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-6">
                  Build with the Draper API
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Integrate Draper into your workflow with our powerful REST API. 
                  Access campaigns, create rules, and automate your PPC management.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="gap-2">
                    Get API Key
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="gap-2">
                    <ExternalLink className="w-5 h-5" />
                    API Playground
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-auto text-gray-500 text-xs">example.js</span>
                </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Base URL */}
        <section className="py-8 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <span className="text-sm font-medium text-gray-500">Base URL:</span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                <code className="text-sm text-gray-900">https://api.draperads.com/v1</code>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Copy className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Endpoints */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">API Endpoints</h2>
            
            <div className="space-y-8">
              {endpoints.map((category) => (
                <div key={category.category} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">{category.category}</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {category.items.map((endpoint) => (
                      <div
                        key={endpoint.path}
                        className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <span
                          className={`px-2 py-1 rounded text-xs font-mono font-medium ${
                            endpoint.method === 'GET'
                              ? 'bg-green-100 text-green-700'
                              : endpoint.method === 'POST'
                              ? 'bg-blue-100 text-blue-700'
                              : endpoint.method === 'PATCH'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <code className="text-sm text-gray-900 font-mono">{endpoint.path}</code>
                        <span className="text-sm text-gray-500 ml-auto hidden md:block">
                          {endpoint.description}
                        </span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication</h2>
                <p className="text-gray-600 mb-6">
                  The Draper API uses API keys to authenticate requests. You can view and manage 
                  your API keys in your account settings.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Include your API key in the Authorization header</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Create scoped keys with limited permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">Rotate keys without downtime</span>
                  </li>
                </ul>
                <Link href="/docs/api">
                  <Button variant="outline" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    View full documentation
                  </Button>
                </Link>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="text-xs text-gray-500 mb-2">Example Request</div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{`curl -X GET https://api.draperads.com/v1/accounts \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json"`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Webhooks */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Webhook className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhooks</h2>
              <p className="text-gray-600">
                Receive real-time notifications when events happen in your Draper account. 
                Configure webhook endpoints to integrate with your systems.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { event: 'alert.triggered', description: 'When a monitoring alert fires' },
                { event: 'rule.executed', description: 'When an automation rule runs' },
                { event: 'report.generated', description: 'When a report is ready' },
              ].map((webhook) => (
                <div key={webhook.event} className="bg-white rounded-xl p-6 border border-gray-200">
                  <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {webhook.event}
                  </code>
                  <p className="text-gray-600 mt-3">{webhook.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start building?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Create your API key and start integrating Draper into your workflow today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Get API Key
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Link href="/docs">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>
    </main>
  );
}

