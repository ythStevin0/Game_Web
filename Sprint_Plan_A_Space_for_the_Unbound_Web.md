# Sprint Plan — "A Space for the Unbound" Competition Website
**Metodologi:** Agile (Scrum-lite, sprint mingguan)
**Window:** 3 – 30 September 2026 (27 hari, 4 sprint + buffer)
**Deadline resmi panitia:** 2 Oktober 2026, 23:59 WIB → target internal 30 September memberi buffer ±2 hari untuk dokumentasi, video, dan posting Instagram.
**Tim:** maks. 4 orang (sesuai batas juknis)

> Catatan: rencana ini menggabungkan *Topologi Proyek* (arsitektur, scope tier S/A/B/C) dengan *Juknis Lomba* (syarat wajib, larangan, halaman minimum). Semua item backlog dipetakan ke sumber aslinya.

---

## 1. Definition of Done (berlaku semua sprint)
- Fitur berjalan di desktop, tablet, dan smartphone (syarat juknis D.6).
- Tidak memakai CMS (WordPress/Joomla/Blogger/Wix/Squarespace) atau template premium utuh (D.4–D.5).
- Tidak ada error kritis di console.
- Asset sudah dioptimasi (ukuran wajar, tidak asal upload asli besar).
- Kode sudah di-commit ke branch `feature/*` dan di-merge ke `development`.
- Tidak melanggar unsur terlarang (pornografi, SARA, kekerasan berlebihan, ujaran kebencian, pelanggaran hak cipta — D.11).

## 2. Product Backlog (dikelompokkan per prioritas Tier S/A/B/C dari dokumen topologi, dicocokkan ke syarat wajib juknis D.9–D.10)

| # | Item | Tier | Sumber Wajib Juknis |
|---|---|---|---|
| 1 | Loading screen + opening cinematic | S | Unsur interaktif (animasi, transition) |
| 2 | Halaman **Home** / main experience | S | Wajib (D.9) |
| 3 | Environment eksplorasi utama (1 area, bukan 10) | S | Interactive UI |
| 4 | Dialogue system + NPC interaction | S/A | Interactive UI |
| 5 | Halaman **Character / Hero** | S | Wajib (D.9) |
| 6 | Halaman **Gameplay / Features** | S | Wajib (D.9) |
| 7 | Mindscape transition (signature interaction) | S | Unsur interaktif (transition, animasi) |
| 8 | Halaman **News / Event** | S | Wajib (D.9) |
| 9 | Halaman **Download / Play Now** (CTA) | S | Wajib (D.9) |
| 10 | Scroll effect & micro-animation (GSAP) | S | Unsur interaktif |
| 11 | Video trailer (embed atau custom) | S/A | Unsur interaktif |
| 12 | Responsive layout (desktop/tablet/mobile) | S | Wajib (D.6) |
| 13 | Audio ambience + toggle mute | A | Accessibility |
| 14 | Post-processing / cinematic camera | A | Nilai tambah "wow factor" |
| 15 | Easter egg / lore discovery | A/B | Nilai tambah |
| 16 | Deployment ke hosting publik + domain | S | Wajib (D.6–D.7) |
| 17 | Source code siap di GitHub | S | Wajib (D.8) |
| 18 | Dokumentasi proyek (PDF) | S | Wajib (E.3) |
| 19 | Screenshot + caption Instagram (tag panitia) | S | Wajib (D.12) |

**Tidak dikerjakan (Tier C — dihindari sesuai topologi):** backend penuh, account system, CMS, multiplayer, database kompleks.

---

## 3. Sprint Breakdown

### 🟦 Sprint 0 — Setup & Foundation (3–5 September, 3 hari)
**Goal:** Fondasi teknis siap, tidak ada waktu terbuang di sprint berikutnya.
- Inisialisasi repo Git + struktur folder (`react/`, `scenes/`, `systems/`, `data/`, `assets/`) sesuai arsitektur di dokumen topologi bab 7.
- Setup Vite + React + Three.js/R3F + Drei + GSAP + Zustand. Pasang dependency bertahap saat sprint yang memerlukannya agar beban awal tetap kecil.
- Tentukan **satu area** eksplorasi utama (bukan multi-lokasi) — sesuai prinsip "satu area sangat detail" di dok. topologi bab 47.
- Audit aset: pastikan semua aset asli/CC0/CC-BY dengan lisensi jelas (D.13, dok. topologi bab 41). **Jangan pakai aset resmi game tanpa izin.**
- Buat wireframe low-fi untuk 5 halaman wajib.
- Deploy skeleton kosong ke hosting (Vercel/Netlify) untuk pastikan pipeline CI/CD jalan dari awal.

