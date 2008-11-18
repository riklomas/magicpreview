(function( $ ){
	$.fn.magicpreview = function(str, options) {
		
		if (typeof str === "object" && typeof options === "undefined") // If function(options)
		{
			options = str;
			str = '';
		}
		
		str = str || '';
		options = $.extend({}, $.fn.magicpreview.options, options);
		
		var ev = $.fn.magicpreview.events, len = ev.length;
		
		function change (e, n, o, i, onload)
		{
			if (options.onBefore() && (options.onLoad || !onload))
			{
				var st = ev[i].f(e);
				
				if (st !== false) 
				{
					st = st.replace(/\r|\n/mg, '<br />');
					st = options.formatValue(st);
				}
				else
				{
					st = o;
				}
				
				
				if (options.change == 'html') 
				{
					n.html(st);
				}
				else if (options.change == 'text') 
				{
					n.text(st);
				}
				else
				{
					n.attr(options.change, st);
				}
				
				options.onAfter();
			}
			return;
		}
		
		return this.filter(':text, :radio, :checkbox, select, textarea').each(function () {
			var e = this;
			if (options.child !== false)
			{
				var n = $('#' + str + $(e).attr('name')).find(options.child);
			}
			else
			{
				var n = $('#' + str + $(e).attr('name'));
			}
			
			if (options.change == 'html') 
			{
				var o = n.html();
			}
			else if (options.change == 'text') 
			{
				var o = n.text();
			}
			else
			{
				var o = n.attr(options.change);
			}
			
			for (var i = 0; i < len; i++)
			{
				if ($(e).is(ev[i].on)) 
				{
					e.i = i; // MASSIVE HACK!
					
					if (typeof ev[i].e !== 'undefined')
					{
						for (j in ev[i].e)
						{
							if (ev[i].e[j] === 'load')
							{
								change(e, n, o, e.i, true);
							}
							else if (typeof ev[i].e[j] === 'string')
							{
								$(e).bind(ev[i].e[j], function () {
									change(this, n, o, e.i, false);
								});
							}
						}
					}
				}
			}
		});
	};
	
	$.fn.magicpreview.events = [{
			'on': ':text, textarea',
			'e': ['keyup', 'load'],
			'f': function (e) {
				return ($(e).val().replace(/\n|\r/mg, '') !== '') ? $(e).val() : false;
			}
		}, {
			'on': ':checkbox, :radio',
			'e': ['click', 'load'],
			'f': function (e) {
				return ($(e).is(':checked')) ? $(e).val() : false;
			}
		}, {
			'on': 'select',
			'e': ['change', 'load'],
			'f': function (e) {
				return ($(e).attr('value') !== '' || $(e).attr('value') !== 'undefined') ? $(e).attr('value') : false;
			}
		}];
		
	$.fn.magicpreview.options = {
		'child': false,
		'change': 'html',
		'onLoad': true,
		'onBefore': function () { return true; },
		'onAfter': function () { return true; },
		'formatValue': function (val) { return val; }
	};
})( jQuery );
