# Scroll direction
Simple library for detecting the scroll vertical direction.

[DEMO](https://codepen.io/gasparerr/pen/GRRLYwp?editors=1010)

- Provides a custom event `scrollDirectionChange`
- Automatically adds classes to an element based on the direction `scroll-direction-up` or `scroll-direction-down`.

```javascript
// YOU CAN PROVIDE AN OPTIONS OBJECT
const options = {
  target : document.getElementById('custom-scroll-container'),
  addClasses : false
};
new ScrollDirection(options);

// OR JUST NOTHING
// INITIALIZE AN INSTANCE
new ScrollDirection();

// YOU CAN NOW ACCESS THE CUSTOM EVENT FOR THE PROVIDED ELEMENT
window.addEventListener('scrollDirectionChange',function(ev){
  console.log(ev.detail.direction);
  // PRINTS "up" OR "down"
});

```

## Options

#### target

Type : `Element`  
Default : `window` 

#### addClasses

Type : `String` or Falsy value `Boolean`
Default : `body`  

By default `scroll-direction-up` and `scroll-direction-down` will be added to the class list of the body. You can provide a different selector or a falsy value like `''` or just `false`.

#### throttle

Type : `Int`
Default : 10
