# 📋 Recap Perubahan: BUY NOW Section

> **Untuk re-apply setelah `git pull` dari GitHub.**
> File ini mendokumentasikan semua perubahan yang kita buat dalam sesi ini.
> Semua path relatif dari root projek (`Game_Web/`).

---

## ✅ Ringkasan

Menambahkan **Section 06: BUY NOW** di akhir ScrollExperience (setelah Red Book Section),
dengan gaya kertas komik + palette lime/biru projek, terinspirasi dari referensi Cyberpunk 2077.

---

## 📁 File BARU yang Perlu Di-create

### 1. `src/data/buyData.js`

```js
// Data platform & store untuk section Buy Now.
// Setiap PLATFORM punya minimal 1 subStore. PC punya 3 subStore (Steam/GOG/Epic).
// Saat platform di-klik, section STORE di bawah akan menampilkan subStore-nya.

export const PLATFORMS = [
	{
		id: 'pc',
		label: 'PC',
		sub: 'WINDOWS / MAC / LINUX',
		icon: '/assets/a_space_unbound/other/pc_icon.svg',
		color: '#1b2838',
		tag: '3 STORES',
		subStores: [
			{
				id: 'steam',
				label: 'STEAM',
				logo: '/assets/a_space_unbound/other/Steam_icon_logo.svg.png',
				url: 'https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/',
				tag: 'MOST POPULAR',
			},
			{
				id: 'gog',
				label: 'GOG.COM',
				logo: '/assets/a_space_unbound/other/GOG_logo.svg',
				url: '#',
				tag: '-15%',
			},
			{
				id: 'epic',
				label: 'EPIC GAMES STORE',
				logo: '/assets/a_space_unbound/other/Epic_Games_logo.svg.png',
				url: '#',
				tag: null,
			},
		],
	},
	{
		id: 'ps5',
		label: 'PLAYSTATION 5',
		sub: 'CONSOLE',
		icon: '/assets/a_space_unbound/other/ps5.png',
		color: '#003791',
		tag: null,
		subStores: [
			{
				id: 'psn-ps5',
				label: 'PLAYSTATION STORE',
				logo: '/assets/a_space_unbound/other/ps5.png',
				url: '#',
				tag: null,
			},
		],
	},
	{
		id: 'ps4',
		label: 'PLAYSTATION 4',
		sub: 'CONSOLE',
		icon: '/assets/a_space_unbound/other/playstation-4-png-logo-5878.png',
		color: '#003791',
		tag: null,
		subStores: [
			{
				id: 'psn-ps4',
				label: 'PLAYSTATION STORE',
				logo: '/assets/a_space_unbound/other/playstation-4-png-logo-5878.png',
				url: '#',
				tag: null,
			},
		],
	},
	{
		id: 'switch',
		label: 'NINTENDO SWITCH',
		sub: 'HYBRID CONSOLE',
		icon: '/assets/a_space_unbound/other/nintendo-switch.png',
		color: '#e60012',
		tag: null,
		subStores: [
			{
				id: 'eshop',
				label: 'NINTENDO eSHOP',
				logo: '/assets/a_space_unbound/other/nintendo-switch.png',
				url: '#',
				tag: null,
			},
		],
	},
	{
		id: 'xbox',
		label: 'XBOX SERIES X|S',
		sub: 'CONSOLE',
		icon: '/assets/a_space_unbound/other/black-xbox-series-s-series-x-logos-701751694790446ascycyyien.png',
		color: '#107c10',
		tag: null,
		subStores: [
			{
				id: 'xbox-store',
				label: 'XBOX STORE',
				logo: '/assets/a_space_unbound/other/black-xbox-series-s-series-x-logos-701751694790446ascycyyien.png',
				url: '#',
				tag: null,
			},
		],
	},
	{
		id: 'xbox-one',
		label: 'XBOX ONE',
		sub: 'CONSOLE',
		icon: '/assets/a_space_unbound/other/xbox-one-logo-png_seeklogo-285321.png',
		color: '#107c10',
		tag: null,
		subStores: [
			{
				id: 'xbox-one-store',
				label: 'XBOX STORE',
				logo: '/assets/a_space_unbound/other/xbox-one-logo-png_seeklogo-285321.png',
				url: '#',
				tag: null,
			},
		],
	},
	{
		id: 'ios',
		label: 'iOS / APPLE ARCADE',
		sub: 'MOBILE',
		icon: '/assets/a_space_unbound/other/ios.svg',
		color: '#000000',
		tag: 'NEW',
		subStores: [
			{
				id: 'app-store',
				label: 'APPLE APP STORE',
				logo: '/assets/a_space_unbound/other/ios.svg',
				url: '#',
				tag: null,
			},
		],
	},
]

// Kartu produk utama yang ditampilkan di paling atas (kiri-kanan slider).
export const PRODUCT_EDITIONS = [
	{
		id: 'standard',
		badge: 'STANDARD EDITION',
		title: 'A SPACE FOR THE UNBOUND',
		image: '/assets/a_space_unbound/foto/thumnail/thumnail1.webp',
		includes: ['Base Game', 'Digital Soundtrack (MP3)'],
		accent: '#0c71c3',
	},
	{
		id: 'physical',
		badge: 'PHYSICAL RELEASE',
		title: 'SWITCH PACKSHOT',
		image:
			'/assets/a_space_unbound/foto/apaaja/NS-A-Space-fo-the-Unbound-Packshot-2D-187x300-1.png',
		includes: ['Cartridge Edition', 'Mini Art Booklet'],
		accent: '#e91e63',
	},
	{
		id: 'deluxe',
		badge: 'PS5 COVER ART',
		title: 'CONSOLE EDITION',
		image:
			'/assets/a_space_unbound/foto/apaaja/space-for-unbound_ps5_cover.png',
		includes: ['Full Game', 'Reversible Cover'],
		accent: '#bde200',
	},
]
```

