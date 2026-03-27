import { useEffect, useRef, useState } from 'react'
import { Accessibility, Bell, Camera, Shield, User } from 'lucide-react'

const STORAGE_KEY = 'hexa_profile_settings'

function Profile() {
  const [activeSection, setActiveSection] = useState('profile')
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(50)
  const [language, setLanguage] = useState('English (US)')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsAlerts, setSmsAlerts] = useState(false)
  const [newsletter, setNewsletter] = useState(true)
  const [profileImage, setProfileImage] = useState('')
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 000-0000',
  })
  const [saveMessage, setSaveMessage] = useState('')
  const [isHydrated, setIsHydrated] = useState(false)

  const profileRef = useRef(null)
  const accessibilityRef = useRef(null)
  const notificationsRef = useRef(null)
  const securityRef = useRef(null)
  const fileInputRef = useRef(null)

  const toggleClass = (enabled) =>
    `flex h-5 w-9 items-center rounded-full px-0.5 transition ${
      enabled ? 'justify-end bg-[#5d78b8]' : 'justify-start bg-[#efefef]'
    }`

  const handleInputChange = (field) => (event) => {
    setProfileData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const jumpToSection = (section, ref) => {
    setActiveSection(section)
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const imageUrl = URL.createObjectURL(file)
    setProfileImage(imageUrl)
  }

  const handleSaveProfile = () => {
    setSaveMessage('Profile saved')
    window.setTimeout(() => setSaveMessage(''), 1800)
  }

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setIsHydrated(true)
      return
    }

    try {
      const parsed = JSON.parse(stored)
      setDarkMode(Boolean(parsed.darkMode))
      setFontSize(typeof parsed.fontSize === 'number' ? parsed.fontSize : 50)
      setLanguage(parsed.language || 'English (US)')
      setEmailNotifications(Boolean(parsed.emailNotifications))
      setSmsAlerts(Boolean(parsed.smsAlerts))
      setNewsletter(Boolean(parsed.newsletter))
      setProfileImage(parsed.profileImage || '')
      setProfileData({
        firstName: parsed.profileData?.firstName || 'John',
        lastName: parsed.profileData?.lastName || 'Doe',
        email: parsed.profileData?.email || 'john.doe@example.com',
        phone: parsed.profileData?.phone || '+1 (555) 000-0000',
      })
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const payload = {
      darkMode,
      fontSize,
      language,
      emailNotifications,
      smsAlerts,
      newsletter,
      profileImage,
      profileData,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  }, [darkMode, fontSize, language, emailNotifications, smsAlerts, newsletter, profileImage, profileData, isHydrated])

  const mainClass = darkMode ? 'min-h-screen bg-slate-900 text-slate-100' : 'min-h-screen bg-black text-white'
  const sidebarClass = darkMode ? 'h-fit rounded-md bg-slate-800 p-4 text-slate-100' : 'h-fit rounded-md bg-[#dedede] p-4 text-black'
  const panelClass = darkMode ? 'rounded-md bg-slate-800 p-5 text-slate-100 md:p-6' : 'rounded-md bg-[#dedede] p-5 text-black md:p-6'
  const inputClass = darkMode
    ? 'w-full rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-slate-100 outline-none'
    : 'w-full rounded-md border border-[#cfcfcf] bg-[#e8e8e8] px-3 py-2 outline-none'
  const mutedClass = darkMode ? 'text-slate-300' : 'text-slate-600'

  return (
    <main className={mainClass} style={{ fontSize: `${13 + fontSize * 0.05}px` }}>
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <aside className={sidebarClass}>
            <nav className="space-y-2 text-sm">
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${activeSection === 'profile' ? 'bg-[#d4dae7]' : 'hover:bg-[#d5d5d5]'}`}
                onClick={() => jumpToSection('profile', profileRef)}
              >
                <User size={14} />
                Profile Settings
              </button>
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${activeSection === 'accessibility' ? 'bg-[#d4dae7]' : 'hover:bg-[#d5d5d5]'}`}
                onClick={() => jumpToSection('accessibility', accessibilityRef)}
              >
                <Accessibility size={14} />
                Accessibility
              </button>
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${activeSection === 'notifications' ? 'bg-[#d4dae7]' : 'hover:bg-[#d5d5d5]'}`}
                onClick={() => jumpToSection('notifications', notificationsRef)}
              >
                <Bell size={14} />
                Notifications
              </button>
              <button
                type="button"
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left ${activeSection === 'security' ? 'bg-[#d4dae7]' : 'hover:bg-[#d5d5d5]'}`}
                onClick={() => jumpToSection('security', securityRef)}
              >
                <Shield size={14} />
                Security
              </button>
            </nav>
          </aside>

          <div className="space-y-4">
            <div ref={profileRef} className={panelClass}>
              <h2 className="text-3xl font-semibold">Profile Settings</h2>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className="relative h-16 w-16 rounded-full bg-[#575757] bg-cover bg-center"
                  style={profileImage ? { backgroundImage: `url(${profileImage})` } : undefined}
                >
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 rounded-full bg-[#5c6786] p-1.5 text-white"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload profile photo"
                  >
                    <Camera size={13} />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div>
                  <p className="text-lg font-medium">Profile Photo</p>
                  <p className={`text-sm ${mutedClass}`}>Upload a new photo or remove the current one</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-1 block text-sm">First Name</label>
                  <input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={handleInputChange('firstName')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1 block text-sm">Last Name</label>
                  <input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={handleInputChange('lastName')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="emailAddress" className="mb-1 block text-sm">Email Address</label>
                  <input
                    id="emailAddress"
                    value={profileData.email}
                    onChange={handleInputChange('email')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="mb-1 block text-sm">Phone Number</label>
                  <input
                    id="phoneNumber"
                    value={profileData.phone}
                    onChange={handleInputChange('phone')}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-md bg-[#5d78b8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f6aaa]"
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </button>
                {saveMessage && <span className="text-sm text-green-500">{saveMessage}</span>}
              </div>
            </div>

            <div ref={accessibilityRef} className={panelClass}>
              <h3 className="text-3xl font-semibold">Accessibility Options</h3>
              <div className="mt-5 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-medium">Dark Mode</p>
                    <p className={`text-sm ${mutedClass}`}>Switch between light and dark themes</p>
                  </div>
                  <button
                    type="button"
                    className={toggleClass(darkMode)}
                    onClick={() => setDarkMode((prev) => !prev)}
                    aria-pressed={darkMode}
                  >
                    <span className="block h-4 w-4 rounded-full bg-white shadow" />
                  </button>
                </div>

                <div>
                  <p className="text-xl font-medium">Font Size</p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fontSize}
                    onChange={(event) => setFontSize(Number(event.target.value))}
                    className="mt-2 w-full accent-blue-500"
                  />
                  <div className="mt-1 flex justify-between text-xs text-slate-600">
                    <span>A</span>
                    <span>A</span>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xl font-medium">Language</p>
                  <select
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className={inputClass}
                  >
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>French</option>
                    <option>Spanish</option>
                  </select>
                </div>
              </div>
            </div>

            <div ref={notificationsRef} className={panelClass}>
              <h3 className="text-3xl font-semibold">Notification Preferences</h3>
              <div className="mt-5 space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-medium">Email Notifications</p>
                    <p className={`text-sm ${mutedClass}`}>Receive booking confirmations and updates</p>
                  </div>
                  <button
                    type="button"
                    className={toggleClass(emailNotifications)}
                    onClick={() => setEmailNotifications((prev) => !prev)}
                    aria-pressed={emailNotifications}
                  >
                    <span className="block h-4 w-4 rounded-full bg-white shadow" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-medium">SMS Alerts</p>
                    <p className={`text-sm ${mutedClass}`}>Get text messages for important updates</p>
                  </div>
                  <button
                    type="button"
                    className={toggleClass(smsAlerts)}
                    onClick={() => setSmsAlerts((prev) => !prev)}
                    aria-pressed={smsAlerts}
                  >
                    <span className="block h-4 w-4 rounded-full bg-white shadow" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-medium">Newsletter</p>
                    <p className={`text-sm ${mutedClass}`}>Weekly updates and travel inspiration</p>
                  </div>
                  <button
                    type="button"
                    className={toggleClass(newsletter)}
                    onClick={() => setNewsletter((prev) => !prev)}
                    aria-pressed={newsletter}
                  >
                    <span className="block h-4 w-4 rounded-full bg-white shadow" />
                  </button>
                </div>
              </div>
            </div>

            <div ref={securityRef} className={panelClass}>
              <h3 className="text-3xl font-semibold">Security</h3>
              <p className={`mt-3 text-sm ${mutedClass}`}>Manage your login and account security settings.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-md bg-[#5d78b8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f6aaa]"
                  onClick={() => window.alert('Change password flow')}
                >
                  Change Password
                </button>
                <button
                  type="button"
                  className="rounded-md border border-[#b4b4b4] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-[#d8d8d8]"
                  onClick={() => window.alert('Two-factor authentication settings')}
                >
                  Two-Factor Authentication
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        className="w-full bg-[#d6d6d6] py-2 text-center text-sm font-medium text-slate-700"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </button>

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

export default Profile
