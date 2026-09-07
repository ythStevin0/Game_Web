# Topologi Proyek — A Space for the Unbound Interactive Website

> **Status:** Prototype untuk kompetisi  
> **Tujuan utama:** Memaksimalkan kualitas visual, interaktivitas, storytelling, dan technical execution untuk kompetisi.  
> **Rencana setelah kompetisi:** Prototype dapat ditawarkan kepada Mojiken Studio/Toge Productions untuk dikembangkan lebih lanjut menjadi pengalaman website resmi, dengan revisi, aset, branding, dan materi resmi berdasarkan izin/lisensi dari pemilik IP.

---

## 1. Gambaran Umum

Proyek ini merupakan **interactive promotional website concept** yang terinspirasi dari dunia **A Space for the Unbound**.

Konsep utama website bukan sekadar landing page, tetapi sebuah pengalaman interaktif yang membawa pengunjung menjelajahi dunia game melalui:

- environment interaktif;
- eksplorasi area;
- karakter;
- objek yang dapat diperiksa;
- storytelling;
- transisi dari dunia nyata menuju mindscape;
- animasi dan cinematic transition;
- audio ambience;
- easter egg;
- informasi game;
- CTA menuju halaman pembelian/game platform.

### Prinsip utama

```text
                    COMPETITION
                         │
                         ▼
              ┌─────────────────────┐
              │  WOW FACTOR         │
              │  Visual + Interaction│
              └──────────┬──────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
     VISUAL          INTERACTION      STORYTELLING
        │                │                │
        └────────────────┼────────────────┘
                         ▼
              INTERACTIVE EXPERIENCE
                         │
                         ▼
              PORTFOLIO / CASE STUDY
                         │
                         ▼
              POST-COMPETITION PITCH
```

---

# 2. Tujuan Proyek

## 2.1 Tujuan Kompetisi

Target prototype:

1. Menampilkan kemampuan web development.
2. Menampilkan kemampuan UI/UX.
3. Menampilkan kemampuan membuat interactive experience.
4. Menampilkan kemampuan 3D/WebGL.
5. Menampilkan storytelling melalui website.
6. Menciptakan pengalaman yang memorable.
7. Membuat website terasa seperti bagian dari dunia game.

## 2.2 Tujuan Pasca-Kompetisi

Prototype dapat menjadi:

- portfolio project;
- case study;
- proof of concept;
- proposal interactive promotional website;
- dasar pengembangan official website;
- dasar campaign website;
- dasar event/anniversary website.

---

# 3. Konsep Pengalaman Pengguna

Alur pengalaman utama:

```text
OPEN WEBSITE
     │
     ▼
LOADING / INTRO
     │
     ▼
OPENING CINEMATIC
     │
     ▼
MAIN WORLD
     │
     ▼
EXPLORE
     │
     ├──────────────┐
     ▼              ▼
INTERACT         NAVIGATION
     │              │
     ▼              │
OBJECT / NPC        │
     │              │
     ├──────┐       │
     ▼      ▼       │
LORE    DIALOGUE     │
     │      │        │
     └──┬───┘        │
        ▼            │
  MEMORY / CLUE      │
        │            │
        ▼            │
    MINDSCAPE ◄──────┘
        │
        ▼
SURREAL EXPERIENCE
        │
        ▼
RETURN TO WORLD
        │
        ▼
CHARACTER / STORY / GALLERY
        │
        ▼
PLAY / STEAM / OFFICIAL CTA
```

---

# 4. Information Architecture

Struktur halaman utama:

```text
Website
│
├── /
│   └── Home / Experience
│
├── /explore
│   ├── Town
│   ├── School
│   ├── Street
│   └── Interactive Objects
│
├── /characters
│   ├── Atma
│   ├── Raya
│   └── Other Characters
│
├── /mindscape
│   └── Mindscape Experience
│
├── /story
│   ├── World
│   ├── Story
│   └── Timeline
│
├── /gallery
│   ├── Screenshots
│   ├── Artwork
│   └── Media
│
└── /play
    ├── Game Information
    └── Platform / Purchase CTA
```

> Untuk prototype lomba, struktur ini tidak harus semuanya menjadi route terpisah. Beberapa bagian dapat dibuat sebagai **single-page immersive experience** dengan state/scene transition.

---

# 5. Topologi Sistem

Topologi tingkat tinggi:

