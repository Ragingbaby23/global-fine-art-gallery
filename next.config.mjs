const isGithubPages = process.env.GITHUB_PAGES === 'true';
const basePath = isGithubPages ? '/global-fine-art-gallery' : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: isGithubPages ? '/global-fine-art-gallery/' : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
