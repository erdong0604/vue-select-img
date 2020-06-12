/*
 * @Description: 
 * @Author: chenM
 * @Date: 2020-04-16 14:05:39
 */
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "parser":"babel-eslint"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
        'semi': [2, 'always'], // 结尾必须有分号;
        "indent": [2, 4],//缩进风格; 
        "quotes": [2, "double"], //双引号
        'key-spacing': [2, { // 强制要求在对象属性和值之间使用一致的间距
            'beforeColon': false,
            'afterColon' : true
        }],
        'space-in-parens': [2, 'always'], // 强制在圆括号内使用一致的空格
        'array-bracket-spacing':[2,'always'],// 强制在中括号符号前后加空格
        'comma-dangle': [2, 'never'],// 禁止末尾逗号
    }
}
