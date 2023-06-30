/** @type {import('next').NextConfig} */

const { version } = require("./package.json");

const nextConfig = {
  poweredByHeader: false,
  publicRuntimeConfig: {
    version,
  },
};

module.exports = nextConfig;
