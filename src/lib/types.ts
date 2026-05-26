
export interface CompanyData {
  company_name: string;
  logo_icon?: string;
  hero_title?: string;
  hero_subtitle?: string;
  hero_image?: string;
  about_title?: string;
  about_subtitle?: string;
  about_description?: string;
  about_description2?: string;
  about_image?: string;
  stat_clients?: string;
  stat_clients_label?: string;
  stat_projects?: string;
  stat_projects_label?: string;
  address?: string;
  phone?: string;
  phone_wa?: string;
  email?: string;
  email_support?: string;
  business_hours?: string;
  map_embed_url?: string;
  footer_tagline?: string;
  copyright_text?: string;
}

export interface ServiceData {
  icon: string;
  title: string;
  description: string;
}

export interface SocialData {
  icon: string;
  url: string;
}

export interface NavigationItem {
  section_id: string;
  title: string;
}

export interface WebsiteData {
  company: CompanyData;
  services: ServiceData[];
  social: SocialData[];
  navigation: NavigationItem[];
}
