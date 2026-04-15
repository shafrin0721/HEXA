import React from 'react';


const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="max-w-3xl text-gray-700 mb-6">
        Have questions? Reach out to our support team and we’ll get back to you as soon as possible.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-2">Customer Support</h2>
          <p>Email: support@hexa.com</p>
          <p>Phone: +44 20 7946 0123</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold text-xl mb-2">Office</h2>
          <p>123 Northern Park Lane</p>
          <p>West London, W1A 4ZZ, United Kingdom</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
