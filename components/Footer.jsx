import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
  <footer className="w-full relative     md:bottom-0 bg-white border-t py-6 text-sm text-gray-500 ">
  <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-2 text-center">
    <p>© {new Date().getFullYear()} PennyPath. All rights reserved.</p>

    <div className="flex gap-4 items-center justify-center">
  {/* Contact (Mail) */}
  <Link
    href="mailto:aryangupta052015@gmail.com"
    className="hover:text-indigo-600 transition"
    aria-label="Email"
  >
    <Mail size={18} />
  </Link>

  {/* GitHub */}
  <Link
    href="https://github.com/Aryan0512398"
    target="_blank"
    className="hover:text-black transition"
    aria-label="GitHub"
  >
    <Github size={18} />
  </Link>

  {/* LinkedIn */}
  <Link
    href="https://www.linkedin.com/in/aryan-gupta-b1407a2b5/"
    target="_blank"
    className="hover:text-[#0077b5] transition"
    aria-label="LinkedIn"
  >
    <Linkedin size={18} />
  </Link>
</div>

    <p>
      Made with <span className="text-red-500">❤️</span> by <span className="font-medium text-gray-700">Aryan</span>
    </p>
  </div>
</footer>

  );
}

export default Footer;
