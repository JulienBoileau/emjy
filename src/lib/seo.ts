type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
};

const SITE_URL = 'https://emjy-website.web.app';
const SITE_NAME = 'EMJY Production';
const DEFAULT_IMAGE = `${SITE_URL}/assets/emjy_logo.png`;

const PAGES: Record<string, PageSeo> = {
  '/accueil': {
    title: 'Captation et Montage Video',
    description:
      'EMJY Production accompagne vos spectacles avec captation video, montage professionnel et organisation d evenements humour.',
    path: '/accueil',
    type: 'website'
  },
  '/presentation': {
    title: 'Presentation de l equipe',
    description:
      'Decouvrez EMJY Production, son histoire, sa vision et ses zones d intervention pour la production audiovisuelle et l humour.',
    path: '/presentation',
    type: 'article'
  },
  '/services': {
    title: 'Services de Production Audiovisuelle',
    description:
      'Captation video, montage, accompagnement d artistes et organisation de comedy club: des services concrets pour valoriser vos spectacles.',
    path: '/services',
    type: 'article'
  },
  '/agenda': {
    title: 'Agenda des Spectacles',
    description:
      'Consultez les dates, lieux et billetteries des prochains evenements et spectacles accompagnes par EMJY Production.',
    path: '/agenda',
    type: 'article'
  },
  '/galerie': {
    title: 'Galerie Photo Evenements',
    description:
      'Parcourez les albums photo des evenements, plateaux humour et captations realises par EMJY Production.',
    path: '/galerie',
    type: 'article'
  },
  '/contact': {
    title: 'Contact et Demande de Projet',
    description:
      'Contactez EMJY Production pour une captation, un montage video ou l organisation d un evenement humour.',
    path: '/contact',
    type: 'article'
  },
  '/newsletter': {
    title: 'Newsletter EMJY Production',
    description:
      'Inscrivez vous a la newsletter pour recevoir les prochaines dates, actualites et annonces d EMJY Production.',
    path: '/newsletter',
    type: 'article'
  },
  '/admin': {
    title: 'Administration',
    description: 'Espace d administration EMJY Production.',
    path: '/admin',
    type: 'website',
    noIndex: true
  }
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/accueil';
  const trimmed = pathname.split('?')[0].replace(/\/$/, '');
  return trimmed || '/accueil';
}

function findSeo(pathname: string): PageSeo {
  const normalized = normalizePath(pathname);
  if (normalized.startsWith('/admin')) return PAGES['/admin'];
  return PAGES[normalized] ?? PAGES['/accueil'];
}

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function buildJsonLd(seo: PageSeo, canonicalUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: DEFAULT_IMAGE,
        email: 'contact@emjyproduction.com',
        sameAs: [
          'https://www.instagram.com/emjy_production/',
          'https://www.facebook.com/people/EMJY-Production/61576151466340/?_rdr'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        inLanguage: 'fr-FR',
        publisher: { '@id': `${SITE_URL}/#organization` }
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: `${seo.title} | ${SITE_NAME}`,
        description: seo.description,
        inLanguage: 'fr-FR',
        isPartOf: { '@id': `${SITE_URL}/#website` }
      }
    ]
  };
}

export function applySeoForPath(pathname: string) {
  const seo = findSeo(pathname);
  const canonicalUrl = `${SITE_URL}${seo.path}`;
  const fullTitle = `${seo.title} | ${SITE_NAME}`;
  const robotsContent = seo.noIndex ? 'noindex, nofollow, noarchive' : 'index, follow, max-image-preview:large';

  document.title = fullTitle;
  document.documentElement.setAttribute('lang', 'fr');

  upsertMetaByName('description', seo.description);
  upsertMetaByName('robots', robotsContent);
  upsertMetaByName('author', SITE_NAME);
  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', fullTitle);
  upsertMetaByName('twitter:description', seo.description);
  upsertMetaByName('twitter:image', DEFAULT_IMAGE);

  upsertMetaByProperty('og:locale', 'fr_FR');
  upsertMetaByProperty('og:type', seo.type ?? 'website');
  upsertMetaByProperty('og:site_name', SITE_NAME);
  upsertMetaByProperty('og:title', fullTitle);
  upsertMetaByProperty('og:description', seo.description);
  upsertMetaByProperty('og:url', canonicalUrl);
  upsertMetaByProperty('og:image', DEFAULT_IMAGE);

  upsertLink('canonical', canonicalUrl);

  let jsonLd = document.head.querySelector<HTMLScriptElement>('script[data-seo-jsonld="true"]');
  if (!jsonLd) {
    jsonLd = document.createElement('script');
    jsonLd.type = 'application/ld+json';
    jsonLd.setAttribute('data-seo-jsonld', 'true');
    document.head.appendChild(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(buildJsonLd(seo, canonicalUrl));
}
