import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            // {
            //     source: '/',
            //     destination: '/dashboard',
            //     permanent: true,
            // },
        ]
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    }
};

export default nextConfig;
