;(function( $ ){
	$.fn.magicpreview = function(str, options) {
		
		if (typeof str == "object" && typeof options == "undefined") // If function(options)
		{
			options = str;
			str = '';
		}
		
		str = str || '';
		options = $.extend({}, $.fn.magicpreview.options, options);
		
		function change (e, n, o, fn, onload)
		{
			if (options.onBefore() && (options.onLoad || !onload))
			{
				var st = fn(e, o);
				console.log(fn);
				
				if (o != st) 
				{
					st = options.formatValue(st);
				}
				
				if (options.change == 'html') 
				{
					$(n).html(st);
				}
				else if (options.change == 'text') 
				{
					$(n).text(st);
				}
				else
				{
					$(n).attr(options.change, st);
				}
				
				options.onAfter();
			}
		}
		
		return this.filter(':text, :radio, :checkbox, select, textarea').each(function () {
			var e = this;
			var n = '#' + str + $(this).attr('name');
			var o = $(n).text();
			
			for (var m = 0; m < $.fn.magicpreview.events.length; m++)
			{
				var f = $.fn.magicpreview.events[m];
				var fn = $.fn.magicpreview.events[m].f;
				
				if ($(e).is(f.on)) 
				{
					for (j in f.e)
					{
						if (f.e[j] == 'load')
						{
							change(e, n, o, fn, true);
						}
						else
						{
							$(e).bind(f.e[j], function () {
								change(e, n, o, fn, false);
							});
						}
					}
				}
			}
		});
	};
	
	$.fn.magicpreview.events = [{
			'on': ':text, textarea',
			'e': ['keyup', 'load'],
			'f': function (e, o) {
				var st = ($(e).val().replace(/\n|\r/mg, '') != '') ? $(e).val() : o;
				st = ( $(e).is('textarea') ) ? st.replace(/\r|\n/mg, '<br />') : st;
				return st;
			}
		}, {
			'on': ':checkbox, :radio',
			'e': ['click', 'change', 'load'],
			'f': function (e, o) {
				console.log( $(e).is(':checked') );
				return ($(e).is(':checked')) ? $(e).val() : o ;
			}
		}, {
			'on': 'select',
			'e': ['change', 'load'],
			'f': function (e, o) {
				return $(e).val();
			}
		}];
		
	$.fn.magicpreview.options = {
		'change': 'html',
		'onLoad': true,
		'onBefore': function () { return true; },
		'onAfter': function () { return true; },
		'formatValue': function (val) { return val; }
	};
})( jQuery );
