# SheetsFlow Dynamic - Landing Page Bisnis Profesional

SheetsFlow Dynamic adalah solusi website landing page modern dan profesional yang dikelola sepenuhnya melalui Google Sheets. Aplikasi ini dirancang untuk memudahkan pemilik bisnis dalam memperbarui konten website secara real-time tanpa perlu menyentuh kode program.

## Fitur Utama

- **Manajemen Konten Real-time**: Semua data mulai dari informasi perusahaan, layanan, hingga detail kontak dikelola melalui Google Sheets. Perubahan di Sheets akan langsung muncul di website secara instan.
- **Desain Modern & Responsif**: Menggunakan teknologi Next.js 15, React 19, dan Tailwind CSS untuk memberikan tampilan yang memukau di perangkat seluler, tablet, hingga desktop.
- **Dukungan Ikon Fleksibel**: Mendukung ribuan ikon dari FontAwesome 7.0.1 dan Google Material Icons. Sistem secara otomatis mendeteksi sumber ikon berdasarkan nama yang diberikan.
- **Formulir Kontak Terintegrasi**: Pengunjung dapat mengirim pesan melalui formulir kontak yang divalidasi, dengan notifikasi SweetAlert2 yang elegan. Data pesan akan langsung tersimpan kembali ke Google Sheets.
- **Peta Interaktif**: Integrasi Google Maps yang responsif untuk memudahkan pelanggan menemukan lokasi fisik bisnis Anda.
- **Navigasi Cerdas**: Navbar yang adaptif dengan fitur smooth scrolling untuk pengalaman pengguna yang lebih baik.

## Teknologi yang Digunakan

- **Next.js 15 (App Router)**: Framework React terbaru untuk performa optimal dan SEO yang kuat.
- **React 19**: Library UI modern dengan performa tinggi.
- **Tailwind CSS**: Untuk desain antarmuka yang presisi dan responsif.
- **ShadCN UI**: Kumpulan komponen UI berkualitas tinggi untuk elemen website.
- **Google Sheets API**: Digunakan sebagai CMS (Content Management System) yang fleksibel dan mudah diakses.
- **SweetAlert2**: Memberikan notifikasi popup yang profesional dan interaktif.
- **Lucide React & FontAwesome**: Library ikon yang komprehensif.

## Struktur Konten Website

Website ini terdiri dari beberapa bagian dinamis yang terhubung langsung ke Sheets:
1. **Hero Section**: Menampilkan pesan utama, sub-judul, dan gambar promosi untuk menarik perhatian pengunjung.
2. **About Section**: Menceritakan latar belakang perusahaan dilengkapi dengan statistik pencapaian (klien dan proyek).
3. **Services Section**: Daftar layanan profesional yang ditawarkan, disusun dalam kartu-kartu modern dengan ikon yang relevan.
4. **Contact Section**: Informasi operasional lengkap (Alamat, Telepon, Jam Kerja, Email) yang disandingkan dengan peta lokasi.
5. **Footer**: Informasi hak cipta, navigasi cepat, dan tautan media sosial.

## Cara Konfigurasi

1. **Koneksi Google Sheets**: Pastikan URL API dari Google Apps Script telah dimasukkan ke dalam variabel `API_BASE_URL` di file utama.
2. **Input Data**: Isi data pada tab yang sesuai di Google Sheets (Company, Services, Social, Navigation).
3. **Pengaturan Ikon**: 
   - Gunakan format FontAwesome (misal: `laptop-code`, `fa-solid fa-star`)
   - Atau gunakan format Material Icons (misal: `cloud_upload`, `shopping_cart`)

---
Dikembangkan dengan standar profesional untuk membantu bisnis Anda tampil lebih kredibel di dunia digital.