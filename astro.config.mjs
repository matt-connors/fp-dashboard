import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import sitemap from '@astrojs/sitemap';
import compress from "astro-compress";
import react from '@astrojs/react';

/**
 * Astro Config file for Cloudflare
 * See https://docs.astro.build/en/guides/integrations-guide/cloudflare/
 */

// https://astro.build/config
export default defineConfig({
    site: "http://localhost:1129",
    output: "server",
    adapter: cloudflare({
        routes: {
            // strategy: "exclude",
            // extend: {
            //     exclude: [{ pattern: "/api/*" }],
            // }
        },
        // Use cloudflare image service for image optimization
        // https://developers.cloudflare.com/images/manage-images/create-variants/
        // ** can't be enabled without a domain -- wont work on pages.dev endpoint provided by cloudflare **
        // imageService: 'cloudflare',
    }),
    integrations: [
        // Compresses images and minifies HTML, CSS, and JS
        compress(),
        // Generates a sitemap file
        sitemap(),
        // React integration
        react(),
    ]
});