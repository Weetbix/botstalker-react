module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "airbnb"
    ],
    "rules": {
        "indent": [2, 4],
        "comma-dangle": ["error", "never"],
        "react/prefer-stateless-function" : "off",
        "react/jsx-indent": ["error", 4],
        "react/jsx-first-prop-new-line": "off",
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-closing-bracket-location": ["error", "after-props"]
    }
};