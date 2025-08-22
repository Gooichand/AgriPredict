'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <nav className="bg-gradient-to-r from-green-700 to-yellow-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/crop-setup" className="text-2xl font-bold flex items-center gap-2">
            🌾 KISAN SAFE 🚜
          </Link>
          <div className="flex gap-6">
            <Link href="/crop-setup" className="hover:text-yellow-200">Home</Link>
            <Link href="/about" className="hover:text-yellow-200">About</Link>
            <Link href="/contact" className="hover:text-yellow-200 font-semibold">Contact</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            📞 Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">Get in Touch</h2>
              
              {isSubmitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  ✅ Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-white p-3 rounded-lg hover:from-green-700 hover:to-yellow-600 font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Contact Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">📧</div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Email</h3>
                      <p className="text-gray-600">support@kisansafe.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-2xl">📱</div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Phone</h3>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-2xl">📍</div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Address</h3>
                      <p className="text-gray-600">
                        AgriTech Hub, Sector 62<br />
                        Noida, Uttar Pradesh 201309<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-2xl">🕒</div>
                    <div>
                      <h3 className="font-semibold text-gray-700">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 4:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">Follow Us</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <div className="text-2xl">📘</div>
                    <span className="text-blue-700 font-medium">Facebook</span>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <div className="text-2xl">🐦</div>
                    <span className="text-blue-700 font-medium">Twitter</span>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg hover:bg-pink-100">
                    <div className="text-2xl">📷</div>
                    <span className="text-pink-700 font-medium">Instagram</span>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                    <div className="text-2xl">💼</div>
                    <span className="text-blue-700 font-medium">LinkedIn</span>
                  </a>
                </div>
              </div>

              <div className="bg-green-100 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-3">🚀 Quick Support</h3>
                <p className="text-green-700 mb-4">
                  Need immediate help? Our AI assistant is available 24/7 on the dashboard!
                </p>
                <Link 
                  href="/crop-setup" 
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}