(function() {
  var activate, activate_coffee2js, activate_js2coffee, coffeejs_is_active, randomFrom, samples;
  samples = {
    js: ["/* Type here! */\n\n(function ($) {\n    $.fn.highlight = function () {\n        $(this).css({ color: 'red', background: 'yellow' });\n        $(this).fadeIn();\n    };\n})(jQuery);", "/* Type here! */\n\nScope.prototype.find = function(name, options) {\n    if (this.check(name, options)) {\n        return true;\n    }\n    \n    this.add(name, 'var');\n    return false;\n}", "/* Type here! */\n\nWidget = {\n    hide: function() {\n        return this.element\n          .animate({opacity: 0.0, top: -10});\n    },\n    show: function() {\n        return this.element\n          .animate({opacity: 1.0, top: 0});\n    },\n    element: $(\".widget\")\n}"],
    coffee: ["# Type here!\n\nmath =\n  root:   Math.sqrt\n  square: square\n  cube:   (x) -> x * square x\n\nalert \"Three cubed is \#{math.cube 3}\"", "# Type here!\n\ndays =\n  monday: 1\n  tuesday: 2\n  wednesday: 3\n  thursday: 4\n  friday: 5\n  saturday: 6\n  sunday: 7\n  \nif yesterday is thursday\n  today = friday\n  we.excited()\n  we.have ball: today"]
  };
  randomFrom = function(arr) {
    return arr[parseInt(Math.random() * arr.length)];
  };
  activate = function(id, options) {
    var CoffeeMode, JavaScriptMode, editor, s;
    editor = ace.edit(id);
    s = editor.getSession();
    editor.setTheme("ace/theme/clouds");
    if (options.type === "javascript") {
      JavaScriptMode = require("ace/mode/javascript").Mode;
      editor.getSession().setMode(new JavaScriptMode());
    } else if (options.type === "coffeescript") {
      CoffeeMode = require("ace/mode/coffee").Mode;
      editor.getSession().setMode(new CoffeeMode());
    }
    editor.getSession().setTabSize(options['tabSize'] || 4);
    editor.getSession().setUseSoftTabs(true);
    editor.renderer.setShowPrintMargin(false);
    editor.renderer.setHScrollBarAlwaysVisible(false);
    editor.renderer.setShowGutter(false);
    if (options.readonly) {
      editor.setReadOnly(true);
    }
    if (options.noActiveLine) {
      editor.setHighlightActiveLine(false);
    }
    return editor;
  };
  activate_js2coffee = function() {
    var editor, onchange, output;
    editor = activate("js2coffee_editor", {
      type: "javascript"
    });
    output = activate("js2coffee_output", {
      type: "coffeescript",
      tabSize: 2,
      noActiveLine: true
    });
    onchange = function() {
      var input, out;
      input = editor.getSession().getValue();
      try {
        out = Js2coffee.build(input);
        $("#js2coffee .error").hide();
        return output.getSession().setValue(out);
      } catch (e) {
        $("#js2coffee .error").html("" + e);
        return $("#js2coffee .error").show();
      }
    };
    editor.getSession().on("change", onchange);
    editor.getSession().setValue(randomFrom(samples.js));
    return onchange();
  };
  coffeejs_is_active = false;
  activate_coffee2js = function() {
    var editor, onchange, output;
    if (coffeejs_is_active) {
      return;
    }
    coffeejs_is_active = true;
    editor = activate("coffee2js_editor", {
      type: "coffeescript",
      tabSize: 2
    });
    output = activate("coffee2js_output", {
      type: "javascript",
      noActiveLine: true
    });
    onchange = function() {
      var input, out;
      input = editor.getSession().getValue();
      try {
        out = CoffeeScript.compile(input, {
          bare: "on"
        });
        $("#coffee2js .error").hide();
        return output.getSession().setValue(out);
      } catch (e) {
        $("#coffee2js .error").html("" + e);
        return $("#coffee2js .error").show();
      }
    };
    editor.getSession().on("change", onchange);
    editor.getSession().setValue(randomFrom(samples.coffee));
    return onchange();
  };
  $("#tabs a.tab").live("click", function() {
    var $form, target;
    target = $(this).attr("href").substr(1);
    $form = $("form#" + target);
    $("#editors form").hide();
    $("#" + target).show();
    if (target === 'coffee2js') {
      activate_coffee2js();
    }
    $("#" + target + " .editor textarea").focus();
    $("#tabs a").removeClass("active");
    $(this).addClass("active");
    return false;
  });
  $(window).resize(function() {
    var h;
    h = $(window).height() - 80;
    if (h < 500) {
      h = 500;
    }
    $("#editors").css({
      height: h
    });
    return $("#editors form").css({
      height: h 
    });
  });
  $("p.more-info a").live('click', function() {
    $("body").animate({
      scrollTop: $("#info").offset().top - 10,
      1000: 1000
    });
    return false;
  });
  $(window).trigger('resize');
  $(function() {
    activate_js2coffee();
    $("#js2coffee .editor textarea").focus();
    //activate_coffee2js();

    return $(window).trigger('resize');
  });


$(document).ready(function(){
	$($("#tabs a")[1]).click();
	editor = activate("coffee2js_editor", {
      type: "coffeescript",
      tabSize: 2
    });
       output = activate("coffee2js_output", {
      type: "javascript",
      noActiveLine: true
    });
    	if(document.location.hash) {
    	  var dh = document.location.hash.substr(1);
    	  $.get('pastebin.php?i='+dh, function(response){
			 editor.getSession().setValue(response);
    	  
    	  });

    	
    	}
    	else {
			 editor.getSession().setValue('');
    	}

    
      onchange = function() {
      var input, out;
      input = editor.getSession().getValue();
      try {
        out = CoffeeScript.compile(input, {
          bare: "on"
        });
        $("#coffee2js .error").hide();
        return output.getSession().setValue(out);
      } catch (e) {
        $("#coffee2js .error").html("" + e);
        return $("#coffee2js .error").show();
      }
    };
    editor.getSession().on("change", onchange);
    
	$('#try').click(function(e){
		e.preventDefault();
		
		o = output.getSession().getValue();
		try {
		eval(o);
		}
		catch(error) {
			window.log(error);
			throw error;
		}

		
		
	});

	$('#save').click(function(){
	 data = editor.getSession().getValue();
	 //alert(data);
	 
	 $.post('pastebin.php', {data: data}, function(response) {
	 	document.location.hash = '#' + response;
	 	prompt('Url',document.location);
	 });
	
	});
	
	
	function escapeHtml(unsafe) {
 	 return unsafe
    	  .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
	}
	
	
	Number.prototype.padZero= function(len){
 var s= String(this), c= '0';
 len= len || 2;
 while(s.length < len) s= c + s;
 return s;
}


	window.log = function(m){
		console.log(m);
		now = new Date();	
		time = now.getHours().padZero(3) + ':' + now.getMinutes().padZero(3)+ ':' + now.getSeconds().padZero(3);
		time  = time.replace(/\b0(?=\d)/g, '')
		h = $('#console').html();
		$('#console').html(h + "<span style=\"color:#777 !important\">[" + time + "]</span> " + escapeHtml(m +'')+"<br/>" );
		
		$("#console").stop().animate({ scrollTop: $("#console").attr("scrollHeight") }, 500);
//		 += m;
	
	}
	
	window.log("log 'message' # will appear here and in javascript console - version: " + CoffeeScript.VERSION);

});



}).call(this);