---

### 2. `src/features/buy/BuyNowSection.jsx`

```jsx
import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PLATFORMS, PRODUCT_EDITIONS } from '../../data/buyData'

gsap.registerPlugin(ScrollTrigger)

// ----------------------------------------------------------------------------
// Gaya kertas komik: lapisan warna krem + garis lipatan + grain noise,
// dipertajam dengan image-rendering pixelated supaya konsisten dengan projek.
// ----------------------------------------------------------------------------
const PAPER_TEXTURE = {
	backgroundColor: '#f3e7c8',
	backgroundImage: `
		linear-gradient(transparent 92%, rgba(160,140,110,0.18) 92%, rgba(160,140,110,0.18) 100%),
		linear-gradient(90deg, rgba(100,80,60,0.04) 1px, transparent 1px),
		linear-gradient(rgba(100,80,60,0.04) 1px, transparent 1px),
		radial-gradient(rgba(0,0,0,0.05) 1px, transparent 1px)
	`,
	backgroundSize: '100% 22px, 5px 5px, 5px 5px, 8px 8px',
	backgroundPosition: '0 0, 0 0, 0 0, 0 0',
	imageRendering: 'pixelated',
}

// clip-path sudut notched ala referensi (Cyberpunk 2077 style).
// Setiap kartu punya potongan diagonal di dua sudut berlawanan.
const NOTCH_LEFT = 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
const NOTCH_RIGHT =
	'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))'

// ----------------------------------------------------------------------------
// Komponen kecil: Header "SELECT X:" ala panel komik.
// ----------------------------------------------------------------------------
function PanelHeader({ label, accent = '#0c71c3', sub }) {
	return (
		<div className="flex flex-col items-center gap-2 mb-6">
			<div className="flex items-center gap-3">
				<span className="h-0.5 w-10 sm:w-16 bg-black" />
				<span
					className="inline-block h-3 w-3 border-2 border-black"
					style={{ backgroundColor: accent }}
				/>
				<span className="h-0.5 w-10 sm:w-16 bg-black" />
			</div>
			<h3 className="font-['Press_Start_2P',monospace] text-base sm:text-xl md:text-2xl font-bold uppercase tracking-widest text-black text-center">
				{label}
			</h3>
			{sub && (
				<p className="font-['Silkscreen',monospace] text-[10px] sm:text-xs text-[#3d3022] text-center max-w-xl">
					{sub}
				</p>
			)}
		</div>
	)
}

// ----------------------------------------------------------------------------
// Kartu produk utama (3 edisi).
// ----------------------------------------------------------------------------
function EditionCard({ edition, index }) {
	const cardRef = useRef(null)
	const accent = edition.accent || '#0c71c3'

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				cardRef.current,
				{ y: 24, autoAlpha: 0 },
				{
					y: 0,
					autoAlpha: 1,
					duration: 0.7,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: cardRef.current,
						start: 'top 88%',
						once: true,
					},
					delay: index * 0.08,
				},
			)
		}, cardRef)
		return () => ctx.revert()
	}, [index])

	return (
		<div
			ref={cardRef}
			className="group relative flex flex-col border-[3px] border-black bg-white shadow-[6px_6px_0px_#000] transition-transform hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000]"
			style={{ clipPath: NOTCH_LEFT }}
		>
			<div className="border-b-[3px] border-black px-3 py-2" style={{ backgroundColor: accent }}>
				<span className="block font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] tracking-widest text-white text-center">
					{edition.badge}
				</span>
			</div>

			<div className="relative flex items-center justify-center px-3 py-5 bg-[#f3e7c8] min-h-45">
				<img
					src={edition.image}
					alt={edition.title}
					className="max-h-44 w-auto object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,0.25)] [image-rendering:pixelated]"
				/>
			</div>

			<div className="border-t-[3px] border-black bg-white px-3 py-3">
				<p className="font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] text-black text-center leading-tight mb-2">
					{edition.title}
				</p>
				<ul className="space-y-1">
					{edition.includes.map((item) => (
						<li
							key={item}
							className="flex items-center gap-1.5 font-['Silkscreen',monospace] text-[9px] sm:text-[10px] text-[#3d3022]"
						>
							<span
								className="inline-block h-1.5 w-1.5 border border-black"
								style={{ backgroundColor: accent }}
							/>
							<span>{item}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

// ----------------------------------------------------------------------------
// Tombol platform (kotak + sudut notched + icon + label + tag).
// Mendukung indikator "3 STORES" / "NEW" dll via tag.
// ----------------------------------------------------------------------------
function PlatformButton({ platform, active, onSelect }) {
	const tagStyles = {
		'-15%': 'bg-[#f44336] text-white',
		NEW: 'bg-[#bde200] text-black',
		'3 STORES': 'bg-[#0c71c3] text-white',
	}

	return (
		<button
			type="button"
			onClick={() => onSelect?.(platform)}
			className={`group relative cursor-pointer transition-all duration-200 select-none ${
				active
					? '-translate-y-1 shadow-[6px_6px_0px_#000]'
					: 'shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none'
			}`}
			style={{
				clipPath: NOTCH_RIGHT,
				backgroundColor: active ? platform.color : '#ffffff',
				border: '3px solid #000000',
			}}
			aria-label={`Pilih platform ${platform.label}`}
			aria-pressed={active}
		>
			{/* Tag pojok kiri-atas */}
			{platform.tag && (
				<span
					className={`absolute -top-3 -left-2 z-10 border-2 border-black px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] shadow-[2px_2px_0_#000] ${tagStyles[platform.tag] || 'bg-white text-black'}`}
				>
					{platform.tag}
				</span>
			)}

			<div className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5">
				<div className="flex h-7 w-12 items-center justify-center sm:h-8 sm:w-14">
					<img
						src={platform.icon}
						alt={platform.label}
						className="max-h-full max-w-full object-contain"
						style={{ filter: active ? 'invert(1) brightness(2)' : 'none' }}
					/>
				</div>
				<div className="flex flex-col items-start leading-tight">
					<span
						className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[10px] tracking-wider"
						style={{ color: active ? '#ffffff' : '#000000' }}
					>
						{platform.label}
					</span>
					<span
						className="font-['Silkscreen',monospace] text-[7px] sm:text-[8px]"
						style={{ color: active ? '#ffffff' : '#3d3022', opacity: 0.85 }}
					>
						{platform.sub}
					</span>
				</div>
			</div>
		</button>
	)
}