```text
                         USER
                          │
                          ▼
                    WEB BROWSER
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
          FRONTEND                 STATIC ASSETS
             │                         │
             │                         ├── Images
             │                         ├── Fonts
             │                         ├── Audio
             │                         ├── Textures
             │                         └── 3D Models
             │
             ▼
       APPLICATION STATE
             │
      ┌──────┼──────────┐
      │      │          │
      ▼      ▼          ▼
   ROUTER  WORLD     UI STATE
            ENGINE
              │
       ┌──────┼─────────────┐
       │      │             │
       ▼      ▼             ▼
    CAMERA  SCENE       INTERACTION
             SYSTEM        SYSTEM
       │      │             │
       └──────┼─────────────┘
              ▼
         RENDER ENGINE
              │
              ▼
          WEBGL / GPU
              │
              ▼
            SCREEN
```

---

# 6. Arsitektur Frontend

Frontend menjadi pusat seluruh experience.

## 6.1 Keputusan Arsitektur

Proyek ini menggunakan **modular frontend monolith**: satu aplikasi React yang dibangun dan dideploy sebagai satu unit pada static hosting. Ini bukan microservices karena versi kompetisi tidak membutuhkan backend, database, akun, CMS, atau komunikasi antar-service.

Kode dipisahkan berdasarkan tanggung jawab agar dapat dikembangkan relatif independen tanpa kehilangan kesederhanaan deployment:

- `app/`: bootstrap aplikasi, provider, route, dan batas lazy loading;
- `scenes/`: world Three.js/R3F per lokasi;
- `systems/`: loading, interaction, dialogue, camera, audio, dan transition;
- `features/`: halaman/fitur produk seperti character, gameplay, news, dan download;
- `components/`: UI reusable yang tidak mengetahui detail Three.js;
- `data/`: konten statis dan definisi lore;
- `assets/`: aset bersama yang diimpor oleh aplikasi.

Dependency rule: scene boleh memakai system dan data; feature boleh memakai component dan data; component UI tidak boleh mengimpor atau mengendalikan scene Three.js secara langsung.

```text
Frontend
│
├── App
│
├── Router
│
├── Layout
│
├── UI
│   ├── Navbar
│   ├── DialogueBox
│   ├── LoadingScreen
│   ├── Cursor
│   ├── Tooltip
│   ├── Modal
│   ├── CharacterCard
│   └── CTA
│
├── Experience
│   ├── WorldScene
│   ├── TownScene
│   ├── SchoolScene
│   └── MindscapeScene
│
├── Interaction
│   ├── ObjectInteraction
│   ├── NPCInteraction
│   ├── DialogueSystem
│   ├── TriggerSystem
│   └── DiscoverySystem
│
├── Camera
│   ├── CameraController
│   ├── CinematicCamera
│   └── TransitionCamera
│
├── Audio
│   ├── AmbientAudio
│   ├── Music
│   ├── SFX
│   └── AudioController
│
└── Data
    ├── Characters
    ├── Dialogues
    ├── Objects
    ├── Locations
    └── Lore
```

---

# 7. Struktur Folder yang Direkomendasikan

Contoh struktur proyek:

```text
a-space-for-the-unbound-web/
│
├── public/
│   │
│   ├── assets/
│   │   ├── images/
│   │   │   ├── backgrounds/
│   │   │   ├── characters/
│   │   │   ├── environments/
│   │   │   └── ui/
│   │   │
│   │   ├── models/
│   │   │   ├── environment/
│   │   │   ├── props/
│   │   │   └── characters/
│   │   │
│   │   ├── textures/
│   │   │   ├── environment/
│   │   │   ├── materials/
│   │   │   └── effects/
│   │   │
│   │   ├── audio/
│   │   │   ├── music/
│   │   │   ├── ambience/
│   │   │   └── sfx/
│   │   │
│   │   ├── fonts/
│   │   └── videos/
│   │
│   └── favicon/
│
├── src/
│   │
│   ├── app/
│   │   ├── App.jsx
│   │   ├── routes.jsx
│   │   └── providers/
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Navbar.jsx
│   │   │   ├── DialogueBox.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   ├── Cursor.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Button.jsx
│   │   │
│   │   ├── character/
│   │   ├── story/
│   │   ├── gallery/
│   │   └── navigation/
│   │
│   ├── scenes/
│   │   ├── IntroScene.jsx
│   │   ├── TownScene.jsx
│   │   ├── SchoolScene.jsx
│   │   ├── MindscapeScene.jsx
│   │   └── EndingScene.jsx
│   │
│   ├── systems/
│   │   ├── interaction/
│   │   │   ├── InteractionManager.js
│   │   │   ├── ObjectInteraction.js
│   │   │   └── NPCInteraction.js
│   │   │
│   │   ├── dialogue/
│   │   │   ├── DialogueManager.js
│   │   │   └── dialogueData.js
│   │   │
│   │   ├── camera/
│   │   │   ├── CameraManager.js
│   │   │   └── CinematicCamera.js
│   │   │
│   │   ├── audio/
│   │   │   └── AudioManager.js
│   │   │
│   │   └── transition/
│   │       └── TransitionManager.js
│   │
│   ├── data/
│   │   ├── characters.js
│   │   ├── locations.js
│   │   ├── objects.js
│   │   ├── lore.js
│   │   └── dialogues.js
│   │
│   ├── hooks/
│   │   ├── useScene.js
│   │   ├── useInteraction.js
│   │   ├── useAudio.js
│   │   └── useResponsive.js
│   │
│   ├── shaders/
│   │   ├── distortion/
│   │   ├── mindscape/
│   │   └── transition/
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── components/
│   │
│   ├── utils/
│   │   ├── animation.js
│   │   ├── preload.js
│   │   └── performance.js
│   │
│   └── main.jsx
│
├── package.json
├── vite.config.js
├── README.md
└── .gitignore
```

