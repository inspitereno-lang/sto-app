import { motion } from 'framer-motion';

export default function ReturnsPage() {
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
            <h1 style={styles.title}>Refund & Return Policy</h1>
            <p style={styles.meta}>Last updated: 25-04-2026</p>
          </div>

          <div style={styles.content}>
            <p>
              Thank you for your purchase from <strong>Saana Tuotanto Oy</strong>. We hope you are satisfied with your order. However, if you are not completely satisfied, please review our policy below.
            </p>

            <h2 style={styles.heading}>1. Returns</h2>
            <p>
              You may request a return within <strong>7 days from the date of delivery</strong>.
              At present, returns are accepted <strong>only under the following conditions</strong>:
            </p>
            <ul style={styles.list}>
              <li>You received a <strong>defective product</strong>, or</li>
              <li>You received an <strong>incorrect product</strong></li>
            </ul>
            <p>We do not accept returns for any other reasons.</p>

            <h2 style={styles.heading}>2. Return Conditions</h2>
            <p>To be eligible for a return:</p>
            <ul style={styles.list}>
              <li>The item must be <strong>unused and in its original packaging</strong></li>
              <li>Proof of purchase must be provided</li>
              <li>A valid <strong>Return Merchandise Authorization (RMA)</strong> must be obtained before sending the item</li>
            </ul>

            <h2 style={styles.heading}>3. Return Process</h2>
            <p>To initiate a return:</p>
            <ol style={styles.list}>
              <li>Email us at <a href="mailto:admin@saanatuatanto.com" style={styles.link}>admin@saanatuatanto.com</a></li>
              <li>Provide order details and reason for return</li>
              <li>Wait for confirmation and your <strong>RMA number</strong></li>
              <li>Pack the item securely in original packaging</li>
              <li>Ship the product to the address provided by our support team</li>
            </ol>
            <div style={styles.alert}>
              <strong>⚠️ Important:</strong> Returns sent without prior approval (RMA) may not be accepted.
            </div>

            <h2 style={styles.heading}>4. Shipping Costs</h2>
            <ul style={styles.list}>
              <li>Customers are responsible for <strong>return shipping costs</strong></li>
              <li>We recommend using a <strong>trackable shipping service</strong></li>
              <li>Saana Tuotanto Oy is not responsible for lost return shipments</li>
            </ul>

            <h2 style={styles.heading}>5. Refunds</h2>
            <ul style={styles.list}>
              <li>Refunds are <strong>not issued in cash or to original payment methods</strong></li>
              <li>Approved returns will be provided as <strong>store credit</strong></li>
              <li>Store credit can be used for future purchases on our website</li>
            </ul>

            <h2 style={styles.heading}>6. Missing or Damaged Items</h2>
            <p>To process claims for missing or damaged items:</p>
            <ul style={styles.list}>
              <li>A <strong>parcel opening video is mandatory</strong></li>
              <li>Claims without video evidence may not be accepted</li>
              <li>Some items may be packed inside other packaging—please check carefully before reporting</li>
            </ul>
            <p>If a claim is verified:</p>
            <ul style={styles.list}>
              <li>Missing items will be <strong>reshipped</strong>, or</li>
              <li>A <strong>refund/store credit</strong> will be issued for the missing items</li>
            </ul>

            <h2 style={styles.heading}>7. Delivery Issues</h2>
            <ul style={styles.list}>
              <li>If the package appears <strong>tampered, opened, or incomplete</strong>, do not accept delivery</li>
              <li>Contact us immediately for assistance</li>
            </ul>
            <div style={styles.alert}>
              <strong>⚠️ Important:</strong> If you accept such a package without notifying us, we may not be able to process your claim.
            </div>

            <h2 style={styles.heading}>8. Exceptions</h2>
            <p>
              For special cases involving defective or damaged products, please contact us directly. We will assess the situation and provide an appropriate resolution.
            </p>

            <h2 style={styles.heading}>9. Contact Us</h2>
            <p>If you have any questions about this policy, please contact:</p>
            <p>
              <strong>Saana Tuotanto Oy</strong><br />
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
    background: '#fff9e6',
    borderLeft: '4px solid #f2c94c',
    padding: '16px 20px',
    borderRadius: '0 8px 8px 0',
    marginTop: '16px',
    marginBottom: '16px',
    fontSize: '15px',
    color: '#856404',
  },
};
