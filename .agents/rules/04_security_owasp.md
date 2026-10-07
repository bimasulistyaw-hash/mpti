# 🛡️ RULE: OWASP TOP 10 COMPLIANCE & SECURITY GATE

## 1. Perlindungan OWASP Top 10
- **A01 Broken Access Control**: Enforce 4 role Keycloak, proteksi Pengawas Read-Only, auto logout idle session (5–10 menit), single active session.
- **A02 Cryptographic Failures**: Wajib SSL/HTTPS, validasi tanda tangan JWT OIDC, enkripsi MinIO SSE-S3.
- **A03 Injection**: Parameterized SQL query wajib (`$1, $2, ...`), sanitasi input, validasi magic bytes.
- **A04 Insecure Design**: Redis rate limiting (Token Bucket), isolasi auth manual di sandbox testing saja.
- **A05 Security Misconfiguration**: Pasang Security Headers (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`), matikan directory listing.
- **A06 Vulnerable Components**: 0 CVE High/Critical pada Go dependencies dan npm packages.
- **A07 Identification & Auth**: Integrasi SSO JSS Keycloak.
- **A08 Software & Data Integrity**: File upload via MinIO UUID v4 & Presigned URL.
- **A09 Security Logging**: Structured logger (Zap) tanpa pernah mencatat kredensial, token, atau secret ke log.
- **A10 SSRF**: Validasi outbound URL dan whitelist internal service endpoints.

## 2. Automated SAST & Security Gate
- Backend Go: Jalankan `gosec ./...` dan `semgrep --config p/owasp-top-10`.
- Dependency Audit: Jalankan `govulncheck ./...` (Go) dan `npm audit` (Frontend).
- **Vulnerability Security Gate**: Jika terdeteksi celah tingkat **Medium, High, atau Critical**, build **DIBATALKAN (FAILED)** dan rilis diblokir hingga diperbaiki.
- Setiap rilis wajib menghasilkan laporan `docs/SECURITY_REPORT.md`.
