/**
 * Indicator part plot
 */

(function($)
{
	$.keyIndicators = {};
	
	/**
	 * Write indicator part plot:
	 * 
	 * 
	 * @param indicator		{
	 * 							name: indicator name, 
	 * 							value: user's value,
	 * 							minValue: minimum value or min range,
	 * 							normingValue: relative norming value, or max range,
	 * 							normingValueName: norming value name,
	 * 							help: help text,
	 *                          decimalPlaces: decimal places,
	 *                          hideNormingIndicator: Whether or not to show "good/great" indicator
	 * 						}
	 * @param indicatorValues: array with indicator values:
	 * 						{
	 * 							value: starts from this value (in percent)
	 * 							name: name,
	 * 							color: color
	 * 						}
	 * 
	 */
	$.keyIndicators.indicatorPart = function(indicator, indicatorValues)
	{
		var maxValue = indicator.normingValue * 2;
		var minValue = indicator.minValue;
		if(minValue == null)
		{
			minValue = 0;
		}
		
		
		indicatorValues =  
			[
				{value:150,name:'not so good',color:'#C56060'},
				{value:110,name:'below average',color:'#69B08D'},
				{value:90,name:'norm',color:'#69B08D'},
				{value:60,name:'good',color:'#69B08D'},
				{value:0,name:'great',color:'#69B08D'},
			]
		
		
		var normingPosition = 96;
		if(indicator.value > maxValue)
		{
			maxValue = indicator.value;
			normingPosition = Math.round((indicator.normingValue / (maxValue - minValue)) * 192);
		}
		
		var indicatorColor = '#69B08D';
		var indicatorWidth = Math.round((indicator.value / (maxValue - minValue)) * 212) - 10;
		
		if(indicatorWidth < 0)
		{
			if(indicator.value > 0)
			{
				indicatorWidth = Math.round((indicator.value / (maxValue - minValue)) * 212);
			} else
			{
				indicatorWidth = 0;
			}
		}
		
		var indicatorValueName = 'below average';
		
		var part = (indicator.value / indicator.normingValue) * 100.0;
		for (var i = 0; i < indicatorValues.length; i++)
		{
			if(part > indicatorValues[i].value)
			{
				indicatorColor = indicatorValues[i].color;
				indicatorValueName = indicatorValues[i].name;
				break;
			}
		}
		
		var decimalPlaces = indicator.decimalPlaces;
		if(decimalPlaces == null)
		{
			decimalPlaces = 0;
		}
		
		var minV = new NumberFormat(minValue);
		minV.setPlaces(decimalPlaces);
		minV.setSeparators(true);
		var fminV = minV.toFormatted();
				
		var iv = new NumberFormat(indicator.normingValue);
		iv.setPlaces(decimalPlaces);
		iv.setSeparators(true);
		var fiv = iv.toFormatted();
		
		var mv = new NumberFormat(maxValue);
		mv.setPlaces(decimalPlaces);
		mv.setSeparators(true);
		var fmv = mv.toFormatted();
				
		var v = new NumberFormat(indicator.value);
		v.setPlaces(decimalPlaces);
		v.setSeparators(true);
		var fv = v.toFormatted();
		
		var showNormingIndicator = true;
		if(indicator.hideNormingIndicator != null
			&& indicator.hideNormingIndicator)
		{
			showNormingIndicator = false;
		}
		var divTag = document.getElementById('content');
		var graphDiv = document.createElement('div');
		var innerHtml = ""
		innerHtml += '<div style="width: 360px; height: 172px; font-size: 12px; font-family:Roboto; font-weight: normal; color: black; background-color: #EFEFEF; position: relative; float: left;"><div style="width: 320px; height: 25px; margin: 14px 14px 14px 27px; float: left;"><div style="width: 290px; height: 25px; font-size: 16px; float: left;">'+indicator.name+'</div>';
		if(indicator.help != null && indicator.help != '')
		{
			innerHtml += '<div style="width: 25px; height: 25px; float: right;"><a href="javascript:void(0);" style="text-decoration: none; color: black; border-bottom: none;" onmouseover="return overlib('+"'"+indicator.help+"'"+ ', STICKY, MOUSEOFF, WRAP, CELLPAD, 5);" onmouseout="return nd();"><img style="width: 25px; height: 25px;" src="assets/images/helpbtn_grey.png" /></a></div>';
		}
		innerHtml += '</div><div style="width: 360px; height: 20px; float: left;"><div style="width: 86px; height: 20px; font-size: 30px; text-align: right; float: left;"></div>';
		innerHtml += '<div style="width: 100px; margin-left:' + normingPosition +'px; height: 20px; text-align: center; float: left;">'+ indicator.normingValueName + '</div>';
		innerHtml += '<div style="width: 350px; height: 40px; margin: 0px 5px 0px 5px; verical-align:middle; float: left;"><div style="width: 110px; height: 40px; margin-top: 3px; font-size: 30px; text-align: right; float: left;">'+fv+'</div>';
		innerHtml += '<div style="position: absolute; width: 3px; height: 10px; margin-left:' + (normingPosition + 128) + 'px; background-color:black;"></div>';
		innerHtml += '<div style="width: 212px; height: 30px; margin-top: 10px; margin-right: 14px; background-color:white; float: right;"><div style="width: ' + indicatorWidth + 'px; height: 20px; background-color: ' + indicatorColor + '; margin: 5px 5px 5px 5px; float: left;"></div></div></div>';
		innerHtml += '<div style="width: 360px; height: 20px; float: left;"><div style="width: 115px; height: 20px; font-size: 30px; text-align: right; float: left;"></div><div style="width: 40px; margin-left:' + normingPosition + 'px; height: 20px; text-align: center; float: left;">'+ fiv+'</div></div>';
		innerHtml += '<div style="width: 340px; height: 30px;  font-size: 16px; color: ' + indicatorColor + '; text-align:right; float: left;">';
		if(showNormingIndicator)
		{
			innerHtml += indicatorValueName;
		}
		innerHtml += '</div></div>';

		$(graphDiv).addClass("col-lg-12 col-sm-12");
		graphDiv.innerHTML = innerHtml;
		
		divTag.appendChild(graphDiv);
	};
	
})(jQuery);