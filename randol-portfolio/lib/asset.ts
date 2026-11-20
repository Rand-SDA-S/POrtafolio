export const asset = (p: string) => (p.startsWith('http') ? p : `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${p}`);
