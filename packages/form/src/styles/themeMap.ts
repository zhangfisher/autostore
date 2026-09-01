import { css } from 'lit';
/**
 * 将@shoelace-style/shoelace的样式映射到ThemePro
 */
export const themeMap = css`
:root,
:host,
.sl-theme-light {
    color-scheme: light;
    --sl-color-gray-50: var(--t-color-gray-0, hsl(0 0% 97.5%));
    --sl-color-gray-100: var(--t-color-gray-1, hsl(240 4.8% 95.9%));
    --sl-color-gray-200: var(--t-color-gray-2, hsl(240 5.9% 90%));
    --sl-color-gray-300: var(--t-color-gray-3, hsl(240 4.9% 83.9%));
    --sl-color-gray-400: var(--t-color-gray-4, hsl(240 5% 64.9%));
    --sl-color-gray-500: var(--t-color-gray-5, hsl(240 3.8% 46.1%));
    --sl-color-gray-600: var(--t-color-gray-6, hsl(240 5.2% 33.9%));
    --sl-color-gray-700: var(--t-color-gray-7, hsl(240 5.3% 26.1%));
    --sl-color-gray-800: var(--t-color-gray-8, hsl(240 3.7% 15.9%));
    --sl-color-gray-900: var(--t-color-gray-9, hsl(240 5.9% 10%));
    --sl-color-gray-950: var(--t-color-gray-10, hsl(240 7.3% 8%));

    --sl-color-red-50: var(--t-color-red-0, hsl(0 85.7% 97.3%));
    --sl-color-red-100: var(--t-color-red-1, hsl(0 93.3% 94.1%));
    --sl-color-red-200: var(--t-color-red-2, hsl(0 96.3% 89.4%));
    --sl-color-red-300: var(--t-color-red-3, hsl(0 93.5% 81.8%));
    --sl-color-red-400: var(--t-color-red-4, hsl(0 90.6% 70.8%));
    --sl-color-red-500: var(--t-color-red-5, hsl(0 84.2% 60.2%));
    --sl-color-red-600: var(--t-color-red-6, hsl(0 72.2% 50.6%));
    --sl-color-red-700: var(--t-color-red-7, hsl(0 73.7% 41.8%));
    --sl-color-red-800: var(--t-color-red-8, hsl(0 70% 35.3%));
    --sl-color-red-900: var(--t-color-red-9, hsl(0 62.8% 30.6%));
    --sl-color-red-950: var(--t-color-red-10, hsl(0 60% 19.6%));

    --sl-color-orange-50: var(--t-color-orange-0, hsl(33.3 100% 96.5%));
    --sl-color-orange-100: var(--t-color-orange-1, hsl(34.3 100% 91.8%));
    --sl-color-orange-200: var(--t-color-orange-2, hsl(32.1 97.7% 83.1%));
    --sl-color-orange-300: var(--t-color-orange-3, hsl(30.7 97.2% 72.4%));
    --sl-color-orange-400: var(--t-color-orange-4, hsl(27 96% 61%));
    --sl-color-orange-500: var(--t-color-orange-5, hsl(24.6 95% 53.1%));
    --sl-color-orange-600: var(--t-color-orange-6, hsl(20.5 90.2% 48.2%));
    --sl-color-orange-700: var(--t-color-orange-7, hsl(17.5 88.3% 40.4%));
    --sl-color-orange-800: var(--t-color-orange-8, hsl(15 79.1% 33.7%));
    --sl-color-orange-900: var(--t-color-orange-9, hsl(15.3 74.6% 27.8%));
    --sl-color-orange-950: var(--t-color-orange-10, hsl(15.2 69.1% 19%));

    --sl-color-amber-50: var(--t-color-amber-0, hsl(48 100% 96.1%));
    --sl-color-amber-100: var(--t-color-amber-1, hsl(48 96.5% 88.8%));
    --sl-color-amber-200: var(--t-color-amber-2, hsl(48 96.6% 76.7%));
    --sl-color-amber-300: var(--t-color-amber-3, hsl(45.9 96.7% 64.5%));
    --sl-color-amber-400: var(--t-color-amber-4, hsl(43.3 96.4% 56.3%));
    --sl-color-amber-500: var(--t-color-amber-5, hsl(37.7 92.1% 50.2%));
    --sl-color-amber-600: var(--t-color-amber-6, hsl(32.1 94.6% 43.7%));
    --sl-color-amber-700: var(--t-color-amber-7, hsl(26 90.5% 37.1%));
    --sl-color-amber-800: var(--t-color-amber-8, hsl(22.7 82.5% 31.4%));
    --sl-color-amber-900: var(--t-color-amber-9, hsl(21.7 77.8% 26.5%));
    --sl-color-amber-950: var(--t-color-amber-10, hsl(22.9 74.1% 16.7%));

    --sl-color-yellow-50: var(--t-color-yellow-0, hsl(54.5 91.7% 95.3%));
    --sl-color-yellow-100: var(--t-color-yellow-1, hsl(54.9 96.7% 88%));
    --sl-color-yellow-200: var(--t-color-yellow-2, hsl(52.8 98.3% 76.9%));
    --sl-color-yellow-300: var(--t-color-yellow-3, hsl(50.4 97.8% 63.5%));
    --sl-color-yellow-400: var(--t-color-yellow-4, hsl(47.9 95.8% 53.1%));
    --sl-color-yellow-500: var(--t-color-yellow-5, hsl(45.4 93.4% 47.5%));
    --sl-color-yellow-600: var(--t-color-yellow-6, hsl(40.6 96.1% 40.4%));
    --sl-color-yellow-700: var(--t-color-yellow-7, hsl(35.5 91.7% 32.9%));
    --sl-color-yellow-800: var(--t-color-yellow-8, hsl(31.8 81% 28.8%));
    --sl-color-yellow-900: var(--t-color-yellow-9, hsl(28.4 72.5% 25.7%));
    --sl-color-yellow-950: var(--t-color-yellow-10, hsl(33.1 69% 13.9%));

    --sl-color-lime-50: var(--t-color-lime-0, hsl(78.3 92% 95.1%));
    --sl-color-lime-100: var(--t-color-lime-1, hsl(79.6 89.1% 89.2%));
    --sl-color-lime-200: var(--t-color-lime-2, hsl(80.9 88.5% 79.6%));
    --sl-color-lime-300: var(--t-color-lime-3, hsl(82 84.5% 67.1%));
    --sl-color-lime-400: var(--t-color-lime-4, hsl(82.7 78% 55.5%));
    --sl-color-lime-500: var(--t-color-lime-5, hsl(83.7 80.5% 44.3%));
    --sl-color-lime-600: var(--t-color-lime-6, hsl(84.8 85.2% 34.5%));
    --sl-color-lime-700: var(--t-color-lime-7, hsl(85.9 78.4% 27.3%));
    --sl-color-lime-800: var(--t-color-lime-8, hsl(86.3 69% 22.7%));
    --sl-color-lime-900: var(--t-color-lime-9, hsl(87.6 61.2% 20.2%));
    --sl-color-lime-950: var(--t-color-lime-10, hsl(86.5 60.6% 13.9%));

    --sl-color-green-50: var(--t-color-green-0, hsl(138.5 76.5% 96.7%));
    --sl-color-green-100: var(--t-color-green-1, hsl(140.6 84.2% 92.5%));
    --sl-color-green-200: var(--t-color-green-2, hsl(141 78.9% 85.1%));
    --sl-color-green-300: var(--t-color-green-3, hsl(141.7 76.6% 73.1%));
    --sl-color-green-400: var(--t-color-green-4, hsl(141.9 69.2% 58%));
    --sl-color-green-500: var(--t-color-green-5, hsl(142.1 70.6% 45.3%));
    --sl-color-green-600: var(--t-color-green-6, hsl(142.1 76.2% 36.3%));
    --sl-color-green-700: var(--t-color-green-7, hsl(142.4 71.8% 29.2%));
    --sl-color-green-800: var(--t-color-green-8, hsl(142.8 64.2% 24.1%));
    --sl-color-green-900: var(--t-color-green-9, hsl(143.8 61.2% 20.2%));
    --sl-color-green-950: var(--t-color-green-10, hsl(144.3 60.7% 12%));

    --sl-color-emerald-50: var(--t-color-emerald-0, hsl(151.8 81% 95.9%));
    --sl-color-emerald-100: var(--t-color-emerald-1, hsl(149.3 80.4% 90%));
    --sl-color-emerald-200: var(--t-color-emerald-2, hsl(152.4 76% 80.4%));
    --sl-color-emerald-300: var(--t-color-emerald-3, hsl(156.2 71.6% 66.9%));
    --sl-color-emerald-400: var(--t-color-emerald-4, hsl(158.1 64.4% 51.6%));
    --sl-color-emerald-500: var(--t-color-emerald-5, hsl(160.1 84.1% 39.4%));
    --sl-color-emerald-600: var(--t-color-emerald-6, hsl(161.4 93.5% 30.4%));
    --sl-color-emerald-700: var(--t-color-emerald-7, hsl(162.9 93.5% 24.3%));
    --sl-color-emerald-800: var(--t-color-emerald-8, hsl(163.1 88.1% 19.8%));
    --sl-color-emerald-900: var(--t-color-emerald-9, hsl(164.2 85.7% 16.5%));
    --sl-color-emerald-950: var(--t-color-emerald-10, hsl(164.3 87.5% 9.4%));

    --sl-color-teal-50: var(--t-color-teal-0, hsl(166.2 76.5% 96.7%));
    --sl-color-teal-100: var(--t-color-teal-1, hsl(167.2 85.5% 89.2%));
    --sl-color-teal-200: var(--t-color-teal-2, hsl(168.4 83.8% 78.2%));
    --sl-color-teal-300: var(--t-color-teal-3, hsl(170.6 76.9% 64.3%));
    --sl-color-teal-400: var(--t-color-teal-4, hsl(172.5 66% 50.4%));
    --sl-color-teal-500: var(--t-color-teal-5, hsl(173.4 80.4% 40%));
    --sl-color-teal-600: var(--t-color-teal-6, hsl(174.7 83.9% 31.6%));
    --sl-color-teal-700: var(--t-color-teal-7, hsl(175.3 77.4% 26.1%));
    --sl-color-teal-800: var(--t-color-teal-8, hsl(176.1 69.4% 21.8%));
    --sl-color-teal-900: var(--t-color-teal-9, hsl(175.9 60.8% 19%));
    --sl-color-teal-950: var(--t-color-teal-10, hsl(176.5 58.6% 11.4%));

    --sl-color-cyan-50: var(--t-color-cyan-0, hsl(183.2 100% 96.3%));
    --sl-color-cyan-100: var(--t-color-cyan-1, hsl(185.1 95.9% 90.4%));
    --sl-color-cyan-200: var(--t-color-cyan-2, hsl(186.2 93.5% 81.8%));
    --sl-color-cyan-300: var(--t-color-cyan-3, hsl(187 92.4% 69%));
    --sl-color-cyan-400: var(--t-color-cyan-4, hsl(187.9 85.7% 53.3%));
    --sl-color-cyan-500: var(--t-color-cyan-5, hsl(188.7 94.5% 42.7%));
    --sl-color-cyan-600: var(--t-color-cyan-6, hsl(191.6 91.4% 36.5%));
    --sl-color-cyan-700: var(--t-color-cyan-7, hsl(192.9 82.3% 31%));
    --sl-color-cyan-800: var(--t-color-cyan-8, hsl(194.4 69.6% 27.1%));
    --sl-color-cyan-900: var(--t-color-cyan-9, hsl(196.4 63.6% 23.7%));
    --sl-color-cyan-950: var(--t-color-cyan-10, hsl(196.8 61% 16.1%));

    --sl-color-sky-50: var(--t-color-sky-0, hsl(204 100% 97.1%));
    --sl-color-sky-100: var(--t-color-sky-1, hsl(204 93.8% 93.7%));
    --sl-color-sky-200: var(--t-color-sky-2, hsl(200.6 94.4% 86.1%));
    --sl-color-sky-300: var(--t-color-sky-3, hsl(199.4 95.5% 73.9%));
    --sl-color-sky-400: var(--t-color-sky-4, hsl(198.4 93.2% 59.6%));
    --sl-color-sky-500: var(--t-color-sky-5, hsl(198.6 88.7% 48.4%));
    --sl-color-sky-600: var(--t-color-sky-6, hsl(200.4 98% 39.4%));
    --sl-color-sky-700: var(--t-color-sky-7, hsl(201.3 96.3% 32.2%));
    --sl-color-sky-800: var(--t-color-sky-8, hsl(201 90% 27.5%));
    --sl-color-sky-900: var(--t-color-sky-9, hsl(202 80.3% 23.9%));
    --sl-color-sky-950: var(--t-color-sky-10, hsl(202.3 73.8% 16.5%));

    --sl-color-blue-50: var(--t-color-blue-0, hsl(213.8 100% 96.9%));
    --sl-color-blue-100: var(--t-color-blue-1, hsl(214.3 94.6% 92.7%));
    --sl-color-blue-200: var(--t-color-blue-2, hsl(213.3 96.9% 87.3%));
    --sl-color-blue-300: var(--t-color-blue-3, hsl(211.7 96.4% 78.4%));
    --sl-color-blue-400: var(--t-color-blue-4, hsl(213.1 93.9% 67.8%));
    --sl-color-blue-500: var(--t-color-blue-5, hsl(217.2 91.2% 59.8%));
    --sl-color-blue-600: var(--t-color-blue-6, hsl(221.2 83.2% 53.3%));
    --sl-color-blue-700: var(--t-color-blue-7, hsl(224.3 76.3% 48%));
    --sl-color-blue-800: var(--t-color-blue-8, hsl(225.9 70.7% 40.2%));
    --sl-color-blue-900: var(--t-color-blue-9, hsl(224.4 64.3% 32.9%));
    --sl-color-blue-950: var(--t-color-blue-10, hsl(226.2 55.3% 18.4%));

    --sl-color-indigo-50: var(--t-color-indigo-0, hsl(225.9 100% 96.7%));
    --sl-color-indigo-100: var(--t-color-indigo-1, hsl(226.5 100% 93.9%));
    --sl-color-indigo-200: var(--t-color-indigo-2, hsl(228 96.5% 88.8%));
    --sl-color-indigo-300: var(--t-color-indigo-3, hsl(229.7 93.5% 81.8%));
    --sl-color-indigo-400: var(--t-color-indigo-4, hsl(234.5 89.5% 73.9%));
    --sl-color-indigo-500: var(--t-color-indigo-5, hsl(238.7 83.5% 66.7%));
    --sl-color-indigo-600: var(--t-color-indigo-6, hsl(243.4 75.4% 58.6%));
    --sl-color-indigo-700: var(--t-color-indigo-7, hsl(244.5 57.9% 50.6%));
    --sl-color-indigo-800: var(--t-color-indigo-8, hsl(243.7 54.5% 41.4%));
    --sl-color-indigo-900: var(--t-color-indigo-9, hsl(242.2 47.4% 34.3%));
    --sl-color-indigo-950: var(--t-color-indigo-10, hsl(243.5 43.6% 22.9%));

    --sl-color-violet-50: var(--t-color-violet-0, hsl(250 100% 97.6%));
    --sl-color-violet-100: var(--t-color-violet-1, hsl(251.4 91.3% 95.5%));
    --sl-color-violet-200: var(--t-color-violet-2, hsl(250.5 95.2% 91.8%));
    --sl-color-violet-300: var(--t-color-violet-3, hsl(252.5 94.7% 85.1%));
    --sl-color-violet-400: var(--t-color-violet-4, hsl(255.1 91.7% 76.3%));
    --sl-color-violet-500: var(--t-color-violet-5, hsl(258.3 89.5% 66.3%));
    --sl-color-violet-600: var(--t-color-violet-6, hsl(262.1 83.3% 57.8%));
    --sl-color-violet-700: var(--t-color-violet-7, hsl(263.4 70% 50.4%));
    --sl-color-violet-800: var(--t-color-violet-8, hsl(263.4 69.3% 42.2%));
    --sl-color-violet-900: var(--t-color-violet-9, hsl(263.5 67.4% 34.9%));
    --sl-color-violet-950: var(--t-color-violet-10, hsl(265.1 61.5% 21.4%));

    --sl-color-purple-50: var(--t-color-purple-0, hsl(270 100% 98%));
    --sl-color-purple-100: var(--t-color-purple-1, hsl(268.7 100% 95.5%));
    --sl-color-purple-200: var(--t-color-purple-2, hsl(268.6 100% 91.8%));
    --sl-color-purple-300: var(--t-color-purple-3, hsl(269.2 97.4% 85.1%));
    --sl-color-purple-400: var(--t-color-purple-4, hsl(270 95.2% 75.3%));
    --sl-color-purple-500: var(--t-color-purple-5, hsl(270.7 91% 65.1%));
    --sl-color-purple-600: var(--t-color-purple-6, hsl(271.5 81.3% 55.9%));
    --sl-color-purple-700: var(--t-color-purple-7, hsl(272.1 71.7% 47.1%));
    --sl-color-purple-800: var(--t-color-purple-8, hsl(272.9 67.2% 39.4%));
    --sl-color-purple-900: var(--t-color-purple-9, hsl(273.6 65.6% 32%));
    --sl-color-purple-950: var(--t-color-purple-10, hsl(276 59.5% 16.5%));

    --sl-color-fuchsia-50: var(--t-color-fuchsia-0, hsl(289.1 100% 97.8%));
    --sl-color-fuchsia-100: var(--t-color-fuchsia-1, hsl(287 100% 95.5%));
    --sl-color-fuchsia-200: var(--t-color-fuchsia-2, hsl(288.3 95.8% 90.6%));
    --sl-color-fuchsia-300: var(--t-color-fuchsia-3, hsl(291.1 93.1% 82.9%));
    --sl-color-fuchsia-400: var(--t-color-fuchsia-4, hsl(292 91.4% 72.5%));
    --sl-color-fuchsia-500: var(--t-color-fuchsia-5, hsl(292.2 84.1% 60.6%));
    --sl-color-fuchsia-600: var(--t-color-fuchsia-6, hsl(293.4 69.5% 48.8%));
    --sl-color-fuchsia-700: var(--t-color-fuchsia-7, hsl(294.7 72.4% 39.8%));
    --sl-color-fuchsia-800: var(--t-color-fuchsia-8, hsl(295.4 70.2% 32.9%));
    --sl-color-fuchsia-900: var(--t-color-fuchsia-9, hsl(296.7 63.6% 28%));
    --sl-color-fuchsia-950: var(--t-color-fuchsia-10, hsl(297.1 56.8% 14.5%));

    --sl-color-pink-50: var(--t-color-pink-0, hsl(327.3 73.3% 97.1%));
    --sl-color-pink-100: var(--t-color-pink-1, hsl(325.7 77.8% 94.7%));
    --sl-color-pink-200: var(--t-color-pink-2, hsl(325.9 84.6% 89.8%));
    --sl-color-pink-300: var(--t-color-pink-3, hsl(327.4 87.1% 81.8%));
    --sl-color-pink-400: var(--t-color-pink-4, hsl(328.6 85.5% 70.2%));
    --sl-color-pink-500: var(--t-color-pink-5, hsl(330.4 81.2% 60.4%));
    --sl-color-pink-600: var(--t-color-pink-6, hsl(333.3 71.4% 50.6%));
    --sl-color-pink-700: var(--t-color-pink-7, hsl(335.1 77.6% 42%));
    --sl-color-pink-800: var(--t-color-pink-8, hsl(335.8 74.4% 35.3%));
    --sl-color-pink-900: var(--t-color-pink-9, hsl(335.9 69% 30.4%));
    --sl-color-pink-950: var(--t-color-pink-10, hsl(336.2 65.4% 15.9%));

    --sl-color-rose-50: var(--t-color-rose-0, hsl(355.7 100% 97.3%));
    --sl-color-rose-100: var(--t-color-rose-1, hsl(355.6 100% 94.7%));
    --sl-color-rose-200: var(--t-color-rose-2, hsl(352.7 96.1% 90%));
    --sl-color-rose-300: var(--t-color-rose-3, hsl(352.6 95.7% 81.8%));
    --sl-color-rose-400: var(--t-color-rose-4, hsl(351.3 94.5% 71.4%));
    --sl-color-rose-500: var(--t-color-rose-5, hsl(349.7 89.2% 60.2%));
    --sl-color-rose-600: var(--t-color-rose-6, hsl(346.8 77.2% 49.8%));
    --sl-color-rose-700: var(--t-color-rose-7, hsl(345.3 82.7% 40.8%));
    --sl-color-rose-800: var(--t-color-rose-8, hsl(343.4 79.7% 34.7%));
    --sl-color-rose-900: var(--t-color-rose-9, hsl(341.5 75.5% 30.4%));
    --sl-color-rose-950: var(--t-color-rose-10, hsl(341.3 70.1% 17.1%));

    --sl-color-primary-50: var(--t-color-primary-0, var(--sl-color-sky-50));
    --sl-color-primary-100: var(--t-color-primary-1, var(--sl-color-sky-100));
    --sl-color-primary-200: var(--t-color-primary-2, var(--sl-color-sky-200));
    --sl-color-primary-300: var(--t-color-primary-3, var(--sl-color-sky-300));
    --sl-color-primary-400: var(--t-color-primary-4, var(--sl-color-sky-400));
    --sl-color-primary-500: var(--t-color-primary-5, var(--sl-color-sky-500));
    --sl-color-primary-600: var(--t-color-primary-6, var(--sl-color-sky-600));
    --sl-color-primary-700: var(--t-color-primary-7, var(--sl-color-sky-700));
    --sl-color-primary-800: var(--t-color-primary-8, var(--sl-color-sky-800));
    --sl-color-primary-900: var(--t-color-primary-9, var(--sl-color-sky-900));
    --sl-color-primary-950: var(--t-color-primary-10, var(--sl-color-sky-950));

    --sl-color-success-50: var(--t-color-success-0, var(--sl-color-green-50));
    --sl-color-success-100: var(--t-color-success-1, var(--sl-color-green-100));
    --sl-color-success-200: var(--t-color-success-2, var(--sl-color-green-200));
    --sl-color-success-300: var(--t-color-success-3, var(--sl-color-green-300));
    --sl-color-success-400: var(--t-color-success-4, var(--sl-color-green-400));
    --sl-color-success-500: var(--t-color-success-5, var(--sl-color-green-500));
    --sl-color-success-600: var(--t-color-success-6, var(--sl-color-green-600));
    --sl-color-success-700: var(--t-color-success-7, var(--sl-color-green-700));
    --sl-color-success-800: var(--t-color-success-8, var(--sl-color-green-800));
    --sl-color-success-900: var(--t-color-success-9, var(--sl-color-green-900));
    --sl-color-success-950: var(--t-color-success-10, var(--sl-color-green-950));

    --sl-color-warning-50: var(--sl-color-amber-50);
    --sl-color-warning-100: var(--t-color-warning-1, var(--sl-color-amber-100));
    --sl-color-warning-200: var(--t-color-warning-2, var(--sl-color-amber-200));
    --sl-color-warning-300: var(--t-color-warning-3, var(--sl-color-amber-300));
    --sl-color-warning-400: var(--t-color-warning-4, var(--sl-color-amber-400));
    --sl-color-warning-500: var(--t-color-warning-5, var(--sl-color-amber-500));
    --sl-color-warning-600: var(--t-color-warning-6, var(--sl-color-amber-600));
    --sl-color-warning-700: var(--t-color-warning-7, var(--sl-color-amber-700));
    --sl-color-warning-800: var(--t-color-warning-8, var(--sl-color-amber-800));
    --sl-color-warning-900: var(--t-color-warning-9, var(--sl-color-amber-900));
    --sl-color-warning-950: var(--sl-color-amber-950);

    --sl-color-danger-50: var(--t-color-danger-0, var(--sl-color-red-50));
    --sl-color-danger-100: var(--t-color-danger-1, var(--sl-color-red-100));
    --sl-color-danger-200: var(--t-color-danger-2, var(--sl-color-red-200));
    --sl-color-danger-300: var(--t-color-danger-3, var(--sl-color-red-300));
    --sl-color-danger-400: var(--t-color-danger-4, var(--sl-color-red-400));
    --sl-color-danger-500: var(--t-color-danger-5, var(--sl-color-red-500));
    --sl-color-danger-600: var(--t-color-danger-6, var(--sl-color-red-600));
    --sl-color-danger-700: var(--t-color-danger-7, var(--sl-color-red-700));
    --sl-color-danger-800: var(--t-color-danger-8, var(--sl-color-red-800));
    --sl-color-danger-900: var(--t-color-danger-9, var(--sl-color-red-900));
    --sl-color-danger-950: var(--t-color-danger-10, var(--sl-color-red-950));

    --sl-color-neutral-50: var(--t-color-theme-0, var(--sl-color-gray-50));
    --sl-color-neutral-100: var(--t-color-theme-1, var(--sl-color-gray-100));
    --sl-color-neutral-200: var(--t-color-theme-2, var(--sl-color-gray-200));
    --sl-color-neutral-300: var(--t-color-theme-3, var(--sl-color-gray-300));
    --sl-color-neutral-400: var(--t-color-theme-4, var(--sl-color-gray-400));
    --sl-color-neutral-500: var(--t-color-theme-5, var(--sl-color-gray-500));
    --sl-color-neutral-600: var(--t-color-theme-6, var(--sl-color-gray-600));
    --sl-color-neutral-700: var(--t-color-theme-7, var(--sl-color-gray-700));
    --sl-color-neutral-800: var(--t-color-theme-8, var(--sl-color-gray-800));
    --sl-color-neutral-900: var(--t-color-theme-9, var(--sl-color-gray-900));
    --sl-color-neutral-950: var(--t-color-theme-10, var(--sl-color-gray-950));

    --sl-color-neutral-0: var(--t-color-theme-0, hsl(0, 0%, 100%));
    --sl-color-neutral-1000: var(--t-color-theme-10, hsl(0, 0%, 0%));

    --sl-border-radius-small: var(--t-border-radius-small, 0.1875rem);
    --sl-border-radius-medium: var(--t-border-radius-medium, 0.25rem);
    --sl-border-radius-large: var(--t-border-radius-large, 0.5rem);
    --sl-border-radius-x-large: var(--t-border-radius-x-large, 1rem);

    --sl-border-radius-circle: var(--t-border-radius-circle, 50%);
    --sl-border-radius-pill: var(--t-border-radius-pill, 9999px);

    --sl-shadow-x-small: var(--t-shadow-x-small, 0 1px 2px hsl(240 3.8% 46.1% / 6%));
    --sl-shadow-small: var(--t-shadow-small, 0 1px 2px hsl(240 3.8% 46.1% / 12%));
    --sl-shadow-medium: var(--t-shadow-medium, 0 2px 4px hsl(240 3.8% 46.1% / 12%));
    --sl-shadow-large: var(--t-shadow-large, 0 2px 8px hsl(240 3.8% 46.1% / 12%));
    --sl-shadow-x-large: var(--t-shadow-x-large, 0 4px 16px hsl(240 3.8% 46.1% / 12%));

    --sl-spacing-3x-small: 0.125rem;
    --sl-spacing-2x-small: 0.25rem;
    --sl-spacing-x-small: var(--t-spacing-x-small, 0.5rem);
    --sl-spacing-small: var(--t-spacing-small, 0.75rem);
    --sl-spacing-medium: var(--t-spacing-medium, 1rem);
    --sl-spacing-large: var(--t-spacing-large, 1.25rem);
    --sl-spacing-x-large: var(--t-spacing-x-large, 1.75rem);
    --sl-spacing-2x-large: 2.25rem;
    --sl-spacing-3x-large: 3rem;
    --sl-spacing-4x-large: 4.5rem;

    --sl-transition-x-slow: 1000ms;
    --sl-transition-slow: 500ms;
    --sl-transition-medium: 250ms;
    --sl-transition-fast: 150ms;
    --sl-transition-x-fast: 50ms;

    --sl-font-mono: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
    --sl-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
    --sl-font-serif: Georgia, "Times New Roman", serif;

    --sl-font-size-2x-small: 0.625rem;
    --sl-font-size-x-small: var(--t-font-size-x-small, 0.75rem);
    --sl-font-size-small: var(--t-font-size-small, 0.875rem);
    --sl-font-size-medium: var(--t-font-size-medium, 1rem);
    --sl-font-size-large: var(--t-font-size-large, 1.25rem);
    --sl-font-size-x-large: var(--t-font-size-x-large, 1.5rem);
    --sl-font-size-2x-large: 2.25rem;
    --sl-font-size-3x-large: 3rem;
    --sl-font-size-4x-large: 4.5rem;

    --sl-font-weight-light: var(--t-font-weight-small, 300);
    --sl-font-weight-normal: var(--t-font-weight-medium, 400);
    --sl-font-weight-semibold: var(--t-font-weight-large, 500);
    --sl-font-weight-bold: var(--t-font-weight-x-large, 700);

    --sl-letter-spacing-denser: -0.03em;
    --sl-letter-spacing-dense: -0.015em;
    --sl-letter-spacing-normal: normal;
    --sl-letter-spacing-loose: 0.075em;
    --sl-letter-spacing-looser: 0.15em;

    --sl-line-height-denser: var(--sl-line-height-x-small);
    --sl-line-height-dense: var(--sl-line-height-small);
    --sl-line-height-normal: var(--t-line-height-medium, 1.8);
    --sl-line-height-loose: var(--sl-line-height-large);
    --sl-line-height-looser: var(--sl-line-height-x-large);

    --sl-focus-ring-color: var(--sl-color-primary-600);
    --sl-focus-ring-style: solid;
    --sl-focus-ring-width: 3px;
    --sl-focus-ring: var(--sl-focus-ring-style) var(--sl-focus-ring-width) var(--sl-focus-ring-color);
    --sl-focus-ring-offset: 1px;

    --sl-button-font-size-small: var(--sl-font-size-x-small);
    --sl-button-font-size-medium: var(--sl-font-size-small);
    --sl-button-font-size-large: var(--sl-font-size-medium);

    --sl-input-height-x-small: 1.525rem;
    --sl-input-height-small: 1.875rem;
    --sl-input-height-medium: 2.5rem;
    --sl-input-height-large: 3.125rem;
    --sl-input-height-x-large: 3.875rem;

    --sl-input-background-color: var(--auto-input-bgcolor);
    --sl-input-background-color-hover: var(--auto-input-bgcolor);
    --sl-input-background-color-focus: var(--sl-input-background-color);
    --sl-input-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-border-color: var(--auto-border-color);
    --sl-input-border-color-hover: var(--sl-color-neutral-400);
    --sl-input-border-color-focus: var(--sl-color-primary-500);
    --sl-input-border-color-disabled: var(--sl-color-neutral-300);
    --sl-input-border-width: 1px;
    --sl-input-required-content: "*";
    --sl-input-required-content-offset: -2px;
    --sl-input-required-content-color: var(--sl-input-label-color);

    --sl-input-border-radius-small: var(--sl-border-radius-medium);
    --sl-input-border-radius-medium: var(--sl-border-radius-medium);
    --sl-input-border-radius-large: var(--sl-border-radius-medium);

    --sl-input-font-family: var(--sl-font-sans);
    --sl-input-font-weight: var(--sl-font-weight-normal);
    --sl-input-font-size-small: var(--sl-font-size-small);
    --sl-input-font-size-medium: var(--sl-font-size-medium);
    --sl-input-font-size-large: var(--sl-font-size-large);
    --sl-input-letter-spacing: var(--sl-letter-spacing-normal);

    --sl-input-color: var(--auto-color);
    --sl-input-color-hover: var(--auto-primary-color);
    --sl-input-color-focus: var(--auto-primary-color);
    --sl-input-color-disabled: var(--auto-disable-color);
    --sl-input-icon-color: var(--auto-color);
    --sl-input-icon-color-hover: var(--auto-primary-color);
    --sl-input-icon-color-focus: var(--auto-primary-color);
    --sl-input-placeholder-color: var(--auto-theme-color);
    --sl-input-placeholder-color-disabled: var(--sl-color-neutral-400);
    --sl-input-spacing-small: var(--sl-spacing-small);
    --sl-input-spacing-medium: var(--sl-spacing-medium);
    --sl-input-spacing-large: var(--sl-spacing-large);

    --sl-input-focus-ring-color: hsl(198.6 88.7% 48.4% / 40%);
    --sl-input-focus-ring-offset: 0;

    --sl-input-filled-background-color: var(--sl-color-neutral-100);
    --sl-input-filled-background-color-hover: var(--auto-primary-color);
    --sl-input-filled-background-color-focus: var(--sl-color-neutral-100);
    --sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);
    --sl-input-filled-color: var(--sl-color-neutral-800);
    --sl-input-filled-color-hover: var(--sl-color-neutral-800);
    --sl-input-filled-color-focus: var(--sl-color-neutral-700);
    --sl-input-filled-color-disabled: var(--sl-color-neutral-800);

    --sl-input-label-font-size-small: var(--sl-font-size-small);
    --sl-input-label-font-size-medium: var(--sl-font-size-medium);
    --sl-input-label-font-size-large: var(--sl-font-size-large);
    --sl-input-label-color: inherit;

    --sl-input-help-text-font-size-small: var(--sl-font-size-x-small);
    --sl-input-help-text-font-size-medium: var(--sl-font-size-small);
    --sl-input-help-text-font-size-large: var(--sl-font-size-medium);
    --sl-input-help-text-color: var(--sl-color-neutral-500);

    --sl-toggle-size-small: 0.875rem;
    --sl-toggle-size-medium: 1.125rem;
    --sl-toggle-size-large: 1.375rem;

    --sl-overlay-background-color: hsl(240 3.8% 46.1% / 33%);

    --sl-panel-background-color: var(--auto-panel-bgcolor);
    --sl-panel-border-color: var(--auto-border-color);
    --sl-panel-border-width: 1px;

    --sl-tooltip-border-radius: var(--auto-border-radius);
    --sl-tooltip-background-color: var(--auto-panel-bgcolor);
    --sl-tooltip-color: var(--auto-color);
    --sl-tooltip-font-family: var(--sl-font-sans);
    --sl-tooltip-font-weight: var(--sl-font-weight-normal);
    --sl-tooltip-font-size: var(--sl-font-size-small);
    --sl-tooltip-line-height: var(--sl-line-height-dense);
    --sl-tooltip-padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-small);
    --sl-tooltip-arrow-size: 6px;

    --sl-z-index-drawer: 700;
    --sl-z-index-dialog: 800;
    --sl-z-index-dropdown: 900;
    --sl-z-index-toast: 950;
    --sl-z-index-tooltip: 1000;
}

@supports (scrollbar-gutter: stable) {
    .sl-scroll-lock {
        scrollbar-gutter: var(--sl-scroll-lock-gutter) !important;
    }

    .sl-scroll-lock body {
        overflow: hidden !important;
    }
}

@supports not (scrollbar-gutter: stable) {
    .sl-scroll-lock body {
        padding-right: var(--sl-scroll-lock-size) !important;
        overflow: hidden !important;
    }
}

.sl-toast-stack {
    position: fixed;
    top: 0;
    inset-inline-end: 0;
    z-index: var(--sl-z-index-toast);
    width: 28rem;
    max-width: 100%;
    max-height: 100%;
    overflow: auto;
}

.sl-toast-stack sl-alert {
    margin: var(--sl-spacing-medium);
}

.sl-toast-stack sl-alert::part(base) {
    box-shadow: var(--sl-shadow-large);
}
`