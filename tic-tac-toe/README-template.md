### What I learned

- Arrow functions
- Classes and the class keyword are not the same
- Callback functions
- New keyword
- SVGs

Some examples:

```html
<svg class="x-icon" viewBox="-20 -16 100 100" width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#A8BFC9" fill-rule="evenodd"/></svg>
```
```css
.proud-of-this-css {
  color: papayawhip;
}
```
```js
//handleHover is not included in the the objects prototype, handleGameOver is
//BUT this works on handleHover but not on handleGameOver

handleHover = () => {
    this.view.displayHover();
}

handleGameOver(result){
//...
}
```