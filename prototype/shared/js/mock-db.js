/**
 * MOCK DATABASE ENGINE (localStorage)
 * MPSI SPBE Kota Yogyakarta - Single Source of Truth Simulasi
 * Mengelola tiket permohonan, riwayat siklus hidup, dan status verifikasi 3 pilar.
 */

const STORAGE_KEY = "MPSI_SPBE_APPLICATIONS_V2";

const DEFAULT_APPLICATIONS = [
  {
    id: "APP-001",
    regNumber: "REG-20261005-0012",
    name: "SiGizi - Sistem Terpadu Penanganan Stunting",
    shortName: "SiGizi",
    opd: "Dinas Kesehatan",
    picName: "Budi Santoso, S.Kom",
    picNip: "198804152012011003",
    picPhone: "081234567890",
    eOfficeNumber: "005/DKS/X/2026",
    eOfficeDate: "2026-10-05",
    urgency: "Tinggi",
    targetUsers: "Masyarakat (JSS), Tenaga Medis Puskesmas, Kader Posyandu",
    scope: "Kota Yogyakarta (14 Kemantren)",
    description: "Sistem pendataan real-time antropometri balita dan intervensi gizi terpadu terintegrasi Satu Data Indonesia dan Puskesmas.",
    legalBasis: "Peraturan Walikota Yogyakarta No. 42 Tahun 2024 tentang Percepatan Pencegahan Stunting",
    currentPhase: 2,
    phaseName: "Fase 2: Asesmen Kelayakan & Klarifikasi Teknis",
    status: "MENUNGGU_JOINT_CLEARANCE",
    statusLabel: "Menunggu Joint Clearance 3 Pilar (F.A02)",
    statusBadge: "amber",
    submittedAt: "2026-10-05T09:30:00Z",
    pilarReviews: {
      organisasi: { status: "PENDING", notes: "Menunggu telaah kesesuaian SOP Layanan Posyandu" },
      bappeda: { status: "DISETUJUI", notes: "Selaras Program Prioritas RPJMD Penurunan Stunting 2026" },
      diskominfo: { status: "PENDING", score: 82, notes: "Bebas redundansi dengan aplikasi eksisting" }
    },
    attachments: [
      { name: "Perwal_Stunting_42_2024.pdf", size: "2.4 MB", type: "Dasar Hukum", uploadedAt: "2026-10-05" },
      { name: "SOP_Pencatatan_Gizi_Balita.pdf", size: "1.1 MB", type: "SOP Layanan", uploadedAt: "2026-10-05" },
      { name: "Format_Laporan_Manual_Kader.pdf", size: "850 KB", type: "Contoh Laporan", uploadedAt: "2026-10-05" }
    ]
  },
  {
    id: "APP-002",
    regNumber: "REG-20260928-0008",
    name: "JogjaSmartPark - Manajemen Parkir Vertikal Malioboro",
    shortName: "JogjaSmartPark",
    opd: "Dinas Perhubungan",
    picName: "Aryo Wicaksono, ST",
    picNip: "198502102009021004",
    picPhone: "081398765432",
    eOfficeNumber: "551/DISHUB/IX/2026",
    eOfficeDate: "2026-09-28",
    urgency: "Sangat Tinggi",
    targetUsers: "Masyarakat Umum (JSS) & Pengelola Parkir",
    scope: "Kawasan Cagar Budaya Malioboro & Kotabaru",
    description: "Sistem reservasi slot parkir vertikal otomatis, integrasi QRIS Bank BPD DIY, dan penghitungan kuota sensor IoT.",
    legalBasis: "Peraturan Daerah Kota Yogyakarta No. 2 Tahun 2020 tentang Perparkiran",
    currentPhase: 5,
    phaseName: "Fase 5: Pengembangan Sistem (Workspace Tangkas)",
    status: "DEVELOPMENT_IN_PROGRESS",
    statusLabel: "Sedang Dikerjakan (Sprint 2 - 45%)",
    statusBadge: "blue",
    submittedAt: "2026-09-28T11:00:00Z",
    pilarReviews: {
      organisasi: { status: "DISETUJUI", notes: "Sesuai tupoksi Bidang Lalu Lintas Dishub" },
      bappeda: { status: "DISETUJUI", notes: "Subkegiatan SIPD 1.07.02.2.01 Anggaran APBD 2026" },
      diskominfo: { status: "DISETUJUI", score: 88, notes: "Kuadran Strategic - Lolos Uji Redundansi" }
    },
    attachments: [
      { name: "Perda_Parkir_2020.pdf", size: "3.2 MB", type: "Dasar Hukum", uploadedAt: "2026-09-28" },
      { name: "SOP_Operasional_Parkir_Vertikal.pdf", size: "1.4 MB", type: "SOP Layanan", uploadedAt: "2026-09-28" }
    ]
  },
  {
    id: "APP-003",
    regNumber: "REG-20260915-0004",
    name: "E-KMS - Elektronik Kartu Menuju Sejahtera Terpadu",
    shortName: "E-KMS",
    opd: "Dinas Sosial Tenaga Kerja dan Transmigrasi",
    picName: "Siti Rahmawati, S.Sos",
    picNip: "199008222015032001",
    picPhone: "085643210987",
    eOfficeNumber: "460/DINSOS/IX/2026",
    eOfficeDate: "2026-09-15",
    urgency: "Tinggi",
    targetUsers: "Keluarga Miskin Kota Yogyakarta & Petugas Verifikasi Lapangan",
    scope: "Seluruh Kemantren & Kelurahan Kota Yogyakarta",
    description: "Digitalisasi pendataan dan pemeringkatan kemiskinan daerah KMS berbasis geotagging foto hunian dan sinkronisasi DTKS Kemensos.",
    legalBasis: "Perwal Kota Yogyakarta No. 12 Tahun 2023 tentang Pedoman Penanggulangan Kemiskinan",
    currentPhase: 7,
    phaseName: "Fase 7: Serah Terima & Rilis Layanan Produksi",
    status: "SELESAI_RILIS_PRODUKSI",
    statusLabel: "Rilis Produksi JSS (Siklus Monev 3 Bulan)",
    statusBadge: "green",
    submittedAt: "2026-09-15T08:15:00Z",
    pilarReviews: {
      organisasi: { status: "DISETUJUI", notes: "Tupoksi Kluster Penanganan Fakir Miskin" },
      bappeda: { status: "DISETUJUI", notes: "Indikator Utama Penurunan Kemiskinan Daerah" },
      diskominfo: { status: "DISETUJUI", score: 94, notes: "Lolos Pentest CSIRT & UAT Disetujui 100%" }
    },
    attachments: [
      { name: "Perwal_KMS_2023.pdf", size: "2.8 MB", type: "Dasar Hukum", uploadedAt: "2026-09-15" }
    ]
  }
];

