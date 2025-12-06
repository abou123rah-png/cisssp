// src/env.d.ts
interface ImportMetaEnv {
  readonly VITE_GEMINI_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}