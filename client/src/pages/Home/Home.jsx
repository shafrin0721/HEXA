import React from 'react';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem'
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Welcome to HEXA Clothing
      </h1>
      <p style={{
        fontSize: '1.2rem',
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#ccc'
      }}>
        Discover the latest fashion trends and shop our exclusive collection
      </p>
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <a
          href="/checkout"
          style={{
            padding: '1rem 2rem',
            background: '#ffc107',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = '#ffb300'}
          onMouseOut={(e) => e.target.style.background = '#ffc107'}
        >
          Start Shopping
        </a>
        <a
          href="/order-summary"
          style={{
            padding: '1rem 2rem',
            background: 'transparent',
            color: '#fff',
            textDecoration: 'none',
            border: '2px solid #666',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '1.1rem',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.borderColor = '#888';
            e.target.style.background = '#1a1a1a';
          }}
          onMouseOut={(e) => {
            e.target.style.borderColor = '#666';
            e.target.style.background = 'transparent';
          }}
        >
          View Orders
        </a>
      </div>
    </div>
  );
}
