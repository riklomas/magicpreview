;(function( $ ){
	$.fn.magicpreview = function(options) {
		var idstr = "preview_";
		$('*[id^="'+idstr+'"]').each(function () {
			var e = this;
			var o = $(this).text();
			var el = $('form#submitacode').find('*[name="'+$(this).attr('id').substr(idstr.length)+'"]');
			el.keyup(function () {
				var st = ($(this).val().replace(/\n|\r/mg, '') != '') ? $(this).val() : o;
				( $(this).is('textarea') ) ? $(e).html(st.replace(/\r|\n/mg, '<br />')) : $(e).text(st);
			});
			el.trigger('keyup');
		});
	}
})( jQuery );