// ----------------------------------------------------------------------------
// Store card. Dipakai untuk sub-stores dari platform aktif.
// ----------------------------------------------------------------------------
function StoreCard({ store, index }) {
	const cardRef = useRef(null)
	const tagStyles = {
		'-15%': 'bg-[#f44336] text-white',
		NEW: 'bg-[#bde200] text-black',
		'MOST POPULAR': 'bg-[#0c71c3] text-white',
	}

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				cardRef.current,
				{ y: 30, autoAlpha: 0 },
				{
					y: 0,
					autoAlpha: 1,
					duration: 0.7,
					ease: 'back.out(1.4)',
					scrollTrigger: {
						trigger: cardRef.current,
						start: 'top 90%',
						once: true,
					},
					delay: index * 0.1,
				},
			)
		}, cardRef)
		return () => ctx.revert()
	}, [index])

	return (
		<a
			ref={cardRef}
			href={store.url}
			target="_blank"
			rel="noopener noreferrer"
			className="group relative flex flex-col items-center gap-2.5 border-[3px] border-black bg-white px-4 py-5 shadow-[5px_5px_0px_#000] transition-all hover:-translate-y-1 hover:bg-[#bde200] hover:shadow-[8px_8px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
			style={{ clipPath: NOTCH_RIGHT }}
		>
			{store.tag && (
				<span
					className={`absolute -top-3 -left-2 z-10 border-2 border-black px-1.5 py-0.5 font-['Press_Start_2P',monospace] text-[8px] shadow-[2px_2px_0_#000] ${tagStyles[store.tag] || 'bg-white text-black'}`}
				>
					{store.tag}
				</span>
			)}

			<div className="flex h-12 items-center justify-center sm:h-14">
				<img src={store.logo} alt={store.label} className="max-h-full max-w-36 object-contain" />
			</div>

			<span className="font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] tracking-wider text-black text-center">
				{store.label}
			</span>

			<span className="mt-1 inline-flex items-center gap-1.5 border-2 border-black bg-black px-3 py-1.5 font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-[#bde200] shadow-[2px_2px_0_#000] group-hover:bg-white group-hover:text-black">
				<span>BUY NOW</span>
				<span>▶</span>
			</span>
		</a>
	)
}

