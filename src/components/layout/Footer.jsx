import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Twitter, Facebook, Instagram, Github } from 'lucide-react'

const Footer = () => {
  const companyLinks = [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'Works', href: '/works' },
    { name: 'Career', href: '/career' },
  ]

  const helpLinks = [
    { name: 'Customer Support', href: '/support' },
    { name: 'Delivery Details', href: '/delivery' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ]

  const faqLinks = [
    { name: 'Account', href: '/account' },
    { name: 'Manage Deliveries', href: '/deliveries' },
    { name: 'Orders', href: '/orders' },
    { name: 'Payments', href: '/payments' },
  ]

  const resourceLinks = [
    { name: 'Free eBooks', href: '/ebooks' },
    { name: 'Development Tutorial', href: '/tutorial' },
    { name: 'How to - Blog', href: '/blog' },
    { name: 'Youtube Playlist', href: '/youtube' },
  ]

  const paymentMethods = [
    { name: 'Visa', src: '/visa.png' },
    { name: 'Mastercard', src: '/mastercard.png' },
    { name: 'PayPal', src: '/paypal.png' },
    { name: 'Apple Pay', src: '/applepay.png' },
    { name: 'Google Pay', src: '/googlepay.png' },
  ]

  return (
    <footer className="bg-gray-100">
      {/* Newsletter Section */}
      <div className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                STAY UP TO DATE ABOUT
              </h2>
              <h2 className="text-2xl md:text-3xl font-bold">
                OUR LATEST OFFERS
              </h2>
            </div>
            <div className="w-full md:w-auto md:min-w-[300px]">
              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white text-black rounded-full pl-12 h-12"
                  />
                  <svg
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-100 rounded-full h-12 font-medium">
                  Subscribe to Newsletter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold text-black mb-4 block">
              SHOP.CO
            </Link>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-black mb-4">COMPANY</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="font-semibold text-black mb-4">HELP</h3>
            <ul className="space-y-3">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ Links */}
          <div>
            <h3 className="font-semibold text-black mb-4">FAQ</h3>
            <ul className="space-y-3">
              {faqLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-black mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-black transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex items-center space-x-4">
              {/* Payment Methods - Using placeholder divs for now */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  MC
                </div>
                <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  PP
                </div>
                <div className="w-8 h-5 bg-black rounded text-white text-xs flex items-center justify-center font-bold">
                  AP
                </div>
                <div className="w-8 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  GP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

