# 📦 RULE: MINIO OBJECT STORAGE & FILE UPLOAD PROTOCOL

## 1. Larangan Penyimpanan Lokal
- Dilarang keras menyimpan file unggahan pengguna di folder lokal web server (seperti `/uploads`, `/storage`, atau static root).
- Seluruh file statis dan dokumen wajib dialirkan ke **MinIO Object Storage**.

## 2. Validasi Multi-Lapis Sisi Server
1. **Magic Bytes MIME Validation**: Validasi biner header berkas (magic bytes) di backend Go sebelum menerima file, jangan hanya mempercayai ekstensi file dari client.
2. **File Size Limit**: Batasi ukuran maksimal unggahan sesuai tipe file.
3. **Pengacakan Nama Berkas (UUID v4)**:
   ```go
   objectName := fmt.Sprintf("%s/%s_%d%s", module, uuid.New().String(), time.Now().Unix(), ext)
   ```

## 3. Akses Privat via Presigned URL
- Berkas sensitif/dokumen perizinan tidak boleh memiliki URL publik permanen.
- Gunakan **MinIO Presigned GET URL** dengan masa kedaluwarsa singkat (**5–15 menit**) saat pengguna meminta unduhan.
- Aktifkan Server-Side Encryption (SSE-S3) pada bucket MinIO.

## 4. Modul Manajemen Pengaturan Aplikasi (App Configuration)
Sediakan antarmuka konfigurasi terpusat untuk:
- Koneksi Keycloak: `Server URL`, `Realm`, `Client ID`, `Client Secret`, `Redirect URI`.
- Koneksi MinIO: `Endpoint`, `Access Key`, `Secret Key`, `Bucket Name`, `Port`, `UseSSL`.
- Konfigurasi tersimpan terenkripsi di database/Redis.
