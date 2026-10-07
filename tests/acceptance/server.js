// Mock "YouTube-like" site for offline acceptance tests.
const http = require('http');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const CSP = "require-trusted-types-for 'script'";

function sendFile(req, res, file, type) {
  const stat = fs.statSync(file);
  const range = req.headers.range;
  if (range) {
    const m = /bytes=(\d*)-(\d*)/.exec(range);
    const start = m[1] ? parseInt(m[1], 10) : 0;
    const end = m[2] ? parseInt(m[2], 10) : stat.size - 1;
    res.writeHead(206, {
      'Content-Type': type, 'Accept-Ranges': 'bytes',
      'Content-Range': `bytes ${start}-${end}/${stat.size}`, 'Content-Length': end - start + 1,
    });
    fs.createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes', 'Content-Length': stat.size });
    fs.createReadStream(file).pipe(res);
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.startsWith('/media/')) {
    return sendFile(req, res, path.join(ROOT, 'media', path.basename(url.pathname)), 'audio/wav');
  }
  if (url.pathname === '/app.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    return res.end(fs.readFileSync(path.join(ROOT, 'app.js')));
  }
  if (url.pathname === '/favicon.ico') { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': CSP });
  res.end(fs.readFileSync(path.join(ROOT, 'index.html')));
});
const port = parseInt(process.env.PORT || '8765', 10);
server.listen(port, () => console.log('listening ' + port));
