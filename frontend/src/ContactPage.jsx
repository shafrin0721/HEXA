import React from 'react';
import { Phone, Mail, MapPin, Search, ShoppingCart, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-[#b9c9cd] font-sans min-h-screen flex flex-col pt-4 w-full">
      {/* Header / Navbar */}
      <header className="bg-[#F0F0F0] mx-6 px-8 py-3 flex items-center justify-between relative z-10 h-[80px]">
        {/* Logo */}
        <div className="bg-[#A93131] text-white text-3xl px-8 py-3 font-semibold tracking-wider flex items-center justify-center">
          logo
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-12 text-lg font-medium text-gray-800">
          <a href="#" className="hover:text-[#A93131] transition-colors">Home</a>
          <a href="#" className="hover:text-[#A93131] transition-colors">Products</a>
          <a href="#" className="hover:text-[#A93131] transition-colors">About</a>
          <a href="#" className="hover:text-[#A93131] transition-colors">Contact</a>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center gap-8">
          <div className="relative cursor-pointer">
            <ShoppingCart className="text-gray-800" size={28} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center">
              1
            </span>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#7889DF] cursor-pointer shadow-sm"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-16 w-full">
        {/* Contact Card */}
        <div className="flex flex-col md:flex-row w-full max-w-[1024px] bg-white rounded-2xl shadow-xl overflow-hidden mt-8">
          
          {/* Left Side / Dark Section */}
          <div className="bg-[#4A5659] text-white p-10 md:p-12 md:w-[45%] flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">Contact Us</h2>
              <p className="text-gray-200 text-sm mb-12">We'd love to hear from you! Reach us anytime.</p>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone size={20} className="mt-0.5 fill-current" />
                  <div>
                    <p className="text-[11px] text-gray-300 uppercase tracking-widest font-semibold mb-1">Phone</p>
                    <p className="font-bold tracking-wide">+44 20 7946 0123</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail size={20} className="mt-0.5" />
                  <div>
                    <p className="text-[11px] text-gray-300 uppercase tracking-widest font-semibold mb-1">Email</p>
                    <p className="font-bold tracking-wide">support@hexal.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="mt-0.5" />
                  <div>
                    <p className="text-[11px] text-gray-300 uppercase tracking-widest font-semibold mb-2">Address</p>
                    <p className="font-bold tracking-wide leading-relaxed text-[15px]">
                      123 Northern Park Lane,<br />
                      West London , W1A 4ZZ , United<br />
                      Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 mt-16 pt-4">
              <a href="#" className="text-white hover:text-gray-300 transition"><Phone size={20} /></a>
              <a href="#" className="text-white hover:text-gray-300 transition"><Mail size={20} /></a>
              <a href="#" className="text-white hover:text-gray-300 transition"><Send size={20} /></a>
            </div>
          </div>

          {/* Right Side / Form Section */}
          <div className="p-10 md:p-12 md:w-[55%] flex flex-col">
            <h2 className="text-[22px] font-bold text-gray-900 mb-1">Send Us a Message</h2>
            <p className="text-gray-500 text-sm mb-8">Fill out the form and our team will get back to you soon.</p>

            <form className="space-y-5 flex-grow flex flex-col">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#4A5659] focus:ring-1 focus:ring-[#4A5659] text-sm text-gray-700 transition placeholder-gray-400 font-medium" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-1">Email</label>
                <input 
                  type="email" 
                  placeholder="you@email.com" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#4A5659] focus:ring-1 focus:ring-[#4A5659] text-sm text-gray-700 transition placeholder-gray-400 font-medium" 
                />
              </div>

              <div className="flex-grow flex flex-col mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 ml-1">Message</label>
                <textarea 
                  placeholder="How can we help you?" 
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#4A5659] focus:ring-1 focus:ring-[#4A5659] text-sm text-gray-700 transition placeholder-gray-400 resize-none flex-grow min-h-[140px] font-medium"
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full bg-[#4A5659] hover:bg-[#3D474A] text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-auto shadow-sm"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Back to top */}
      <div className="bg-[#f5f7f8] text-center py-2.5 border-t border-b border-gray-300 text-sm font-medium text-gray-700 w-full cursor-pointer hover:bg-gray-200 transition">
        Back to top
      </div>

      {/* Footer */}
      <footer className="bg-[#b9c9cd] pt-12 pb-16 px-6 sm:px-12 w-full lg:px-24">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10">
          
          {/* Column 1 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Get to Know Us</h3>
            <ul className="space-y-2.5 text-white/90 text-sm font-semibold">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
              <li><a href="#" className="hover:underline">Cart</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Make Money with Us</h3>
            <ul className="space-y-2.5 text-white/90 text-sm font-semibold">
              <li><a href="#" className="hover:underline">Sell products</a></li>
              <li><a href="#" className="hover:underline">Sell on Business</a></li>
              <li><a href="#" className="hover:underline">Advertise Your Products</a></li>
              <li><a href="#" className="hover:underline">Self-Publish with Us</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Let Us Help You</h3>
            <ul className="space-y-2.5 text-white/90 text-sm font-semibold">
              <li><a href="#" className="hover:underline">Your Account</a></li>
              <li><a href="#" className="hover:underline">Your Orders</a></li>
              <li><a href="#" className="hover:underline">Returns & Replacements</a></li>
              <li><a href="#" className="hover:underline">Manage Your Content and Devices</a></li>
              <li><a href="#" className="hover:underline">Help</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <ul className="space-y-3.5 text-white/90 text-[13.5px] font-semibold mt-11">
              <li>Phone: +44 20 7946 0123</li>
              <li>Email: support@hexa.com</li>
              <li className="leading-relaxed">Address: 123 Northern Park Lane, West<br />London, W1A 4ZZ, United Kingdom</li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
