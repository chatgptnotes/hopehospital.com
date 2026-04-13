const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const devices = [
  { name: 'iphone-se',      width: 375,  height: 667,  deviceScaleFactor: 2, isMobile: true  },
  { name: 'iphone-13',      width: 390,  height: 844,  deviceScaleFactor: 3, isMobile: true  },
  { name: 'pixel-7',        width: 412,  height: 915,  deviceScaleFactor: 2.625, isMobile: true },
  { name: 'galaxy-s22',     width: 360,  height: 780,  deviceScaleFactor: 3, isMobile: true  },
  { name: 'ipad-mini',      width: 768,  height: 1024, deviceScaleFactor: 2, isMobile: true  },
  { name: 'ipad-pro',       width: 1024, height: 1366, deviceScaleFactor: 2, isMobile: true  },
  { name: 'desktop-1280',   width: 1280, height: 800,  deviceScaleFactor: 1, isMobile: false },
  { name: 'desktop-1920',   width: 1920, height: 1080, deviceScaleFactor: 1, isMobile: false },
];

const pages = [
  { url: 'http://localhost:8080/',        slug: 'home'   },
  { url: 'http://localhost:8080/nagpur/',  slug: 'nagpur' },
];

const outDir = path.join(__dirname, '..', 'audit-screens');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const report = [];

  for (const pg of pages) {
    for (const d of devices) {
      const page = await browser.newPage();
      await page.setViewport({
        width: d.width,
        height: d.height,
        deviceScaleFactor: d.deviceScaleFactor,
        isMobile: d.isMobile,
        hasTouch: d.isMobile,
      });
      try {
        await page.goto(pg.url, { waitUntil: 'networkidle2', timeout: 20000 });
      } catch (e) {
        console.log(`FAIL ${pg.slug} ${d.name}: ${e.message}`);
        await page.close();
        continue;
      }

      const metrics = await page.evaluate(() => {
        const body = document.body;
        const html = document.documentElement;
        const docWidth = html.clientWidth;
        const hasHorizontalScroll = (html.scrollWidth > html.clientWidth + 1) && (getComputedStyle(body).overflowX !== 'hidden' && getComputedStyle(html).overflowX !== 'hidden');

        const smallFonts = [];
        const smallTaps = [];
        const walker = document.createTreeWalker(body, NodeFilter.SHOW_ELEMENT);
        let node;
        let count = 0;
        while ((node = walker.nextNode()) && count < 5000) {
          count++;
          const cs = getComputedStyle(node);
          const text = (node.textContent || '').trim();
          if (text && text.length > 2 && node.children.length === 0) {
            const fs = parseFloat(cs.fontSize);
            if (fs && fs < 12 && cs.display !== 'none') {
              smallFonts.push({ tag: node.tagName, fontSize: fs, text: text.slice(0, 40) });
            }
          }
          if (['A', 'BUTTON'].includes(node.tagName)) {
            const r = node.getBoundingClientRect();
            if (r.width > 0 && r.height > 0 && (r.width < 40 || r.height < 40)) {
              smallTaps.push({ tag: node.tagName, w: Math.round(r.width), h: Math.round(r.height), text: (node.textContent || '').trim().slice(0, 30) });
            }
          }
        }

        return {
          viewportW: window.innerWidth,
          viewportH: window.innerHeight,
          docWidth,
          hasHorizontalScroll,
          smallFontsCount: smallFonts.length,
          smallFontsSample: smallFonts.slice(0, 5),
          smallTapsCount: smallTaps.length,
          smallTapsSample: smallTaps.slice(0, 5),
        };
      });

      const file = path.join(outDir, `${pg.slug}-${d.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      report.push({ page: pg.slug, device: d.name, ...metrics });
      console.log(
        `${pg.slug.padEnd(7)} ${d.name.padEnd(14)} ${metrics.viewportW}x${metrics.viewportH}  ` +
          `hScroll=${metrics.hasHorizontalScroll ? 'YES ❌' : 'no '}  ` +
          `smallFont=${metrics.smallFontsCount}  smallTap=${metrics.smallTapsCount}`
      );
      await page.close();
    }
  }

  fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`\nScreenshots + report.json saved to ${outDir}`);
  await browser.close();
})();
