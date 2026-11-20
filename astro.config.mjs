// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import diagramFigure from './src/plugins/diagram-figure.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://prashanthegde.in',
  markdown: {
    // Sätteri is Astro's default Markdown processor. The plugin turns
    // ![alt](/diagrams/<slug>/<slug>.svg "caption") into the accessible diagram figure.
    processor: satteri({ mdastPlugins: [diagramFigure] }),
  },
});