import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  integrations: [react()],
});