---

# 8. Komponen UI

## 8.1 Navbar

Fungsi:

- navigasi;
- membuka menu;
- menuju section;
- mengontrol audio;
- membuka informasi.

Pada mode immersive, navbar sebaiknya **minimal** dan tidak mengganggu environment.

Contoh:

```text
┌─────────────────────────────────────────────┐
│  A SPACE FOR THE UNBOUND       MENU   ♪    │
└─────────────────────────────────────────────┘
```

---

# 9. Dialogue System

Dialogue box merupakan elemen penting untuk mempertahankan nuansa game.

```text
DialogueManager
       │
       ▼
Dialogue Data
       │
       ▼
Current Dialogue
       │
       ▼
DialogueBox
       │
       ├── Text
       ├── Character
       ├── Typewriter Effect
       └── Continue Indicator
```

Contoh data:

```js
{
  id: "town_001",
  speaker: "NPC",
  text: "Something feels different today...",
  next: "town_002"
}
```

---

# 10. Interaction System

Semua objek interaktif sebaiknya menggunakan sistem yang konsisten.

```text
USER HOVER
    │
    ▼
Object Detection
    │
    ▼
Is Interactive?
    │
 ┌──┴──┐
 NO    YES
 │      │
 ▼      ▼
None   Highlight
          │
          ▼
        Click
          │
          ▼
    Interaction Event
          │
    ┌─────┼─────────┐
    ▼     ▼         ▼
 Dialogue Lore   Transition
```

Contoh objek:

- telepon;
- papan sekolah;
- pintu;
- meja;
- motor;
- warung;
- buku;
- poster;
- NPC.

---

# 11. World / Scene System

Scene dipisahkan supaya environment dapat dimuat dan dikontrol secara modular.

```text
SceneManager
│
├── Intro
│
├── Town
│
├── School
│
├── Mindscape
│
└── Ending
```

Setiap scene memiliki:

```text
Scene
│
├── Environment
├── Camera
├── Lighting
├── Objects
├── NPC
├── Audio
├── Triggers
└── Effects
```

---

# 12. Camera System

Camera menjadi salah satu komponen utama untuk menciptakan cinematic experience.

Jenis kamera:

### A. Exploration Camera

Digunakan ketika user mengeksplorasi area.

### B. Cinematic Camera

Digunakan ketika:

- intro;
- transisi;
- story moment;
- reveal;
- ending.

### C. Mindscape Camera

Dapat dibuat lebih dinamis/distorted untuk membedakan dunia nyata dan mindscape.

```text
CameraManager
│
├── ExplorationCamera
├── CinematicCamera
└── MindscapeCamera
```

---

# 13. Mindscape Transition

Ini dapat menjadi **signature interaction** utama website.

Alur:

```text
REAL WORLD
     │
     ▼
USER INTERACTS
     │
     ▼
OBJECT TRIGGER
     │
     ▼
SCREEN DISTORTION
     │
     ├── Chromatic Aberration
     ├── Noise
     ├── Pixel Distortion
     ├── Camera Shake
     └── Lighting Change
     │
     ▼
MINDSCAPE
     │
     ▼
EXPLORATION
     │
     ▼
REVEAL / MEMORY
     │
     ▼
TRANSITION BACK
     │
     ▼
REAL WORLD
```

Secara teknis, transition dapat menggunakan:

- post-processing;
- shader;
- render target;
- screen distortion;
- color shift;
- particle effect;
- camera animation;
- audio transition.

