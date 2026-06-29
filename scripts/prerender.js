const fs = require('node:fs/promises');
const path = require('node:path');

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const SITE_URL = 'https://emjy-website.web.app';
const SITE_NAME = 'EMJY Production';
const IMAGE_URL = `${SITE_URL}/assets/emjy_logo.png`;

const pages = [
  {
    route: '/accueil',
    title: 'Captation et Montage Video',
    description: 'EMJY Production accompagne vos spectacles avec captation video, montage professionnel et organisation d evenements humour.',
    type: 'website',
    noscriptHeading: 'EMJY Production - Captation et Montage Video',
  },
  {
    route: '/presentation',
    title: 'Presentation de l equipe',
    description: 'Decouvrez EMJY Production, son histoire, sa vision et ses zones d intervention pour la production audiovisuelle et l humour.',
    type: 'article',
    noscriptHeading: 'Presentation de l equipe EMJY Production',
  },
  {
    route: '/services',
    title: 'Services de Production Audiovisuelle',
    description: 'Captation video, montage, accompagnement d artistes et organisation de comedy club: des services concrets pour valoriser vos spectacles.',
    type: 'article',
    noscriptHeading: 'Services de production audiovisuelle',
  },
  {
    route: '/agenda',
    title: 'Agenda des Spectacles',
    description: 'Consultez les dates, lieux et billetteries des prochains evenements et spectacles accompagnes par EMJY Production.',
    type: 'article',
    noscriptHeading: 'Agenda des spectacles EMJY Production',
  },
  {
    route: '/galerie',
    title: 'Galerie Photo Evenements',
    description: 'Parcourez les albums photo des evenements, plateaux humour et captations realises par EMJY Production.',
    type: 'article',
    noscriptHeading: 'Galerie photo des evenements',
  },
  {
    route: '/contact',
    title: 'Contact et Demande de Projet',
    description: 'Contactez EMJY Production pour une captation, un montage video ou l organisation d un evenement humour.',
    type: 'article',
    noscriptHeading: 'Contact Emjy Production',
  },
  {
    route: '/newsletter',
    title: 'Newsletter EMJY Production',
    description: 'Inscrivez vous a la newsletter pour recevoir les prochaines dates, actualites et annonces d EMJY Production.',
    type: 'article',
    noscriptHeading: 'Newsletter Emjy Production',
  },
];

function upsertTag(html, matcher, replacement) {
  if (matcher.test(html)) {
    return html.replace(matcher, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n  </head>`);
}

function withRouteSeo(template, page) {
  const fullTitle = `${page.title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${page.route}`;

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${fullTitle}</title>`);

  html = upsertTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/i, `<meta name="description" content="${page.description}" />`);
  html = upsertTag(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/>/i, `<meta property="og:type" content="${page.type}" />`);
  html = upsertTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${fullTitle}" />`);
  html = upsertTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${page.description}" />`);
  html = upsertTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = upsertTag(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i, `<meta property="og:image" content="${IMAGE_URL}" />`);
  html = upsertTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:title" content="${fullTitle}" />`);
  html = upsertTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:description" content="${page.description}" />`);
  html = upsertTag(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/i, `<meta name="twitter:image" content="${IMAGE_URL}" />`);
  html = upsertTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: fullTitle,
    description: page.description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  };

  const jsonLdTag = `<script type="application/ld+json" data-prerender-webpage="true">${JSON.stringify(webPageJsonLd)}</script>`;
  html = upsertTag(html, /<script\s+type="application\/ld\+json"\s+data-prerender-webpage="true">[\s\S]*?<\/script>/i, jsonLdTag);

  const noscriptFallback = `<noscript><section style="max-width:760px;margin:2rem auto;padding:0 1rem;color:#f6e7d3;font-family:Arial,sans-serif;"><h1>${page.noscriptHeading}</h1><p>${page.description}</p><p>Activez JavaScript pour afficher l experience complete du site.</p></section></noscript>`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>${noscriptFallback}`);

  return html;
}

async function run() {
  const templatePath = path.join(DIST_DIR, 'index.html');
  const template = await fs.readFile(templatePath, 'utf8');

  for (const page of pages) {
    const routeHtml = withRouteSeo(template, page);
    const outputDir = path.join(DIST_DIR, page.route.slice(1));
    const outputPath = path.join(outputDir, 'index.html');

    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(outputPath, routeHtml, 'utf8');
  }

  console.log(`[prerender] Generated ${pages.length} public pages in dist/`);
}

run().catch((error) => {
  console.error('[prerender] Failed to generate pages:', error);
  process.exit(1);
});
