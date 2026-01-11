import { withPayload } from '@payloadcms/next/withPayload'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  images: {
    remotePatterns: [
      ...[SERVER_URL].filter(Boolean).map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig, { dev }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    if (dev) {
      webpackConfig.watchOptions = {
        ...webpackConfig.watchOptions,
        ignored: ['**/node_modules/**', '**/media/**', '**/.git/**'],
      }
    }

    return webpackConfig
  },
  reactStrictMode: true,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
