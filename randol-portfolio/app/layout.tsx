import type { Metadata } from 'next';
import { Archivo_Black, Public_Sans } from 'next/font/google';
import './globals.css';
import { site, socials } from '@/lib/portfolio-data';

const display = Archivo_Black({ weight: '400', subsets: ['latin'], variable: '--font-display' });
const body = Public_Sans({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Portfolio`,
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: 'website', url: site.url, images: ['/images/og.png'] },
  twitter: { card: 'summary_large_image' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, email: site.email, url: site.url, jobTitle: 'Audiovisual Producer', alumniOf: 'Andrews University', sameAs: Object.values(socials) };
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        {children}
      </body>
    </html>
  );
}
