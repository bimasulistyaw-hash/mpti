# 🧪 RULE: AUTOMATED TESTING, QA & DISCIPLINE REPORTING

## 1. Kebijakan Pengujian Otomatis
1. Setiap handler, usecase, dan modul wajib memiliki unit test dan integration test pada direktori `tests/`.
2. Pengujian wajib menguji:
   - **Happy Path**: Alur normal sukses (HTTP 200/201).
   - **Sad Path**: Validasi input gagal, unauthorized token, error boundary (HTTP 400, 401, 403, 404, 500).
   - **RBAC Matrix**: Menguji pemetaan 4 role Keycloak (termasuk verifikasi bahwa `Pengawas` ditolak mutasi data).
3. **Minimum Code Coverage**: Target code coverage minimal **85%**.

## 2. Format Laporan Pengujian (`docs/TEST_REPORT.md`)
```markdown
# 📊 Laporan Hasil Pengujian Fungsional Aplikasi

- **Nama Aplikasi**: [Nama Aplikasi]
- **Versi**: [1.0.0]
- **Tanggal Pengujian**: YYYY-MM-DD HH:mm:ss WIB
- **Penguji**: QA & Testing Agent
- **Target Code Coverage**: Min. 85% (Capaian: XX%)

## Ringkasan Hasil Pengujian
| Skenario Pengujian | Total Kasus | Lolos (Pass) | Gagal (Fail) | Persentase |
| :--- | :---: | :---: | :---: | :---: |
| Autentikasi SSO Keycloak & Session | 10 | 10 | 0 | 100% |
| RBAC 4 Role (Superadmin, Pengawas, Admin, Operator) | 12 | 12 | 0 | 100% |
| MinIO Object Storage (Upload/Presigned URL) | 8 | 8 | 0 | 100% |
| Manajemen Aplikasi & Konfigurasi | 6 | 6 | 0 | 100% |
| Core Business Logic & Transaksi | 15 | 15 | 0 | 100% |
| **TOTAL** | **51** | **51** | **0** | **100%** |
```

## 3. Format Catatan Perubahan (`docs/CHANGELOG.md`)
Setiap modifikasi wajib dicatat dengan format:
```markdown
# 📋 Change Log - [Nama Aplikasi]

## [1.0.0] - YYYY-MM-DD HH:mm:ss WIB
### 👤 Author: [Nama Developer / Agent]
### 🚀 Perubahan:
- **Added**: Rilis awal arsitektur Clean Architecture, SSO Keycloak, MinIO, RBAC 4 Role.
- **Security**: Isolasi manual auth ke testing sandbox.
```