Implementasi awal memakai `@react-three/postprocessing` untuk `Noise`, `Glitch`, `ChromaticAberration`, dan `Bloom`. Shader GLSL custom hanya dibuat setelah efek library terbukti tidak cukup untuk kebutuhan visual yang telah disetujui.

---

# 14. Audio Architecture

Audio dibagi menjadi beberapa layer.

```text
AudioManager
│
├── Background Music
│
├── Ambient
│   ├── Street
│   ├── School
│   ├── Rain
│   └── Environment
│
├── UI SFX
│   ├── Hover
│   ├── Click
│   └── Transition
│
└── World SFX
    ├── Door
    ├── Phone
    ├── Footstep
    └── Object Interaction
```

Audio juga dapat digunakan untuk membedakan:

```text
NORMAL WORLD
      ↓
NORMAL AUDIO
      ↓
MINDSCAPE
      ↓
DISTORTED / DIFFERENT AUDIO
```

---

# 15. Data Architecture

Konten sebaiknya dipisahkan dari logic.

Contoh:

```text
data/
│
├── characters.js
├── locations.js
├── objects.js
├── dialogues.js
└── lore.js
```

Tujuannya agar ketika konten berubah, developer tidak perlu mengubah banyak kode.

Contoh:

```js
const locations = [
  {
    id: "school",
    name: "School",
    scene: "school",
    description: "...",
    interactive: true
  }
];
```

---

# 16. State Management

State yang diperlukan dapat dibagi menjadi:

```text
Global State
│
├── Current Scene
├── Audio Enabled
├── User Progress
├── Discovered Objects
├── Discovered Lore
├── Dialogue State
└── Mindscape State
```

Contoh:

```text
currentScene = "town"

audioEnabled = true

mindscapeActive = false

discoveredObjects = [
  "phone",
  "school_board"
]

currentDialogue = null
```

React `useState` tetap digunakan untuk state lokal yang pendek umur, misalnya status hover atau form. Untuk state lintas modul, proyek memilih **Zustand** sejak Sprint 1 agar scene, audio, dialogue, discovery, dan mindscape tidak memicu re-render UI yang tidak terkait. Store harus diekspor melalui selector kecil, bukan satu object state besar.

---

# 17. Asset Pipeline

Asset pipeline harus dipisahkan dari source code.

```text
SOURCE ASSET
     │
     ▼
OPTIMIZATION
     │
     ├── Resize
     ├── Compress
     ├── Texture Optimization
     └── Model Optimization
     │
     ▼
WEB ASSET
     │
     ▼
PRELOAD / LAZY LOAD
     │
     ▼
BROWSER
```

### Prinsip:

- jangan memasukkan asset berukuran besar tanpa optimasi;
- gunakan format web yang sesuai;
- gunakan texture resolution seperlunya;
- gunakan lazy loading untuk scene yang berat;
- preload hanya asset yang diperlukan untuk opening;
- gunakan compression untuk audio dan image.

Untuk React, scene berat dimuat melalui `React.lazy()`/dynamic import dan dibungkus `Suspense`. Model GLTF/GLB dimuat dengan `useGLTF` dari Drei; loading screen memakai progress asset yang nyata, bukan timer semata. `useFrame` hanya dipakai untuk update yang harus berjalan tiap frame.

---

# 18. Loading Strategy

Karena website bersifat interactive dan dapat memiliki asset besar, loading harus menjadi bagian dari experience.

```text
INITIAL LOAD
     │
     ▼
LOAD CRITICAL ASSETS
     │
     ├── Logo
     ├── Initial Scene
     ├── UI
     └── Initial Audio
     │
     ▼
SHOW EXPERIENCE
     │
     ▼
LOAD SECONDARY ASSETS
     │
     ├── Other Scene
     ├── Additional Models
     ├── Gallery
     └── Lore
```

Loading screen dapat menggunakan style pixel-art.

---

# 19. Performance Architecture

Target utama:

```text
Performance
│
├── Asset Optimization
├── Lazy Loading
├── Scene Management
├── Object Culling
├── Texture Compression
├── Model Optimization
├── Animation Optimization
├── Audio Streaming
└── Mobile Fallback
```

Untuk scene 3D:

```text
VISIBLE OBJECTS
       │
       ▼
FRUSTUM / DISTANCE CHECK
       │
       ▼
RENDER ONLY WHAT IS NEEDED
```

Pengukuran dilakukan pada build produksi: ukuran chunk, waktu loading, FPS saat interaksi utama, dan audit Lighthouse/PageSpeed. Code splitting diterapkan sebelum scene berat tersedia, bukan menunggu bundle menjadi masalah.

---

# 20. Responsive Strategy

