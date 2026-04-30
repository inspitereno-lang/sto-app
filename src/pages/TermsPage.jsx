import { motion } from 'framer-motion';

export default function TermsPage() {
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
            <h1 style={styles.title}>Terms and Conditions</h1>
            <p style={styles.meta}>Last updated: 25-04-2026</p>
          </div>

          <div style={styles.content}>
            <p>
              Welcome to <strong>www.h2o.fi</strong>
            </p>
            <p>
              These Terms and Conditions outline the rules and regulations for the use of the website operated by <strong>Saana Tuotanto Oy</strong>.
            </p>
            <p>
              By accessing this website, you agree to comply with these Terms and Conditions. If you do not agree, please do not use our website.
            </p>

            <h2 style={styles.heading}>1. Company Information</h2>
            <p>
              Vantaa, Finland
            </p>
            <p>
              Email: <a href="mailto:admin@saanatuatanto.com" style={styles.link}>admin@saanatuatanto.com</a><br />
              Website: <a href="https://www.h2o.fi" target="_blank" rel="noreferrer" style={styles.link}>www.h2o.fi</a>
            </p>

            <h2 style={styles.heading}>2. Definitions</h2>
            <ul style={styles.list}>
              <li><strong>“You”, “User”</strong>: Any person accessing this website</li>
              <li><strong>“Company”, “We”, “Us”</strong>: Saana Tuotanto Oy</li>
              <li><strong>“Website”</strong>: www.h2o.fi</li>
              <li><strong>“Services”</strong>: Any products, services, or content offered through the website</li>
            </ul>

            <h2 style={styles.heading}>3. Use of the Website</h2>
            <p>By using this website, you agree that:</p>
            <ul style={styles.list}>
              <li>You will use it only for lawful purposes</li>
              <li>You will not misuse, disrupt, or damage the website</li>
              <li>You will not attempt unauthorized access to systems or data</li>
            </ul>

            <h2 style={styles.heading}>4. Cookies</h2>
            <p>
              We use cookies to improve user experience. By using our website, you consent to our use of cookies in accordance with our Privacy Policy.
              You can manage cookie preferences through your browser settings.
            </p>

            <h2 style={styles.heading}>5. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, <strong>Saana Tuotanto Oy</strong> owns all intellectual property rights for the content on this website.
              You may use the website for personal use only. You must not:
            </p>
            <ul style={styles.list}>
              <li>Republish material</li>
              <li>Sell, rent, or sublicense content</li>
              <li>Copy or reproduce content</li>
              <li>Redistribute content without permission</li>
            </ul>

            <h2 style={styles.heading}>6. User-Generated Content (Comments)</h2>
            <p>Parts of the website may allow users to post content. You agree that:</p>
            <ul style={styles.list}>
              <li>You have the right to post such content</li>
              <li>Your content does not violate any laws or third-party rights</li>
              <li>Your content is not offensive, defamatory, or unlawful</li>
            </ul>
            <p>We reserve the right to:</p>
            <ul style={styles.list}>
              <li>Monitor user content</li>
              <li>Remove inappropriate content</li>
            </ul>
            <p>By posting content, you grant us a <strong>non-exclusive license</strong> to use, reproduce, and edit it.</p>

            <h2 style={styles.heading}>7. Hyperlinking to Our Website</h2>
            <p>The following may link to our website without prior approval:</p>
            <ul style={styles.list}>
              <li>Government agencies</li>
              <li>Search engines</li>
              <li>News organizations</li>
            </ul>
            <p>Other organizations may request approval by contacting us via email. Links must:</p>
            <ul style={styles.list}>
              <li>Not be misleading</li>
              <li>Not imply false endorsement</li>
              <li>Fit within appropriate context</li>
            </ul>

            <h2 style={styles.heading}>8. iFrames</h2>
            <p>You may not create frames around our website without prior written permission.</p>

            <h2 style={styles.heading}>9. Content Liability</h2>
            <p>
              We are not responsible for content appearing on third-party websites that link to us.
              You agree to indemnify and defend us against claims arising from your website or actions.
            </p>

            <h2 style={styles.heading}>10. Privacy</h2>
            <p>
              Your use of the website is also governed by our Privacy Policy. Please review it for details on how we handle your data.
            </p>

            <h2 style={styles.heading}>11. Reservation of Rights</h2>
            <p>We reserve the right to:</p>
            <ul style={styles.list}>
              <li>Request removal of links to our website</li>
              <li>Modify these Terms at any time</li>
            </ul>
            <p>Continued use of the website means you accept any changes.</p>

            <h2 style={styles.heading}>12. Accuracy of Information</h2>
            <p>We strive to ensure accuracy but:</p>
            <ul style={styles.list}>
              <li>Do not guarantee completeness or correctness</li>
              <li>Do not guarantee uninterrupted availability</li>
            </ul>

            <h2 style={styles.heading}>13. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul style={styles.list}>
              <li>We are not liable for indirect or consequential damages</li>
              <li>We are not liable for loss of data, profits, or business</li>
            </ul>
            <p>Nothing in these Terms excludes liability where it is unlawful to do so, including:</p>
            <ul style={styles.list}>
              <li>Death or personal injury caused by negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
            </ul>

            <h2 style={styles.heading}>14. Governing Law</h2>
            <p>
              These Terms are governed by the laws of <strong>Finland</strong>.
              Any disputes shall be subject to the jurisdiction of Finnish courts.
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
};
