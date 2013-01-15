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



test "Enumerations", ->
	enumeration test.Enum
		VAR1: "var1"
		VAR2: "var2"
	
	eq test.Enum.VAR1, 'var1'
		

	
	
