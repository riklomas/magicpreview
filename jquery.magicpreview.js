;(function( $ ){
	$.fn.magicpreview = function(str, options) {
		
		return this.filter(':text, :radio, :checkbox, select, textarea').each(function () {
			var n = '#' + str + $(this).attr('id');
			var o = $(n).text();
			$(this).keyup(function () {
				var st = ($(this).val().replace(/\n|\r/mg, '') != '') ? $(this).val() : o;
				( $(this).is('textarea') ) ? $(n).html(st.replace(/\r|\n/mg, '<br />')) : $(n).text(st);
			});
			$(this).trigger('keyup');
		});
	}
})( jQuery );
