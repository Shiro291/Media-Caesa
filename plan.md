# Plan: Media Pembelajaran Penambahan & Pengurangan (Interaktif & 3D-ish)

## Deskripsi Proyek
Membangun modul pembelajaran interaktif baru untuk anak SD kelas awal (SD Kelas 1-2) mengenai "Penambahan dan Pengurangan" (Bilangan 1-20). Media ini akan menghadirkan visualisasi yang lebih baik daripada sebelumnya, menggunakan elemen yang *feel*-nya 3D, animasi halus (benda bergabung atau pecah), dan suara interaktif yang imersif.

## Tim Skill (Total: 5 Skill)
1. **`plan-writing`**: Digunakan untuk menyusun roadmap dan langkah-langkah implementasi yang terstruktur dan terverifikasi.
2. **`ui-ux-pro-max`**: Digunakan untuk mendesain antarmuka yang "Premium" dengan Glassmorphism, skema warna yang dinamis (misal: Hijau untuk tambah, Merah untuk kurang), dan animasi mikrokontrol yang responsif.
3. **`threejs-animation`**: Digunakan untuk menciptakan elemen visual yang terasa 3D (seperti bola-bola atau apel 3D) yang dapat bergerak, memantul, dan bertambah/berkurang di dalam sebuah "wadah" (bucket).
4. **`game-development`**: Digunakan untuk merancang mekanisme logika matematika penambahan/pengurangan, sistem *win-streak*, dan engine kuis yang seru.
5. **`beautiful-prose`**: Digunakan untuk menulis narasi edukatif, instruksi, dan dukungan semangat dalam Bahasa Indonesia yang ramah anak.

---

## Roadmap Pengembangan

### Fase 1: Perancangan Konsep & Aset (`beautiful-prose` & `plan-writing`)
- [ ] Menyusun naskah penjelasan konsep Penambahan (menggabungkan) dan Pengurangan (memisahkan/menghilangkan).
- [ ] Menentukan jenis objek 3D yang akan digunakan (Bola, Apel, atau Bintang) dan suara pop/slide yang seru.
- [ ] **Verifikasi**: Struktur data soal (1-20) dan naskah narasi siap digunakan.

### Fase 2: Desain Visual & UI Premium (`ui-ux-pro-max`)
- [ ] Membuat layout "Arena Matematika" dengan Glassmorphism.
- [ ] Mendesain kontrol (Slider/Tombol) yang terasa tactile dan responsif.
- [ ] Menentukan palet warna: Emerald/Sky (Tambah) dan Rose/Amber (Kurang).
- [ ] **Verifikasi**: Mockup UI dirender dan terlihat modern di browser.

### Fase 3: Visualisasi Interaktif & "3D" (`threejs-animation`)
- [ ] Mengimplementasikan render sederhana (Three.js/react-three-fiber) untuk menampilkan objek-objek 3D.
- [ ] Membuat animasi "Gabung": Objek baru terbang masuk ke dalam wadah menambah jumlah.
- [ ] Membuat animasi "Pecah/Hilang": Objek meledak (pop) atau terbang keluar saat pengurangan.
- [ ] **Verifikasi**: Objek bergerak mulus tanpa lag saat jumlah berubah.

### Fase 4: Engine Matematika & Reward (`game-development`)
- [ ] Membangun logika kalkulasi otomatis yang terhubung langsung dengan visualisasi 3D.
- [ ] Menambahkan SFX (Sound Effects) interaktif: Suara benturan lembut saat bola masuk, suara "poof" saat hilang.
- [ ] Menyertakan sistem perayaan sederhana saat anak mencapai hasil yang benar.
- [ ] **Verifikasi**: Hasil visual selalu akurat dengan angka matematika yang ditampilkan.

### Fase 5: Kuis Tantangan & Polish (`ui-ux-pro-max` & `game-development`)
- [ ] Membuat kuis khusus dengan tantangan waktu atau tantangan "Isi Wadah".
- [ ] Optimasi performa aset 3D (low-poly) agar tetap ringan di perangkat mobile/sekolah.
- [ ] **Verifikasi**: Kuis berjalan mulus dan memberikan hasil evaluasi yang jelas.

---

## Kriteria Selesai (Done When)
- [ ] Anak-anak bisa melihat benda-benda 3D bertambah/berkurang secara visual sesuai angka yang dipilih.
- [ ] Ada transisi animasi yang jelas antara proses "Tambah" dan "Kurang".
- [ ] Terdapat efek suara interaktif yang membuat belajar terasa seperti bermain game.
- [ ] Antarmuka terlihat premium (Pro-Max level) dan sangat menarik bagi anak-anak.

**Catatan**: Implementasi teknis akan segera dimulai setelah rencana ini disetujui.
