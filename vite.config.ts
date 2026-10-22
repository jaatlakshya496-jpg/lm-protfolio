import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createRequire } from 'module';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);

/**
 * The `motion` package (and its `motion-dom` dependency) occasionally ships an
 * incomplete install, which breaks the whole production build with
 * "Could not resolve './render/VisualElement.mjs'".
 *
 * To make the build bulletproof we check whether the real package resolves and
 * only fall back to the local shim (src/shims/motion.tsx) when it does not.
 */
function hasRealMotion(): boolean {
  try {
    require.resolve('motion/react');
    return true;
  } catch {
    return false;
  }
}

export default defineConfig(() => {
  const useRealMotion = hasRealMotion();
  const shim = path.resolve(__dirname, 'src/shims/motion.tsx');

  if (!useRealMotion) {
    console.warn(
      '[vite] "motion/react" could not be resolved — using the local shim instead.'
    );
  }

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        ...(useRealMotion
          ? {}
          : { 'motion/react': shim, motion: shim }),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
