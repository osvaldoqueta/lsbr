#!/usr/bin/env node
/**
 * FOX LIBRAS — Static Tailwind CSS Compiler (Zero External CDN Dependency)
 * Scans index.html, brand-guide.html, and assets/js/script.js and generates
 * a complete, production-ready static CSS bundle (assets/css/tailwind.min.css)
 * so the site never depends on cdn.tailwindcss.com in production (Vercel) or offline.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const FILES_TO_SCAN = [
    path.join(ROOT, 'index.html'),
    path.join(ROOT, 'brand-guide.html'),
    path.join(ROOT, 'assets', 'js', 'script.js')
];

// Named color palette used across the project
const COLOR_PALETTE = {
    'transparent': 'transparent',
    'current': 'currentColor',
    'black': '#000000',
    'white': '#ffffff',
    'navy': '#061A33',
    'navy-secondary': '#0B2140',
    'navy-surface': '#102B4D',
    'navy-deep': '#041225',
    'cyan': '#08B9F2',
    'cyan-light': '#35C7F5',
    'orange': '#FF7800',
    'orange-hover': '#FF8A1F',
    'light': '#F4F6FA',
    'light-alt': '#EEF2F7',
    'light-border': '#DCE3EC',
    'slateText': '#52627A',
    'brand-navy': '#0B2D5B',
    'brand-deep': '#071B36',
    'brand-orange': '#FF7A00',
    'brand-cyan': '#00B4E6',
    'brand-card': '#0F172A',
    'brand-slate': '#1E293B',
    'brand-light': '#F2F5F8',
    // Tailwind standard colors
    'slate-50': '#f8fafc', 'slate-100': '#f1f5f9', 'slate-200': '#e2e8f0', 'slate-300': '#cbd5e1',
    'slate-400': '#94a3b8', 'slate-500': '#64748b', 'slate-600': '#475569', 'slate-700': '#334155',
    'slate-800': '#1e293b', 'slate-900': '#0f172a', 'slate-950': '#020617',
    'gray-100': '#f3f4f6', 'gray-200': '#e5e7eb', 'gray-300': '#d1d5db', 'gray-400': '#9ca3af',
    'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151', 'gray-800': '#1f2937', 'gray-900': '#111827',
    'sky-300': '#7dd3fc', 'sky-400': '#38bdf8', 'sky-500': '#0ea5e9', 'sky-600': '#0284c7', 'sky-900': '#0c4a6e', 'sky-950': '#082f49',
    'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb', 'blue-900': '#1e3a8a',
    'emerald-300': '#6ee7b7', 'emerald-400': '#34d399', 'emerald-500': '#10b981', 'emerald-600': '#059669', 'emerald-900': '#064e3b', 'emerald-950': '#022c22',
    'green-400': '#4ade80', 'green-500': '#22c55e', 'green-600': '#16a34a',
    'amber-300': '#fcd34d', 'amber-400': '#fbbf24', 'amber-500': '#f59e0b', 'amber-600': '#d97706', 'amber-900': '#78350f', 'amber-950': '#451a03',
    'yellow-400': '#facc15', 'yellow-500': '#eab308',
    'orange-400': '#fb923c', 'orange-500': '#f97316', 'orange-600': '#ea580c',
    'red-300': '#fca5a5', 'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626', 'red-900': '#7f1d1d', 'red-950': '#450a0a',
    'rose-300': '#fda4af', 'rose-400': '#fb7185', 'rose-500': '#f43f5e', 'rose-600': '#e11d48', 'rose-950': '#4c0519'
};

const SPACING = {
    '0': '0px',
    'px': '1px',
    '0.5': '0.125rem',
    '1': '0.25rem',
    '1.5': '0.375rem',
    '2': '0.5rem',
    '2.5': '0.625rem',
    '3': '0.75rem',
    '3.5': '0.875rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
    '11': '2.75rem',
    '12': '3rem',
    '14': '3.5rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '28': '7rem',
    '32': '8rem',
    '36': '9rem',
    '40': '10rem',
    '44': '11rem',
    '48': '12rem',
    '52': '13rem',
    '56': '14rem',
    '60': '15rem',
    '64': '16rem',
    '72': '18rem',
    '80': '20rem',
    '96': '24rem'
};

function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function resolveColor(raw) {
    if (!raw) return null;
    let colorPart = raw;
    let alpha = null;
    if (raw.includes('/')) {
        const parts = raw.split('/');
        colorPart = parts[0];
        const alphaNum = parseFloat(parts[1]);
        if (!isNaN(alphaNum)) alpha = alphaNum / 100;
    }

    let hex = null;
    if (colorPart.startsWith('[') && colorPart.endsWith(']')) {
        hex = colorPart.slice(1, -1);
    } else if (COLOR_PALETTE[colorPart]) {
        hex = COLOR_PALETTE[colorPart];
    }

    if (!hex) return null;
    if (alpha !== null && hex.startsWith('#')) {
        return hexToRgba(hex, alpha);
    }
    return hex;
}

function resolveSize(val) {
    if (SPACING[val] !== undefined) return SPACING[val];
    if (val === 'full') return '100%';
    if (val === 'screen') return '100vh';
    if (val === 'auto') return 'auto';
    if (val === 'min') return 'min-content';
    if (val === 'max') return 'max-content';
    if (val === 'fit') return 'fit-content';
    if (val === '1/2') return '50%';
    if (val === '1/3') return '33.333333%';
    if (val === '2/3') return '66.666667%';
    if (val === '1/4') return '25%';
    if (val === '3/4') return '75%';
    if (val.startsWith('[') && val.endsWith(']')) {
        return val.slice(1, -1).replace(/_/g, ' ');
    }
    return null;
}

function escapeSelector(cls) {
    return cls.replace(/([^a-zA-Z0-9_-])/g, '\\$1');
}

function generateRuleForBaseClass(base) {
    // Handle important prefix
    let important = false;
    if (base.startsWith('!')) {
        important = true;
        base = base.slice(1);
    }
    const imp = important ? ' !important' : '';

    // Static exact utilities
    const exactMap = {
        'hidden': `display: none${imp};`,
        'block': `display: block${imp};`,
        'inline-block': `display: inline-block${imp};`,
        'inline': `display: inline${imp};`,
        'flex': `display: flex${imp};`,
        'inline-flex': `display: inline-flex${imp};`,
        'grid': `display: grid${imp};`,
        'table': `display: table${imp};`,
        'flex-row': `flex-direction: row${imp};`,
        'flex-col': `flex-direction: column${imp};`,
        'flex-wrap': `flex-wrap: wrap${imp};`,
        'flex-nowrap': `flex-wrap: nowrap${imp};`,
        'flex-1': `flex: 1 1 0%${imp};`,
        'flex-auto': `flex: 1 1 auto${imp};`,
        'flex-none': `flex: none${imp};`,
        'shrink-0': `flex-shrink: 0${imp};`,
        'shrink': `flex-shrink: 1${imp};`,
        'grow': `flex-grow: 1${imp};`,
        'flex-grow': `flex-grow: 1${imp};`,
        'grow-0': `flex-grow: 0${imp};`,
        'border-collapse': `border-collapse: collapse${imp};`,
        'bg-clip-text': `-webkit-background-clip: text; background-clip: text${imp};`,
        'mix-blend-multiply': `mix-blend-mode: multiply${imp};`,
        'object-left-bottom': `object-position: left bottom${imp};`,
        'grayscale': `filter: grayscale(100%)${imp};`,
        'grayscale-0': `filter: grayscale(0)${imp};`,
        'scale-[1.02]': `transform: scale(1.02)${imp};`,
        'bg-gradient-to-l': `background-image: linear-gradient(to left, var(--tw-gradient-stops))${imp};`,
        'accent-[#08B9F2]': `accent-color: #08B9F2${imp};`,
        'items-start': `align-items: flex-start${imp};`,
        'items-end': `align-items: flex-end${imp};`,
        'items-center': `align-items: center${imp};`,
        'items-baseline': `align-items: baseline${imp};`,
        'items-stretch': `align-items: stretch${imp};`,
        'justify-start': `justify-content: flex-start${imp};`,
        'justify-end': `justify-content: flex-end${imp};`,
        'justify-center': `justify-content: center${imp};`,
        'justify-between': `justify-content: space-between${imp};`,
        'justify-around': `justify-content: space-around${imp};`,
        'self-start': `align-self: flex-start${imp};`,
        'self-center': `align-self: center${imp};`,
        'self-stretch': `align-self: stretch${imp};`,
        'relative': `position: relative${imp};`,
        'absolute': `position: absolute${imp};`,
        'fixed': `position: fixed${imp};`,
        'sticky': `position: sticky${imp};`,
        'static': `position: static${imp};`,
        'inset-0': `top: 0px; right: 0px; bottom: 0px; left: 0px${imp};`,
        'inset-x-0': `left: 0px; right: 0px${imp};`,
        'inset-y-0': `top: 0px; bottom: 0px${imp};`,
        'overflow-hidden': `overflow: hidden${imp};`,
        'overflow-visible': `overflow: visible${imp};`,
        'overflow-auto': `overflow: auto${imp};`,
        'overflow-x-auto': `overflow-x: auto${imp};`,
        'overflow-y-auto': `overflow-y: auto${imp};`,
        'overflow-x-hidden': `overflow-x: hidden${imp};`,
        'truncate': `overflow: hidden; text-overflow: ellipsis; white-space: nowrap${imp};`,
        'whitespace-nowrap': `white-space: nowrap${imp};`,
        'select-none': `user-select: none${imp};`,
        'pointer-events-none': `pointer-events: none${imp};`,
        'pointer-events-auto': `pointer-events: auto${imp};`,
        'cursor-pointer': `cursor: pointer${imp};`,
        'cursor-default': `cursor: default${imp};`,
        'cursor-not-allowed': `cursor: not-allowed${imp};`,
        'mx-auto': `margin-left: auto; margin-right: auto${imp};`,
        'ml-auto': `margin-left: auto${imp};`,
        'mr-auto': `margin-right: auto${imp};`,
        'mt-auto': `margin-top: auto${imp};`,
        'w-screen': `width: 100vw${imp};`,
        'h-screen': `height: 100vh${imp};`,
        'min-h-screen': `min-height: 100vh${imp};`,
        'min-w-0': `min-width: 0px${imp};`,
        'max-w-none': `max-width: none${imp};`,
        'max-w-xs': `max-width: 20rem${imp};`,
        'max-w-sm': `max-width: 24rem${imp};`,
        'max-w-md': `max-width: 28rem${imp};`,
        'max-w-lg': `max-width: 32rem${imp};`,
        'max-w-xl': `max-width: 36rem${imp};`,
        'max-w-2xl': `max-width: 42rem${imp};`,
        'max-w-3xl': `max-width: 48rem${imp};`,
        'max-w-4xl': `max-width: 56rem${imp};`,
        'max-w-5xl': `max-width: 64rem${imp};`,
        'max-w-6xl': `max-width: 72rem${imp};`,
        'max-w-7xl': `max-width: 80rem${imp};`,
        'max-w-full': `max-width: 100%${imp};`,
        'max-w-container': `max-width: 1280px${imp};`,
        'max-h-full': `max-height: 100%${imp};`,
        'aspect-video': `aspect-ratio: 16 / 9${imp};`,
        'aspect-square': `aspect-ratio: 1 / 1${imp};`,
        'object-cover': `object-fit: cover${imp};`,
        'object-contain': `object-fit: contain${imp};`,
        'object-center': `object-position: center${imp};`,
        'object-right': `object-position: right${imp};`,
        'object-left': `object-position: left${imp};`,
        'object-top': `object-position: top${imp};`,
        'font-sans': `font-family: 'Inter', system-ui, -apple-system, sans-serif${imp};`,
        'font-display': `font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif${imp};`,
        'font-mono': `font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace${imp};`,
        'font-light': `font-weight: 300${imp};`,
        'font-normal': `font-weight: 400${imp};`,
        'font-medium': `font-weight: 500${imp};`,
        'font-semibold': `font-weight: 600${imp};`,
        'font-bold': `font-weight: 700${imp};`,
        'font-extrabold': `font-weight: 800${imp};`,
        'font-black': `font-weight: 900${imp};`,
        'italic': `font-style: italic${imp};`,
        'not-italic': `font-style: normal${imp};`,
        'uppercase': `text-transform: uppercase${imp};`,
        'lowercase': `text-transform: lowercase${imp};`,
        'capitalize': `text-transform: capitalize${imp};`,
        'underline': `text-decoration-line: underline${imp};`,
        'no-underline': `text-decoration-line: none${imp};`,
        'underline-offset-4': `text-underline-offset: 4px${imp};`,
        'antialiased': `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale${imp};`,
        'text-left': `text-align: left${imp};`,
        'text-center': `text-align: center${imp};`,
        'text-right': `text-align: right${imp};`,
        'text-xs': `font-size: 0.75rem; line-height: 1rem${imp};`,
        'text-sm': `font-size: 0.875rem; line-height: 1.25rem${imp};`,
        'text-base': `font-size: 1rem; line-height: 1.5rem${imp};`,
        'text-lg': `font-size: 1.125rem; line-height: 1.75rem${imp};`,
        'text-xl': `font-size: 1.25rem; line-height: 1.75rem${imp};`,
        'text-2xl': `font-size: 1.5rem; line-height: 2rem${imp};`,
        'text-3xl': `font-size: 1.875rem; line-height: 2.25rem${imp};`,
        'text-4xl': `font-size: 2.25rem; line-height: 2.5rem${imp};`,
        'text-5xl': `font-size: 3rem; line-height: 1${imp};`,
        'leading-none': `line-height: 1${imp};`,
        'leading-tight': `line-height: 1.25${imp};`,
        'leading-snug': `line-height: 1.375${imp};`,
        'leading-normal': `line-height: 1.5${imp};`,
        'leading-relaxed': `line-height: 1.625${imp};`,
        'tracking-tight': `letter-spacing: -0.025em${imp};`,
        'tracking-normal': `letter-spacing: 0em${imp};`,
        'tracking-wide': `letter-spacing: 0.025em${imp};`,
        'tracking-wider': `letter-spacing: 0.05em${imp};`,
        'tracking-widest': `letter-spacing: 0.1em${imp};`,
        'rounded-none': `border-radius: 0px${imp};`,
        'rounded-sm': `border-radius: 0.125rem${imp};`,
        'rounded': `border-radius: 0.25rem${imp};`,
        'rounded-md': `border-radius: 0.375rem${imp};`,
        'rounded-lg': `border-radius: 0.5rem${imp};`,
        'rounded-xl': `border-radius: 0.75rem${imp};`,
        'rounded-2xl': `border-radius: 1rem${imp};`,
        'rounded-3xl': `border-radius: 1.5rem${imp};`,
        'rounded-full': `border-radius: 9999px${imp};`,
        'border': `border-width: 1px${imp};`,
        'border-0': `border-width: 0px${imp};`,
        'border-2': `border-width: 2px${imp};`,
        'border-t': `border-top-width: 1px${imp};`,
        'border-b': `border-bottom-width: 1px${imp};`,
        'border-l': `border-left-width: 1px${imp};`,
        'border-r': `border-right-width: 1px${imp};`,
        'border-y': `border-top-width: 1px; border-bottom-width: 1px${imp};`,
        'border-x': `border-left-width: 1px; border-right-width: 1px${imp};`,
        'shadow-none': `box-shadow: none${imp};`,
        'shadow-sm': `box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)${imp};`,
        'shadow': `box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)${imp};`,
        'shadow-md': `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)${imp};`,
        'shadow-lg': `box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)${imp};`,
        'shadow-xl': `box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)${imp};`,
        'shadow-2xl': `box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35)${imp};`,
        'outline-none': `outline: 2px solid transparent; outline-offset: 2px${imp};`,
        'backdrop-blur-sm': `backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px)${imp};`,
        'backdrop-blur-md': `backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px)${imp};`,
        'backdrop-blur-xl': `backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px)${imp};`,
        'filter': `filter: var(--tw-Filter, )${imp};`,
        'brightness-90': `filter: brightness(.9)${imp};`,
        'brightness-100': `filter: brightness(1)${imp};`,
        'contrast-105': `filter: contrast(1.05)${imp};`,
        'transition': `transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms${imp};`,
        'transition-all': `transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms${imp};`,
        'transition-colors': `transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms${imp};`,
        'transition-transform': `transition-property: transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms${imp};`,
        'transition-opacity': `transition-property: opacity; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms${imp};`,
        'duration-200': `transition-duration: 200ms${imp};`,
        'duration-300': `transition-duration: 300ms${imp};`,
        'duration-500': `transition-duration: 500ms${imp};`,
        'scale-105': `transform: scale(1.05)${imp};`,
        'scale-110': `transform: scale(1.1)${imp};`,
        'scale-[1.04]': `transform: scale(1.04)${imp};`,
        'translate-x-1': `transform: translateX(0.25rem)${imp};`,
        'rotate-180': `transform: rotate(180deg)${imp};`,
        'animate-pulse': `animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite${imp};`,
        'animate-ping': `animation: tw-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite${imp};`,
        'line-clamp-2': `overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2${imp};`,
        'scroll-smooth': `scroll-behavior: smooth${imp};`,
        'bg-gradient-to-r': `background-image: linear-gradient(to right, var(--tw-gradient-stops))${imp};`,
        'bg-gradient-to-b': `background-image: linear-gradient(to bottom, var(--tw-gradient-stops))${imp};`,
        'bg-gradient-to-t': `background-image: linear-gradient(to top, var(--tw-gradient-stops))${imp};`,
        'bg-gradient-to-br': `background-image: linear-gradient(to bottom right, var(--tw-gradient-stops))${imp};`,
        'to-transparent': `--tw-gradient-to: transparent${imp};`,
        'via-transparent': `--tw-gradient-stops: var(--tw-gradient-from), transparent, var(--tw-gradient-to)${imp};`
    };

    if (exactMap[base]) return exactMap[base];

    // Grid columns & spans
    let m;
    if ((m = base.match(/^grid-cols-(\d+)$/))) {
        return `grid-template-columns: repeat(${m[1]}, minmax(0, 1fr))${imp};`;
    }
    if ((m = base.match(/^col-span-(\d+)$/))) {
        return `grid-column: span ${m[1]} / span ${m[1]}${imp};`;
    }

    // Gaps
    if ((m = base.match(/^gap-(.+)$/))) {
        const s = resolveSize(m[1]);
        if (s) return `gap: ${s}${imp};`;
    }
    if ((m = base.match(/^gap-x-(.+)$/))) {
        const s = resolveSize(m[1]);
        if (s) return `column-gap: ${s}${imp};`;
    }
    if ((m = base.match(/^gap-y-(.+)$/))) {
        const s = resolveSize(m[1]);
        if (s) return `row-gap: ${s}${imp};`;
    }

    // Padding & Margin
    const boxDirs = {
        'p': ['padding'],
        'px': ['padding-left', 'padding-right'],
        'py': ['padding-top', 'padding-bottom'],
        'pt': ['padding-top'],
        'pb': ['padding-bottom'],
        'pl': ['padding-left'],
        'pr': ['padding-right'],
        'm': ['margin'],
        'mx': ['margin-left', 'margin-right'],
        'my': ['margin-top', 'margin-bottom'],
        'mt': ['margin-top'],
        'mb': ['margin-bottom'],
        'ml': ['margin-left'],
        'mr': ['margin-right']
    };
    for (const [prefix, props] of Object.entries(boxDirs)) {
        const re = new RegExp(`^(-?)${prefix}-(.+)$`);
        if ((m = base.match(re))) {
            const neg = m[1] === '-' ? '-' : '';
            const s = resolveSize(m[2]);
            if (s) {
                return props.map(p => `${p}: ${neg}${s}${imp};`).join(' ');
            }
        }
    }

    // Width / Height / Min / Max
    const sizeDirs = {
        'w': 'width',
        'h': 'height',
        'min-w': 'min-width',
        'min-h': 'min-height',
        'max-w': 'max-width',
        'max-h': 'max-height'
    };
    for (const [prefix, prop] of Object.entries(sizeDirs)) {
        const re = new RegExp(`^${prefix}-(.+)$`);
        if ((m = base.match(re))) {
            const s = resolveSize(m[1]);
            if (s) return `${prop}: ${s}${imp};`;
        }
    }

    // Positioning (top, bottom, left, right)
    for (const pos of ['top', 'bottom', 'left', 'right']) {
        const re = new RegExp(`^(-?)${pos}-(.+)$`);
        if ((m = base.match(re))) {
            const neg = m[1] === '-' ? '-' : '';
            const s = resolveSize(m[2]);
            if (s) return `${pos}: ${neg}${s}${imp};`;
        }
    }

    // Z-index
    if ((m = base.match(/^z-(\d+|\[.+\])$/))) {
        const val = m[1].startsWith('[') ? m[1].slice(1, -1) : m[1];
        return `z-index: ${val}${imp};`;
    }

    // Opacity
    if ((m = base.match(/^opacity-(\d+)$/))) {
        return `opacity: ${parseInt(m[1], 10) / 100}${imp};`;
    }

    // Border radius arbitrary
    if ((m = base.match(/^rounded-\[(.+)\]$/))) {
        return `border-radius: ${m[1]}${imp};`;
    }

    // Arbitrary font size, line-height, tracking
    if ((m = base.match(/^text-\[([0-9.]+px|[0-9.]+rem)\]$/))) {
        return `font-size: ${m[1]}${imp};`;
    }
    if ((m = base.match(/^leading-\[(.+)\]$/))) {
        return `line-height: ${m[1]}${imp};`;
    }
    if ((m = base.match(/^tracking-\[(.+)\]$/))) {
        return `letter-spacing: ${m[1]}${imp};`;
    }

    // Colors: bg-*, text-*, border-*
    if ((m = base.match(/^bg-(.+)$/))) {
        const c = resolveColor(m[1]);
        if (c) return `background-color: ${c}${imp};`;
    }
    if ((m = base.match(/^text-(.+)$/))) {
        const c = resolveColor(m[1]);
        if (c) return `color: ${c}${imp};`;
    }
    if ((m = base.match(/^border-(.+)$/))) {
        const c = resolveColor(m[1]);
        if (c) return `border-color: ${c}${imp};`;
    }

    // Gradients: from-*, via-*, to-*
    if ((m = base.match(/^from-(.+)$/))) {
        const c = resolveColor(m[1]);
        if (c) return `--tw-gradient-from: ${c}; --tw-gradient-to: rgba(6, 26, 51, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)${imp};`;
    }
    if ((m = base.match(/^via-(.+)$/))) {
        const c = resolveColor(m[1]);
        if (c) return `--tw-gradient-stops: var(--tw-gradient-from), ${c}, var(--tw-gradient-to)${imp};`;
    }
    if ((m = base.match(/^to-(.+)$/))) {
        const c = resolveColor(m[1]);
        if (c) return `--tw-gradient-to: ${c}${imp};`;
    }

    return null;
}

function buildTailwindBundle() {
    const classSet = new Set();

    // Extract classes from files
    for (const file of FILES_TO_SCAN) {
        if (!fs.existsSync(file)) continue;
        const content = fs.readFileSync(file, 'utf8');

        // Match class="..." and className = "..."
        const classRegex = /\bclass(?:Name)?\s*=\s*["'`]([^"'`]+)["'`]/g;
        let match;
        while ((match = classRegex.exec(content)) !== null) {
            const raw = match[1].replace(/\$\{[^}]+\}/g, ' ');
            raw.split(/\s+/).forEach(t => {
                if (t && !t.includes('${') && !t.includes('`')) classSet.add(t.trim());
            });
        }

        // Also match classList.add(...) / classList.remove(...)
        const clRegex = /classList\.(?:add|remove|toggle)\(([^)]+)\)/g;
        while ((match = clRegex.exec(content)) !== null) {
            const strMatches = match[1].match(/['"]([^'"]+)['"]/g) || [];
            strMatches.forEach(s => {
                const clean = s.slice(1, -1).trim();
                if (clean) classSet.add(clean);
            });
        }
    }

    const baseRules = [];
    const baseHiddenRules = [];
    const smRules = [];
    const smHiddenRules = [];
    const mdRules = [];
    const mdHiddenRules = [];
    const lgRules = [];
    const lgHiddenRules = [];
    const xlRules = [];
    const xlHiddenRules = [];
    const unmatched = [];

    for (const token of Array.from(classSet).sort()) {
        // Parse prefixes (e.g. lg:col-span-6, hover:bg-[#08B9F2], group-hover/player:scale-105)
        const parts = token.split(':');
        const base = parts[parts.length - 1];
        const variants = parts.slice(0, -1);

        // Handle space-y-* and space-x-*
        let spaceMatch = base.match(/^space-(x|y)-(.+)$/);
        if (spaceMatch) {
            const axis = spaceMatch[1];
            const size = resolveSize(spaceMatch[2]);
            if (size) {
                const sel = `.${escapeSelector(token)} > :not([hidden]) ~ :not([hidden])`;
                const decl = axis === 'y' ? `margin-top: ${size};` : `margin-left: ${size};`;
                baseRules.push(`${sel} { ${decl} }`);
            }
            continue;
        }

        const cssDecl = generateRuleForBaseClass(base);
        if (!cssDecl) {
            unmatched.push(token);
            continue;
        }

        let selector = `.${escapeSelector(token)}`;
        let isHiddenUtil = (base === 'hidden' || base === '!hidden');
        let mediaBucket = isHiddenUtil ? baseHiddenRules : baseRules;

        for (const v of variants) {
            if (v === 'sm') mediaBucket = isHiddenUtil ? smHiddenRules : smRules;
            else if (v === 'md') mediaBucket = isHiddenUtil ? mdHiddenRules : mdRules;
            else if (v === 'lg') mediaBucket = isHiddenUtil ? lgHiddenRules : lgRules;
            else if (v === 'xl') mediaBucket = isHiddenUtil ? xlHiddenRules : xlRules;
            else if (v === 'hover') selector += ':hover';
            else if (v === 'focus') selector += ':focus';
            else if (v === 'focus-visible') selector += ':focus-visible';
            else if (v === 'group-hover') selector = `.group:hover ${selector}`;
            else if (v.startsWith('group-hover/')) {
                const grpName = v.split('/')[1];
                selector = `.group\\/${grpName}:hover ${selector}`;
            }
        }

        mediaBucket.push(`${selector} { ${cssDecl} }`);
    }

    const preflight = `/* ==========================================================================
   FOX LIBRAS — STATIC TAILWIND CSS BUNDLE (v4.0 Production Build)
   Zero CDN Dependency • Instant Load on Vercel & Localhost
   ========================================================================== */
