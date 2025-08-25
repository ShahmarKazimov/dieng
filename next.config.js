const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "194.163.159.104",
        port: "5044",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5044",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
