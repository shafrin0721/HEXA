import { HelpCircle, Mail, MapPin, Phone, Send } from 'lucide-react'

function Contact() {
  return (
    <main className="min-h-screen bg-[#050608] text-white">
      <section className="mx-auto flex w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-8 md:py-24">
        <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl md:flex">
          <div className="bg-gradient-to-r from-[#3e4952] via-[#1a2027] to-[#07090c] p-8 md:w-[40%] md:p-10">
            <h1 className="text-4xl font-bold leading-none text-white md:text-5xl">Contact Us</h1>
            <p className="mt-4 max-w-xs text-sm text-[#d7dde3]">
              We&apos;d love to hear from you! Reach us anytime.
            </p>

            <div className="mt-10 space-y-7 text-white">
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-0.5" />
                <div>
                  <p className="text-sm text-[#d7dde3]">Phone</p>
                  <p className="text-lg font-bold">+44 20 7946 0123</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5" />
                <div>
                  <p className="text-sm text-[#d7dde3]">Email</p>
                  <p className="text-lg font-bold">support@hexal.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5" />
                <div>
                  <p className="text-sm text-[#d7dde3]">Address</p>
                  <p className="text-lg font-bold leading-snug">
                    123 Northern Park Lane,
                    <br />
                    West London, W1A 4ZZ, United
                    <br />
                    Kingdom
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-5">
              <button type="button" className="text-[#d6dce2] transition hover:text-white">
                <Phone size={16} />
              </button>
              <button type="button" className="text-[#d6dce2] transition hover:text-white">
                <Mail size={16} />
              </button>
              <button type="button" className="text-[#d6dce2] transition hover:text-white">
                <HelpCircle size={16} />
              </button>
            </div>
          </div>

          <div className="bg-[#cecece] p-8 text-[#2f3236] md:w-[60%] md:p-10">
            <h2 className="text-3xl font-bold text-[#2f3236]">Send Us a Message</h2>
            <p className="mt-2 text-base text-[#62666d]">
              Fill out the form and our team will get back to you soon.
            </p>

            <form className="mt-7 space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#4b5057]">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-xl border border-[#c9c9c9] bg-[#efefef] px-4 py-3 text-base text-[#30343a] outline-none placeholder:text-[#9ba1a9] focus:border-[#6b7179]"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#4b5057]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-[#c9c9c9] bg-[#efefef] px-4 py-3 text-base text-[#30343a] outline-none placeholder:text-[#9ba1a9] focus:border-[#6b7179]"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[#4b5057]">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-[#c9c9c9] bg-[#efefef] px-4 py-3 text-base text-[#30343a] outline-none placeholder:text-[#9ba1a9] focus:border-[#6b7179]"
                />
              </div>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#3e434a] px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-[#34393f]"
              >
                <Send size={17} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="bg-[#d9d9d9] py-2 text-center text-sm font-medium text-[#3f4349]">Back to top</div>

      <footer className="bg-black px-6 py-10 sm:px-10">
        <div className="mx-auto grid w-full max-w-7xl gap-8 text-sm text-white/95 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-2xl font-bold">Get to Know Us</h3>
            <ul className="space-y-1.5 text-base text-white/90">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Cart</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold">Make Money with Us</h3>
            <ul className="space-y-1.5 text-base text-white/90">
              <li>Sell products</li>
              <li>Sell on Business</li>
              <li>Advertise Your Products</li>
              <li>Self-Publish with Us</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-2xl font-bold">Let Us Help You</h3>
            <ul className="space-y-1.5 text-base text-white/90">
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Returns & Replacements</li>
              <li>Manage Your Content and Devices</li>
              <li>Help</li>
            </ul>
          </div>
          <div className="space-y-1.5 text-base text-white/90 md:pt-12">
            <p>Phone: +44 20 7946 0123</p>
            <p>Email: support@hexa.com</p>
            <p>Address: 123 Northern Park Lane, West London, W1A 4ZZ, United Kingdom</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Contact