**Deliverable:** repo GitHub aktif, hosting URL hidup, wireframe disetujui tim.

---

### 🟩 Sprint 1 — Core Experience (6–12 September, 1 minggu)
**Goal:** Loading → Opening → Home/Main World bisa dijalankan end-to-end.
- Loading screen (pixel-art style) + preload asset kritis.
- Opening cinematic (camera + transition dasar).
- Halaman **Home** sebagai entry experience utama.
- Navbar minimal (immersive-friendly).
- Scene environment utama (1 area) dengan objek dasar (belum semua interaktif).
- Setup state management (React state/context: currentScene, audioEnabled, dsb — dok. topologi bab 16).

**Deliverable:** demo bisa dibuka dari loading sampai masuk ke world, di-review di sprint review.

---

### 🟨 Sprint 2 — Interaction & Content Pages (13–19 September, 1 minggu)
**Goal:** Semua halaman wajib juknis tersedia + interaksi inti berjalan.
- Interaction system: hover/highlight/click pada objek (dok. topologi bab 10).
- Dialogue system + minimal 1 NPC.
- Halaman **Character/Hero**.
- Halaman **Gameplay/Features**.
- Halaman **News/Event** (bisa statis, tidak perlu CMS).
- Halaman **Download/Play Now** dengan CTA jelas.
- Data-driven content: pisahkan `characters.js`, `dialogues.js`, `lore.js` dari logic (dok. topologi bab 15).

**Deliverable:** seluruh 5 halaman wajib juknis (D.9) sudah ada dan bisa dinavigasi.

---

### 🟧 Sprint 3 — Signature Interaction & Polish (20–26 September, 1 minggu)
**Goal:** "Wow factor" — mindscape transition sebagai fitur andalan, plus polish visual.
- Mindscape transition (distortion shader/post-processing, dok. topologi bab 13).
- Scroll effect & GSAP animation di seluruh halaman.
- Video trailer embed/custom di Gameplay atau Home.
- Audio ambience + toggle mute (accessibility, D wajib tidak eksplisit tapi baik untuk nilai).
- Cinematic camera untuk transisi antar section.
- Easter egg ringan (opsional, jika waktu cukup — Tier A/B).

**Deliverable:** experience end-to-end lengkap dengan signature interaction, siap untuk testing menyeluruh.

---

### 🟥 Sprint 4 — QA, Responsive, Deployment, Submission (27–30 September, 4 hari)
**Goal:** Siap submit, tidak ada error kritis, dokumentasi lengkap.
- Testing responsive penuh: desktop/tablet/mobile (D.6, dok. topologi bab 20 & 39).
- Testing lintas browser utama.
- Cek performa: FPS, loading time, ukuran asset (dok. topologi bab 19, 39).
- Fallback 2D/statis jika WebGL tidak didukung.
- Finalisasi deployment publik (domain/hosting legal, D.6).
- Susun **dokumentasi proyek PDF** (E.3) — screenshot, penjelasan fitur, tech stack, source code link.
- Push source code final ke GitHub, pastikan README lengkap (dok. topologi bab 40 checklist).
- Screenshot + caption Instagram, tag akun panitia @itfest.unw (D.12).
- Submit: Link Website + Link Source Code + Dokumentasi PDF (E.3).

**Deliverable:** submission lengkap sebelum deadline internal 30 September (buffer ke deadline resmi 2 Oktober).

---

### 3.1 Technical Implementation Sequence

Tambahan teknis berikut memperjelas urutan kerja tanpa memperluas scope fitur kompetisi.

**Sprint 1 - R3F, loading, state, dan batas bundle**

- Scene awal memakai React Three Fiber dengan `Canvas`, `useFrame`, `Suspense`, dan `useGLTF`.
- Drei menyediakan `Environment`, `PerspectiveCamera`, dan helper loader; model hanya dirender setelah siap.
- Zustand menjadi satu store global dengan selector. React state dipertahankan untuk state lokal komponen.
- Setiap scene berat dibuat sebagai dynamic import. Ini adalah tindakan preventif; build awal belum menunjukkan warning chunk di atas 500 kB.

**Sprint 2 - scroll dan audio**

- GSAP `ScrollTrigger` digunakan untuk scroll effect yang diperlukan juknis.
- Audio baru boleh diputar setelah user gesture untuk mematuhi kebijakan autoplay browser. Mute toggle wajib tersedia; positional audio hanya dipakai pada objek/scene yang memang membutuhkan arah suara.

