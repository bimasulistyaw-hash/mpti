# 🔑 RULE: SSO JSS KEYCLOAK & 4-ROLE RBAC

## 1. Otentikasi Terpusat SSO JSS Keycloak (`sso.jogjakota.go.id`)
1. **Produksi**: Wajib menggunakan OpenID Connect (OIDC) / OAuth2 via Keycloak JSS.
2. **JWT Signature Verification**: Setiap HTTP request wajib divalidasi tanda tangan kriptografisnya via JWKS Keycloak dan dicek masa aktifnya di middleware Go (`internal/delivery/http/middleware`).
3. **Manual Auth Guard (Khusus Testing)**:
   - Endpoint login manual (username/password lokal) **HANYA** diizinkan aktif saat pengujian otomatis/pentest.
   - Wajib dipagari environment variable: `APP_ENV=testing` dan `ENABLE_TEST_AUTH=true`.
   - Dilarang keras aktif atau memiliki backdoor di lingkungan produksi (`APP_ENV=production`).

## 2. 4 Hierarki Role RBAC Keycloak
Hak akses dievaluasi dari claim token Keycloak (`realm_access.roles` / `resource_access`):
- **`Superadmin`**: Full access ke seluruh modul, konfigurasi aplikasi, dan data.
- **`Pengawas`**: Hak akses **Read-Only** setara Superadmin. Hanya boleh request method `GET` (dashboard analitik, audit log, laporan). Ditolak (HTTP 403) jika mencoba `POST`, `PUT`, `DELETE`.
- **`Admin`**: Manajemen User (RBAC mapping) dan Pengaturan Koneksi Aplikasi.
- **`Operator`**: Mengoperasionalkan transaksi harian dan modul bisnis spesifik.

## 3. Modul Wajib Manajemen User (RBAC)
Setiap aplikasi wajib menyediakan antarmuka dan API untuk:
1. Menampilkan daftar pengguna yang terdaftar di Keycloak Realm aplikasi.
2. Memetakan role Keycloak ke pengguna.
3. Status aktif/non-aktif dan audit log hak akses.
