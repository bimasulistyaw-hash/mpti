# Template BLUEPRINT — [Nama Produk/Sistem]
> Dokumen gabungan **BRD + PRD + SRS** — referensi spesifikasi tunggal untuk vibe engineering / agentic coding.
> Standar: BRD → BABOK v3 (IIBA) · SRS → ISO/IEC/IEEE 29148:2018 · NFR → ISO/IEC 25010 · Prioritas → MoSCoW (DSDM) · Acceptance → Gherkin.
---
## 1. Informasi Dokumen
| Field | Nilai |
|---|---|
| Judul | Blueprint — [Nama Produk/Sistem] |
| Kode Dokumen | BLUEPRINT-[PROYEK]-[VERSI] |
| Versi | 1.0 |
| Tanggal | YYYY-MM-DD |
| Status | DRAFT / DITINJAU / DISETUJUI |
| Pemilik | [Nama] |
| Author | [Nama] |
| Reviewer | [Nama] |
| Approver | [Nama] |
| Tools Target | Google Antigravity 2.0 / agentic coding |
### Riwayat Revisi
| Versi | Tanggal | Deskripsi Perubahan | Penulis |
|---|---|---|---|
| 0.1 | | Draf awal | |
| 1.0 | | Disetujui | |
---
## 2. Ringkasan Eksekutif
- [1 paragraf: masalah, solusi, pengguna, nilai bisnis, ukuran sukses, timeline]
---
# BAGIAN A — BRD (Business Requirements Document)
## A.1. Latar Belakang & Konteks Bisnis
- A.1.1. Kondisi bisnis saat ini (as-is)
- A.1.2. Pemicu perubahan
- A.1.3. Kaitan dengan strategi organisasi
## A.2. Pernyataan Masalah & Peluang
- A.2.1. Problem statement: *"Saat ini [siapa] tidak dapat [apa] karena [alasan], berdampak [dampak terukur]."*
- A.2.2. Peluang / value proposition
- A.2.3. Dampak bila tidak ditangani
## A.3. Tujuan Bisnis & KPI (SMART)
| ID | Tujuan | Metrik (KPI) | Baseline | Target | Periode Ukur |
|---|---|---|---|---|---|
| TUJ-01 | | | | | |
## A.4. Ruang Lingkup
- A.4.1. **In-Scope**
- A.4.2. **Out-of-Scope** (beserta alasannya)
- A.4.3. Batasan lingkup
## A.5. Stakeholder & RACI
| Stakeholder | Peran | Kepentingan | Pengaruh | R/A/C/I per proses kunci |
|---|---|---|---|---|
| | | | | |
## A.6. Kebutuhan Bisnis (Business Requirements)
| ID | Kebutuhan Bisnis | Prioritas (MoSCoW) | Sumber | Status |
|---|---|---|---|---|
| BR-01 | | Must / Should / Could / Won't | [Jawaban]/[Dok: x]/[Audio: x] | |
| BR-02 | | | | |
## A.7. Proses Bisnis: As-Is vs To-Be
- A.7.1. Proses saat ini
- A.7.2. Proses target
- A.7.3. Perbandingan langkah demi langkah
## A.8. Analisis Kesenjangan (Gap Analysis)
| Proses | Kondisi As-Is | Kondisi To-Be | Gap | Aksi |
|---|---|---|---|---|
| | | | | |
---
# BAGIAN B — PRD (Product Requirements Document)
## B.1. Visi Produk
- Visi 1–2 kalimat; apa yang dibangun, untuk siapa, kenapa sekarang, ukuran sukses.
## B.2. Konteks & Masalah
- B.2.1. Masalah pengguna yang dipecahkan
- B.2.2. Bukti masalah
- B.2.3. Kaitan dengan **BR-xx**
## B.3. Target Pasar & Kompetitif (ringkas)
- Segmen pasar; diferensiasi produk kita.
## B.4. Persona Pengguna
| ID | Nama Persona | Peran | Tujuan Utama | Pain Points | Konteks |
|---|---|---|---|---|---|
| P-01 | | | | | |
## B.5. User Stories & Journey
| ID | User Story | Persona | Prioritas |
|---|---|---|---|
| US-01 | | P-01 | Must |
- Journey map: discovery → onboarding → penggunaan inti → retention.
## B.6. Lingkup Produk
- B.6.1. In-Scope · B.6.2. Out-of-Scope · B.6.3. MVP definition
## B.7. Fitur & Fungsionalitas
### B.7.1. Daftar Fitur
| ID | Nama Fitur | Deskripsi Singkat | Prioritas (MoSCoW) | BR Tautan | Status |
|---|---|---|---|---|---|
| PRD-01 | | | Must / Should / Could / Won't | BR-xx | |
### B.7.2. Detail Fitur
#### Fitur: [PRD-01 — Nama]
- **Deskripsi**:
- **Alur utama (happy path)**:
- **Alur alternatif / exception**:
- **Acceptance Criteria (Gherkin)**: Given … When … Then …
---
# BAGIAN C — SRS (Software Requirements Specification)
## C.1. Ruang Lingkup Teknis
- Perspektif produk; kelas pengguna; lingkungan operasi; batasan desain; asumsi & dependensi.
## C.2. Persyaratan Fungsional (SRS-F-xx)
| ID | Deskripsi (pernyataan tunggal, testable) | Input | Output/Perilaku | Prioritas | Traceability (PRD-xx) | Verifikasi |
|---|---|---|---|---|---|---|
| SRS-F-01 | | | | | | |
- Alur sistem & edge cases per requirement kompleks.
## C.3. Persyaratan Non-Fungsional (SRS-NF-xx)
> Taksonomi **ISO/IEC 25010**; target harus terukur.
| ID | Kategori (ISO 25010) | Deskripsi Terukur | Prioritas | Traceability | Verifikasi |
|---|---|---|---|---|---|
| SRS-NF-01 | Performance Efficiency | | | | |
| SRS-NF-02 | Security | | | | |
| SRS-NF-03 | Reliability | | | | |
| SRS-NF-04 | Usability | | | | |
| SRS-NF-05 | Compatibility | | | | |
| SRS-NF-06 | Maintainability | | | | |
## C.4. Data Model & Entitas
| Entitas | Atribut Kunci | Relasi | Catatan |
|---|---|---|---|
| | | | |
## C.5. Antarmuka Eksternal (API/Integrasi)
| ID | Nama Interface | Arah | Protokol/Format | Deskripsi | Dependensi |
|---|---|---|---|---|---|
| | | | | | |
## C.6. Error Handling
- Kategori error, format pesan, strategi retry/fallback, logging.
## C.7. Constraint Teknis
- **Stack Wajib**: Backend Go (Clean Architecture), Frontend React/Vue (Tailwind/Metronic), Database **PostgreSQL 16+**, Cache **Redis 7+**, Storage **MinIO Object Storage**, Auth **SSO JSS Keycloak (4 Role RBAC)**.
- **Environment Eksekusi**: **Wajib berjalan dalam Docker & Docker Compose** untuk development lokal dan seluruh service pendukungnya.
- **Stack Terlarang**: Local file uploads, plaintext credentials, unparameterized SQL queries, local manual auth di production.
## C.8. Definition of Done
- Kriteria selesai di level sistem.
---
## Referensi
- BABOK v3 (IIBA) — dasar struktur BRD.
- ISO/IEC/IEEE 29148:2018 — struktur & karakteristik requirement SRS.
- ISO/IEC 25010 — taksonomi non-functional requirement.
- MoSCoW (DSDM) — metode prioritas.
- Gherkin (Given/When/Then) — format acceptance criteria.
- [Tambahkan dokumen/riset lain yang dipakai sebagai sumber, dengan nama file/audio-nya]

## Review & iterasi
Setelah draft pertama: minta saya review per bagian, ajukan pertanyaan verifikasi, perbarui Blueprint.md. Iterasi sampai saya nyatakan isi Blueprint final. **Baru setelah itu** susun Dokumen Blueprint resmi (Google Docs / .docx) yang disimpan di folder `docs/` (misal: `docs/Dokumen_Blueprint_Resmi.docx`) berdasarkan `references/template-dokumen-resmi.md` — jangan buat dokumen resmi dari draft yang belum saya setujui. Revisi besar setelah dokumen resmi dibuat → simpan versi baru (`Blueprint_v2.md` + `docs/Dokumen_Blueprint_Resmi_v2.docx`), jangan timpa tanpa konfirmasi.