**Sprint 3 - mindscape berisiko tinggi**

- Gunakan `@react-three/postprocessing` lebih dulu untuk noise, glitch, chromatic aberration, dan bloom.
- Shader custom bukan target awal dan hanya ditambahkan setelah efek library terbukti tidak cukup.

**Sprint 4 - fallback dan pengukuran**

- Periksa WebGL support sebelum memasang Canvas dan baca `prefers-reduced-motion` untuk menyederhanakan motion.
- Siapkan tampilan 2D/statis yang tetap menyampaikan navigasi dan CTA penting.
- Audit build produksi dengan Lighthouse/PageSpeed dan dokumentasikan hasil loading, ukuran asset, serta performa interaksi inti.

## 4. Ritme Harian/Mingguan yang Disarankan
- **Daily stand-up** (15 menit): apa yang dikerjakan kemarin, hari ini, ada blocker apa.
- **Sprint review** tiap akhir sprint (demo ke seluruh tim, cek terhadap Definition of Done).
- **Sprint retro** singkat (10 menit): apa yang diperlambat, apa yang dipercepat.
- Gunakan branch `feature/*` per item backlog → merge ke `development` → `main` menjelang deadline (dok. topologi bab 37).

## 5. Risiko & Mitigasi
| Risiko | Mitigasi |
|---|---|
| Scope terlalu besar (multi-area world) | Tegas pada prinsip "1 area sangat detail" (topologi bab 47) — jangan tambah lokasi baru setelah Sprint 1 selesai |
| Asset ilegal/berlisensi tidak jelas | Audit aset di Sprint 0, dokumentasikan sumber tiap aset |
| WebGL berat di perangkat lemah | Sisipkan fallback 2D di Sprint 4, jangan tunda ke last-minute |
| Deadline internal vs resmi tertukar | Target keras 30 Sept, anggap 1–2 Okt sebagai buffer darurat saja, bukan rencana utama |
| Tim kurang dari 4 orang / paruh waktu | Prioritaskan backlog Tier S dulu; Tier A/B dikorbankan lebih dulu jika waktu mepet |

---

## 6. Kebutuhan yang Harus Disiapkan

Bagian ini menjawab kebutuhan praktis dari topologi proyek: apa saja yang perlu ada agar semua fitur dapat dibuat tanpa scope melebar.

### 6.1 Kebutuhan Teknis

| Kebutuhan | Rekomendasi | Catatan |
|---|---|---|
| Runtime | Node.js LTS | Samakan versi antar anggota tim |
| Build tool | Vite | Ringan untuk React/WebGL prototype |
| UI framework | React | Cocok untuk komponen, state, dan routing |
| 3D engine | Three.js + React Three Fiber | Untuk world scene, camera, `useFrame`, dan efek WebGL |
| Helper 3D | @react-three/drei | `useGLTF`, `Environment`, camera helper, dan loading model |
| Animasi UI | GSAP | Untuk opening, scroll effect, dan micro-animation |
| Routing | React Router | Untuk Home, Character, Gameplay, News, Play |
| Styling | CSS Modules atau plain CSS terstruktur | Hindari framework berat jika belum perlu |
| State | Zustand | Store global dengan selector untuk scene, audio, dialogue, discovery, dan mindscape; state lokal tetap React |
| Mindscape effects | @react-three/postprocessing | Efek post-processing siap pakai sebelum shader custom |
| Deployment | Vercel atau Netlify | Deploy dari awal supaya pipeline tidak mepet |
| Version control | Git + GitHub | Wajib untuk source code submission |

### 6.2 Kebutuhan Asset

| Asset | Minimal untuk Lomba | Sumber Aman |
|---|---|---|
| Background/texture | 1 set environment utama | Buatan sendiri, CC0, CC-BY dengan atribusi |
| Model/props 3D | 5-10 props penting | Buatan sendiri sederhana, Blender, Poly Haven, Kenney, CC0 |
| Karakter/NPC | 1-2 karakter presentasi | Ilustrasi original terinspirasi nuansa, bukan menyalin asset resmi |
| Audio ambience | 1 ambience loop + 2-4 SFX | CC0/CC-BY, Freesound dengan cek lisensi |
| Font | 1 display/pixel-style + 1 body font | Google Fonts atau font berlisensi bebas |
| Video/trailer | Embed atau mock trailer pendek | Pastikan tidak memakai materi resmi tanpa izin |
| Screenshot dokumentasi | Desktop, tablet, mobile, fitur utama | Diambil dari website final |

