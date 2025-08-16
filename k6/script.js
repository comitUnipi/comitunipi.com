import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

// Konfigurasi Pengujian Web
// Skenario simulasi pengunjung :
// 1. 30 detik : Naik ke 30 pengunjung,
// 2. 1 menit : Stabil di 60 hingga 1 menit,
// 3. 30 detik : Turun ke 0 pengunjung
//
// Batas untuk menentukan lolos/gagal
// 1. 90% permintaan harus < 400ms
// 2. tingkat gagal harus < 5%
// 3. tingkat error harus < 5%
export const options = {
  stages: [
    { duration: '30s', target: 30 },
    { duration: '1m', target: 60 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(90)<400'],
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.05'],
  },
};

export default function () {
  let res;

  // Step 1: Akses halaman utama
  res = http.get('http://localhost:90/');
  check(res, {
    'Homepage status is 200': (r) => r.status === 200,
    'Homepage response time < 400ms': (r) => r.timings.duration < 400,
  });
  errorRate.add(res.status !== 200);
  sleep(1 + Math.random() * 2);

  // Step 2: Akses halaman mentor
  res = http.get('http://localhost:90/mentor-kami');
  check(res, {
    'Mentor status is 200': (r) => r.status === 200,
    'Mentor response time < 400ms': (r) => r.timings.duration < 400,
  });
  errorRate.add(res.status !== 200);
  sleep(1 + Math.random() * 2);

  // Step 3: Akses halaman galeri
  res = http.get('http://localhost:90/galeri-kami');
  check(res, {
    'Galeri status is 200': (r) => r.status === 200,
    'Galeri response time < 400ms': (r) => r.timings.duration < 400,
  });
  errorRate.add(res.status !== 200);
  sleep(1 + Math.random() * 2);

  // Step 4: Akses halaman kegiatan
  res = http.get('http://localhost:90/kegiatan-kami');
  check(res, {
    'Kegiatan status is 200': (r) => r.status === 200,
    'Kegiatan response time < 400ms': (r) => r.timings.duration < 400,
  });
  errorRate.add(res.status !== 200);
  sleep(1 + Math.random() * 2);

  // Step 5: Akses halaman visi dan misi
  res = http.get('http://localhost:90/visi-dan-misi');
  check(res, {
    'Visi dan Misi status is 200': (r) => r.status === 200,
    'Visi dan Misi response time < 400ms': (r) => r.timings.duration < 400,
  });
  errorRate.add(res.status !== 200);
}

export function setup() {
  console.log('Memulai pengujian peforma website');
  console.log('Target: http://localhost:90');
}

export function teardown() {
  console.log('Pengujian peforma website selesai');
}
