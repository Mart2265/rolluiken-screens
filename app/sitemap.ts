
export default async function sitemap() {
  const base = 'https://www.rolluikenvoorjou.nl';
  return [
    { url: base, lastModified: new Date() },
    { url: base + '/#producten', lastModified: new Date() },
    { url: base + '/#calculator', lastModified: new Date() },
    { url: base + '/#afspraak', lastModified: new Date() },
  ];
}