Website harus memiliki beberapa mode.

```text
Desktop
│
├── Full Interactive Experience
├── Mouse Interaction
└── WebGL Experience

Tablet
│
├── Reduced Scene Complexity
└── Touch Interaction

Mobile
│
├── Simplified Interaction
├── Reduced 3D Complexity
└── Alternative Presentation
```

Jika experience 3D terlalu berat di perangkat tertentu:

```text
HIGH-END DEVICE
       ↓
FULL EXPERIENCE

LOW-END DEVICE
       ↓
OPTIMIZED EXPERIENCE

WEBGL NOT SUPPORTED
       ↓
2D / STATIC FALLBACK
```

Sebelum membuat `Canvas`, aplikasi memeriksa dukungan WebGL. Preferensi `prefers-reduced-motion` menonaktifkan atau menyederhanakan motion non-esensial. Fallback tetap harus menyajikan informasi, navigasi, dan CTA utama.

---

# 21. Accessibility

Walaupun fokus proyek adalah visual dan immersive experience, accessibility tetap perlu dipertimbangkan.

Minimal:

- tombol navigasi dapat digunakan tanpa mouse;
- teks memiliki kontras yang cukup;
- audio dapat dimatikan;
- animasi berat dapat dikurangi;
- informasi penting tidak hanya disampaikan melalui audio;
- ada fallback untuk perangkat yang tidak mendukung WebGL dengan baik.

Autoplay audio tidak diasumsikan tersedia: ambience dan SFX hanya diinisialisasi setelah gesture pengguna. Untuk audio spasial dalam scene, gunakan positional audio dari Drei bila memang menambah pengalaman; audio UI/ambience sederhana tidak perlu dipaksakan menjadi spasial.

---

# 22. Security

Karena prototype terutama merupakan static/client-side website, attack surface dapat dibuat kecil.

Prinsip:

```text
No unnecessary backend
        │
        ▼
Static Frontend
        │
        ▼
CDN / Static Hosting
```

Hindari menyimpan:

- API key rahasia;
- credential;
- secret token;
- data sensitif.

Jika di kemudian hari membutuhkan backend:

```text
Frontend
    │
    ▼
API
    │
    ▼
Backend
    │
    ▼
Database
```

---

# 23. Backend — Prototype

Untuk versi lomba, backend **tidak harus digunakan** apabila semua konten dapat dibuat statis.

Recommended:

```text
Browser
   │
   ▼
Static Hosting
   │
   ├── HTML
   ├── CSS
   ├── JS
   └── Assets
```

Backend baru diperlukan jika fitur seperti:

- account;
- leaderboard;
- analytics khusus;
- form;
- CMS;
- dynamic content;
- database;
- user-generated content

memang dibutuhkan.

---

# 24. Deployment Topology

Topologi deployment:

```text
                    INTERNET
                       │
                       ▼
                  CDN / HOST
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
        STATIC FILES          ASSETS
             │                   │
             └─────────┬─────────┘
                       ▼
                    BROWSER
                       │
                       ▼
                 WEBGL / UI
```

Prototype dapat menggunakan static hosting yang mendukung frontend modern.

---

# 25. Teknologi yang Direkomendasikan

Stack dapat disesuaikan dengan kemampuan developer.

### Frontend

```text
React
```

### Build Tool

```text
Vite
```

### 3D

```text
Three.js
```

atau:

```text
React Three Fiber
```

### Animation

```text
GSAP
```

### Styling

```text
CSS
```

atau utility framework jika memang diperlukan.

### 3D Asset

```text
Blender
```

### Image Editing

```text
Photoshop / Aseprite / Krita / alternatif yang dikuasai
```

### Version Control

```text
Git
```

### Hosting

```text
Static hosting / CDN
```

---

# 26. Arsitektur Teknologi

Ringkasan:

```text
┌───────────────────────────────────────────────┐
│                    BROWSER                    │
│                                               │
│  ┌─────────────────────────────────────────┐  │
│  │                REACT APP                │  │
│  │                                         │  │
│  │  UI ──── State ──── Interaction        │  │
│  │              │                          │  │
│  │              ▼                          │  │
│  │        Scene Management                 │  │
│  │              │                          │  │
│  │              ▼                          │  │
│  │      React Three Fiber / Three.js       │  │
│  │              │                          │  │
│  │              ▼                          │  │
│  │           WebGL / GPU                  │  │
│  └─────────────────────────────────────────┘  │
│                                               │
│  Assets: Images / Models / Audio / Textures   │
└───────────────────────────────────────────────┘
                         │
                         ▼
                 STATIC HOSTING/CDN
```

