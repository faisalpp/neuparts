/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
        // domains: ['localhost', 'www.reliableappliancecs.com', 'th.bing.com', 'www.ccdietz.com', 'img.youtube.com'],
    },
    env: {
        NEXT_GOOGLE_API_KEY: 'AIzaSyCbPIrXFERaxgSurR_7wxbI-UdLRLTc94w'
    }
};

export default nextConfig;
