<p align="center">
  <img src="./public/images/logo/logo_white.png" width="160" alt="logo">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=flat-square&logo=laravel&logoColor=white" alt="Laravel Badge">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React Badge">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge">
  <img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP Badge">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript Badge">
</p>

---

Profile organisasi dan sistem untuk mengelola organisasi COMIT (Community of Information Technology) berbasis website.

Dibangun menggunakan **Laravel 12** dan **React**, didesain elegan dan minimalist dengan **Tailwind CSS**.

## Fitur Utama

- Profil Organisasi, tampilan informasi lengkap tentang apa itu COMIT.
- Manajemen data Keanggotaan, sistem pendaftaran anggota.
- Manajemen data Keuangan, sistem mengelola dan memantau keuangan, dan laporan keuangan.
- Manajemen data Kegiatan, sistem mengelola semua kegiatan, beserta absensi digital dan laporan absensi.

## Dockerize

build & run docker

```
docker compose up -d --build
```

setup environment `.env` :

```
cp .env.example .env
```

stagging environment

```
APP_ENV=production
APP_DEBUG=false
```

setup database sesuai dengan mysql docker seperti ini :

```
DB_CONNECTION=mysql
DB_HOST=mysql_comit
DB_PORT=3306
DB_DATABASE=staging
DB_USERNAME=root
DB_PASSWORD=staging
```

setup laravel

```
docker exec -it php_comit bash

php artisan key:generate
php artisan migrate --force
```

lalu aplikasinya berjalan dan bisa diakses pada : `http://localhost:90`

## Laporan Test Peformance dengan K6

- Mengukur performa website di bawah beban simulasi dengan skenario yang mencakup kunjungan ke 5 halaman pada profile organisasi.
- Membuat simulasi stagging di Docker dengan spesifikasi 2 Core CPU dan 4 GB RAM.
- Membuat simulasi hingga 60 virtual users selama 2 menit.

Secara keseluruhan, pada profil organisasi menunjukkan performa sangat baik dan stabil di bawah beban yang diuji. Semua metrik utama menunjukkan hasil yang positif, dengan waktu respon yang sangat cepat dan tidak ada kesalahan yang tercatat.

### Summary Hasil

| Metrik                   | Keterangan                                             | Hasil    |
| ------------------------ | ------------------------------------------------------ | -------- |
| Status Uji               | Hasil pengujian secara umum                            | ✅       |
| Keberhasilan (Checks)    | Tingkat keberhasilan semua pengecekan                  | 100.00%  |
| Kegagalan HTTP           | Persentase permintaan yang gagal                       | 0.00%    |
| Total Permintaan         | Total permintaan HTTP yang dikirim                     | 2605     |
| Waktu Respon (Rata-rata) | Waktu rata-rata untuk menerima respons                 | 30.72 ms |
| Waktu Respon (p(95))     | Waktu respon di mana 95% permintaan berada di bawahnya | 64.95 ms |

### Detail Metrik Kinerja

| Metrik             | Rata-rata (avg) | Median (med) | Maksimum (max) | Persentil ke-90 (p(90)) | Persentil ke-95 (p(95)) |
| ------------------ | --------------- | ------------ | -------------- | ----------------------- | ----------------------- |
| http_req_duration  | 30.72ms         | 23.29ms      | 274.78ms       | 46.03ms                 | 64.95ms                 |
| http_req_waiting   | 30.1ms          | 22.76ms      | 270.95ms       | 45.04ms                 | 64.37ms                 |
| iteration_duration | 8.17s           | 8.18s        | 11.02s         | 9.77s                   | 10.13s                  |

### License

Project ini menggunakan lisensi [MIT](./LICENSE)

### Contributing

Jika ingin berkontribusi bisa cek di [CONTRIBUTING](./CONTRIBUTING.md)

### Laporkan BUG/Feature

untuk melaporkan bug/feature request bisa gunakan [ISSUE_TEMPLATE](./.github/ISSUE_TEMPLATE/)

### Support

Jika ada kendala atau butuh bantuan:

- Email: [comit.unipi@gmail.com](mailto:comit.unipi@gmail.com)
- Instagram: [@comit.ipem](https://www.instagram.com/comit.ipem/)
- Tiktok: [@comit_unipi](https://www.tiktok.com/@comit_unipi)
- Website: [comitunipi.com](https://comitunipi.com)