---

# 27. Scene Dependency

```text
                    APP
                     │
                     ▼
                   INTRO
                     │
                     ▼
                    TOWN
               ┌─────┼─────┐
               ▼     ▼     ▼
             NPC   SCHOOL  OBJECT
               │     │     │
               └─────┼─────┘
                     ▼
                DISCOVERY
                     │
                     ▼
                 MINDSCAPE
                     │
                     ▼
                  REVEAL
                     │
                     ▼
                  ENDING
```

---

# 28. User Journey

Contoh user journey:

```text
1. User membuka website
        ↓
2. Loading screen
        ↓
3. Opening cinematic
        ↓
4. User masuk ke kota
        ↓
5. User melihat environment
        ↓
6. User menemukan NPC
        ↓
7. NPC memberikan dialog
        ↓
8. User menemukan objek
        ↓
9. Objek memberikan clue
        ↓
10. User menemukan trigger
        ↓
11. Mindscape transition
        ↓
12. User menjelajahi mindscape
        ↓
13. User menemukan memory/lore
        ↓
14. Kembali ke real world
        ↓
15. Character / story section
        ↓
16. Gallery
        ↓
17. CTA untuk memainkan game
```

---

# 29. Gameplay-Like Mechanics

Walaupun website bukan game, beberapa mekanik dapat membuatnya terasa seperti game.

## Exploration

User bebas melihat area.

## Discovery

User menemukan objek tersembunyi.

## Interaction

User dapat berinteraksi dengan NPC/objek.

## Progress

Eksplorasi membuka informasi baru.

## Transformation

Dunia berubah ketika memasuki mindscape.

## Reward

User mendapatkan:

- lore;
- visual;
- dialog;
- easter egg;
- reveal.

---

# 30. Discovery System

Contoh:

```text
DISCOVERY
│
├── Object
│   ├── Phone
│   ├── Book
│   └── Poster
│
├── NPC
│
├── Location
│
└── Memory
```

Progress dapat disimpan sementara:

```text
0 / 10 Memories Found
```

Ini dapat membuat user memiliki alasan untuk mengeksplorasi lebih jauh.

---

# 31. Easter Egg System

Easter egg dapat digunakan untuk meningkatkan replay value.

Contoh:

```text
Hidden Object
      │
      ▼
Special Interaction
      │
      ▼
Secret Dialogue
      │
      ▼
Special Animation
      │
      ▼
Hidden Lore
```

Easter egg sebaiknya tidak menjadi requirement untuk memahami konten utama.

---

# 32. Visual Direction

Visual website sebaiknya tidak sekadar "website 3D".

Karena A Space for the Unbound memiliki identitas pixel-art, website sebaiknya menggabungkan:

```text
Pixel Art
     +
3D Environment
     +
Cinematic Camera
     +
Modern Web UI
     +
Mindscape Effects
```

Tujuan:

> Membuat website modern tanpa kehilangan identitas visual game.

---

# 33. Layer Visual

```text
┌─────────────────────────────┐
│ UI / Dialogue               │
├─────────────────────────────┤
│ Post Processing             │
├─────────────────────────────┤
│ Particles / Effects         │
├─────────────────────────────┤
│ Characters / NPC            │
├─────────────────────────────┤
│ Props                       │
├─────────────────────────────┤
│ Environment                 │
├─────────────────────────────┤
│ Background / Sky            │
└─────────────────────────────┘
```

---

# 34. Interaction Priority

Tidak semua objek harus interaktif.

Prioritas:

```text
LEVEL 1 — Critical
│
├── Story trigger
├── Mindscape trigger
└── Main navigation

LEVEL 2 — Important
│
├── NPC
├── Important object
└── Lore

LEVEL 3 — Optional
│
├── Decoration
├── Easter egg
└── Environmental interaction
```

Ini membantu menjaga performance dan scope.

---

# 35. Scope untuk Kompetisi

Prioritas development:

## Tier S — Wajib

- Opening
- Main environment
- Interactive exploration
- Dialogue
- Mindscape transition
- Character presentation
- CTA
- Responsive desktop experience

## Tier A — Sangat disarankan

- NPC interaction
- Lore discovery
- Sound design
- Cinematic camera
- Post-processing
- Easter egg
- Day/night effect

## Tier B — Jika waktu cukup

- Multiple locations
- Collectible memories
- Advanced shader
- Advanced particle
- Complex camera system

## Tier C — Jangan dipaksakan

- Full backend
- Account system
- CMS
- Multiplayer
- Complex database
- Fitur yang tidak meningkatkan nilai presentasi secara signifikan

---

