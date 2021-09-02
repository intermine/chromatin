## styles/colors

Currently, we only have following colors:
1. Blue
1. Dark Grey
1. Green
1. Grey
1. Red
1. Yellow
1. Common: White (#fff) and Black (#000)

Above colors consider the theme type is light. If you need color for dark type you can use `createColor()`.
```js
const myNewColor = createColor('#23704a', { themeType: 'dark'})
console.log(myNewColor[10]) // '#06160e'
```