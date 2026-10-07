# Prototype MPSI SPBE Kota Yogyakarta &bull; Fase Tengah

Selamat datang di modul **Fase Tengah: Telaah Arsitektur, Kertas Kerja Asesmen Objektif (F.A02) & Metadata Kebutuhan Sistem (F.A03)** Pemerintah Kota Yogyakarta, mengacu pada **Keputusan Walikota Yogyakarta Nomor 108 Tahun 2026**.

Modul Fase Tengah ini telah diorganisasi secara modular dan dipisahkan menjadi **2 Sub-Folder Mandiri**:

```text
MPSI/prototype/fase-tengah/
├── index.html                               # Portal Hub / Gerbang Utama Fase Tengah
├── tengah.css                               # Shared Design System (Clean Light Theme GovTech)
├── tengah.js                                # Shared Engine Interaktivitas, Kalkulasi & Modal
├── README.md                                # Dokumentasi Resmi Modul
│
├── 1-kertas-kerja-asesmen-analis/          # FOLDER 1: KERTAS KERJA ASESMEN ANALIS
│   ├── index.html                           # Landing Page: Antrean Usulan Analis & SLA Timer
│   ├── dashboard-analis.html                # Portal Gatekeeper Diskominfo (12 Usulan & SLA <= 3 Hari)
│   ├── katalog-portofolio-pemkot.html       # Master Portofolio 18 Aplikasi & Redundancy Inspector
│   └── kertas-kerja-fa02.html               # Workbench Analis: Rubrik 12 Bagian, Hearing OPD, McFarlan & TTE Kabid
│
└── 2-standardisasi-metadata-kebutuhan/     # FOLDER 2: Standardisasi Metadata & Kebutuhan Teknis
    ├── index.html                           # Landing Page: Metadata SDI & Software Requirements
    └── metadata-kebutuhan-fa03.html         # Validasi Walidata Statistik SDI, Form F.A03 & Handover Dev
```

---

## 📂 Penjelasan Rinci Sub-Folder

### 1️⃣ FOLDER 1: `1-kertas-kerja-asesmen-analis/`
Fokus pada tugas Tim Analis Kebijakan SPBE (Diskominfo) sebagai **Gatekeeper Clearance SPBE**:
- **`dashboard-analis.html` / `index.html`**: Memantau seluruh usulan aplikasi yang diajukan oleh OPD, timer SLA $\le$ 3 hari kerja, dan status telaah.
- **`katalog-portofolio-pemkot.html`**: Master katalog portofolio aplikasi se-Pemkot Yogyakarta dilengkapi **Redundancy Inspector** (uji kemiripan kata kunci untuk mencegah duplikasi fungsi dan pemborosan anggaran belanja daerah).
- **`kertas-kerja-fa02.html`**: Workbench Kertas Kerja asesmen objektif 12 bagian (Level 1–4, bobot 100%, slot bukti dukung *evidence*), notulensi hearing klarifikasi OPD, kuadran McFarlan-Peppard (*Strategic*), rekomendasi delivery (*Jalur A: In-House*), serta TTE BSrE Kabid Aptika.

### 2️⃣ FOLDER 2: `2-standardisasi-metadata-kebutuhan/`
Fokus pada penjaminan mutu data dan spesifikasi teknis bersama **Walidata Statistik (Seksi Statistik)**:
- **`metadata-kebutuhan-fa03.html` / `index.html`**:
  - **Validasi Walidata Statistik**: Penyelarasan 4 prinsip Satu Data Indonesia (SDI), format interoperabilitas API SPLP, dan klasifikasi keamanan data pribadi (UU PDP No. 27/2022).
  - **Spesifikasi Kebutuhan Sistem Terstruktur (Form F.A03)**: Matriks User Stories fungsional (*FKTP Intake, Triase IGD, Bed Monitoring SIMRS, Portal Warga JSS*), standar non-fungsional (SLA $\ge$ 99.5%, TLS 1.3, Mandatory Pentest, backup MinIO RPO $\le$ 1 jam).
  - **Pengesahan & Handover**: Berita Acara F.A03 ber-KOP resmi Pemkot dengan TTE kolektif, yang mengalirkan status usulan menjadi **Ready for Development** menuju Fase Hilir.

---

## 🔗 Tautan Akses Cepat

1. **Portal Hub Utama:** `prototype/fase-tengah/index.html`
2. **Folder 1 (Kertas Kerja Analis):** `prototype/fase-tengah/1-kertas-kerja-asesmen-analis/index.html`
3. **Folder 2 (Metadata & Kebutuhan):** `prototype/fase-tengah/2-standardisasi-metadata-kebutuhan/index.html`
