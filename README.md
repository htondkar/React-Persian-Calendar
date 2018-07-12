# React Persian Calendar
this is a simple yet practical persian calendar for react.

![screenshot-2017-10-2 react app](https://user-images.githubusercontent.com/15430048/31093607-1d4f02be-a7bf-11e7-85a0-47ea71374940.png)

## Important note
this component is dependant on ["moment-jalaali"](https://github.com/jalaali/moment-jalaali) package so make sure you install that first.

## Install 
`npm install --save react-persian-calendar`

## Use
```javascript
import Calendar from 'react-persian-calendar'

// your component details ...

render() {
  <Calendar onChange={handler}>
}
```

## Props
the only prop right now is `onChange` which accepts a function.

you can use your own styles just override the current styles 
using css.
