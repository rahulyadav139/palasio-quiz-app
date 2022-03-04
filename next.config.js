/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// env variables

module.exports = {
  env: {
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    COOKIE_SECRET_KEY: process.env.COOKIE_SECRET_KEY,
  },
};
