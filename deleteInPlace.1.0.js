// Copyright 2018, William R. Morris.
;
(function($) {

    // here we go!
    $.deleteInPlace = function(element, options) {

	var attributesToIgnore = ['class', 'id'];
	
        var defaults = {

			clicked: function() {},
			label: {
				ok: "OK",
				cancel: "Cancel",
				confirm: "Are you sure?"
			}
        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element), // reference to the jQuery version of DOM element
             element = element;    // reference to the actual DOM element
		
        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

		var buttonOk = $("<a class='dp-confirm'>" + plugin.settings.label.ok + "</a>");
		var buttonCancel = $("<a class='dp-cancel'>" + plugin.settings.label.cancel + "</a>");
		var container1 = $("<div class='controlset controlset1'></div>");
		var container2 = $("<div class='controlset controlset2'></div>");
		var cssStyles = null;

		var C = $element;
		//
		var a = $("<div class='dp-controls'></div>");
		var f = $element.clone();
		f.click(function(){
			container1.fadeOut();
			container2.fadeIn();

		});
		a.mouseleave(function(){
			container2.fadeOut();
			container1.fadeIn();
		});

		container1.append(f);
		a.append(container1)

		if(plugin.settings.label.confirm != ''){
			container2.append("<span class=\"dp-confirmmsg\">" + plugin.settings.label.confirm + "</span>");
		}

		$.each($element[0].attributes, function(idx, attr){
			if(!attributesToIgnore.includes(attr.name)){
				buttonOk.attr(attr.name, attr.value);
				buttonCancel.attr(attr.name, attr.value);
			}
		});

		buttonOk.on("click", function(e){
			e.preventDefault();
			if(options.clicked !== undefined){
				options.clicked('ok', $(this)[0].attributes, e);
				container2.fadeOut();
				container1.fadeIn();
			}
		});
		container2.append(buttonOk);

		b = "&nbsp;/&nbsp;"
		container2.append(b);


		buttonCancel.on("click", function(e){
			e.preventDefault();
			if(options.clicked !== undefined){
				options.clicked('cancel', $(this)[0].attributes, e);
				container2.fadeOut();
				container1.fadeIn();
			}
		});
		container2.append(buttonCancel);

		a.append(container2);

		C.replaceWith(a);

        }

        plugin.init();

    }

    $.fn.deleteInPlace = function(options) {

	// styles creation
	var sheet = document.styleSheets[0];
	sheet.insertRule('.dp-controls * { font-size: 1em;}', 0);
	// the container that will hold all of the plugin-generated objects
	sheet.insertRule('.dp-controls { transition: opacity .5s; opacity: .2; cursor: default; display: inline-block; position: relative; padding: 1em; }', 0);
	// the containers for the created links
	sheet.insertRule('.dp-controls>div { position: absolute; left: 0; top: 0; font-size: 1.2em;}', 0);
	// the container for the OK/Cancel links
	sheet.insertRule('.dp-controls>div.controlset2 { display:none;white-space:nowrap; }', 0);
	sheet.insertRule('.dp-controls:hover { opacity: 1; }', 0);
	sheet.insertRule('.dp-confirm {font-weight: bold; color:#080;}', 0);
	sheet.insertRule('.dp-confirm:hover {color:#0F0;}', 0);
	sheet.insertRule('.dp-cancel {color:#A00;}', 0);
	sheet.insertRule('.dp-cancel:hover {color:#F00;}', 0);
	sheet.insertRule('.dp-confirmmsg {margin-right: 1em;}', 0);

        return this.each(function() {
            // if plugin has not already been attached to the element
            if (undefined == $(this).data('deleteInPlace')) {
		// $(this) refers to the element we're working on RIGHT NOW as a JQUERY object
                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
		// "this", in this case, is a non-JQUERY DOM element
                var plugin = new $.deleteInPlace(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('deleteInPlace').publicMethod(arg1, arg2, ... argn) or
                // element.data('deleteInPlace').settings.propertyName
                $(this).data('deleteInPlace', plugin);
            }

        });

    }

})(jQuery);