*, ::before, ::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #DCE3EC;
}
html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    scroll-behavior: smooth;
}
body {
    margin: 0;
    line-height: inherit;
    background-color: #061A33;
    color: #061A33;
}
hr { height: 0; color: inherit; border-top-width: 1px; }
h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; margin: 0; }
p, dl, dd, blockquote, figure, pre { margin: 0; }
a { color: inherit; text-decoration: inherit; }
b, strong { font-weight: bolder; }
code, kbd, samp, pre { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 1em; }
small { font-size: 80%; }
button, input, optgroup, select, textarea {
    font-family: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0;
}
button, select { text-transform: none; }
button, [type='button'], [type='reset'], [type='submit'] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none;
}
ol, ul, menu { list-style: none; margin: 0; padding: 0; }
img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
}
img, video {
    max-width: 100%;
    height: auto;
}
[hidden] {
    display: none !important;
}
@keyframes tw-pulse {
    50% { opacity: .5; }
}
@keyframes tw-ping {
    75%, 100% { transform: scale(2); opacity: 0; }
}
`;

    const fullCss = [
        preflight,
        ...baseRules,
        ...baseHiddenRules,
        `@media (min-width: 640px) {\n  ${[...smRules, ...smHiddenRules].join('\n  ')}\n}`,
        `@media (min-width: 768px) {\n  ${[...mdRules, ...mdHiddenRules].join('\n  ')}\n}`,
        `@media (min-width: 1024px) {\n  ${[...lgRules, ...lgHiddenRules].join('\n  ')}\n}`,
        `@media (min-width: 1280px) {\n  ${[...xlRules, ...xlHiddenRules].join('\n  ')}\n}`
    ].join('\n');

    const outPath = path.join(ROOT, 'assets', 'css', 'tailwind.min.css');
    fs.writeFileSync(outPath, fullCss, 'utf8');
    console.log(`[FOX LIBRAS CSS] Compiled ${classSet.size} classes -> assets/css/tailwind.min.css (${(fullCss.length / 1024).toFixed(1)} KB)`);
    if (unmatched.length > 0) {
        console.log('[Unmatched custom/FA classes]:', unmatched.join(', '));
    }
}

buildTailwindBundle();
