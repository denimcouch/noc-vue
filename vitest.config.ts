import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [tsconfigPaths()],
    test: {
      environment: 'jsdom',
      root: fileURLToPath(new URL('./', import.meta.url)),
      include: ['**/*.spec.ts'],
      globals: true,
      clearMocks: true,
      mockReset: true,
      setupFiles: ['src/__tests__/setup.ts'],
    },
  }),
)
