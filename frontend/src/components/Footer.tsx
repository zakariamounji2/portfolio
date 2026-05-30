"use client";

import { Mail, Code, Briefcase } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30 py-12 text-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-3 md:grid-cols-4">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-white">About</h3>
            <p className="mt-3 text-xs leading-relaxed">
              Software Engineer specialized in backend systems, cloud infrastructure, and DevOps. 
              Based in Morocco, open to remote opportunities in USA and Canada.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white">Links</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a 
                  href="https://github.com/zakariamounji" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyan-200 transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com/in/zakariamounji" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-cyan-200 transition"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white">Expertise</h3>
            <ul className="mt-3 space-y-1 text-xs">
              <li>• Backend (Spring Boot, REST APIs)</li>
              <li>• DevOps (Kubernetes, Docker)</li>
              <li>• CI/CD (Jenkins, Automation)</li>
              <li>• Cloud Infrastructure</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <div className="mt-3 space-y-2">
              <a
                href="mailto:zakariamounji44499@gmail.com"
                className="inline-flex items-center gap-2 text-xs hover:text-cyan-200 transition"
              >
                <Mail className="h-3 w-3" />
                Email
              </a>
              <p className="text-xs">Always open to discussing exciting projects and opportunities.</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-white/5" />

        {/* Bottom */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs sm:flex-row">
          <p>© 2024 Zakaria Mounji. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/zakariamounji" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/50 hover:text-white transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <Code className="h-4 w-4" />
            </a>
            <a 
              href="https://linkedin.com/in/zakariamounji" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/50 hover:text-white transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Briefcase className="h-4 w-4" />
            </a>
            <a 
              href="mailto:zakariamounji44499@gmail.com"
              className="text-white/50 hover:text-white transition"
              aria-label="Email"
              title="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