// ----------------------------------------------------------------------------
// Main section component.
// ----------------------------------------------------------------------------
export function BuyNowSection() {
	const rootRef = useRef(null)
	const headerRef = useRef(null)
	const [activePlatformId, setActivePlatformId] = useState('pc')

	// Animasi masuk saat section pertama kali masuk viewport.
	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.fromTo(
				headerRef.current,
				{ autoAlpha: 0, y: -16 },
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.8,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: rootRef.current,
						start: 'top 80%',
						once: true,
					},
				},
			)
		}, rootRef)
		return () => ctx.revert()
	}, [])

	const activePlatform = PLATFORMS.find((p) => p.id === activePlatformId) || PLATFORMS[0]
	const visibleStores = activePlatform.subStores || []

	return (
		<section
			id="buy"
			ref={rootRef}
			className="relative w-full min-h-screen py-12 px-4 sm:py-16 sm:px-8 lg:px-12 overflow-hidden"
			style={{ ...PAPER_TEXTURE, imageRendering: 'pixelated' }}
		>
			{/* Grain noise overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-multiply"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
					backgroundSize: '128px 128px',
					imageRendering: 'pixelated',
				}}
			/>

			<div className="relative mx-auto max-w-6xl">
				{/* ================================================================== */}
				{/* TOP BAR: SECTION BADGE                                             */}
				{/* ================================================================== */}
				<div
					ref={headerRef}
					className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4"
				>
					<div className="flex items-center gap-2.5">
						<span className="inline-block h-3.5 w-3.5 bg-[#bde200] border-2 border-black shadow-[2px_2px_0px_#000]" />
						<span className="border-2 border-black bg-[#bde200] px-3 py-1 font-['Press_Start_2P',monospace] text-[10px] tracking-wider text-black shadow-[2px_2px_0px_#000] sm:text-xs">
							■ SECTION // 06: BUY NOW
						</span>
					</div>
					<span className="font-['Silkscreen',monospace] text-[9px] sm:text-[10px] text-[#3d3022]">
						DUKUNG DEVELOPER // BAWA PULANG PETUALANGANNYA
					</span>
				</div>

				{/* ================================================================== */}
				{/* SECTION 1: SELECT GAME (Product editions)                          */}
				{/* ================================================================== */}
				<PanelHeader
					label="SELECT GAME"
					sub="Tiga edisi resmi yang bisa kamu koleksi, masing-masing dengan bonus unik."
					accent="#0c71c3"
				/>

				<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-14">
					{PRODUCT_EDITIONS.map((edition, idx) => (
						<EditionCard key={edition.id} edition={edition} index={idx} />
					))}
				</div>

				{/* ================================================================== */}
				{/* SECTION 2: SELECT PLATFORM                                          */}
				{/* ================================================================== */}
				<PanelHeader
					label="SELECT PLATFORM"
					sub={
						activePlatform.id === 'pc'
							? 'PC punya 3 toko resmi. Klik untuk melihat pilihan lengkap.'
							: `Pilih platform. Klik untuk melihat toko resmi ${activePlatform.label}.`
					}
					accent="#ff9800"
				/>

				<div className="flex flex-wrap items-stretch justify-center gap-3 mb-10">
					{PLATFORMS.map((platform) => (
						<PlatformButton
							key={platform.id}
							platform={platform}
							active={activePlatformId === platform.id}
							onSelect={(p) => setActivePlatformId(p.id)}
						/>
					))}
				</div>

				{/* Indikator platform aktif (mini status bar) */}
				<div className="mb-14 flex flex-wrap items-center justify-center gap-2 border-y-2 border-black/40 bg-[#f3e7c8] py-2.5 text-center">
					<span className="font-['Silkscreen',monospace] text-[9px] sm:text-[10px] text-[#3d3022]">
						SEDANG DIPILIH:
					</span>
					<span
						className="inline-flex items-center gap-2 border-2 border-black px-3 py-1 font-['Press_Start_2P',monospace] text-[9px] sm:text-[10px] text-white shadow-[2px_2px_0_#000]"
						style={{ backgroundColor: activePlatform.color }}
					>
						<span>{activePlatform.label}</span>
						<span className="opacity-80">
							({visibleStores.length} STORE{visibleStores.length > 1 ? 'S' : ''})
						</span>
					</span>
				</div>

				{/* ================================================================== */}
				{/* SECTION 3: SELECT STORE (sub-stores dari platform aktif)           */}
				{/* ================================================================== */}
				<PanelHeader
					label="SELECT STORE & BUY NOW"
					sub={
						visibleStores.length > 1
							? `Klik salah satu store di bawah untuk membeli ${activePlatform.label}.`
							: `Klik store di bawah untuk membeli di ${activePlatform.label}.`
					}
					accent="#bde200"
				/>

				<div
					className={`grid gap-4 mb-12 ${
						visibleStores.length === 1
							? 'grid-cols-1 max-w-xs mx-auto'
							: visibleStores.length === 2
								? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
								: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
					}`}
				>
					{visibleStores.map((store, idx) => (
						<StoreCard key={`${activePlatformId}-${store.id}`} store={store} index={idx} />
					))}
				</div>

				{/* ================================================================== */}
				{/* FOOTER DESCRIPTION + DISCLAIMER                                     */}
				{/* ================================================================== */}
				<div className="relative border-[3px] border-black bg-white p-5 shadow-[5px_5px_0px_#000] sm:p-6">
					<span className="absolute -top-1.5 -left-1.5 h-3.5 w-3.5 bg-[#bde200] border-2 border-black" />
					<span className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 bg-[#0c71c3] border-2 border-black" />
					<span className="absolute -bottom-1.5 -left-1.5 h-3.5 w-3.5 bg-[#0c71c3] border-2 border-black" />
					<span className="absolute -bottom-1.5 -right-1.5 h-3.5 w-3.5 bg-[#bde200] border-2 border-black" />

					<div className="flex items-center gap-2 mb-3">
						<span className="font-['Press_Start_2P',monospace] text-[10px] text-black">
							[ ABOUT THE GAME ]
						</span>
						<span className="h-px flex-1 bg-black/30" />
						<span className="font-['Silkscreen',monospace] text-[8px] text-[#3d3022]">
							INDONESIA 199X
						</span>
					</div>

					<p className="font-serif text-sm leading-relaxed text-stone-900 sm:text-base mb-3">
						<strong className="text-[#0c71c3]">A Space for The Unbound</strong> is a
						slice-of-life adventure game set in the late 90s rural Indonesia, focusing
						on themes of anxiety, depression, and self-discovery at the end of high
						school years.
					</p>
					<p className="font-['Silkscreen',monospace] text-[10px] sm:text-xs text-[#3d3022] leading-relaxed">
						Beli versi originalnya di{' '}
						<strong>Steam, Epic Games Store, GOG.com, PlayStation 4, PlayStation 5,
							Nintendo Switch, Xbox One, Xbox Series X|S,</strong>{' '}
						dan <strong>iOS / Apple Arcade</strong>. Dapatkan update terbaru dan dukung
						pengembang resminya (Toge Productions & Mojiken Studio).
					</p>

					<div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t-2 border-black pt-3">
						<span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-[#3d3022]">
							© TOGE PRODUCTIONS × MOJIKEN STUDIO
						</span>
						<span className="font-['Press_Start_2P',monospace] text-[8px] sm:text-[9px] text-[#bde200] bg-black px-2 py-1 shadow-[2px_2px_0_#000]">
							PROJECT WEBSITE — FAN MADE
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}
```

---

### 3. `public/assets/a_space_unbound/other/pc_icon.svg`

```xml
<!-- Pixel-art desktop PC icon untuk tombol "PC" -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" shape-rendering="crispEdges">
  <!-- Monitor body -->
  <rect x="6"  y="10" width="52" height="34" fill="#ffffff" stroke="#000000" stroke-width="3"/>
  <!-- Screen inner -->
  <rect x="10" y="14" width="44" height="26" fill="#0c71c3" stroke="#000000" stroke-width="2"/>
  <!-- Power LED -->
  <rect x="46" y="40" width="6" height="3" fill="#bde200"/>
  <!-- Stand neck -->
  <rect x="28" y="44" width="8" height="6" fill="#ffffff" stroke="#000000" stroke-width="2"/>
  <!-- Stand base -->
  <rect x="18" y="50" width="28" height="6" fill="#ffffff" stroke="#000000" stroke-width="3"/>
</svg>
```

---

### 4. `public/assets/a_space_unbound/other/GOG_logo.svg`

```xml
<!-- Simple monochrome GOG.com inspired mark. Pixel-style box around the wordmark. -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60" shape-rendering="crispEdges">
  <rect x="2" y="2" width="196" height="56" fill="#ffffff" stroke="#000000" stroke-width="3"/>
  <g fill="#000000" font-family="'Press Start 2P', monospace" font-weight="700" font-size="22" text-anchor="middle">
    <text x="68" y="38">gog</text>
  </g>
  <circle cx="160" cy="30" r="9" fill="#86328a"/>
  <text x="160" y="35" fill="#ffffff" font-family="'Press Start 2P', monospace" font-size="9" text-anchor="middle">.com</text>
</svg>
```

---

### 5. `public/assets/a_space_unbound/other/ios.svg`

```xml
<!-- Stylized pixel-art Apple logo + "iOS" label, monochrome -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" width="200" height="60" shape-rendering="crispEdges">
  <rect x="2" y="2" width="196" height="56" fill="#ffffff" stroke="#000000" stroke-width="3"/>
  <g fill="#000000" transform="translate(28,10)">
    <rect x="20" y="0" width="6" height="6"/>
    <rect x="6"  y="6"  width="34" height="6"/>
    <rect x="2"  y="12" width="42" height="6"/>
    <rect x="0"  y="18" width="46" height="14"/>
    <rect x="2"  y="32" width="42" height="6"/>
    <rect x="6"  y="38" width="34" height="4"/>
    <rect x="38" y="18" width="8" height="6" fill="#ffffff"/>
    <rect x="34" y="24" width="12" height="6" fill="#ffffff"/>
  </g>
  <text x="110" y="36" fill="#000000" font-family="'Press Start 2P', monospace" font-weight="700" font-size="18">iOS</text>
</svg>
```

---

## ✏️ File YANG DIEDIT

### A. `src/features/experience/ScrollExperience.jsx`

**Edit 1 — Tambah import** (cari `import { RedBookSection } from '../synopsis/RedBookSection'`):

```js
// SEBELUM:
import { RedBookSection } from '../synopsis/RedBookSection'

// SESUDAH:
import { RedBookSection } from '../synopsis/RedBookSection'
import { BuyNowSection } from '../buy/BuyNowSection'
```

**Edit 2 — Tambah render setelah RedBookSection** (cari blok `<div id="synopsis">`):

```jsx
// SEBELUM (akhir dari section Red Book):
        </div>
      </div>
    </div>
  )
}

