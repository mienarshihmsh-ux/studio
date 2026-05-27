
"use client";

import React, { useState, useEffect } from "react";
import { CompanyData, NavigationItem, SocialData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBuilding, 
  faPaperPlane, 
  faBars, 
  faTimes, 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt,
  faClock,
  faUsers,
  faThLarge,
  faCogs,
  faChartLine,
  faShieldAlt,
  faGlobe,
  faMobileAlt,
  faCloud,
  faCode,
  faBullhorn,
  faLock,
  faHeadset,
  faRocket,
  faLightbulb,
  faLaptop,
  faLaptopCode,
  faServer,
  faCheckCircle,
  faStar,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";
import { 
  faFacebook, 
  faInstagram, 
  faTwitter, 
  faLinkedin, 
  faWhatsapp,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, any> = {
  building: faBuilding,
  building2: faBuilding,
  paperplane: faPaperPlane,
  'paper-plane': faPaperPlane,
  facebook: faFacebook,
  instagram: faInstagram,
  twitter: faTwitter,
  linkedin: faLinkedin,
  whatsapp: faWhatsapp,
  youtube: faYoutube,
  phone: faPhone,
  envelope: faEnvelope,
  mapmarker: faMapMarkerAlt,
  'map-marker': faMapMarkerAlt,
  clock: faClock,
  users: faUsers,
  grid: faThLarge,
  cogs: faCogs,
  chart: faChartLine,
  chart_line: faChartLine,
  'chart-line': faChartLine,
  shield: faShieldAlt,
  globe: faGlobe,
  mobile: faMobileAlt,
  cloud: faCloud,
  code: faCode,
  bullhorn: faBullhorn,
  lock: faLock,
  security: faShieldAlt,
  headset: faHeadset,
  support: faHeadset,
  rocket: faRocket,
  bulb: faLightbulb,
  laptop: faLaptop,
  'laptop-code': faLaptopCode,
  laptopcode: faLaptopCode,
  server: faServer,
  check: faCheckCircle,
  star: faStar,
  cloud_upload: faCloudUploadAlt
};

export const IconWrapper = ({ iconName, className }: { iconName?: string | null; className?: string }) => {
  if (!iconName) return null;
  const name = iconName.trim();
  if (!name || name === 'null') return null;

  const lowerName = name.toLowerCase();

  // 1. Explicit FontAwesome class (e.g. "fa-solid fa-user")
  if (lowerName.startsWith('fa-')) {
    return <i className={cn(name, className)}></i>;
  }

  // 2. Internal SVG Mapping (Best quality)
  const mappedIcon = ICON_MAP[lowerName];
  if (mappedIcon && typeof mappedIcon === 'object') {
    return <FontAwesomeIcon icon={mappedIcon} className={className} />;
  }

  // 3. Hyphenated names (likely FontAwesome keywords like "laptop-code")
  if (name.includes('-')) {
    return <i className={cn(`fa-solid fa-${name}`, className)}></i>;
  }

  // 4. Fallback to Google Material Icons
  return (
    <span className={cn("material-icons", className)} style={{ fontSize: 'inherit', verticalAlign: 'middle' }}>
      {name}
    </span>
  );
};

export const Navbar = ({ company, navItems, onOpenContact }: { company: CompanyData; navItems: NavigationItem[]; onOpenContact: () => void }) => {
  const [activeSection, setActiveSection] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.section_id));
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  return (
    <nav className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center gap-2">
            <IconWrapper iconName={company.logo_icon || 'building'} className="w-8 h-8 text-primary" />
            <span className="text-2xl font-headline font-bold text-gray-900 tracking-tight">
              {company.company_name}
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.section_id}
                href={`#${item.section_id}`}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                  activeSection === item.section_id
                    ? "text-primary bg-primary/10"
                    : "text-gray-600 hover:text-primary hover:bg-gray-100"
                )}
              >
                {item.title}
              </a>
            ))}
            <div className="pl-4">
              <Button onClick={onOpenContact} className="font-semibold rounded-xl">
                <IconWrapper iconName="paperplane" className="mr-2" /> Pesan
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 overflow-hidden",
        isMenuOpen ? "max-h-screen border-t border-gray-100" : "max-h-0"
      )}>
        <div className="px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.section_id}
              href={`#${item.section_id}`}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-xl text-lg font-semibold transition-colors",
                activeSection === item.section_id ? "text-primary bg-primary/10" : "text-gray-700"
              )}
            >
              {item.title}
            </a>
          ))}
          <Button onClick={() => { onOpenContact(); setIsMenuOpen(false); }} className="w-full h-12 text-lg font-semibold mt-4 rounded-xl">
            <IconWrapper iconName="paperplane" className="mr-2" /> Hubungi Kami
          </Button>
        </div>
      </div>
    </nav>
  );
};

export const Footer = ({ company, social, navItems }: { company: CompanyData; social: SocialData[]; navItems: NavigationItem[] }) => {
  const addressLines = (company.address || '').split(',').map(s => s.trim()).filter(Boolean);

  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <IconWrapper iconName={company.logo_icon || 'building'} className="w-8 h-8 text-primary" />
              <span className="text-2xl font-headline font-bold">{company.company_name}</span>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {company.footer_tagline || "Memberikan solusi terbaik untuk kesuksesan bisnis Anda."}
            </p>
          </div>
          <div>
            <h4 className="text-xl font-headline font-bold mb-8">Tautan Cepat</h4>
            <ul className="space-y-4">
              {navItems.map(item => (
                <li key={item.section_id}>
                  <a href={`#${item.section_id}`} className="text-gray-400 hover:text-primary transition-colors text-lg">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-headline font-bold mb-8">Informasi Kontak</h4>
            <ul className="space-y-4 text-gray-400 text-lg">
              <li className="flex items-start gap-3">
                <IconWrapper iconName="mapmarker" className="text-primary mt-1 w-5 h-5 flex-shrink-0" />
                <div className="flex flex-col">
                  {addressLines.length > 0 ? (
                    addressLines.map((line, i) => (
                      <span key={i} className="block leading-snug">{line}</span>
                    ))
                  ) : (
                    <span>Alamat belum tersedia</span>
                  )}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <IconWrapper iconName="phone" className="text-primary w-5 h-5 flex-shrink-0" />
                <span>{company.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <IconWrapper iconName="envelope" className="text-primary w-5 h-5 flex-shrink-0" />
                <span>{company.email}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-headline font-bold mb-8">Ikuti Kami</h4>
            <div className="flex gap-4">
              {(social || []).map((item, idx) => (
                <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-primary transition-all duration-300 group">
                   <IconWrapper iconName={item.icon} className="w-6 h-6 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-lg">
            &copy; {new Date().getFullYear()} {company.company_name}. {company.copyright_text || "All Rights Reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};
