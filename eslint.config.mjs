import tseslint from "typescript-eslint"

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.turbo/**"],
  },
  ...tseslint.configs.recommended,
]
