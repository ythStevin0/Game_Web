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
				url: 'https://www.gog.com/en/game/a_space_for_the_unbound',
				tag: '-15%',
			},
			{
				id: 'epic',
				label: 'EPIC GAMES STORE',
				logo: '/assets/a_space_unbound/other/Epic_Games_logo.svg.png',
				url: 'https://store.epicgames.com/p/a-space-for-the-unbound-57e666?lang=en-US',
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
				url: 'https://www.playstation.com/en-us/games/a-space-for-the-unbound/',
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
				url: 'https://www.playstation.com/en-us/games/a-space-for-the-unbound/',
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
				url: 'https://www.nintendo.com/us/store/products/a-space-for-the-unbound-switch/',
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
				url: 'https://www.xbox.com/en-us/games/store/a-space-for-the-unbound/9pg2rz8gvzcj?msockid=3a43a3ccd8536d1c16a4b509d98c6c73',
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
				url: 'https://www.xbox.com/en-us/games/store/a-space-for-the-unbound/9pg2rz8gvzcj?msockid=3a43a3ccd8536d1c16a4b509d98c6c73',
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
				url: 'https://apps.apple.com/us/app/a-space-for-the-unbound/id6544796348',
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
