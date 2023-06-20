module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json", // point to your TypeScript configuration file
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "next/core-web-vitals", "prettier"],
  plugins: ["react"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
  },
};
