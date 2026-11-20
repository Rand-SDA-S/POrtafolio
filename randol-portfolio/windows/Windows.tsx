'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Globe, Folder, Linkedin, Instagram, Youtube, MapPin } from 'lucide-react';
import { site, socials, bio, about, skills, experience, projects, photos, videos, type Video } from '@/lib/portfolio-data';
import { asset } from '@/lib/asset';

const Card = ({ t, children }: { t: string; children: React.ReactNode }) => <div className="card"><h3 className="mb-2 text-lg">{t}</h3>{children}</div>;
const List = ({ items }: { items: string[] }) => <ul className="list-disc pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

export function About() {
  return (
    <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
      <div className="grid aspect-square place-items-center border-4 border-navy bg-xp display text-6xl text-cream" style={{ boxShadow: '6px 6px 0 #FF7A1A' }}>
        {site.photo ? <img src={asset(site.photo)} alt={`Portrait of ${site.name}`} className="h-full w-full object-cover" /> : 'R'}
      </div>
      <div><h2 className="text-3xl leading-none">{site.name}</h2><p className="my-2 font-bold text-xp">{site.roles}</p><p>{bio}</p></div>
      <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
        <Card t="Education"><List items={about.education} /></Card>
        <Card t="Skills"><div className="flex flex-wrap gap-1">{Object.values(skills).flat().map((s) => <span className="tag" key={s}>{s}</span>)}</div></Card>
        <Card t="Interests"><List items={about.interests} /></Card>
        <Card t="Current projects"><List items={about.current} /></Card>
      </div>
    </div>
  );
}

export function Resume() {
  return (
    <div className="space-y-3">
      <a className="btn inline-flex items-center gap-2" href={asset(site.resumePdf)} download><Download size={16} />Download resume</a>
      <Card t="Education"><p className="text-sm">Andrews University, BBA Information Systems, 2026–present</p></Card>
      {experience.map((e) => <Card key={e.role} t={`${e.role}, ${e.org}`}><p className="text-xs">{e.when}</p><List items={e.points} /></Card>)}
      <Card t="Technology skills"><List items={Object.entries(skills).map(([k, v]) => `${k}: ${v.join(', ')}`)} /></Card>
      <iframe title="Resume PDF preview" src={asset(site.resumePdf)} className="hidden h-96 w-full border-4 border-navy md:block" />
    </div>
  );
}

