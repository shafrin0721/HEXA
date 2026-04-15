import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const team = [
    { name: 'Shafrin', role: 'Founder', image: '/images/team1_new.jpg' },
    { name: 'Shavindi', role: 'Lead Designer', image: '/images/team2_new.jpg' },
    { name: 'Heli', role: 'Production Lead', image: '/images/team3_new.jpg' },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-800 bg-black">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Logo" className="w-10 h-10" />
            <span className="text-lg font-bold">HEXA</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">1</span>
            </Link>
            <Link to="/login">
              <img src="/images/profile.svg" alt="Profile" className="w-8 h-8 rounded-full border border-gray-600" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Our Story */}
      <section className="py-24 px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h3 className="text-2xl font-bold text-center mb-4">
  Our Story
</h3>
          <p className="text-gray-300 max-w-xl mx-auto text-lg text-center leading-relaxed">
  At Hexa, we believe style is personal. We design premium-quality,
  minimalist t-shirts that blend comfort, durability, and intelligent
  minimalism.
</p>
        </div>

        {/* Story Cards Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Left: Story Illustration */}
          <div className="bg-white rounded-3xl p-8 flex items-center justify-center min-h-80">
            <div className="text-center">
              <div className="text-6xl mb-4">💡</div>
              <p className="text-gray-700 font-semibold">Our Vision</p>
            </div>
          </div>

          {/* Middle: Mission */}
          <div className="bg-white text-black rounded-3xl p-8 min-h-80 flex flex-col justify-center">
            <div className="text-4xl mb-4 text-center">🎯</div>
            <h3 className="text-2xl font-bold text-center mb-4">Our Mission</h3>
            <p className="text-gray-700 text-center text-sm leading-relaxed">
              To empower self-expression through premium, minimalist essentials—crafted for comfort, built for longevity, and designed to make a subtle statement.
            </p>
          </div>

          {/* Right: Vision */}
          <div className="bg-white text-black rounded-3xl p-8 min-h-80 flex flex-col justify-center">
            <div className="text-4xl mb-4 text-center">👁️</div>
            <h3 className="text-2xl font-bold text-center mb-4">Our Vision</h3>
            <p className="text-gray-700 text-center text-sm leading-relaxed">
              To be the go-to brand for those who value simplicity, comfort, and enduring style in their everyday wardrobe.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24 px-8 border-b border-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Left: Team Members */}
          <div>
            <h2 className="text-text-5xl font-bold text-left mb-6">
  Meet the Team
</h2>
<br></br>
            <p className="text-gray-400 mb-12 text-left max-w-lg">
              Hexa is powered by a small, passionate team of designers, makers, and creatives who share a love for premium fashion and functional design. Together, we're building a brand that values authenticity, quality, and the people who wear our essentials.
            </p>
<br></br>
            {/* Team Member Circles */}
            <div className="flex gap-8 flex-wrap">
              {team.map((member, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-500 mb-3">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-semibold text-center">{member.name}</p>
                  <p className="text-xs text-gray-400 text-center">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Workspace Image */}
          <div className="rounded-3xl overflow-hidden border border-gray-800 h-96">
            <img src="/images/hero.svg" alt="Workspace" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-4">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><a href="#" className="hover:text-white">Cart</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Sell products</a></li>
              <li><a href="#" className="hover:text-white">Advertise Your Products</a></li>
              <li><a href="#" className="hover:text-white">Self-Publish with Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Your Account</a></li>
              <li><a href="#" className="hover:text-white">Your Orders</a></li>
              <li><a href="#" className="hover:text-white">Returns & Replacements</a></li>
              <li><a href="#" className="hover:text-white">Manage Your Content and Devices</a></li>
              <li><a href="#" className="hover:text-white">Help</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Info</h4>
            <p className="text-sm text-gray-400 mb-2">Phone: +44 20 7946 0123</p>
            <p className="text-sm text-gray-400 mb-2">Email: support@hexa.com</p>
            <p className="text-sm text-gray-400">Address: 123 Northern Park Lane, West London, W4 4Z, United Kingdom</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2024 HEXA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
