# 🌌 ANTIGRAVITY 2.0 - WORKSPACE CONTEXT & CODING OS
> **Standar Resmi Pengembangan Perangkat Lunak - Diskominfo Kota Yogyakarta**

---

## 🎯 PRINSIP UTAMA & SINGLE SOURCE OF TRUTH (SSOT)

1. **Blueprint Sebagai Acuan Utama (`Blueprint.md`)**:
   - Setiap pengembangan fitur, penulisan kode, dan pengujian **WAJIB** berpedoman pada `Blueprint.md` (atau `docs/Blueprint.md`) yang dihasilkan dari skill `pembuat-blueprint-profesional`.
   - `Blueprint.md` memuat seluruh penomoran traceability: Kebutuhan Bisnis (`BR-xx`), Fitur Produk (`PRD-xx`), Functional Requirements (`SRS-F-xx`), dan Non-Functional Requirements (`SRS-NF-xx`).

2. **Wajib Docker & PostgreSQL di Lingkungan Development Lokal**:
   - Seluruh proses development lokal **WAJIB** menggunakan **Docker & Docker Compose** (`docker-compose.yml`).
   - Database utama **WAJIB** menggunakan **PostgreSQL 16+**.
   - Seluruh software pendukung (PostgreSQL 16+, Redis 7+, MinIO Object Storage, Backend Go, Frontend React/Vue) wajib berjalan terisolasi dan konsisten di dalam kontainer Docker. Dilarang menjalankan service secara manual tanpa kontainer saat development.

3. **High Concurrency & High Performance**:
   - Backend dibangun dengan **Go (Golang)** menerapkan **Clean Architecture** (Latency < 200ms).
   - Database: **PostgreSQL 16+** dengan connection pooling (`pgxpool`).
   - Caching & Rate Limiting: **Redis 7+** (Cache-Aside pattern).
   - Frontend: **React (Vite)** atau **Vue 3 (Vite)** dengan UI **Tailwind CSS** atau **Metronic Bootstrap**.

4. **Otentikasi Terpusat SSO JSS Keycloak (`sso.jogjakota.go.id`)**:
   - Seluruh otentikasi produksi wajib menggunakan **OpenID Connect (OIDC)** Keycloak JSS.
   - Login manual (*username & password lokal*) **DILARANG** di produksi dan **HANYA** aktif di testing sandbox (`APP_ENV=testing` dan `ENABLE_TEST_AUTH=true`).

5. **Sentralisasi minimal ada 4 Role RBAC di Keycloak**:
   - **`Superadmin`**: Full Access seluruh modul & konfigurasi sistem.
   - **`Pengawas`**: Read-Only setara Superadmin (hanya method `GET`, pemantauan, audit log, dilarang mutasi).
   - **`Admin`**: Manajemen User (RBAC mapping) & Pengaturan Aplikasi.
   - **`Operator`**: Operasional transaksi harian & modul bisnis.

6. **Decoupled Storage — MinIO Object Storage**:
   - Dilarang keras menyimpan file unggahan di folder lokal server (`/uploads`, `/storage`).
   - Seluruh berkas wajib diunggah ke **MinIO Object Storage** dengan validasi *Magic Bytes* (header biner), nama acak *UUID v4*, dan akses privat via *Presigned URL* (masa aktif 5–15 menit).

7. **Modul Wajib di Setiap Aplikasi**:
   - **Manajemen User (RBAC)**: Sinkronisasi & pemetaan 4 role Keycloak ke pengguna.
   - **Manajemen Pengaturan Aplikasi**: Konfigurasi koneksi Keycloak JSS, koneksi MinIO, batas session timeout (5–10 menit), rate limiting, dan parameter dinamis.

8. **OWASP Top 10 Compliance & Automated QA**:
   - Menjalankan SAST (`gosec`, `semgrep`) & SCA (`govulncheck`, `npm audit`). Vulnerability gatekeeper memblokir build jika ada temuan Medium/High/Critical.
   - Target code coverage pengujian minimal **85%**.

9. **Disiplin Dokumentasi**:
   - Setiap perubahan dicatat di `docs/CHANGELOG.md`.
   - Hasil pengujian fungsional dicatat di `docs/TEST_REPORT.md`.
   - Hasil audit keamanan dicatat di `docs/SECURITY_REPORT.md`.

---

## 🏛️ STRUKTUR DIREKTORI PROYEK STANDAR

