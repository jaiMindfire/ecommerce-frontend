/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // This ensures it's secure, but you can also allow 'http' if needed
        hostname: "**", // The '**' allows any hostname
      },
    ],
  },
};

export default nextConfig;
