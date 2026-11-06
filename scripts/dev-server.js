#!/usr/bin/env node
/**
 * FOX LIBRAS — Professional Local Development Server (npm run dev)
 * - Automatically compiles static Tailwind CSS (assets/css/tailwind.min.css)
 * - Serves all static assets, MP4 video streams (with HTTP 206 Range support), and YouTube embeds
 * - Watches HTML/JS/CSS files for live rebuilds
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_PORT = parseInt(process.env.PORT || '3000', 10);

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
    '.mp4': 'video/mp4',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.webmanifest': 'application/manifest+json; charset=utf-8'
};

function runCssBuild() {
    try {
        execSync('node scripts/build-css.js', { cwd: ROOT, stdio: 'inherit' });
    } catch (err) {
        console.error('[FOX LIBRAS DEV] CSS build error:', err.message);
    }
}

// Initial build
runCssBuild();

// Watch files for automatic CSS rebuild
const watchTargets = [
    path.join(ROOT, 'index.html'),
    path.join(ROOT, 'brand-guide.html'),
    path.join(ROOT, 'assets', 'js', 'script.js')
];

let rebuildTimer = null;
watchTargets.forEach(file => {
    if (fs.existsSync(file)) {
        fs.watch(file, () => {
            clearTimeout(rebuildTimer);
            rebuildTimer = setTimeout(() => {
                console.log(`[FOX LIBRAS DEV] Change detected in ${path.basename(file)} -> Rebuilding CSS...`);
                runCssBuild();
            }, 120);
        });
    }
});

const server = http.createServer((req, res) => {
    const safeUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    let relPath = safeUrl === '/' ? '/index.html' : safeUrl;

    // Clean URL support
    let filePath = path.join(ROOT, relPath);
    if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
    }

    // Prevent directory traversal
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found: ' + safeUrl);
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const stat = fs.statSync(filePath);

    // Common headers (enables YouTube embeds without Error 153 and disables stale CSS cache in dev)
    const baseHeaders = {
        'Content-Type': contentType,
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Cache-Control': 'no-cache'
    };

    // Support HTTP Range requests for smooth MP4 video seeking
    const range = req.headers.range;
    if (range && ext === '.mp4') {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const fileStream = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
            ...baseHeaders,
            'Content-Range': `bytes ${start}-${end}/${stat.size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize
        });
        fileStream.pipe(res);
        return;
    }

    res.writeHead(200, {
        ...baseHeaders,
        'Content-Length': stat.size
    });
    fs.createReadStream(filePath).pipe(res);
});

function startServer(port) {
    server.once('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            startServer(port + 1);
        } else {
            console.error(err);
        }
    });

    server.listen(port, () => {
        console.log('\n==================================================================');
        console.log('  FOX LIBRAS — SERVIDOR DE DESENVOLVIMENTO PROFISSIONAL ATIVO');
        console.log(`  URL Local:   http://localhost:${port}`);
        console.log('  Status CSS:  Tailwind Estático Compilado (assets/css/tailwind.min.css)');
        console.log('  YouTube HD:  Embeds HTTP Habilitados (Strict-Origin Referrer)');
        console.log('==================================================================\n');
    });
}

startServer(DEFAULT_PORT);

