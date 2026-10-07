# Prototype Fase Hulu — Form F.A01 (Intake Permohonan Aplikasi SPBE)

Dokumen ini menjelaskan rancangan prototype interaktif untuk **Fase Hulu (Permohonan & Inisiasi)** pada Sistem Informasi Manajemen Proyek Sistem Informasi (MPSI) Pemerintah Kota Yogyakarta, mengacu pada **Keputusan Wali Kota Yogyakarta Nomor 108 Tahun 2026**.

---

## 1. Lingkup Modul Fase Hulu (F.A01)

Fase Hulu bertindak sebagai **pintu gerbang masuk pertama (intake)** bagi Organisasi Perangkat Daerah (OPD) yang ingin membangun aplikasi baru atau mengembangkan sistem eksisting.

Modul ini mengimplementasikan:
1. **Otentikasi & Verifikasi PIC (SSO JSS)**: Identitas penanggung jawab teknis ditarik langsung dari akun Jogja Smart Service (JSS).
2. **Profil Aplikasi & Pemetaan Urusan**: Input nama, akronim, tujuan layanan terukur, domain arsitektur SPBE, serta estimasi beban transaksi.
3. **Pengunggahan 4 Dokumen Persyaratan Wajib (MinIO)**:
   * Draf SOP Pelayanan (Hasil konsultasi Gate 1 / Bagian Organisasi Setda).
   * Dasar Hukum Tupoksi (Perwal SOTK / SK Penugasan).
   * Peta Proses Bisnis / Flowchart Alur Kerja Layanan.
   * Usulan Kamus Data & Output Laporan (Satu Data Daerah).
4. **Integrasi Naskah Dinas Elektronik (eOffice Pemkot Jogja)**:
   * Validasi Nomor Surat Pengantar Dinas Resmi.
   * Tanggal surat dan verifikasi keabsahan TTE BSrE BSSN.
5. **Auto-Generate Nomor Registrasi Unik**: Format `REG-YYYYMMDD-XXXX`.
6. **Preview Lembar Cetak Resmi Form F.A01**: Naskah dinas ber-KOP resmi Dinas Kominfosan Kota Yogyakarta.
7. **Status Transition**: Tiket diteruskan ke antrean Seksi Perencanaan dengan status `Menunggu Telaah Kelayakan & Kertas Kerja (F.A02)`.

---

## 2. Struktur Berkas Folder Prototype

```
MPSI/prototype/fase-hulu/
├── dashboard-opd.html # Portal / Dashboard Admin OPD Aplikasi Pengampu (Sebelum Form F.A01)
├── dashboard.css      # Styling Khusus Grid Metrik & Katalog Aplikasi Pengampu OPD
├── index.html         # Antarmuka Multi-Step Wizard (Step 1 s/d 5) & Modal Preview Cetak F.A01
├── style.css          # Desain Sistem Apple HIG x Modern GovTech (Clean Light Mode)
├── app.js             # Engine Interaktivitas, Auto-Calculation, Validasi eOffice & Upload Simulator
└── README.md          # Panduan & Dokumentasi Arsitektur Modul
```

---

## 3. Cara Menjalankan Prototype

Prototype ini dibangun murni menggunakan standar web modern (**HTML5, Vanilla CSS, dan Vanilla JavaScript**) tanpa dependensi eksternal yang rumit, sehingga dapat dibuka langsung:

1. **Buka Langsung di Browser**:
   Klik ganda berkas `index.html` pada File Explorer Anda, atau buka via browser (Chrome, Edge, Firefox, Safari).
2. **Menggunakan Live Server / Local Web Server**:
   ```bash
   # Contoh jika menggunakan python:
   python -m http.server 3000
   # Akses di browser: http://localhost:3000/prototype/fase-hulu/
   ```

---

## 4. Keterkaitan dengan Fase Berikutnya (Fase Tengah)

Setelah form F.A01 disubmit pada prototype ini:
* Tiket dengan nomor registrasi unik akan otomatis masuk ke **Fase Tengah: Modul Kertas Kerja Analis & Telaah Kelayakan (Form F.A02)** yang akan dibangun pada folder `prototype/fase-tengah/`.
