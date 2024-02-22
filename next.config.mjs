/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'server-api.parcelcounter.in',
                port: '',
                pathname: '/storage/**',
            },
        ],
    },
};

export default nextConfig;