class MockDB {
  static getApplications() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      this.init();
      return DEFAULT_APPLICATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Gagal parse localStorage, me-reset ke default", e);
      this.init();
      return DEFAULT_APPLICATIONS;
    }
  }

  static init() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_APPLICATIONS));
  }

  static getApplicationById(id) {
    const apps = this.getApplications();
    return apps.find(a => a.id === id || a.regNumber === id);
  }

  static saveApplication(appData) {
    const apps = this.getApplications();
    const existingIndex = apps.findIndex(a => a.id === appData.id || a.regNumber === appData.regNumber);
    
    if (existingIndex >= 0) {
      apps[existingIndex] = { ...apps[existingIndex], ...appData, updatedAt: new Date().toISOString() };
    } else {
      apps.unshift({
        ...appData,
        id: appData.id || `APP-${String(apps.length + 1).padStart(3, '0')}`,
        submittedAt: new Date().toISOString()
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    return apps;
  }

  static updatePhaseStatus(appId, phaseNum, phaseName, status, statusLabel, statusBadge = "amber") {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === appId || a.regNumber === appId);
    if (app) {
      app.currentPhase = phaseNum;
      app.phaseName = phaseName;
      app.status = status;
      app.statusLabel = statusLabel;
      app.statusBadge = statusBadge;
      app.updatedAt = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
    }
    return app;
  }

  static reset() {
    this.init();
    window.location.reload();
  }

  static generateRegNumber() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `REG-${yyyy}${mm}${dd}-${rand}`;
  }
}

// Expose to window
window.MockDB = MockDB;
