
"use client";

import React, { useState, useEffect } from "react";
import { WebsiteData } from "@/lib/types";
import { Navbar, Footer } from "@/components/Navigation";
import { Hero, About, Services, Contact } from "@/components/DynamicSections";
import { ContactModal } from "@/components/ContactModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faExclamationTriangle, faSync } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbz2Di17J-vySwaCPRWg3TlrIDS2oqDnz_IW46EZ-V2GzC-XrwOuxX_X46ryoreqzF5G/exec';

export default function Home() {
  const [data, setData] = useState<WebsiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}?action=all`);
      if (!response.ok) throw new Error("Gagal mengambil data dari Google Sheets");
      const jsonData = await response.json();
      
      if (!jsonData.company || Object.keys(jsonData.company).length === 0) {
        jsonData.company = {
          company_name: 'SheetsFlow',
          logo_icon: 'Building2',
          hero_title: 'Solusi Bisnis Modern',
          hero_subtitle: 'Website Anda dikelola sepenuhnya melalui Google Sheets secara real-time.'
        };
      }
      
      setData(jsonData);
    } catch (err) {
      console.error(err);
      setError("Tidak dapat terhubung ke Google Sheets API. Pastikan skrip aktif.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-4">
        <FontAwesomeIcon icon={faSpinner} spin className="text-5xl text-primary" />
        <p className="text-xl font-headline font-bold text-gray-800">Menghubungkan ke SheetsFlow...</p>
        <p className="text-gray-500 animate-pulse">Sinkronisasi data real-time sedang berlangsung</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-6 text-center">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-7xl text-red-500 mb-6" />
        <h2 className="text-3xl font-headline font-bold text-gray-900 mb-2">Terjadi Kesalahan Sinkronisasi</h2>
        <p className="text-gray-600 max-w-md mb-8">{error}</p>
        <Button size="lg" onClick={fetchData} className="rounded-xl">
          <FontAwesomeIcon icon={faSync} className="mr-2" /> Coba Lagi
        </Button>
      </div>
    );
  }

  return (
    <main className="relative bg-secondary">
      <Navbar 
        company={data.company} 
        navItems={data.navigation} 
        onOpenContact={() => setIsContactOpen(true)} 
      />
      
      <Hero 
        company={data.company} 
        services={data.services}
        onOpenContact={() => setIsContactOpen(true)} 
      />
      
      <About company={data.company} />
      
      <Services services={data.services} />
      
      <Contact company={data.company} />
      
      <Footer 
        company={data.company} 
        social={data.social} 
        navItems={data.navigation} 
      />

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </main>
  );
}
