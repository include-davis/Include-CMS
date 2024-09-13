/** @type {import('next').NextConfig} */
module.exports = {
  sassOptions: {
    includePaths: ['./app/(pages)/_globals/styles'],
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
