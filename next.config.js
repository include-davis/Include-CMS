/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./app/(pages)/_globals/styles'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
