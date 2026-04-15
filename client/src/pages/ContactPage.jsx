import Layout from '../components/Layout';

export default function ContactPage() {
  return (
    <Layout>
      <section className="static-page contact-page">
        <div className="container">
          <h1>Contact Us</h1>
          <p>If you need help, send us a message and our support team will respond as soon as possible.</p>
          <div className="contact-details">
            <p><strong>Phone:</strong> +44 20 7946 0123</p>
            <p><strong>Email:</strong> support@hexa.com</p>
            <p><strong>Address:</strong> 123 Northern Park Lane, West London, W4 4Z, United Kingdom</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