export function Projects() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p) => (
        <motion.article key={p.title} whileHover={{ rotate: -1.5, y: -4 }} className="card bg-[#FFE9A8] text-navy">
          <div className="mb-2 grid h-24 place-items-center border-2 border-navy bg-white/60">{p.image ? <img src={asset(p.image)} alt={p.title} className="h-full w-full object-cover" /> : <Folder size={44} />}</div>
          <h3>{p.title}</h3><p className="my-1 text-sm">{p.description}</p>
          <div className="mb-2 flex flex-wrap gap-1">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          <div className="flex gap-3 text-sm">
            {p.github && <a href={p.github} className="flex items-center gap-1 underline"><Github size={14} />Code</a>}
            {p.website && <a href={p.website} className="flex items-center gap-1 underline"><Globe size={14} />Live</a>}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

const cats = ['All', 'Photography', 'Design', 'Behind The Scenes', 'Event Production'];
export function Gallery() {
  const [c, setC] = useState('All'); const [lb, setLb] = useState<number | null>(null);
  const list = photos.filter((p) => c === 'All' || p.category === c);
  return (
    <div>
      <div role="tablist" className="mb-3 flex flex-wrap gap-2">{cats.map((k) => <button key={k} role="tab" aria-selected={c === k} onClick={() => setC(k)} className={`tag ${c === k ? '!bg-orange' : ''}`}>{k}</button>)}</div>
      <div className="gap-3" style={{ columns: '3 150px' }}>
        {list.map((p, i) => (
          <button key={p.alt} onClick={() => setLb(i)} className="mb-3 block w-full border-3 border-navy" style={{ height: p.h, border: '3px solid #021526', background: 'linear-gradient(135deg,#00E5FF,#245EDB)' }} aria-label={`Enlarge ${p.alt}`}>
            {p.src ? <img src={asset(p.src)} alt={p.alt} className="h-full w-full object-cover" /> : <span className="text-xs text-white">{p.category}</span>}
          </button>
        ))}
      </div>
      {lb !== null && list[lb] && (
        <div role="dialog" aria-label="Lightbox" className="fixed inset-0 z-[900] grid place-items-center bg-navy/90 p-6" onClick={() => setLb(null)} onKeyDown={(e) => e.key === 'Escape' && setLb(null)}>
          <button autoFocus className="btn absolute right-4 top-4">Close</button>
          {list[lb].src ? <img src={asset(list[lb].src)} alt={list[lb].alt} className="max-h-full max-w-full border-4 border-cream" /> : <p className="display text-cream">{list[lb].alt}: add a photo path in portfolio-data.ts</p>}
        </div>
      )}
    </div>
  );
}

const vcats = ['All', 'AV Production', 'Church Media', 'Live Events', 'Motion Graphics', 'Reels'];
export function Videos({ onPlay }: { onPlay: (v: Video) => void }) {
  const [c, setC] = useState('All');
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">{vcats.map((k) => <button key={k} onClick={() => setC(k)} aria-pressed={c === k} className={`tag ${c === k ? '!bg-orange' : ''}`}>{k}</button>)}</div>
      <div className="grid gap-3 sm:grid-cols-3">
        {videos.filter((v) => c === 'All' || v.category === c).map((v) => (
          <button key={v.title} onClick={() => onPlay(v)} className="card text-left hover:-rotate-1" aria-label={`Play ${v.title}`}>
            <div className="mb-2 grid aspect-video place-items-center bg-navy display text-4xl text-lime">▶</div>
            <b className="text-sm">{v.title}</b><div className="text-xs">{v.category} · {v.kind}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
export function Player({ v }: { v: Video }) {
  if (v.kind === 'mp4') return <video controls className="w-full" src={asset(v.id)} />;
  const src = v.kind === 'youtube' ? `https://www.youtube-nocookie.com/embed/${v.id}` : `https://player.vimeo.com/video/${v.id}`;
  return <iframe title={v.title} src={src} className="aspect-video w-full" allow="fullscreen; picture-in-picture" allowFullScreen />;
}

export function Contact() {
  const [s, setS] = useState({ name: '', email: '', message: '' });
  const send = (e: React.FormEvent) => { e.preventDefault(); window.location.href = `mailto:${site.email}?subject=${encodeURIComponent('Portfolio message from ' + s.name)}&body=${encodeURIComponent(s.message + '\n\n' + s.email)}`; };
  const f = 'w-full border-3 bg-cream p-2 text-navy'; const st = { border: '3px solid #021526' };
  return (
    <div className="space-y-3">
      <p><a className="underline" href={`mailto:${site.email}`}>{site.email}</a><br /><a className="underline" href={`mailto:${site.email2}`}>{site.email2}</a></p>
      <form onSubmit={send} className="space-y-2">
        <label className="block text-sm">Name<input required className={f} style={st} value={s.name} onChange={(e) => setS({ ...s, name: e.target.value })} /></label>
        <label className="block text-sm">Email<input required type="email" className={f} style={st} value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} /></label>
        <label className="block text-sm">Message<textarea required rows={4} className={f} style={st} value={s.message} onChange={(e) => setS({ ...s, message: e.target.value })} /></label>
        <button className="btn">Send message</button>
      </form>
      <div className="flex gap-4">{[[Linkedin, socials.linkedin, 'LinkedIn'], [Github, socials.github, 'GitHub'], [Instagram, socials.instagram, 'Instagram'], [Youtube, socials.youtube, 'YouTube']].map(([I, h, l]: any) => <a key={l} href={h} aria-label={l} target="_blank" rel="noreferrer"><I /></a>)}</div>
      <div className="grid h-24 place-items-center border-4 border-dashed border-navy text-sm"><span className="flex items-center gap-1"><MapPin size={16} />Map placeholder: Berrien Springs, MI</span></div>
    </div>
  );
}

export function Blog() { return <div className="py-6 text-center"><h2 className="text-2xl">Blog</h2><p>No posts yet. Production notes will land here.</p></div>; }

export function Playground() {
  const [n, setN] = useState(0);
  return (
    <div className="relative h-80 overflow-hidden border-4 border-navy" style={{ background: 'linear-gradient(#7fb0ff,#F8F8F8)' }}>
      <p className="absolute left-3 top-2 text-sm font-bold text-navy">Drag everything. Click a folder {n > 0 && `(${n} opened)`}.</p>
      {['📁', '🗂️', '☁️', '💾', '🖥️', '📂'].map((e, i) => (
        <motion.button key={i} drag dragMomentum={false} whileHover={{ scale: 1.3, rotate: 12, skewX: 8 }} whileTap={{ scale: 0.8 }} onClick={() => setN(n + 1)}
          animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 3 + i, ease: 'easeInOut' }} className="absolute text-5xl" style={{ left: `${8 + i * 15}%`, top: `${25 + (i % 3) * 22}%` }} aria-label={`Floating ${e}`}>{e}</motion.button>
      ))}
      {n >= 5 && <div className="absolute inset-x-0 bottom-3 text-center display text-xl text-navy">You found the dream layer.</div>}
    </div>
  );
}
