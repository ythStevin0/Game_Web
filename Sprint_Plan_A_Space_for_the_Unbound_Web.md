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
- Setup Vite + React + Three.js/R3F + GSAP.
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

