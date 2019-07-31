(function($) 
{
	$.fn.CanvasHack = function() 
	{
		var canvases = this.find('canvas').filter(function() 
		{
			return $(this).css('position') == 'absolute';
		});
		canvases.wrap(function() 
		{
			var canvas = $(this);
			var div = $('<div />').css({position: 'absolute', top: canvas.css('top'), left: canvas.css('left'), right: canvas.attr('width')});
			canvas.css({top: '0', left: '0'});
			div.addClass(canvas.attr('className'));
			return div;
		});
		return this;
	};
})(jQuery);
