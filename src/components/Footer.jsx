export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Legal<span className="text-[#C9A65B]">Ease</span>
            </h2>

            <p className="mt-3 text-sm text-gray-300 leading-relaxed">
              Connect with verified lawyers and get professional legal support anytime, anywhere.
              Secure, fast and trusted legal hiring platform.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-[#C9A65B] cursor-pointer">Home</li>
              <li className="hover:text-[#C9A65B] cursor-pointer">Browse Lawyers</li>
              <li className="hover:text-[#C9A65B] cursor-pointer">Dashboard</li>
              <li className="hover:text-[#C9A65B] cursor-pointer">About</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-[#C9A65B] cursor-pointer">Privacy Policy</li>
              <li className="hover:text-[#C9A65B] cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-[#C9A65B] cursor-pointer">Contact</li>
              <li className="hover:text-[#C9A65B] cursor-pointer">Support</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>

            <p className="text-sm text-gray-300 mb-3">
              Get updates about legal experts and new features.
            </p>

            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-[#C9A65B]"
              />

              <button className="bg-[#C9A65B] hover:bg-[#ab8635] text-white py-2 rounded-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} <span className="text-[#C9A65B]">LegalEase</span>. All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0 text-gray-300">
            <span className="hover:text-[#C9A65B] cursor-pointer">🌐</span>
            <span className="hover:text-[#C9A65B] cursor-pointer">🐦</span>
            <span className="hover:text-[#C9A65B] cursor-pointer">📘</span>
            <span className="hover:text-[#C9A65B] cursor-pointer">💼</span>
          </div>

        </div>
      </div>
    </footer>
  );
}