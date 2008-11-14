;(function( $ ){
	$.fn.magicpreview = function(str, options) {
		return this.filter(':text, :radio, :checkbox, select, textarea').each(function () {
			var n = '#' + str + $(this).attr('name');
			var o = $(n).text();
			
			if ($(this).is(':text, textarea'))
			{
				$(this).keyup(function () {
					var st = ($(this).val().replace(/\n|\r/mg, '') != '') ? $(this).val() : o;
					( $(this).is('textarea') ) ? $(n).html(st.replace(/\r|\n/mg, '<br />')) : $(n).text(st);
				});
				$(this).trigger('keyup');
			}
			else if ($(this).is(':checkbox, :radio'))
			{
				function dothis(e)
				{
					$(n).html( ($(e).is(':checked')) ? $(e).val() : o );
				}
				$(this).click(function () { 
					dothis(this);
				});
				dothis(this);
			}
			else if ($(this).is('select'))
			{
				function dothis(e)
				{
					$(n).html($(e).val());
				}
				$(this).change(function () {
					dothis(this);
				})
				dothis(this);
			}
		});
	}
})( jQuery );