# 36. Prioritas Waktu

Gunakan prinsip:

```text
IMPACT
   /
TIME
```

Prioritaskan fitur dengan impact besar dan waktu pengerjaan masuk akal.

Contoh:

| Fitur | Impact | Kompleksitas | Prioritas |
|---|---:|---:|---|
| Opening cinematic | Tinggi | Sedang | S |
| 3D town | Sangat tinggi | Tinggi | S |
| Mindscape transition | Sangat tinggi | Tinggi | S |
| Dialogue system | Tinggi | Sedang | S |
| Character showcase | Tinggi | Sedang | A |
| Easter egg | Sedang | Rendah | A |
| CMS | Rendah | Tinggi | C |
| Login | Rendah | Sedang | C |
| Database | Rendah | Tinggi | C |

---

# 37. Struktur Repository

Direkomendasikan menggunakan Git:

```text
main
│
├── development
│
├── feature/intro
├── feature/world
├── feature/mindscape
├── feature/dialogue
├── feature/characters
└── feature/audio
```

Workflow:

```text
Feature Branch
      │
      ▼
Development
      │
      ▼
Testing
      │
      ▼
Production / Main
```

---

# 38. Development Workflow

```text
IDEA
 │
 ▼
WIREFRAME
 │
 ▼
VISUAL DESIGN
 │
 ▼
PROTOTYPE
 │
 ▼
INTERACTION
 │
 ▼
POLISH
 │
 ▼
PERFORMANCE
 │
 ▼
RESPONSIVE
 │
 ▼
TESTING
 │
 ▼
DEPLOYMENT
```

---

# 39. Testing

Testing minimal:

### Functional

- tombol;
- navigation;
- dialogue;
- interaction;
- transition;
- audio.

### Visual

- desktop;
- tablet;
- mobile;
- berbagai resolusi.

### Performance

- FPS;
- loading time;
- memory;
- asset size;
- WebGL stability.

### Browser

Uji browser utama yang menjadi target.

---

# 40. Pre-Competition Checklist

```text
[ ] Opening berjalan
[ ] Loading berjalan
[ ] Main scene berjalan
[ ] Interaction berjalan
[ ] Dialogue berjalan
[ ] Mindscape transition berjalan
[ ] Character section selesai
[ ] CTA tersedia
[ ] Audio dapat dimatikan
[ ] Responsive
[ ] Tidak ada error console yang kritis
[ ] Asset sudah dioptimasi
[ ] Source code rapi
[ ] README tersedia
[ ] Build production berhasil
[ ] Demo deployment tersedia
[ ] Backup source code tersedia
```

---

# 41. Asset & IP Strategy

Untuk prototype kompetisi:

```text
ASSET
│
├── Original Asset
│   └── Paling aman
│
├── CC0
│   └── Periksa lisensi aset
│
├── CC BY
│   └── Periksa attribution requirement
│
└── Official Game Asset
    └── Jangan diasumsikan bebas digunakan
```

Prinsip:

> Downloadable ≠ otomatis bebas digunakan secara komersial.

Untuk prototype, gunakan aset yang hak penggunaannya jelas.

Setelah ada kerja sama dengan pemilik IP, asset prototype dapat diganti/ditingkatkan menggunakan materi resmi sesuai izin.

---

# 42. Pemisahan Prototype dan Official Version

```text
                COMPETITION PROTOTYPE
                         │
                         ▼
                 ORIGINAL DESIGN
                         │
                         ▼
                  DEMONSTRATION
                         │
                         ▼
                  POST-COMPETITION
                         │
                ┌────────┴────────┐
                ▼                 ▼
          NO AGREEMENT       AGREEMENT
                │                 │
                ▼                 ▼
            PORTFOLIO        OFFICIAL PROJECT
                                  │
                                  ▼
                            LICENSE / PERMISSION
                                  │
                                  ▼
                           OFFICIAL ASSETS
                                  │
                                  ▼
                            CLIENT FEEDBACK
                                  │
                                  ▼
                              REVISION
                                  │
                                  ▼
                            FINAL WEBSITE
```

---

# 43. Strategi Komersialisasi Setelah Lomba

Prototype tidak harus dijual apa adanya.

Model yang lebih fleksibel:

```text
Prototype
    │
    ▼
Presentation
    │
    ▼
Feedback
    │
    ▼
Scope Definition
    │
    ▼
Quotation
    │
    ▼
Agreement
    │
    ▼
Revision / Redevelopment
    │
    ▼
Official Website
```

Hal yang kemungkinan berubah:

