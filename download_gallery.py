import concurrent.futures
import re
import urllib.request
import zipfile
from pathlib import Path

archive = Path('/Users/yasinaliabir/Downloads/yasin-ali-abir (1).zip')
out = Path('/Users/yasinaliabir/Documents/Codex/2026-11-09/re/work/dark-portfolio/public/assets/gallery')
out.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(archive) as zf:
    html = zf.read('index.html').decode('utf-8', 'ignore')

creators = html.split('const CREATORS_WORKED_WITH = [', 1)[1].split('];', 1)[0]
brands = html.split('const BRANDS_WORKED_WITH = [', 1)[1].split('];', 1)[0]
urls = [u.replace('\\/', '/') for u in re.findall(r'image:\s*"(https?[^\"]+)', creators)]
urls += [u.replace('\\/', '/') for u in re.findall(r'logo:\s*"(https?[^\"]+)', brands)]

mime_ext = {'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/avif': '.avif'}
def fetch(item):
    idx, url = item
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as response:
            mime = response.headers.get_content_type()
            ext = mime_ext.get(mime, '.jpg')
            data = response.read(5_000_001)
            if len(data) > 5_000_000:
                data = data[:5_000_000]
            path = out / f'gallery-{idx:02d}{ext}'
            path.write_bytes(data)
            return idx, str(path.relative_to(out.parent)), mime, len(data)
    except Exception as exc:
        return idx, 'FAILED', str(exc), 0

with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for result in sorted(pool.map(fetch, enumerate(urls, 1))):
        print(*result)
