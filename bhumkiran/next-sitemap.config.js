/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://www.bhumkiran.com.np",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  transform: async (config, path) => {
    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: path.startsWith("/blog") ? 0.9 : 0.7,
    };
  },
};

module.exports = config;
