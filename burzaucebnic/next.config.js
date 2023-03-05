/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: "",
        pathname: "/a/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        // port: "",
        pathname: "/v0/b/burzaucebnicga.appspot.com/o/**",
      },
    ],
  },
};

module.exports = nextConfig;
