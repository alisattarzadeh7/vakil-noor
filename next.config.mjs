import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

console.log('next config read')
initOpenNextCloudflareForDev();

/** @type {import("next").NextConfig} */
const nextConfig = {
    output:'standalone'
};

export default nextConfig;
