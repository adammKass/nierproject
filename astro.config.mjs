// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

import react from "@astrojs/react";

import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  site: "https://adamkascak.com",
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [icon(), react(), favicons()],
});
