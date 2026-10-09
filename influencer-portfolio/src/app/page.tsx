import Portfolio from '@/components/Portfolio';
import { profile } from '@/data/site';
export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, description: profile.tagline, ...(profile.instagram ? {sameAs:[profile.instagram]} : {}) }).replace(/</g,'\\u003c')}}/><Portfolio/></>;
}
