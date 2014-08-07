$(document).ready(function() {
	var IE_LT_9;
	var IE_LT_8;
	var BR_VER
	/*@cc_on
		IE_LT_9 = (@_jscript_version < 9);
		IE_LT_8 = (@_jscript_version < 8);
		BR_VER = (@_jscript_version)
	@*/

	var evntStr;
	var textareas = $('textarea');

	if(BR_VER)
	{
		BR_VER = String(BR_VER)
		BR_VER = parseInt(BR_VER.charAt(BR_VER.length - 1))
	}

	if(navigator.appName == 'Microsoft Internet Explorer')
	{
		if(document.compatMode == "BackCompat") return;
		evntStr = (BR_VER < 9) ? 'propertychange' : 'input keyup';
	}
	else evntStr = 'input';

	function updateTA(taObj)
	{
		var insertVal = taObj.val()
		if(BR_VER)
		{
			//if(BR_VER <= 8) insertVal = taObj.val().replace(/\n/g, "\r\n")
			/*else if(BR_VER == 8) insertVal = taObj.val().replace(/\n/g, "\r\n")
			else if(BR_VER == 9) insertVal = taObj.val().replace(/\n/g, "\r\n")*/
		}

		mirror_cont.width(taObj.width());
		mirror.text(insertVal);
		if(mirror_cont.height() < taObj.data('minHeight')) taObj.height(taObj.data('minHeight'));
		else taObj.height(mirror_cont.height());
	}

	$('body').append('<pre id="mirror_cont"><span id="mirror"></span><br /></pre>');

	var mirror_cont = $('#mirror_cont');
	var mirror = $('#mirror');

	mirror_cont.css({
		'border' : '1px solid #CCC',
		'white-space' : '-moz-pre-wrap',
		'white-space' : '-pre-wrap',
		'white-space' : '-o-pre-wrap',
		'white-space' : 'pre-wrap',
		'word-wrap' : 'break-word',
		'display' : 'none'
	});

	textareas.css({'overflow' : 'hidden'});

	textareas.each(function() {
		$(this).data('minHeight', $(this).height());

		var w = $(this).width()
		var bord_color = $(this).css('border-bottom-color') ? $(this).css('border-bottom-color') : '#0F3E70'
		$(this).css({'font-size' : '10pt', 'font-family' : 'Arial', 'font-weight' : 'normal'})
		$(this).css({'width' : w})
		$(this).css({'border' : '1px solid ' + bord_color})

		updateTA($(this));

	});

	textareas.bind(evntStr, function() {
		updateTA($(this));
	});
});
