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
					st = options.strBefore + st + options.strAfter;
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
						for (k in f.e[j])
						{
							console.log(k);
							$(e).bind(k, function () {
								change(e, n, o, 'text', f.e[j][k]);
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
			'e': [{ 'keyup': 1 }, { 'load' : 0 }],
			'f': function (e, o) {
				var st = ($(e).val().replace(/\n|\r/mg, '') != '') ? $(e).val() : o;
				st = ( $(e).is('textarea') ) ? st.replace(/\r|\n/mg, '<br />') : st;
				return st;
			}
		},
		'check': {
			'on': ':checkbox, :radio',
			'e': [{ 'click': 1 }, { 'load' : 0 }],
			'f': function (e, o) {
				return ($(e).is(':checked')) ? $(e).val() : o ;
			}
		},
		'select': {
			'on': 'select',
			'e': [{ 'change': 1 }, { 'load' : 0 }],
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
		'strBefore': '',
		'strAfter': ''
	};
})( jQuery );