- branding;
- logo;
- warna;
- artwork;
- character asset;
- copywriting;
- CTA;
- platform links;
- legal notice;
- analytics;
- SEO;
- performance;
- mobile experience.

---

# 44. Konsep Produk Setelah Kompetisi

Jika developer/studio tertarik, prototype dapat berkembang menjadi:

```text
OFFICIAL INTERACTIVE EXPERIENCE
│
├── Game Introduction
├── World Exploration
├── Character
├── Story
├── Mindscape
├── Media
├── News
├── Platform
└── CTA
```

Dengan tambahan:

```text
CMS
│
├── News
├── Events
├── Media
└── Campaign
```

Namun CMS/backend tidak perlu menjadi fokus prototype lomba.

---

# 45. Topologi Final

Ringkasan keseluruhan:

```text
                         USER
                          │
                          ▼
                     WEB BROWSER
                          │
                          ▼
                  ┌───────────────┐
                  │   REACT APP   │
                  └───────┬───────┘
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
         UI             STATE           ROUTER
          │               │                │
          └───────────────┼────────────────┘
                          │
                          ▼
                  EXPERIENCE LAYER
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       SCENES        INTERACTION        DIALOGUE
          │               │                │
          └───────────────┼────────────────┘
                          ▼
                    WORLD SYSTEM
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
       CAMERA          AUDIO           EFFECTS
          │               │                │
          └───────────────┼────────────────┘
                          ▼
                    THREE.JS / R3F
                          │
                          ▼
                       WEBGL
                          │
                          ▼
                         GPU
                          │
                          ▼
                       DISPLAY


             STATIC ASSETS
                   │
       ┌───────────┼────────────┐
       ▼           ▼            ▼
    MODELS      TEXTURES      AUDIO
       │           │            │
       └───────────┼────────────┘
                   ▼
              ASSET LOADER
                   │
                   ▼
              EXPERIENCE
```

---

# 46. Prinsip Arsitektur Utama

Proyek ini sebaiknya mengikuti 10 prinsip:

1. **Experience first** — website harus terasa seperti pengalaman, bukan sekadar kumpulan section.
2. **Visual storytelling** — environment ikut menceritakan sesuatu.
3. **Interaction with purpose** — interaksi harus memiliki alasan.
4. **Modular architecture** — scene, UI, data, dan system dipisahkan.
5. **Data-driven content** — dialogue/lore/character dipisahkan dari logic.
6. **Performance-aware** — visual spektakuler tetap harus mempertimbangkan perangkat user.
7. **Responsive fallback** — experience tidak boleh sepenuhnya gagal di perangkat yang lebih lemah.
8. **Asset licensing awareness** — setiap aset eksternal harus memiliki dasar penggunaan yang jelas.
9. **Competition-focused scope** — fitur dengan WOW factor didahulukan.
10. **Commercial-ready structure** — kode dibuat cukup rapi sehingga prototype dapat dikembangkan lagi setelah kompetisi.

---

# 47. Fokus Utama Prototype

Jika waktu terbatas, jangan mencoba membuat seluruh dunia game.

Lebih baik:

```text
       SATU AREA YANG SANGAT DETAIL
                    │
                    ▼
              INTERACTION
                    │
                    ▼
               STORY CLUE
                    │
                    ▼
               MINDSCAPE
                    │
                    ▼
              VISUAL REVEAL
                    │
                    ▼
                 ENDING
```

daripada:

```text
10 AREA
+
MINIMAL INTERACTION
+
MINIMAL DETAIL
+
BANYAK LOADING
```

Untuk kompetisi, **satu pengalaman yang sangat polished biasanya lebih kuat daripada banyak halaman yang dangkal.**

---

# 48. Kesimpulan

Arsitektur proyek ini dirancang dengan dua tujuan yang tidak saling mengganggu:

```text
                 PROJECT
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
      COMPETITION         FUTURE BUSINESS
          │                   │
          ▼                   ▼
    WOW FACTOR           FLEXIBILITY
          │                   │
          ▼                   ▼
    INTERACTIVE           MODULAR CODE
    EXPERIENCE             + REUSABLE
          │                   │
          └─────────┬─────────┘
                    ▼
              STRONG PORTFOLIO
```

Untuk tahap sekarang, **prioritas utama adalah kualitas prototype dan peluang memenangkan kompetisi**.

Prototype tidak perlu dianggap sebagai produk final untuk studio. Setelah kompetisi selesai, prototype dapat dipresentasikan sebagai **proof of concept**, kemudian dikembangkan kembali berdasarkan feedback, kebutuhan, branding, aset resmi, dan izin dari pemilik IP apabila terjadi kerja sama.
