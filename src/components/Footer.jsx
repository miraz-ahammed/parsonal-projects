import Link from "next/link";
import { FiGithub, FiLinkedin, FiFacebook } from "react-icons/fi";

// TODO: নিজের profile এর লিংক বসাও
const socials = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/your-username",
    icon: FiLinkedin,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/your-username",
    icon: FiFacebook,
  },
  {
    name: "GitHub",
    href: "https://github.com/your-username",
    icon: FiGithub,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-8 sm:px-6 md:flex-row md:justify-between lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-lg font-bold text-white">
            F
          </span>
          <span className="text-xl font-bold text-gray-900">FundSpark</span>
        </Link>

        <p className="text-center text-sm text-gray-600">
          &copy; 2026 FundSpark. All rights reserved.
        </p>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socials.map(({ name, href, icon: Icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}