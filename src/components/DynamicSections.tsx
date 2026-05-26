
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CompanyData, ServiceData, SocialData, WebsiteData } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  Users,
  LayoutGrid,
  Sparkles,
  Loader2
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { suggestHeroCopy, SuggestHeroCopyOutput } from "@/ai/flows/suggest-hero-copy";

const IconWrapper = ({ iconName, className }: { iconName: string; className?: string }) => {
  const IconComponent = (LucideIcons as any)[
    iconName.charAt(0).toUpperCase() + iconName.slice(1)
  ] || Building2;
  return <IconComponent className={className} />;
};

export const Hero = ({ company, services, onOpenContact }: { company: CompanyData; services: ServiceData[]; onOpenContact: () => void }) => {
  const [aiCopy, setAiCopy] = useState<SuggestHeroCopyOutput | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSuggestAi = async () => {
    setLoadingAi(true);
    try {
      const result = await suggestHeroCopy({
        services: services.map(s => ({ title: s.title, description: s.description }))
      });
      setAiCopy(result);
    } catch (error) {
      console.error("AI Copy failed", error);
    } finally {
      setLoadingAi(false);
    }
  };

  const placeholder = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section id="beranda" className="pt-24 min-h-[90vh] flex items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-gray-900 leading-tight">
              {aiCopy?.headline || company.hero_title || "Solusi Terbaik Untuk Bisnis Anda"}
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              {aiCopy?.subheading || company.hero_subtitle || "Kami menyediakan layanan profesional berkualitas tinggi untuk membantu kesuksesan bisnis Anda."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={onOpenContact} className="h-14 px-8 text-lg font-semibold rounded-xl shadow-lg hover:shadow-primary/30 transition-all">
                <Send className="mr-2 w-5 h-5" /> Kirim Pesan
              </Button>
              <Button size="lg" variant="outline" asChild className="h-14 px-8 text-lg font-semibold rounded-xl border-primary text-primary hover:bg-primary/5">
                <a href="#layanan">Lihat Layanan</a>
              </Button>
            </div>
            
            <button 
              onClick={handleSuggestAi}
              disabled={loadingAi}
              className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors bg-white/50 backdrop-blur px-3 py-1.5 rounded-full border border-accent/20"
            >
              {loadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Optimalkan Copy dengan AI
            </button>
          </div>
          <div className="relative group perspective-1000 hidden md:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <Image 
                src={company.hero_image || placeholder?.imageUrl || ""} 
                alt="Hero Image" 
                width={800} 
                height={600} 
                className="w-full object-cover aspect-[4/3]"
                data-ai-hint="business office"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms]">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Klien Puas</p>
                <p className="text-xl font-bold text-gray-800">{company.stat_clients || "100+"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const About = ({ company }: { company: CompanyData }) => {
  const placeholder = PlaceHolderImages.find(img => img.id === 'about-image');
  return (
    <section id="tentang" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold text-gray-900 mb-4">{company.about_title || "Tentang Kami"}</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">{company.about_subtitle || "Mengenal lebih dekat visi dan misi perusahaan kami."}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-headline font-bold text-gray-800 leading-tight">
              Membangun Masa Depan <span className="text-primary">{company.company_name}</span>
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>{company.about_description}</p>
              <p>{company.about_description2}</p>
            </div>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{company.stat_clients || "100+"}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{company.stat_clients_label || "Klien Puas"}</p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent mb-4">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{company.stat_projects || "500+"}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{company.stat_projects_label || "Proyek Selesai"}</p>
              </div>
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src={company.about_image || placeholder?.imageUrl || ""} 
              alt="About Us" 
              width={800} 
              height={600} 
              className="w-full object-cover"
              data-ai-hint="team meeting"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Services = ({ services }: { services: ServiceData[] }) => {
  return (
    <section id="layanan" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold text-gray-900 mb-4">Layanan Kami</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 text-lg">Solusi komprehensif untuk setiap tantangan bisnis Anda.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Card key={idx} className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-2xl overflow-hidden group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                  <IconWrapper iconName={service.icon} className="w-8 h-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-headline font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Contact = ({ company }: { company: CompanyData }) => {
  const addressLines = (company.address || '').split(',');
  const businessHours = (company.business_hours || '').split(',');

  return (
    <section id="kontak" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-headline font-bold text-gray-900 mb-4">Hubungi Kami</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-6 text-lg">Kami siap mendengar kebutuhan Anda.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Alamat Kantor</h3>
                {addressLines.map((line, i) => <p key={i} className="text-gray-600 text-lg">{line.trim()}</p>)}
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Telepon & WhatsApp</h3>
                <p className="text-gray-600 text-lg">{company.phone}</p>
                {company.phone_wa && <p className="text-gray-600 text-lg">{company.phone_wa} (WhatsApp)</p>}
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Dukungan</h3>
                <p className="text-gray-600 text-lg">{company.email}</p>
                {company.email_support && <p className="text-gray-600 text-lg">{company.email_support}</p>}
              </div>
            </div>
            <div className="flex items-start gap-6 p-6 bg-secondary rounded-2xl border border-gray-100 hover:border-primary/20 transition-all">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Jam Operasional</h3>
                {businessHours.map((line, i) => <p key={i} className="text-gray-600 text-lg">{line.trim()}</p>)}
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] border-8 border-white relative">
            <iframe 
              src={company.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322851!2d106.81944991576919!3d-6.194287395503381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f6c3a8f9a5c3%3A0x2e8d0c9b8f9a5c3!2sKuningan%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1699999999999!5m2!1sen!2sid"}
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" title="Location Map"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
