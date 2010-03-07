# jQuery magicpreview plug-in

A [jQuery][jquery_site] based plug-in for automatically updates selected elements on a page based on form fields. 
Perfect for previewing forms.

## Usage

	$(form_fields).magicpreview(prefix, options);
	
For example:

	<h1 id="mp_title">Updating title</h1>

	<form action="#" class="example">
		<input type="text" name="title" />
	</form>

	<script type="text/javascript">
		$('form input').magicpreview('mp_');
	</script>

## Options

*	#### child
	A selector for a child element you want to select, for example if you wanted to pick the span elements in the chosen element, use 'span'
*	#### change
	What you want to change on the selected element, can be either 'text', 'html' or any attribute (e.g. 'src', 'alt')
*	#### onLoad
	Boolean for whether to run functions on page load
*	#### onBefore
	A function to be called before magicpreview runs, return true to run
*	#### onAfter
	A function to be called after magicpreview runs, return true to run, can take an argument of the value used in function call
*	#### formatValue
	A function to be called to format the value in magicpreview

For example:

	$('form.photopreview select').magicpreview('img_', {
		'child': 'img',
		'change': 'src',
		'onLoad': false,
		'onBefore': function () {
			alert('on before');
		},
		'onAfter': function () {
			alert('on after');
		},
		'formatValue': function (value) { 
			return 'images/' + value + '.jpg'
		}
	});

## Help make magicpreview better!

If you have a bug fix, the best way to help would be to:

* Fork the project by clicking "Fork this project" at the top of this page
* Clone your version of magicpreview from your Github account to your computer
* Fix and commit the bugs, then push your version to your Github account
* Click "pull request" at the top of my Github page

I can't promise to answer every question about magicpreview, 
but please do [report bugs here][issues] or [send me a message on Github][mail_me]. 

You can [watch magicpreview][github_watch] for updates or [follow me on Github][github_follow] 
and [on Twitter][twitter_follow].

## License

Under the same licenses as the jQuery library itself: <http://docs.jquery.com/License>

## Credits

jQuery magicpreview is made by [Rik Lomas][rik_site] at [Lomalogue][lomalogue_site]


[jquery_site]: http://www.jquery.com
[rik_site]: http://www.riklomas.co.uk
[lomalogue_site]: http://www.lomalogue.com
[issues]: http://github.com/riklomas/magicpreview/issues
[mail_me]: http://github.com/inbox/new/riklomas
[github_watch]: http://github.com/riklomas/magicpreview/toggle_watch
[github_follow]: http://github.com/users/follow?target=riklomas
[twitter_follow]: http://twitter.com/riklomas
[thelizardreborn]: http://github.com/thelizardreborn