// SESUDAH:
        </div>

        {/* ========================================================================= */}
        {/* BUY NOW SECTION                                                           */}
        {/* ========================================================================= */}
        <div id="buy">
          <BuyNowSection />
        </div>
      </div>
    </div>
  )
}
```

---

### B. `src/features/navigation/SideNavigation.jsx`

**Edit 1 — Tambah section 06 ke array sections** (cari baris `{ id: 'synopsis', label: '05: LORE', color: '#f44336' }`):

```js
// SEBELUM:
    { id: 'synopsis', label: '05: LORE', color: '#f44336' }
  ]

// SESUDAH:
    { id: 'synopsis', label: '05: LORE', color: '#f44336' },
    { id: 'buy', label: '06: BUY NOW', color: '#ffeb3b' }
  ]
```

**Edit 2 — Tambahkan 'buy' ke sectionIds untuk auto-detect** (cari `const sectionIds = ['about', 'gallery', 'characters', 'synopsis']`):

```js
// SEBELUM:
    const sectionIds = ['about', 'gallery', 'characters', 'synopsis']

// SESUDAH:
    const sectionIds = ['about', 'gallery', 'characters', 'synopsis', 'buy']
```

---

## 🚀 Cara Re-apply Setelah Git Pull

**Opsi 1 — Manual (paling aman):**
1. Buat file-file baru di section "File BARU" di atas (copy paste isinya)
2. Terapkan edit di section "File YANG DIEDIT"

**Opsi 2 — Pakai file dokumentasi ini:**
1. Simpan `CHANGES_BUYNOW_SECTION.md` ini sebelum pull
2. Setelah pull, buka file ini dan re-apply perubahannya

**Opsi 3 — Commit dulu sebelum pull:**
```bash
git add src/features/buy/ src/data/buyData.js \
        src/features/experience/ScrollExperience.jsx \
        src/features/navigation/SideNavigation.jsx \
        public/assets/a_space_unbound/other/pc_icon.svg \
        public/assets/a_space_unbound/other/GOG_logo.svg \
        public/assets/a_space_unbound/other/ios.svg

git commit -m "feat: add Buy Now section (06) with PC platform group"

git pull --rebase   # atau git stash / git pull / git stash pop
```

---

## 📝 Catatan Tambahan

- **Steam URL sudah benar:** `https://store.steampowered.com/app/1201270/A_Space_for_the_Unbound/`
- **Platform lain (PSN, eShop, Xbox Store, App Store):** masih `#` placeholder. Bisa diganti di `buyData.js` kalau sudah ada URL resmi.
- **Section ID:** `#buy` (dipakai untuk navigasi sidebar ke-6)
- **Default active platform:** `pc` (jadi pas pertama kali masuk section, store cards langsung menampilkan Steam/GOG/Epic)

---

## ✅ Verifikasi Setelah Re-apply

Setelah selesai, jalankan:
```bash
npx vite build
```
Harus sukses tanpa error. Lalu cek di browser:
- Scroll ke section 06 "BUY NOW" di paling bawah
- Lihat 3 kartu edisi (Standard/Physical/PS5)
- Klik tombol platform → store cards di bawah harus ikut berubah
- Klik "BUY NOW" di Steam → harus buka tab baru ke Steam

Kalau ada error, bandingkan file kamu dengan snippet di dokumen ini.
