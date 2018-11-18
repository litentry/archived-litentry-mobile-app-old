module.exports = {
  extends: ['universe/native', "plugin:react/recommended"],
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
  },
  settings: {
    react: {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.5.0", // React version, default to the latest React stable release
    },
  },
  rules: {
    "react/prefer-stateless-function": [
      1,
      // { "ignorePureComponents": true }
    ]
  }
};