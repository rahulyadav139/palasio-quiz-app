/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
  env: {
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    COOKIE_SECRET_KEY: process.env.COOKIE_SECRET_KEY,
    TEST_USERNAME: process.env.TEST_USERNAME,
    TEST_PASSWORD: process.env.TEST_PASSWORD,
  },
};
