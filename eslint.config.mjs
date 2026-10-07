import tseslint from "typescript-eslint"

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.turbo/**",
      "**/.next/**",
    ],
  },
  ...tseslint.configs.recommended,
]
