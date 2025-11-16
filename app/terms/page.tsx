'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="bg-white text-gray-800 font-display min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-3xl">
              bug_report
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Malcom_Company
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/compaigns" className="hover:text-blue-600 font-medium">
              Compaigns
            </Link>
            <Link href="/bounty" className="hover:text-blue-600 font-medium">
              Programs
            </Link>
            <Link href="/careers" className="hover:text-blue-600 font-medium">
              Careers
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-10 flex-1">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms of Service
        </h1>

        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Effective Date: January 1, 2025  
          <br />
          Please read these Terms carefully before using BugVerse.
        </p>

        <div className="prose max-w-none text-gray-800">
          {/* 1 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">1. Acceptance</h2>
            <p>
              By clicking <strong>“Sign Up”</strong>, <strong>“Login”</strong>, or using <strong>BugVerse</strong>, you agree to these Terms.  
              If you are under 18, your parent or guardian must accept on your behalf.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">2. Who Can Use BugVerse</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Must be 18+ (or have parental approval)</li>
              <li>Not on OFAC / Indian sanctions lists</li>
              <li>Not a resident of Crimea, Cuba, Iran, North Korea, Syria</li>
              <li>Not an employee of Malcom or its auditors</li>
            </ul>
          </section>

          {/* 3 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">3. Your Account</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>One account per person</li>
              <li>Keep credentials secret</li>
              <li>Enable 2FA (mandatory for payouts over ₹10,000)</li>
              <li>We may suspend any account that looks suspicious</li>
            </ul>
          </section>

          {/* 4 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">4. Safe Testing Rules (Non-Negotiable)</h2>
            <p className="font-semibold text-gray-700 mb-2">You MAY:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Run scanners on <strong>in-scope assets only</strong></li>
              <li>Use one test account per program (e.g. yourname+malcom@test.com)</li>
            </ul>
            <p className="font-semibold text-gray-700 mb-2">You MAY NOT:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>DDoS, brute-force, spam, or phishing</li>
              <li>Touch customer PII, health, or payment data</li>
              <li>Delete or alter data, or escalate privileges</li>
              <li>Disclose vulnerabilities publicly before they are fixed</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">
              Violations = instant ban + possible legal action under IT Act §43/66.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">5. How Programs Work</h2>
            <ol className="list-decimal pl-6 space-y-1">
              <li>Client launches program → scope + bounty table</li>
              <li>You hunt → submit via BugVerse</li>
              <li>Malcom triages within 48 hours</li>
              <li>Valid reports → bounty + reputation points</li>
              <li>After fix → public Hall of Fame (optional)</li>
            </ol>
          </section>

          {/* 6 */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-3">6. Bounty Table (2025)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 border">Severity</th>
                    <th className="p-3 border">IoT / Automotive</th>
                    <th className="p-3 border">Web / API</th>
                    <th className="p-3 border">Reward (INR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border font-semibold">Critical</td>
                    <td className="p-3 border">RCE, firmware backdoor</td>
                    <td className="p-3 border">SQLi, IDOR</td>
                    <td className="p-3 border">₹1,00,000 – ₹5,00,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-semibold">High</td>
                    <td className="p-3 border">Auth bypass, OTA hijack</td>
                    <td className="p-3 border">Stored XSS</td>
                    <td className="p-3 border">₹25,000 – ₹99,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-semibold">Medium</td>
                    <td className="p-3 border">Info leak, weak crypto</td>
                    <td className="p-3 border">CSRF</td>
                    <td className="p-3 border">₹10,000 – ₹24,000</td>
                  </tr>
                  <tr>
                    <td className="p-3 border font-semibold">Low</td>
                    <td className="p-3 border">Best-practice misses</td>
                    <td className="p-3 border">Open redirect</td>
                    <td className="p-3 border">₹2,500 – ₹9,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-600 text-sm">
              Final payout = CVSS × Asset Value × Report Clarity.  
              First valid report wins; duplicates get swag only.
            </p>
          </section>

          {/* Remaining Sections */}
          {[
            {
              title: '7. Payouts',
              body: `Indian hunters: Bank transfer (NEFT/IMPS) → PAN + Form-16A.
Global hunters: PayPal USD (RBI rate).
TDS 20% (India), 30% (NRI). Paid within 30 days after fix verification.
Minimum payout ₹2,500.`,
            },
            {
              title: '8. Safe Harbor (Your Legal Shield)',
              body: `Good-faith testing inside scope = no lawsuits. Malcom defends you if a client sues (up to ₹5L legal fees).`,
            },
            {
              title: '9. Disclosure Policy',
              body: `Default 30-day responsible disclosure. You keep CVE credit. Hall-of-Fame optional.`,
            },
            {
              title: '10. Intellectual Property',
              body: `Your PoC is licensed to Malcom & client for fixing and publication. You keep moral and bragging rights.`,
            },
            {
              title: '11. Privacy',
              body: `We handle your data per our Privacy Policy. Reports are encrypted; clients see only relevant data.`,
            },
            {
              title: '12. Swag & Reputation',
              body: `3+ valid bugs = T-shirt. Top 10 monthly = Malcom sticker pack. Leaderboard resets monthly.`,
            },
            {
              title: '13. Termination',
              body: `Malcom may suspend you for violations. Account deletions processed in 90 days (excluding public reports).`,
            },
            {
              title: '14. Governing Law',
              body: `Courts of Chennai only. IT Act 2000 & Indian Contract Act 1872 apply.`,
            },
            {
              title: '15. Changes',
              body: `We’ll notify by email 7 days before major updates. Continued use = acceptance.`,
            },
          ].map((sec, i) => (
            <section key={i} className="mb-10">
              <h2 className="text-2xl font-bold mb-3">{sec.title}</h2>
              <p className="text-gray-700 whitespace-pre-line">{sec.body}</p>
            </section>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2025 Malcom_Company — All rights reserved.
      </footer>
    </div>
  );
}
