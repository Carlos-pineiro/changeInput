# changeInput

jquery input event does not include key pressed. This custom event extends input event, 
triggered only if an input-event happens that changes the value, and includes:
- event.key
- event.keyCode
- event.which

### How to use
It works like any jquery event

```
$('form input').on('changeInput', function(e) {
  console.log(e)
})
```
