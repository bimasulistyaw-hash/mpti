# 🏛️ RULE: CLEAN ARCHITECTURE, DOCKER & POSTGRESQL HIGH PERFORMANCE STANDARDS

## 1. Wajib Docker & PostgreSQL di Lingkungan Development Lokal
- **Database Wajib**: **PostgreSQL 16+** sebagai satu-satunya database relasional utama (menggunakan driver `jackc/pgx/v5/pgxpool` dengan parameterized query).
- **Mandat Docker Compose**: Seluruh proses development lokal **WAJIB** dikonfigurasi dan dijalankan menggunakan **Docker & Docker Compose** (`docker-compose.yml`).
- **Layanan Pendukung Terkontainerisasi**:
  1. `postgres`: PostgreSQL 16 Alpine + Persistent Storage Volume.
  2. `redis`: Redis 7 Alpine (In-Memory Cache & Token Bucket Rate Limiting).
  3. `minio`: MinIO Server (Port 9000 & Web Console Port 9001) + Auto-init Bucket (`mc`).
  4. `backend`: Go Clean Architecture Service (Hot-reload / Containerized Build).
  5. `frontend`: React / Vue Service (Vite Development Server).
- **Perintah Eksekusi Standar**:
  ```bash
  docker compose up -d        # Menjalankan seluruh stack aplikasi dan database
  docker compose logs -f      # Memantau log seluruh service
  docker compose down         # Menghentikan seluruh kontainer
  ```

## 2. Backend Clean Architecture (Go)
- **Domain Layer (`internal/domain/`)**: Mendefinisikan entity structs murni dan interfaces (repository & usecase). Dilarang mengimpor framework eksternal atau database driver di domain.
- **Usecase Layer (`internal/usecase/`)**: Memuat business logic aplikasi. Bergantung hanya pada domain interfaces.
- **Repository Layer (`internal/repository/`)**: Implementasi akses data PostgreSQL & Redis. Menggunakan parameterized query (`$1, $2, ...`).
- **Delivery Layer (`internal/delivery/http/`)**: HTTP handler/controller, DTO request/response, validation, dan routing.

## 3. High Concurrency & Low Latency (< 200ms)
- **PostgreSQL Connection Pool**: Wajib menggunakan `jackc/pgx/v5/pgxpool` dengan konfigurasi `MaxConns`, `MinConns`, dan `MaxConnIdleTime` teroptimasi untuk mencegah exhaustion koneksi saat lonjakan trafik.
- **Redis Cache-Aside**: Cache data referensi dan entitas agregasi dengan TTL terukur. Invalidate cache saat terjadi mutasi data.
- **Frontend Optimization**: Code splitting, route-based lazy loading, dan kompresi static assets untuk menjaga First Contentful Paint (FCP) < 1.2 detik.

## 4. Format Respon JSON Standar
Format respon sukses:
```json
{
  "success": true,
  "status": 200,
  "message": "Data berhasil diproses.",
  "data": { ... }
}
```
Format respon gagal:
```json
{
  "success": false,
  "status": 400,
  "message": "Pesan deskriptif penyebab kegagalan.",
  "data": null
}
```

## 5. Standar UI/UX Visual System
- **Font**: Poppins atau Inter.
- **Line Height**: Golden Ratio (1.618).
- **Palet Warna Pemkot Yogyakarta**:
  - Warna Primer: Teal `#08A788` atau Biru Dongker `#0874A7`
  - Warna Sekunder: Biru Cerah `#009EF5` atau Jingga/Saffron `#FFA800`
  - Warna Netral: Putih `#FFFFFF`, Hitam `#000000`, Abu-abu terstandar.
