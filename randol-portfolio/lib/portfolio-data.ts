// EDIT THIS FILE to change the site. No component edits needed.
export const site = {
  name: 'Randol José Ozoria Santana',
  roles: 'Information Systems Student · Audiovisual Producer · Creative Technologist',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://YOUR-USERNAME.github.io/randol-portfolio',
  description: 'Portfolio of Randol José Ozoria Santana: audiovisual production, live audio, camera operation and creative technology.',
  quote: 'Creating experiences between technology and imagination.',
  email: 'ozoriar@andrews.edu',
  email2: 'randolsantana55@gmail.com',
  resumePdf: '/resume/Randol-Ozoria-Resume.pdf',
  photo: '' // e.g. '/images/profile.jpg'
};
export const socials = {
  linkedin: 'https://linkedin.com/in/randol-santana-a3728630b',
  github: 'https://github.com/YOUR-USERNAME',
  instagram: 'https://instagram.com/YOUR-HANDLE',
  youtube: 'https://youtube.com/@YOUR-CHANNEL'
};
export const bio = 'Dependable AV technician and Information Systems student at Andrews University. I run live audio, cameras and ProPresenter for worship services, concerts and conference events, and I build the tools around them.';
export const about = {
  education: ['Andrews University, BBA Information Systems (2026–present), Berrien Springs, MI', 'Susan E. Wagner High School, Staten Island, NY (2026)'],
  interests: ['Live production', 'Worship media', 'Motion graphics', 'Creative coding', 'Photography'],
  current: ['Resident intern at Andrews University (AV)', 'This portfolio', 'Building a reel']
};
export const skills = {
  'Audio Visual': ['Live audio mixing', 'Camera operation', 'Live video production', 'ProPresenter', 'Display setup', 'Cable management', 'AV troubleshooting'],
  Consoles: ['Behringer', 'Allen & Heath', 'Mackie', 'Yamaha', 'Midas'],
  Software: ['Photoshop', 'Illustrator', 'Lightroom', 'DaVinci Resolve', 'Microsoft Office', 'Google Workspace'],
  Languages: ['Spanish (native)', 'English (advanced)']
};
export const experience = [
  { role: 'Audio Engineer', org: 'Woodside Spanish SDA Church, Queens, NY', when: 'Every Saturday', points: ['Mix live audio for weekly services, Chapel and Vespers', 'Run ProPresenter for lyrics, slides and video', 'Sound checks, troubleshooting, setup and teardown'] },
  { role: 'Graphics & Camera Operator', org: 'Greater New York Conference, Camp Berkshire', when: 'Camp events', points: ['Operated professional cameras for worship and concerts', 'Ran ProPresenter graphics and display systems', 'Worked at height: ladders, cable runs, equipment setup'] }
];
export const projects = Array.from({ length: 8 }, (_, i) => ({
  title: ['Sabbath Live Mix', 'Camp Concert Cut', 'Chapel Graphics Pack', 'Stage Plot Tool', 'Event Teardown Checklist', 'Motion Reel 2026', 'Signal Flow Diagrams', 'This Portfolio'][i],
  description: 'Placeholder description. Replace with what you built, your role and the result.',
  tags: [['Audio', 'Live'], ['Video', 'DaVinci'], ['Design', 'ProPresenter'], ['Code', 'Web'], ['Ops', 'AV'], ['Motion'], ['Design', 'AV'], ['Next.js', 'Design']][i],
  github: '', website: '', image: '', video: ''
}));
export type Photo = { src: string; alt: string; category: 'Photography' | 'Design' | 'Behind The Scenes' | 'Event Production'; h: number };
export const photos: Photo[] = Array.from({ length: 12 }, (_, i) => ({
  src: '', // e.g. '/images/photo-1.jpg'
  alt: `Gallery placeholder ${i + 1}`,
  category: (['Photography', 'Design', 'Behind The Scenes', 'Event Production'] as const)[i % 4],
  h: [180, 240, 150, 210][i % 4]
}));
export type Video = { title: string; category: 'AV Production' | 'Church Media' | 'Live Events' | 'Motion Graphics' | 'Reels'; kind: 'youtube' | 'vimeo' | 'mp4'; id: string };
// youtube/vimeo: id is the video ID. mp4: id is a path in /public/videos, e.g. '/videos/reel.mp4'
export const videos: Video[] = [
  { title: 'Demo reel (replace id)', category: 'Reels', kind: 'youtube', id: 'dQw4w9WgXcQ' },
  { title: 'Worship service highlights', category: 'Church Media', kind: 'youtube', id: 'dQw4w9WgXcQ' },
  { title: 'Concert multicam', category: 'Live Events', kind: 'vimeo', id: '76979871' },
  { title: 'Lower thirds test', category: 'Motion Graphics', kind: 'mp4', id: '/videos/sample.mp4' },
  { title: 'Stage setup timelapse', category: 'AV Production', kind: 'youtube', id: 'dQw4w9WgXcQ' }
];
