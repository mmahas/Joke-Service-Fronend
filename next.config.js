const withLess = require('next-with-less');

module.exports = withLess({
  lessLoaderOptions: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: "standalone",
});