Prinsip asset: prototype boleh terinspirasi, tetapi jangan menganggap asset resmi game bebas dipakai. Simpan daftar sumber asset sejak Sprint 0 agar dokumentasi PDF tidak panik di akhir.

### 6.3 Kebutuhan Konten

| Konten | Bentuk Final | Status Minimum |
|---|---|---|
| Narasi pembuka | 3-5 kalimat pendek | Harus selesai Sprint 1 |
| Dialogue NPC | 1 chain dialog 4-6 baris | Harus selesai Sprint 2 |
| Lore object | 3 objek interaktif | Harus selesai Sprint 2 |
| Character copy | Atma/Raya atau karakter original-penghormatan | Harus selesai Sprint 2 |
| Gameplay/features | 4-6 feature cards/sections | Harus selesai Sprint 2 |
| News/event | 2-3 item statis | Harus selesai Sprint 2 |
| CTA play/download | Link platform/official reference | Harus selesai Sprint 2 |
| Documentation text | Deskripsi fitur, tech stack, cara menjalankan | Draft Sprint 3, final Sprint 4 |

---

## 7. Pembagian Peran Tim Maksimal 4 Orang

| Role | Tanggung Jawab Utama | Output |
|---|---|---|
| Project Lead / Frontend Integrator | Repo, routing, merge, deployment, quality gate | App menyatu dan deploy stabil |
| 3D / Interaction Developer | Scene, camera, interaction, mindscape effect | Core experience dan WebGL |
| UI/UX + Motion Developer | Layout halaman wajib, responsive, GSAP, polish | UI rapi dan animasi halus |
| Content + Asset + Documentation | Copywriting, asset list, lisensi, PDF, Instagram | Konten lengkap dan siap submit |

Jika anggota kurang dari 4, gabungkan peran seperti ini:

| Jumlah Orang | Pembagian Realistis |
|---|---|
| 3 orang | Lead+deployment, 3D+interaction, UI+content+docs |
| 2 orang | Dev experience, UI+content+QA |
| 1 orang | Fokus Tier S saja: Home, 1 scene, 1 NPC, 5 halaman wajib, deployment, docs |

---

## 8. Task Board Awal

### To Do - Sprint 0

- [ ] Buat repo final dengan nama proyek yang konsisten.
- [ ] Buat branch `development`.
- [ ] Scaffold Vite + React.
- [ ] Install dependency inti: Three/R3F, Drei, GSAP, React Router.
- [ ] Buat struktur folder sesuai topologi bab 7, tetapi hanya folder yang langsung dipakai.
- [ ] Buat wireframe 5 halaman wajib.
- [ ] Tentukan satu area utama: misalnya street/town corner.
- [ ] Buat asset register: nama asset, sumber, lisensi, link, penggunaan.
- [ ] Deploy skeleton ke Vercel/Netlify.

### To Do - Sprint 1

- [ ] Loading screen.
- [ ] Intro/opening cinematic sederhana.
- [ ] Home/main world route.
- [ ] Canvas WebGL tampil stabil.
- [ ] Terapkan `Suspense` + `useGLTF` untuk memuat model/asset scene dan tampilkan loading state yang benar.
- [ ] Gunakan `useFrame` hanya untuk update per-frame yang benar-benar diperlukan.
- [ ] Tambahkan `Environment` dan `PerspectiveCamera` dari Drei sesuai kebutuhan scene.
- [ ] Environment blockout 1 area.
- [ ] Navbar minimal + menu.
- [ ] Buat Zustand store dasar: scene, audio, dialogue, discovery, dan mindscape.
- [ ] Pisahkan scene berat dengan `React.lazy()`/dynamic import.
- [ ] First deploy review.

### To Do - Sprint 2

- [ ] Object interaction manager.
- [ ] Dialogue box dengan typewriter effect.
- [ ] Minimal 1 NPC.
- [ ] Minimal 3 object lore.
- [ ] Character page/section.
- [ ] Gameplay/features page/section.
- [ ] News/event page/section.
- [ ] Download/play CTA page/section.
- [ ] Data file: `characters`, `dialogues`, `objects`, `lore`.

### To Do - Sprint 3

