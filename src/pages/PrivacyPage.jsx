import { motion } from 'framer-motion';

export default function PrivacyPage() {
  return (
    <main style={{ paddingTop: '100px', paddingBottom: '80px', background: '#FAFAF8', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px', padding: '0 24px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={styles.header}>
            <div style={styles.label}>Legal</div>
            <h1 style={styles.title}>Privacy Policy</h1>
            <p style={styles.meta}>Last updated: 25-04-2026</p>
          </div>

          <div style={styles.content}>
            <p>
              <strong>Saana Tuotanto Oy</strong> (“Company”, “We”, “Us”, or “Our”) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h3 style={styles.h3}>1. Information We Collect</h3>
            <p style={styles.p}>
              We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
            </p>

            <h3 style={styles.h3}>2. How We Use Your Information</h3>
            <p style={styles.p}>
              We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
            </p>

            <h3 style={styles.h3}>3. Data Controller</h3>
            <p style={styles.p}>
              For the purpose of the General Data Protection Regulation (GDPR), the data controller is:
            </p>
            <ul style={{ ...styles.p, listStyle:'none', paddingLeft:0 }}>
              <li><strong>Company</strong>: Saana Tuotanto Oy.</li>
            </ul>

            <h2 style={styles.heading}>2. Interpretation and Definitions</h2>
            <p><strong>Interpretation</strong><br />
              Words with capitalized initials have defined meanings regardless of whether they appear in singular or plural.
            </p>
            <p><strong>Definitions</strong></p>
            <ul style={styles.list}>
              <li><strong>Account</strong>: A unique account created to access our services.</li>
              <li><strong>Company</strong>: Saana Tuotanto Oy.</li>
              <li><strong>Cookies</strong>: Small files stored on your device.</li>
              <li><strong>Country</strong>: Finland.</li>
              <li><strong>Device</strong>: Any device used to access the service.</li>
              <li><strong>Personal Data</strong>: Information relating to an identifiable individual.</li>
              <li><strong>Service Provider</strong>: Third parties processing data on behalf of the Company.</li>
              <li><strong>Usage Data</strong>: Data collected automatically from use of the service.</li>
              <li><strong>Website</strong>: www.h2o.fi</li>
              <li><strong>You</strong>: The user of our service.</li>
            </ul>

            <h2 style={styles.heading}>3. Collecting and Using Your Personal Data</h2>
            <p><strong>Types of Data Collected</strong></p>
            <p><em>Personal Data</em><br />We may collect:</p>
            <ul style={styles.list}>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address (City, Postal Code, Country)</li>
            </ul>
            <p><em>Usage Data</em><br />Automatically collected data may include:</p>
            <ul style={styles.list}>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited</li>
              <li>Time and date of visits</li>
              <li>Device information</li>
            </ul>

            <h2 style={styles.heading}>4. Tracking Technologies and Cookies</h2>
            <p>We use cookies and similar tracking technologies to:</p>
            <ul style={styles.list}>
              <li>Improve website functionality</li>
              <li>Analyze usage</li>
              <li>Enhance user experience</li>
            </ul>
            <p>Types of cookies:</p>
            <ul style={styles.list}>
              <li><strong>Essential Cookies</strong> – Required for core functionality</li>
              <li><strong>Functional Cookies</strong> – Store user preferences</li>
              <li><strong>Analytics Cookies</strong> – Help understand usage patterns</li>
            </ul>
            <p>You can control cookies through your browser settings.</p>

            <h2 style={styles.heading}>5. Use of Your Personal Data</h2>
            <p>We use your data to:</p>
            <ul style={styles.list}>
              <li>Provide and maintain our services</li>
              <li>Manage user accounts</li>
              <li>Communicate with you</li>
              <li>Improve our services</li>
              <li>Send updates and offers (if you opt in)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 style={styles.heading}>6. Legal Basis for Processing (GDPR)</h2>
            <p>We process your personal data based on:</p>
            <ul style={styles.list}>
              <li>Your consent</li>
              <li>Performance of a contract</li>
              <li>Legal obligations</li>
              <li>Legitimate business interests</li>
            </ul>

            <h2 style={styles.heading}>7. Sharing of Your Personal Data</h2>
            <p>We may share your data:</p>
            <ul style={styles.list}>
              <li>With service providers (hosting, analytics, etc.)</li>
              <li>During business transfers (merger, acquisition)</li>
              <li>With affiliates or partners</li>
              <li>When required by law</li>
              <li>With your consent</li>
            </ul>
            <div style={styles.alert}>
              <strong>Note:</strong> We do <strong>not</strong> sell your personal data.
            </div>

            <h2 style={styles.heading}>8. Retention of Data</h2>
            <p>We retain your personal data only as long as necessary for:</p>
            <ul style={styles.list}>
              <li>Business purposes</li>
              <li>Legal compliance</li>
              <li>Dispute resolution</li>
            </ul>

            <h2 style={styles.heading}>9. Transfer of Data</h2>
            <p>
              Your data may be processed outside Finland/EU. We ensure appropriate safeguards are in place (e.g., Standard Contractual Clauses).
            </p>

            <h2 style={styles.heading}>10. Security of Data</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the Internet is completely secure.
            </p>

            <h2 style={styles.heading}>11. Your Data Protection Rights (GDPR)</h2>
            <p>You have the right to:</p>
            <ul style={styles.list}>
              <li>Access your data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p>To exercise your rights, contact us at: <a href="mailto:admin@saanatuatanto.com" style={styles.link}>admin@saanatuatanto.com</a></p>
            <p>You also have the right to lodge a complaint with a data protection authority in Finland.</p>

            <h2 style={styles.heading}>12. Children’s Privacy</h2>
            <p>
              Our services are not intended for individuals under 13 years of age. We do not knowingly collect data from children.
            </p>

            <h2 style={styles.heading}>13. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not responsible for their privacy practices.
            </p>

            <h2 style={styles.heading}>14. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last updated” date.
            </p>

            <p>
              Email: <a href="mailto:admin@saanatuatanto.com" style={styles.link}>admin@saanatuatanto.com</a><br />
              Website: <a href="https://www.h2o.fi" target="_blank" rel="noreferrer" style={styles.link}>www.h2o.fi</a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

const styles = {
  header: {
    borderBottom: '1px solid #eae7e1',
    paddingBottom: '32px',
    marginBottom: '40px',
  },
  label: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#7BAA8D',
    marginBottom: '12px',
  },
  title: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    color: '#0F2F24',
    fontWeight: 400,
    marginBottom: '16px',
    lineHeight: 1.1,
  },
  meta: {
    fontSize: '14px',
    color: '#9a9a9a',
  },
  content: {
    fontSize: '16px',
    color: '#4a4a4a',
    lineHeight: 1.8,
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1.8rem',
    color: '#0F2F24',
    fontWeight: 400,
    marginTop: '48px',
    marginBottom: '16px',
  },
  list: {
    paddingLeft: '24px',
    marginBottom: '16px',
  },
  link: {
    color: '#7BAA8D',
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },
  alert: {
    background: '#f2f7f4',
    borderLeft: '4px solid #7BAA8D',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '15px',
    color: '#0F2F24',
  },
};
