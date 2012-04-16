# Beerscript hacks
# ----------------


test "Private variables", ->
  toString = Boolean::toString

  my = {}
  my.namespace = {}
  
  class my.namespace.Test
    constructor: ->
      @_variable = 10
    _private: ->
      
    dolar: ->
      @[$private + 'variable']
  
  t = new my.namespace.Test
  

  eq typeof t.private, 'undefined'
  eq t.dolar(), 10