```text
├── AGENTS.md                       # Master Context & Instructions (File ini)
├── Blueprint.md                    # Single Source of Truth Kebutuhan Teknis (dari Skill Blueprint)
├── docker-compose.yml              # Standard Orchestration Running Lokal (App + DB + Cache + Storage)
├── .env.example                    # Template Environment Variables Docker
├── .agents/
│   ├── rules/                      # Aturan modular Antigravity 2.0
│   │   ├── 01_architecture_clean.md# Arsitektur, Docker, PostgreSQL, & Concurrency
│   │   ├── 02_sso_keycloak_rbac.md # SSO Keycloak & 4 Role RBAC
│   │   ├── 03_minio_storage.md     # MinIO Object Storage
│   │   ├── 04_security_owasp.md    # Security & OWASP Top 10
│   │   └── 05_testing_qa.md        # QA & Testing Policy
│   └── skills/
│       └── pembuat-blueprint-profesional/ # Skill Wawancara BRD+PRD+SRS
├── backend/                        # Go (Golang) Backend Service (Clean Architecture)
│   ├── Dockerfile                  # Multi-stage Dockerfile Backend Go
│   ├── cmd/api/main.go             # Entrypoint backend
│   ├── internal/
│   │   ├── config/                 # Konfigurasi Env, Keycloak, MinIO, DB, Redis
│   │   ├── delivery/http/          # HTTP Handlers, Routers, DTOs
│   │   ├── domain/                 # Entity models, Repository & Usecase Interfaces
│   │   ├── repository/             # Data Access (PostgreSQL & Redis)
│   │   ├── usecase/                # Business Logic (User, Auth, MinIO Upload, Settings)
│   │   └── middleware/             # Keycloak JWT, RBAC Gate, Rate Limiter, CORS
│   ├── pkg/                        # Utility: Logger (Zap), MinIO Client, SSO Keycloak Client
│   ├── db/migrations/              # Database Migration SQL
│   ├── tests/                      # Unit & Integration Testing (min. 85% coverage)
│   ├── Makefile                    # Standardized Operational Commands
│   └── go.mod
├── frontend/                       # React / Vue Frontend Service
│   ├── Dockerfile                  # Dockerfile Frontend Client
│   ├── src/
│   │   ├── assets/                 # Icons, Images, Styles
│   │   ├── components/             # Reusable UI (Tailwind CSS / Metronic Bootstrap)
│   │   ├── pages/                  # Views (Dashboard, Manajemen User, Setting Aplikasi)
│   │   ├── services/               # API Callers (Axios with Keycloak Bearer Token)
│   │   ├── store/                  # Auth & App State (Zustand / Pinia)
│   │   └── utils/                  # Keycloak Adapter & Helper Functions
│   ├── public/
│   └── package.json
├── docs/                           # Dokumentasi & Laporan Pengujian
│   ├── Dokumen_Blueprint_Resmi.docx# Dokumen Formal Kesepakatan Client-Developer
│   ├── CHANGELOG.md                # Log Perubahan Aplikasi
│   ├── TEST_REPORT.md              # Laporan Pengujian Fungsional
│   └── SECURITY_REPORT.md          # Laporan Pengujian Keamanan OWASP
└── README.md
```

---

## 👥 ORKESTRASI PERAN SUB-AGEN

| Peran Sub-Agen | Tanggung Jawab Utama | Batasan & Kontrol |
| :--- | :--- | :--- |
| **Lead Architect Agent** | Memvalidasi model domain, Clean Architecture, Docker Compose, dan memastikan `Blueprint.md` terpenuhi. | Menolak penggabungan jika logika bisnis bocor ke handler, tanpa kontainerisasi Docker, atau ada upload lokal. |
| **Backend Agent (Go)** | Membangun RESTful API Go di dalam Docker, integrasi Keycloak JSS, MinIO SDK, PostgreSQL 16+, Redis 7+. | Wajib parameterized queries, validasi token di middleware, response JSON standar. |
| **Frontend Agent (React/Vue)** | Membangun UI Dashboard, Manajemen User, Setting Aplikasi (Tailwind/Metronic) di dalam Docker. | Tipografi Poppins/Inter, type scale Golden Ratio (1.618), warna Pemkot Yogyakarta. |
| **QA & Testing Agent** | Menulis unit & integration test pada `tests/`, menguji 4 role RBAC & happy/sad path di container sandbox. | Coverage sandbox minimal **85%**, wajib menyusun `docs/TEST_REPORT.md`. |
| **Security Agent (Pentester)** | Audit SAST (`gosec`, `semgrep`), SCA (`govulncheck`, `npm audit`), OWASP Top 10. | **Security Gatekeeper**: Blokir build jika ada temuan Medium/High/Critical. Wajib menyusun `docs/SECURITY_REPORT.md`. |
