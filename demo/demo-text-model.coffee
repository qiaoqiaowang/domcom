{list,
a, checkbox, text
bindings} = require 'domcom/src/index'

module.exports = ->
  {$a, $b, _a, _b} = bindings({a: 1,  b: 2})
  comp = list(checkbox($a), checkbox($a), text($a), text($a))
  comp.mount()
  comp = list(a=text($a), text($a))
  comp.mount()
  comp = a = text($a)
  comp.mount()
  $a(5)
  comp.update()
  a.node.value = 10
  a.node.addEventListener('change', -> $a(@value); comp.update())
  setInterval((-> comp.update()), 16)