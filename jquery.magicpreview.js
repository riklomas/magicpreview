;(function( $ ){
	$.fn.magicpreview = function(str, options) {
		
		var options = $.extend({}, $.fn.magicpreview.options, options);
		
		function change (e, n, o, typ, onload)
		{
			if (options.onBefore() && (options.onLoad || !onload))
			{
				var st = $.fn.magicpreview.events[typ].f(e, o);
				
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
			
			for (i in $.fn.magicpreview.events)
			{
				var f = $.fn.magicpreview.events[i];
				if ($(e).is(f.on)) 
				{
					for (j in f.e)
					{
						if (f.e[j] == 'load')
						{
							change(e, n, o, 'text', true);
						}
						else
						{
							$(e).bind(f.e[j], function () {
								change(e, n, o, 'text', false);
							});
						}
					}
				}
			}
		});
	};
	
	$.fn.magicpreview.events = {
		'text': {
			'on': ':text, textarea',
			'e': ['keyup', 'load'],
			'f': function (e, o) {
				var st = ($(e).val().replace(/\n|\r/mg, '') != '') ? $(e).val() : o;
				st = ( $(e).is('textarea') ) ? st.replace(/\r|\n/mg, '<br />') : st;
				return st;
			}
		},
		'check': {
			'on': ':checkbox, :radio',
			'e': ['click', 'load'],
			'f': function (e, o) {
				return ($(e).is(':checked')) ? $(e).val() : o ;
			}
		},
		'select': {
			'on': 'select',
			'e': ['change', 'load'],
			'f': function (e, o) {
				return $(e).val();
			}
		}
	};
		
	$.fn.magicpreview.options = {
		'change': 'html',
		'onLoad': true,
		'onBefore': function () { return true; },
		'onAfter': function () { return true; },
		'formatValue': function (val) { return val; }
	};
})( jQuery );
