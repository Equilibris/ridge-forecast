import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"

const base = [
  { languageOptions: { globals: globals.browser } },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
]

base.rules ??= {}

export default base
