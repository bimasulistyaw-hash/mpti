# 🌌 TEMPLATE PENGEMBANGAN APLIKASI DISKOMINFO KOTA YOGYAKARTA
### Powered by Google Antigravity 2.0 (Agentic Coding OS)

Template resmi standar arsitektur perangkat lunak Pemerintah Kota Yogyakarta untuk pembuatan aplikasi baru menggunakan AI Pair Programming & Vibe Coding di **Google Antigravity 2.0**.

---

## 🏗️ Tech Stack & Arsitektur

- **Backend**: Go (Golang) — *Clean Architecture* (Domain, Usecase, Repository, Delivery)
- **Frontend**: React (Vite) / Vue 3 (Vite) — Tailwind CSS / Metronic Bootstrap
- **Database**: PostgreSQL 16+ (Connection Pooling via `pgxpool`)
- **Cache & Rate Limiting**: Redis 7+ (Cache-Aside Pattern)
- **Object Storage**: MinIO Object Storage (Magic Bytes Validation + Presigned URL)
- **Authentication**: SSO JSS Keycloak OIDC (`sso.jogjakota.go.id`) dengan 4 Role RBAC (`Superadmin`, `Pengawas`, `Admin`, `Operator`)
- **Development Environment**: **Docker & Docker Compose**

---

## 🚀 Alur Pembuatan Aplikasi Baru

### Langkah 1: Copy Template ke Folder Proyek Baru
Salin seluruh folder template ini ke direktori proyek baru Anda.

### Langkah 2: Eksekusi Wawancara Requirement (Skill Blueprint)
Buka workspace di Antigravity 2.0 dan jalankan instruksi:
> *"Saya mau mulai proyek baru, tolong gali kebutuhannya dan susun Blueprint"*

Skill **`pembuat-blueprint-profesional`** akan memandu wawancara terstruktur (BRD + PRD + SRS) dan menghasilkan:
1. `Blueprint.md` (di root proyek) — SSOT teknis untuk AI agent.
2. `docs/Dokumen_Blueprint_Resmi.docx` (di folder `docs/`) — Dokumen formal kesepakatan client–developer.

### Langkah 3: Vibe Coding Otomatis
Setelah `Blueprint.md` disetujui, Antigravity 2.0 akan membaca [AGENTS.md](file:///Users/kominfo/Nextcloud/AntiGravity/Template%202.0/nama-project/AGENTS.md) dan aturan di `.agents/rules/` untuk membangun backend Go, frontend, migrasi database, dan pengujian secara otomatis di dalam Docker.

### Langkah 4: Menjalankan Lingkungan Lokal (Docker Compose)
```bash
# Salin konfigurasi environment
cp .env.example .env

# Jalankan seluruh stack service di Docker
docker compose up -d

# Pantau status dan log aplikasi
docker compose logs -f
```

---

## 📂 Struktur Direktori

```text
├── AGENTS.md                       # Master Context OS (Auto-loaded oleh Antigravity)
├── Blueprint.md                    # Single Source of Truth Kebutuhan Teknis
├── docker-compose.yml              # Standard Orchestration Running Lokal (App + DB + Cache + MinIO)
├── .env.example                    # Template Environment Variables Docker
├── .gitignore                      # Git Ignore File
├── .agents/
│   ├── rules/                      # Aturan Modular Antigravity 2.0
│   │   ├── 01_architecture_clean.md# Arsitektur, Docker, PostgreSQL, Concurrency
│   │   ├── 02_sso_keycloak_rbac.md # SSO Keycloak & 4 Role RBAC
│   │   ├── 03_minio_storage.md     # MinIO Object Storage & Upload Protocol
│   │   ├── 04_security_owasp.md    # OWASP Top 10 & Security Gatekeeper
│   │   └── 05_testing_qa.md        # QA Policy & Reporting
│   └── skills/
│       └── pembuat-blueprint-profesional/ # Skill Wawancara BRD+PRD+SRS
├── backend/                        # Go Backend Service (Clean Architecture)
│   └── Dockerfile                  # Multi-stage Dockerfile Go
├── frontend/                       # React / Vue Frontend Service
│   └── Dockerfile                  # Dockerfile Vite Client
└── docs/                           # Dokumentasi & Laporan Pengujian
    ├── Dokumen_Blueprint_Resmi.docx# Dokumen Formal Kesepakatan
    ├── CHANGELOG.md                # Log Perubahan Aplikasi
    ├── TEST_REPORT.md              # Laporan Pengujian Fungsional (min. 85% coverage)
    └── SECURITY_REPORT.md          # Laporan Pengujian Keamanan OWASP
```
