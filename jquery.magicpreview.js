;(function( $ ){
	$.fn.magicpreview = function(str, options) {
		
		return this.filter(':text, :radio, :checkbox, select, textarea').each(function () {
			
			var n = '#' + str + $(this).attr('name');
			var o = $(n).text();
			
			if ($(this).is(':text, textarea'))
			{
				$(this).keyup(function () {
					$.fn.magicpreview.change(this, n, o, 'text', false);
				});
				$.fn.magicpreview.change(this, n, o, 'text', true);
			}
			else if ($(this).is(':checkbox, :radio'))
			{
				$(this).click(function () { 
					$.fn.magicpreview.change(this, n, o, 'check', false);
				});
				$.fn.magicpreview.change(this, n, o, 'check', true);
			}
			else if ($(this).is('select'))
			{
				$(this).change(function () {
					$.fn.magicpreview.change(this, n, o, 'select', false);
				})
				$.fn.magicpreview.change(this, n, o, 'select', true);
			}
		});
	};
	
	$.fn.magicpreview.change = function (e, n, o, typ, onload)
	{
		if ($.fn.magicpreview.options.onBefore() && ($.fn.magicpreview.onLoad || !onload))
		{
			var st = $.fn.magicpreview.changers[typ](e, o);
			$(n).html(st);
			$.fn.magicpreview.options.onAfter()
		}
	};
	
	$.fn.magicpreview.changers = {
		'text': function (e, o) {
			var st = ($(e).val().replace(/\n|\r/mg, '') != '') ? $(e).val() : o;
			st = ( $(e).is('textarea') ) ? st.replace(/\r|\n/mg, '<br />') : st;
			return st;
		},
		'check': function (e, o) {
			return ($(e).is(':checked')) ? $(e).val() : o ;
		},
		'select': function (e, o) {
			return $(e).val();
		}
	}
	
	$.fn.magicpreview.options = {
		'onLoad': true,
		'onBefore': function () { return true; },
		'onAfter': function () { return true; }
	};
})( jQuery );