- [ ] Mindscape transition.
- [ ] Visual distortion/post-processing ringan.
- [ ] Scroll and section animation.
- [ ] Implementasikan GSAP `ScrollTrigger` dan pastikan efek scroll tetap ringan di mobile.
- [ ] Audio ambience + mute toggle.
- [ ] Easter egg ringan jika waktu cukup.
- [ ] Optimasi asset awal.
- [ ] Draft dokumentasi PDF.

### To Do - Sprint 4

- [ ] Test desktop.
- [ ] Test tablet.
- [ ] Test mobile.
- [ ] Test Chrome/Edge/Firefox.
- [ ] Uji WebGL support, fallback 2D/statis, dan `prefers-reduced-motion`.
- [ ] Jalankan Lighthouse/PageSpeed dan catat hasilnya di dokumentasi.
- [ ] Run production build.
- [ ] Fix console error kritis.
- [ ] Final deploy.
- [ ] README final.
- [ ] Dokumentasi PDF final.
- [ ] Screenshot Instagram.
- [ ] Submit link website, source code, dan dokumentasi.

---

## 9. Struktur Implementasi Minimum

Versi minimum yang disarankan agar scope tetap terkendali:

```text
src/
|-- app/
|   |-- App.jsx
|   |-- routes.jsx
|-- components/
|   |-- ui/
|   |   |-- Navbar.jsx
|   |   |-- LoadingScreen.jsx
|   |   |-- DialogueBox.jsx
|   |   |-- AudioToggle.jsx
|-- pages/
|   |-- Home.jsx
|   |-- Characters.jsx
|   |-- Gameplay.jsx
|   |-- News.jsx
|   |-- Play.jsx
|-- scenes/
|   |-- WorldScene.jsx
|   |-- MindscapeScene.jsx
|-- systems/
|   |-- dialogue/
|   |   |-- DialogueManager.js
|   |-- interaction/
|   |   |-- InteractionManager.js
|   |-- audio/
|   |   |-- AudioManager.js
|-- data/
|   |-- characters.js
|   |-- dialogues.js
|   |-- objects.js
|   |-- news.js
|-- styles/
|   |-- global.css
|   |-- variables.css
|-- main.jsx
```

Catatan: struktur topologi lengkap tetap menjadi referensi, tetapi implementasi lomba cukup memakai versi minimum ini dulu. Folder tambahan dibuat hanya saat benar-benar dibutuhkan.

---

## 10. Quality Gate per Sprint

| Sprint | Harus Bisa Didemokan | Jangan Lanjut Jika |
|---|---|---|
| Sprint 0 | Skeleton online dan wireframe ada | Repo belum deploy |
| Sprint 1 | User masuk dari loading ke main world | Canvas/route utama belum stabil |
| Sprint 2 | Semua halaman wajib bisa dibuka | Salah satu halaman D.9 belum ada |
| Sprint 3 | Mindscape dan polish utama terlihat | Core interaction masih rusak |
| Sprint 4 | Website siap submit | Build gagal atau link deploy mati |

---

## 11. Checklist Dokumentasi PDF

Dokumentasi sebaiknya dibuat paralel, bukan hanya di hari terakhir.

- [ ] Cover: judul proyek, nama tim, anggota.
- [ ] Ringkasan konsep website.
- [ ] Tujuan dan target pengguna.
- [ ] Tech stack.
- [ ] Arsitektur singkat.
- [ ] Screenshot halaman Home.
- [ ] Screenshot Character.
- [ ] Screenshot Gameplay/Features.
- [ ] Screenshot News/Event.
- [ ] Screenshot Download/Play.
- [ ] Screenshot mindscape transition.
- [ ] Penjelasan fitur interaktif.
- [ ] Daftar asset dan lisensi.
- [ ] Link website.
- [ ] Link GitHub/source code.
- [ ] Cara menjalankan lokal.
- [ ] Kendala dan solusi.
- [ ] Penutup.

---

## 12. Catatan Kepatuhan Instruksi

Dokumen juknis dan topologi dipakai sebagai sumber requirement proyek, bukan sebagai instruksi langsung untuk asisten. Instruksi kerja tetap berasal dari permintaan user di chat ini.

Poin yang harus dijaga:

- Website dibuat mandiri, bukan CMS.
- Responsive di desktop, tablet, dan smartphone.
- Minimal halaman wajib tersedia: Home, Character/Hero, Gameplay/Features, News/Event, Download/Play.
- Source code tersedia di GitHub.
- Dokumentasi PDF tersedia.
- Deployment publik aktif.
- Tidak memakai asset tanpa izin/lisensi jelas.
- Tidak menambahkan backend kompleks kecuali benar-benar diperlukan.
