# DOKUMEN BLUEPRINT PROYEK — Sistem Informasi Manajemen Proyek & Kolaborasi Diskominfo

**Kesepakatan Ruang Lingkup & Spesifikasi antara Klien dan Seksi Perangkat Lunak Diskominfo Kota Yogyakarta**

---
**Kode Dokumen**: BLUEPRINT-MPSI-1.0  
**Versi**: 1.0  
**Tanggal**: 05 Oktober 2026  
**Status**: DISETUJUI  

---

## 1. Halaman Pengesahan (Legal/Persetujuan)

Dokumen ini menyatakan bahwa kedua belah pihak menyetujui ruang lingkup, kebutuhan bisnis, spesifikasi teknis, serta *Definition of Done* yang tercantum di dalamnya. Dokumen ini menjadi landasan pacu (*baseline*) untuk seluruh aktivitas pengerjaan, implementasi, dan pengujian sistem. 

Perubahan ruang lingkup di luar yang tercantum di sini akan memerlukan persetujuan tertulis (*change request*) yang baru.

| Pihak | Nama | Jabatan | Instansi / Perusahaan | Tanda Tangan | Tanggal |
|---|---|---|---|---|---|
| Klien | ......................... | Kepala Seksi Perencanaan | Diskominfo Kota Yogyakarta | ......................... | ......................... |
| Data | ......................... | Kepala Seksi Data Statistik | Diskominfo Kota Yogyakarta | ......................... | ......................... |
| Developer | ......................... | Kepala Seksi Perangkat Lunak| Diskominfo Kota Yogyakarta | ......................... | ......................... |

---

## 2. Ringkasan Eksekutif
Proyek ini membangun Sistem Informasi Kolaborasi untuk manajemen proyek pengembangan perangkat lunak di lingkungan Dinas Komunikasi dan Informatika (Diskominfo). Sistem ini dirancang untuk mencegah pengembangan yang terisolasi (*silo*) dengan memberlakukan proses *gatekeeping* dan *assessment* lintas seksi (Perencanaan, Data Statistik, dan Perangkat Lunak). Target utamanya adalah menjamin 100% pengembangan aplikasi mematuhi arsitektur SPBE dan metadata Satu Data Indonesia (SDI). 

---

## 3. Ruang Lingkup yang Disepakati
*Ruang lingkup ini adalah batasan tanggung jawab yang mutlak.*

**In-Scope:**
- Pengembangan Aplikasi Baru (baik *in-house* maupun pihak ketiga/vendor).
- Pemeliharaan atau Pembaruan (*Maintenance*) Aplikasi yang sudah berjalan.
Seluruh kategori di atas wajib melalui prosedur penilaian (*assessment*) metadata yang sama.

**Out-of-Scope:**
- Pengembangan sistem atau jaringan di luar koordinasi dan kewenangan Diskominfo.

---

## 4. Requirement Bisnis & Tujuan

| ID | Tujuan Utama | Metrik (KPI) Target |
|---|---|---|
| **TUJ-01** | Kepatuhan Metadata | 100% aplikasi memiliki metadata SDI sebelum *coding* |
| **TUJ-02** | SLA Assessment | Waktu *review* kelayakan maksimal 3–5 hari kerja |

| ID | Kebutuhan Bisnis | Prioritas |
|---|---|---|
| **BR-01** | Wajib melalui *gatekeeping* Perencanaan & Data Statistik | Must |
| **BR-02** | Wajib mematuhi SLA 3-5 hari kerja agar tidak ada bottleneck | Must |
| **BR-03** | Mendukung seluruh tipe proyek (in-house, vendor, maintenance) | Must |

---

## 5. Fitur & Acceptance Criteria

Fitur inti (*Must-Have*) yang akan diselesaikan dan menjadi syarat penerimaan sistem (*Acceptance*):

| ID | Nama Fitur | Acceptance Criteria Inti (Gherkin) |
|---|---|---|
| **PRD-01** | Form Pengajuan Proyek | **Given** OPD membuka portal, **When** mereka mengisi form dan unggah KAK mentah, **Then** tiket permohonan tercatat berstatus "Menunggu Review". |
| **PRD-02** | Workflow Approval | **Given** tiket masuk ke Perencanaan, **When** diklik "Tolak", **Then** sistem wajib meminta alasan penolakan. |
| **PRD-03** | Penetapan Metadata | **Given** tiket disetujui, **When** Data Statistik mengunggah Excel Metadata & input Referensi SPBE, **Then** tiket diteruskan ke Developer. |
| **PRD-04** | Eksekusi Developer | **Given** status "In Progress", **When** dokumen SRS belum diunggah, **Then** sistem memblokir perubahan status. |
| **PRD-05** | Notifikasi In-App | **Given** status tiket berubah, **When** aktor membuka dashboard, **Then** ikon lonceng menampilkan notifikasi perubahan secara *realtime*. |

---

## 6. Spesifikasi Teknis Kunci (NFR & Constraint)
Agar *reliable* dan sesuai standar Pemerintah Kota Yogyakarta:

- **Security (SRS-NF-02):** Otentikasi aplikasi diwajibkan menggunakan integrasi SSO Keycloak JSS. Dilarang ada *login* lokal di *production*.
- **Scalability (SRS-NF-03):** Seluruh penyimpanan dokumen (KAK, Spesifikasi, SRS, UAT) wajib menggunakan sistem tersentralisasi MinIO Object Storage.
- **Constraint Stack (C.7):**
  - **Backend:** Golang (Clean Architecture)
  - **Frontend:** React/Vue (Vite)
  - **Database:** PostgreSQL 16+
  - **Environment:** Wajib menggunakan isolasi *container* berbasis Docker dan Docker Compose.

---

## 7. Definition of Done (Syarat Selesai)
Sistem dinyatakan *Selesai* dan siap diserahterimakan (BAST) jika:
1. Lolos *Unit & Integration Testing* dengan *coverage* kode minimal 85%.
2. Laporan Pengujian (TEST_REPORT) dan Uji Keamanan (SECURITY_REPORT/OWASP) telah disahkan.
3. *Container* aplikasi (*Docker Compose*) berjalan stabil di lingkungan *staging*.

---

## 8. Ketentuan Tambahan
*Dokumen ini merujuk pada `Blueprint.md` versi 1.0 yang tersimpan di root repositori sebagai lampiran spesifikasi teknis lengkap. Segala detail fungsional yang tidak diatur di halaman ini tetap mengikat pada berkas `Blueprint.md` tersebut sebagai bagian tak terpisahkan dari kesepakatan ini.*
