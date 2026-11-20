'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Folder, FileText, Image as Img, Film, Mail, BookOpen, Moon, Sun, ArrowUp, Linkedin, Github, Instagram, Youtube, Power } from 'lucide-react';
import { site, socials, type Video } from '@/lib/portfolio-data';
import Window from './Window';
import { About, Resume, Projects, Gallery, Videos, Contact, Blog, Playground, Player } from '@/windows/Windows';

const apps = [
  { id: 'about', label: 'About Me', Icon: User }, { id: 'projects', label: 'Projects', Icon: Folder },
  { id: 'resume', label: 'Resume', Icon: FileText }, { id: 'gallery', label: 'Gallery', Icon: Img },
  { id: 'videos', label: 'Videos', Icon: Film }, { id: 'contact', label: 'Contact', Icon: Mail }, { id: 'blog', label: 'Blog', Icon: BookOpen }
];

export default function Desktop() {
  const [stage, setStage] = useState<'boot' | 'login' | 'desktop'>('boot');
  const [dark, setDark] = useState(false);
  const [order, setOrder] = useState<string[]>([]);
  const [min, setMin] = useState<Record<string, boolean>>({});
  const [video, setVideo] = useState<Video | null>(null);
  const [menu, setMenu] = useState(false);
  const [time, setTime] = useState('');

  useEffect(() => { const t = setTimeout(() => setStage('login'), 2400); return () => clearTimeout(t); }, []);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  useEffect(() => { const f = () => setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })); f(); const i = setInterval(f, 30000); return () => clearInterval(i); }, []);

  const focus = (id: string) => setOrder((o) => [...o.filter((x) => x !== id), id]);
  const open = (id: string) => { setMin((m) => ({ ...m, [id]: false })); focus(id); setMenu(false); };
  const close = (id: string) => setOrder((o) => o.filter((x) => x !== id));
  const toggle = (id: string) => (min[id] || order[order.length - 1] !== id ? open(id) : setMin((m) => ({ ...m, [id]: true })));
  const play = (v: Video) => { setVideo(v); open('player'); };

  const content: Record<string, { title: string; w?: number; node: React.ReactNode }> = {
    about: { title: 'About Me', node: <About /> }, resume: { title: 'Resume.pdf', w: 760, node: <Resume /> },
    projects: { title: 'Projects', w: 820, node: <Projects /> }, gallery: { title: 'Gallery', w: 820, node: <Gallery /> },
    videos: { title: 'Videos', w: 780, node: <Videos onPlay={play} /> }, contact: { title: 'Contact', node: <Contact /> },
    blog: { title: 'Blog', w: 460, node: <Blog /> }, playground: { title: 'playground.exe', w: 760, node: <Playground /> },
    player: { title: video?.title ?? 'Player', w: 720, node: video ? <Player v={video} /> : null }
  };

  if (stage !== 'desktop')
    return (
      <div className="sky fixed inset-0 grid place-items-center p-6 text-center text-cream">
        {stage === 'boot' ? (
          <div className="w-full max-w-md">
            <h1 className="display text-5xl text-navy">Randol OS</h1>
            <p className="mb-4 text-navy">Loading the museum, 2035 edition</p>
            <div className="border-4 border-navy bg-cream p-1"><div className="h-4 bg-lime" style={{ animation: 'load 2.2s steps(12) forwards' }} /></div>
          </div>
        ) : (
          <div className="card text-navy" style={{ background: '#F8F8F8' }}>
            <div className="mx-auto mb-3 grid h-24 w-24 place-items-center border-4 border-navy bg-xp display text-5xl text-cream">R</div>
            <h1 className="display text-2xl">{site.name}</h1>
            <button autoFocus className="btn mt-4" onClick={() => setStage('desktop')}>Enter portfolio</button>
          </div>
        )}
      </div>
    );

  return (
    <div className="sky fixed inset-0 overflow-hidden">
      <button onClick={() => open('playground')} aria-label="Mystery folder: open playground" className="drift absolute right-[12%] top-[38%] z-0 text-6xl opacity-70 hover:blur-[1px]">📁</button>
      <div aria-hidden className="drift absolute left-[40%] top-[8%] h-16 w-48 rounded-full bg-white/70 blur-md" />
      <h1 className="display pointer-events-none absolute bottom-24 right-6 text-right text-[12vw] leading-[.85] text-navy/80 sm:text-[9vw]">RANDOL<br />OZORIA</h1>

      <nav aria-label="Desktop" className="absolute left-3 top-3 z-0 flex flex-col flex-wrap gap-1" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {apps.map(({ id, label, Icon }) => (
          <button key={id} className="icon text-navy" onDoubleClick={() => open(id)} onKeyDown={(e) => e.key === 'Enter' && open(id)} onClick={(e) => e.detail === 0 && open(id)} aria-label={`Open ${label}`}>
            <Icon className="mx-auto mb-1" size={36} strokeWidth={1.5} /><span className="text-sm font-bold">{label}</span>
          </button>
        ))}
      </nav>

      <AnimatePresence>
        {order.map((id, i) => !min[id] && (
          <Window key={id} title={content[id].title} z={10 + i} offset={i % 6} w={content[id].w} onClose={() => close(id)} onMin={() => setMin((m) => ({ ...m, [id]: true }))} onFocus={() => focus(id)}>
            {content[id].node}
          </Window>
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {menu && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} className="win absolute bottom-[88px] left-0 z-[500] w-64">
            <div className="bar cursor-default"><span className="display">Randol OS</span></div>
            {apps.map(({ id, label, Icon }) => <button key={id} onClick={() => open(id)} className="flex items-center gap-2 px-3 py-2 text-left hover:bg-cyan"><Icon size={18} />{label}</button>)}
            <a className="flex items-center gap-2 px-3 py-2 hover:bg-cyan" href={`mailto:${site.email}`}><Power size={18} />Email Randol</a>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="absolute inset-x-0 bottom-0 z-[400] border-t-4 border-navy bg-navy text-cream">
        <div className="overflow-hidden border-b border-cyan/40 py-0.5 text-xs text-cyan" aria-hidden><div className="marq">★ {site.quote} ★ © {new Date().getFullYear()} {site.name} ★ {site.quote}</div></div>
        <div className="flex items-center gap-2 bg-gradient-to-b from-[#3F7BF0] to-xp p-1">
          <button className="display bg-lime px-4 py-1 text-navy shadow-[3px_3px_0_#021526]" onClick={() => setMenu((m) => !m)} aria-expanded={menu} aria-haspopup="menu">Start</button>
          <div className="flex flex-1 gap-1 overflow-x-auto" role="toolbar" aria-label="Open windows">
            {order.map((id) => <button key={id} onClick={() => toggle(id)} className={`truncate border-2 border-navy px-2 py-1 text-xs ${min[id] ? 'bg-xp/60' : 'bg-cream text-navy'}`}>{content[id].title}</button>)}
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            {[[Linkedin, socials.linkedin, 'LinkedIn'], [Github, socials.github, 'GitHub'], [Instagram, socials.instagram, 'Instagram'], [Youtube, socials.youtube, 'YouTube'], [Mail, `mailto:${site.email}`, 'Email']].map(([I, h, l]: any) => <a key={l} href={h} aria-label={l} target="_blank" rel="noreferrer"><I size={18} /></a>)}
          </div>
          <button onClick={() => setDark((d) => !d)} aria-label="Toggle dark mode" className="p-1">{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button onClick={() => { setOrder([]); window.scrollTo(0, 0); }} aria-label="Back to top: close all windows" className="p-1"><ArrowUp size={18} /></button>
          <span className="px-2 text-xs">{time}</span>
        </div>
      </footer>
    </div>
  );
}
