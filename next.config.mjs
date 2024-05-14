import createMDX from '@next/mdx';
import remarkGFM from 'remark-gfm';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'standalone',
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGFM],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
