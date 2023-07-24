/**
 *  storing ovelib.js overlib function, as we over-writting it in app.utility.js
 */
overLib = overlib;

/**
 * jqPlot facade to make constructing of standard charts used in HEA possible
 * with less code and to keep most default configuration/style options centralized.
 */

function getRatio() {
	var div = $("<div id='testdiv' style='height: 1in; left: -100%; position: absolute; top: -100%; width: 1in;'></div>");
	div.appendTo($("body"));

	var devicePixelRatio = window.devicePixelRatio || 1;
	var dpi = div[0].offsetWidth * devicePixelRatio;

	var ratio = 1200 / dpi;

	div.remove();
	return ratio;
}

function scaleIt(source, ratio) {
	var c = document.createElement('canvas');
	var ctx = c.getContext('2d');
	var w = source.width * ratio;
	var h = source.height * ratio;
	c.width = w;
	c.height = h;
	ctx.drawImage(source, 0, 0, w, h);

	return (c);
}

function scaleCanvas(rootElement) {
	var ratio = getRatio();

	// upscale the canvas if the two ratios don't match
	if (ratio != 1) {
		$(rootElement).find('canvas').each(function () {
			var canvas = this;
			scaleIt(canvas, ratio);
			/*
			var contex = canvas.getContext("2d");
			var oldWidth = canvas.width;
			var oldHeight = canvas.height;
			
			canvas.width = oldWidth * ratio;
			canvas.height = oldHeight * ratio;
		    
			canvas.style.width = oldWidth + 'px';
			canvas.style.height = oldHeight + 'px';
		    
			context.scale(ratio, ratio);
			*/
		});
	}
}

function _formatValueWithUnit(value, decimalPlaces, unit) {
	var nf = new NumberFormat(value);
	nf.setPlaces(decimalPlaces);
	nf.setSeparators(true);
	var fn = nf.toFormatted();

	return _formatWithUnit(fn, unit);
}

function _formatWithUnit(value, unit) {
	return (unit == '$') ? ('$' + value) : (value + (unit == '%' ? '' : ' ') + unit);
}

function findTickInterval(max, min, numTicks) {
	if (numTicks > 7) {
		numTicks = 7;
	}
	return findTickIntervalBase(max, min, numTicks);
}

/* 
1) calculates "best" tick interval for JQPlot
2) ONLY works effectively when (max - min) >= 5
*/
function findTickIntervalBase(max, min, numTicks) {
	var intervalFactor = [1, 2, 3, 5], found = false, tickInterval = 1, calcNumTicks;

	for (var i = 0; i < 10 && !found; i++) {
		for (var j = 0; j < intervalFactor.length && !found; j++) {
			tickInterval = intervalFactor[j] * Math.pow(10, i);
			calcNumTicks = (max - min) / tickInterval;
			if (calcNumTicks <= numTicks) {
				found = true;
			}
		}
	}
	return tickInterval;
}

(function ($) {
	$.heaplot =
	{
		colors:
		{
			undefined: '#E3E4E5',
			baseLoads: '#4B9C96',
			recurringLoads: '#E2C566',
			variableLoads: '#01628C',
			variableEV: '#A4DB61',
			summerAC: '#20A5B9',
			winterSpaceHeating: '#D76B6B'			
		},
		
		names: 
		{
			undefined: '',
			baseLoads: 'Always on',
			recurringLoads: 'Recurring Loads',
			variableLoads: 'Variable Loads',
			variableEV: 'EV Charging',
			summerAC: 'Summer Cooling',
			winterSpaceHeating: 'Winter Space Heating'			
		},
		
		lineNames: 
		{
			baseLoads: 'line1',
			recurringLoads: 'line2',
			variableLoads: 'line3',
			variableEV: 'line3EV',
			summerAC: 'line4',
			winterSpaceHeating: 'line5'
		},
		
		lines: ['line1', 'line2', 'line3', 'line3EV', 'line4', 'line5']
	};

	/**
					undefined: '#E3E4E5',
					baseLoads: '#A799EB',
					recurringLoads: '#FDE586',
					variableLoads: '#ADBF88',
					summerAC: '#BFD9FA',
					winterSpaceHeating: '#E69292'
	   */
	/**
	 * Adds a "doubleValue" function to the jQuery object,
	 * which can be used to convert an input field containing
	 * a formatted number (e.g. with thousand separators) to its
	 * arithmetic value. If the input field is empty, the value
	 * is assumed to be 0 (rather than undefined/NaN).
	 */
	$.fn.extend({
		doubleValue: function () {
			var v;
			if (this.length >= 1) {
				v = parseFloat(this.val().replace(/[^0-9$.]/g, ''));
			} else {
				v = NaN;
			}
			return isNaN(v) ? 0 : v;
		}
	});

	/**
	 * Renders a treemap chart which can be used to visualize a set of user inputs in a survey pane,
	 * (e.g. percentual areas of lot covered by different plants in w_landscapeData).
	 * 
	 * Note: this function requires d3.js library to be included in the page. 
	 * 
	 * @param _treemapDef associative array: {
	 * 							id: id for the treemap DIV element,
	 * 							nodeStyle: base CSS style attribute for all nodes,
	 * 							children: an array of node definitions, each of which: {
	 *								input: jQuery selector for the INPUT element for this node's value,
	 *								style: (optional) CSS style attribute for this node,
	 *								class: (optional) CSS class for this node,
	 *								label: (optional) text for this node,
	 *								calculation: (optional) JavaScript expression to calculate the value
	 *								             of this node onchange;
	 *								             if provided, the INPUT element will be set readonly,
	 *								show: (optional, default: true) if false, don't show this node on treemap,
	 *									  which may be useful if it is only involved in calculation
	 *                          }
	 * 						}
	 */
	$.heaplot.treemap = function (_treemapDef) {
		// Position and size the chart relative to the surveyAnswers table, next to the help icons.
		// This includes some hacky assumptions about how the survey pane is laid out.

		// var $firstHelpIcon = $('table.surveyAnswers input:first').find('img');
		// var bbox = $('#scrollhardscape').get(0).getBoundingClientRect();
		//  var icon = $firstHelpIcon.get(0).getBoundingClientRect();
		// var tbody = $('#scrollhardscape').get(0).getBoundingClientRect();
		// var left = 300 + 300 - bbox.left + 40,
		// 	top = tbody.top - bbox.top,
		// 	width = tbody.width - (left - tbody.left)+100,
		// 	height = tbody.height;
		var $firstHelpIcon = $('table.surveyAnswers input:first').closest('td').find('img');
		var bbox = $('#scrollhardscape').get(0).getBoundingClientRect();
		// var icon = $firstHelpIcon.get(0).getBoundingClientRect();
		var tbody = $('table.surveyAnswers tbody').get(0).getBoundingClientRect();
		var left = 300 + 150 - bbox.left + 40,
			top = tbody.top - bbox.top,
			width = tbody.width - (left - tbody.left) - 500,
			height = tbody.height - 50;

		$('table.surveyAnswers thead').append(
			$('<div></div>')
				.attr('id', _treemapDef.id)
				.css('position', 'absolute')
				.css('top', top + 'px')
				.css('left', left + 'px')
				.css('width', width + 'px')
				.css('height', height + 'px')
		);

		// Deep copy, filter children to include only those without "show: false"

		var treemapDef = $.extend(true, {}, _treemapDef);
		treemapDef.allChildren = treemapDef.children;
		treemapDef.children = $.map(treemapDef.allChildren, function (val, i) {
			return val.show || typeof val.show === "undefined" ? val : null;
		});

		// Set INPUTs which have 'calculation' to readonly.

		$.each(treemapDef.allChildren, function (i, val) {
			if (val.calculation) $(val.input).attr('readonly', 'readonly');
		});

		// Initialize the treemap layout and create node DIVs:

		var treemap = d3.layout.treemap()
			.size([$('#' + treemapDef.id).width(), $('#' + treemapDef.id).height()])
			.mode('squarify')
			.sticky(false)
			.sort(null);

		var nodeSelection =
			d3.select('#' + treemapDef.id).data([treemapDef]).selectAll('.node').data(treemap.nodes);

		nodeSelection.enter()
			.append('div')
			.attr('style', function (d) {
				return [
					treemapDef.nodeStyle || '',
					d.style || '',
					'position: absolute'
				].join(';')
			})
			.attr('class', function (d) { return 'node ' + d.class; })
			.text(function (d) { return d.children ? null : d.label; });

		// Called to position and size each node according to coordinates computed by treemap:
		var position = function () {
			this.style('left', function (d) { return d.x + 'px'; })
				.style('top', function (d) { return d.y + 'px'; })
				.style('width', function (d) { return Math.max(0, d.dx - 1) + 'px'; })
				.style('height', function (d) { return Math.max(0, d.dy - 1) + 'px'; })
				.style('line-height', function (d) { return Math.max(0, d.dy - 1) + 'px'; });
		};

		// Called to provide value for each node from its source INPUT element:
		var nodeValue = function (d) {
			return Math.max($(d.input).doubleValue(), 0);
		};

		// Called to initialize nodes and also to transfer newly entered values into nodes
		// and recompute their positions:
		var updateTreemap = function () {
			$.each(treemapDef.allChildren, function (i, val) {
				if (val.calculation) $(val.input).val(eval(val.calculation));
			});

			nodeSelection.data(treemap.value(nodeValue).nodes).transition().duration(300).call(position);
		};

		updateTreemap();
		$('table.surveyAnswers input').change(updateTreemap);
	};

	/**
	 * Renders the chart combo used in key indicators page:
	 * 
	 * - two norming charts
	 * 
	 * @param normData		associative array: {
	 * 							value: user's value,
	 * 							unit: unit label for values, e.g. "kWh",
	 * 							n1: value of first norm,
	 * 							`Label: label for first norm, e.g. "California",
	 *                          n2: value of second norm,
	 *                          n2Label: label for second norm, e.g. "Los Altos Hills",
	 *                          maxNorm: maximum value,
	 *                          decimalPlaces: decimal places,
	 *                          div1Name: div id for for first norm,
	 *                          div2Name: div id for for second norm,
	 *                          drawTableCommon: true - draw common div part,
	 *                          drawTable: true - draw div parts
	 * 						}
	 * 
	 */
	$.heaplot.normingBars = function (normData) {
		var maxNorm = 0;
		var value = normData.value;
		if (value == null) {
			value = normData.normingValue;
		}

		var decimalPlaces = normData.decimalPlaces;
		if (decimalPlaces == null) {
			decimalPlaces = 0;
		}

		div1 = 'chartThreeNorms1';
		div2 = 'chartThreeNorms2';

		if (normData.div1Name != null
			&& normData.div1Name != '') {
			div1 = normData.div1Name;
		}

		if (normData.div2Name != null
			&& normData.div2Name != '') {
			div2 = normData.div2Name;
		}

		if (normData.drawTableCommon) {
			document.write('<div style="font-weight: bold; font-size: 12px; width:399px; height:120px;float:clear;">');
		}
		if (normData.drawTable) {
			document.write('<div id="' + div1 + '" class="plot" style="width:250px; height:74px; position:relative; float:right;"></div>');
			document.write('<div id="' + div2 + '" class="plot" style="width:250px; height:55px; position:relative; float:right;"></div>');
		}
		if (normData.drawTableCommon) {
			document.write('</div>');
		}

		if (normData.maxNorm != null && normData.maxNorm != 0) {
			maxNorm = normData.maxNorm;
		} else {
			if (normData.n1 != null && normData.n1 > maxNorm) maxNorm = normData.n1;
			if (normData.n2 != null && normData.n2 > maxNorm) maxNorm = normData.n2;
			if (value > maxNorm) maxNorm = value;
		}
		maxNorm = maxNorm * 1.1;

		if (normData.n1 != null) {
			plotThreeNorms1 = this.normingBar(div1, {
				you: value,
				norm: normData.n1,
				normLabel: normData.n1Label,
				unit: normData.unit,
				decimalPlaces: normData.decimalPlaces,
				max: maxNorm
			}, { showYou: true });
		}

		if (normData.n2 != null) {
			plotThreeNorms2 = this.normingBar(div2, {
				you: value,
				norm: normData.n2,
				normLabel: normData.n2Label,
				unit: normData.unit,
				decimalPlaces: normData.decimalPlaces,
				max: maxNorm
			}, { showYou: false });
		}

		scaleCanvas($('#' + div1));
		scaleCanvas($('#' + div2));
	};

	/**
	 * Renders the chart combo used in summary page:
	 * - a seasonal stacked series chart
	 * - a pie chart
	 * - max three norming charts. Set n1, n2 or n3 undefined if you would like show only one norming chart
	 * 
	 * @param seriesData	array with data series for the stacked series chart
	 * @param pieData		array with a single element representing the pie slices, e.g. [line6]
	 * @param normData		(optional) associative array: {
	 * 							you: user's value,
	 * 							unit: unit label for values, e.g. "kWh",
	 * 							n1: value of first norm,
	 * 							n1Label: label for first norm, e.g. "California",
	 *                          n2: value of second norm,
	 *                          n2Label: label for second norm, e.g. "Los Altos Hills"
	 * 						}
	 * @param options		associative array: {
	 *							highlightedSeriesIndex: (optional) which of the series from seriesData
	 *												    should appear highlighted, e.g. 0,
	 *							highlightedSeriesColor: (optional) e.g. '#3F8783',
	 *							title: chart title, e.g. "Your Utility Bill",
	 *							yAxisLabel: label for the y axis, e.g. "Use",
	 *							showLegend: true or false,
	 *							showCurrentMonthType: "gap", "line", "none" - default "line" 
	 *							series: [
	 *								{ label: first series label, color: first series color },
	 *								{ label: second series label, color: second series color }, ... ]
	 * 						}
	 * @param chartSeasonalStackDiv div name for seasonal stack chart. Default value is "chartSeasonalStack" if not specified
	 * @param chartSeasonalPieDiv   div name for seasonal pie chart. Default value is "chartSeasonalPie" if not specified
	 * 
	 */
	$.heaplot.seasonalChart = function (seriesData, pieData, normData, options, showCurrentMonth, currentMonthNumber, currentYear, chartSeasonalStackDiv, chartSeasonalPieDiv) {
		var seriesColors;
		var pieColors;
		var seriesDataLength = seriesData.length;

		if (typeof options.showCurrentMonthType === "undefined"
			|| options.showCurrentMonthType == null
			|| options.showCurrentMonthType == '') {
			options.showCurrentMonthType = 'none';
		}

		if (typeof options.highlightedSeriesIndex === "undefined") {
			pieColors = seriesColors = $.map(options.series, function (val, i) { return val.color; });
		} else {
			seriesColors = new Array();
			pieColors = new Array();

			for (var i = 0; i < seriesDataLength; i++) {
				seriesColors[i] = $.heaplot.colors.undefined;
			}

			if (pieData != null && pieData.length > 0) {
				for (var i = 0; i < pieData[0].length; i++) pieColors[i] = $.heaplot.colors.undefined;
			}

			seriesColors[options.highlightedSeriesIndex] = options.highlightedSeriesColor;
			pieColors[options.highlightedSeriesIndex] = options.highlightedSeriesColor;
		}

		var seriesYear;
		if (seriesDataLength > 0 && seriesData[0].length > 0 && seriesData[0][0].length > 0) {
			seriesYear = ('' + seriesData[0][0][0]).substring(0, 4);
		} else {
			seriesYear = 2010;
		}

		// Normalize data labels to only contain seriesYear instead of individual years:
		$.each(seriesData, function (i, series) {
			if (series && series.length) $.each(series, function (i, value) {
				if (value && value.length) {
					value[0] = seriesYear + new String(value[0]).substring(4);
				}
			});
		});

		var maxY = options.maxY;

		if (maxY == null
			|| maxY == 0) {
			maxY = 0;

			for (i = 0; i < seriesData[0].length; i = i + 1) {
				var yValue = 0;
				for (s = 0; s < seriesDataLength; s = s + 1) {
					var seriesLine = seriesData[s];
					yValue = yValue + seriesLine[i][1];
				}

				if (yValue > maxY) {
					maxY = yValue;
				}
			}
		}

		//clone series data
		var seriesDataForChart = seriesData.slice(0);
		$.each(seriesDataForChart, function (i, item) {
			seriesDataForChart[i] = item.slice(0);
		});

		var labels = [];
		if (options.series) {
			labels = new Array();
			for (var i = 0; i < options.series.length; i++) {
				labels.push(options.series[i].label);
			}
		}

		if (showCurrentMonth) {
			var pos = seriesDataLength;
			var currentMonth;

			if (currentMonthNumber == null || currentMonthNumber == '') {
				var currentTime = new Date();
				currentMonthNumber = currentTime.getMonth();
			}

			currentMonth = currentMonthNumber + 1;

			var currentMonthStr = seriesYear + '-' + currentMonth + '-1';
			var nextMonthStr = seriesYear + '-' + (currentMonth + 1) + '-1';

			if (currentMonth > 1 && currentMonth < 12) {
				//Add a "flat line" feature or gap in the stack chart.
				if (options.showCurrentMonthType == 'line') {
					$.each(seriesDataForChart, function (i, item) {
						item.splice(currentMonth, 0, [currentMonthStr, item[currentMonth][1]]);
					});
				} else if (options.showCurrentMonthType == 'gap') {
					$.each(seriesDataForChart, function (i, item) {
						item.splice(currentMonth, 0, [currentMonthStr, 0]);
						item.splice(currentMonth + 1, 0, [nextMonthStr, 0]);
					});
				}
			}

			seriesDataForChart[pos] = [[seriesYear + '-' + currentMonth + '-1', 0], [seriesYear + '-' + currentMonth + '-1', maxY]];
			seriesColors[pos] = '#332623';
			if (options.series != null) {
				options.series[pos] = {
					label: " ",
					showLabel: false,
					disableStack: true,
					fill: false,
					lineWidth: 3,
					color: '#332623',
					shadow: true,
					shadowAngle: 60,
					shadowAlpha: 0.1,
				};
			}
		}

		var numberTicks = options.numberTicks;
		if (numberTicks == null) {
			numberTicks = 7;
		}
		var tickInterval = findTickInterval(maxY, 0, numberTicks);

		if (numberTicks * tickInterval > maxY) {
			numberTicks = Math.floor(maxY / tickInterval) + 2;
		}

		chartSeasonalStackDiv = typeof chartSeasonalStackDiv !== 'undefined' ? chartSeasonalStackDiv : 'chartSeasonalStack';

		if ($('#' + chartSeasonalStackDiv).length) {
			stackplot = $.jqplot(chartSeasonalStackDiv, seriesDataForChart,
				{
					stackSeries: true,
					seriesColors: seriesColors,
					title: {
						show: true,
						text: options.title? options.title : '',
						fontSize: '1.3em',
					},
					legend: options.showLegend ? {
						show: true,
						location: 's',
						border: 'border-style: none; border-width: 0px',
						fontSize: '10pt',
						placement: 'outsideGrid',
						renderer: $.jqplot.EnhancedLegendRenderer,
						rendererOptions: { numberRows: 2, labels: labels }
					} : { show: false },
					cursor: {
						show: false,
						zoom: false
					},
					grid: {
						drawGridlines: true,
						background: "#ffffff",
						borderWidth: 0,
						shadow: false
					},
					seriesDefaults: {
						fill: true,
						showMarker: false,
						shadow: false
					},
					series: options.series,
					axes: {
						xaxis: {
							renderer: $.jqplot.DateAxisRenderer,
							min: 'January 01, ' + seriesYear,
							max: 'December 01, ' + seriesYear,
							tickInterval: '1 month',
							rendererOptions: {
								tickRenderer: $.jqplot.CanvasAxisTickRenderer
							},
							tickOptions: {
								formatString: '%b',
								fontSize: '10pt',
								fontFamily: 'Tahoma',
								angle: -40,
								fontWeight: 'normal',
								showGridline: false
							}
						},
						yaxis: {
							min: 0,
							max: options.maxY,
							label: options.yAxisLabel?options.yAxisLabel:'',
							labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
							labelOptions: {
								angle: 270,
								fontWeight: 'normal'
							},
							rendererOptions: {
								tickRenderer: $.jqplot.CanvasAxisTickRenderer
							},
							tickInterval: tickInterval,
							tickOptions: {
								formatString: (normData.unit == '$') ? '$%d' : ('%d ' + normData.unit),
								fontSize: '10pt',
								fontFamily: 'Tahoma',
								fontWeight: 'normal'
							}
						}
					}
				});
			//bind overlib values
			$('#' + chartSeasonalStackDiv).bind('jqplotDataHighlight',
				function (ev, seriesIndex, pointIndex, data) {
					var seriesTotalValue = 0;
					$.each(seriesData[seriesIndex], function (i, item) {
						seriesTotalValue = seriesTotalValue + item[1];
					});
					var showSeriesTotalValue = _formatValueWithUnit(seriesTotalValue, 0, normData.unit);
					overlib(showSeriesTotalValue, WIDTH, 50);
				}
			).bind('jqplotDataUnhighlight',
				function (ev) {
					if (typeof nd === "function") {
						nd();
					}
				}
			).bind('jqplotDataMouseOver', function (ev,seriesIndex, pointIndex, data) {
				var seriesTotalValue = 0;
					$.each(seriesData[seriesIndex], function (i, item) {
						seriesTotalValue = seriesTotalValue + item[1];
					});
					var showSeriesTotalValue = _formatValueWithUnit(seriesTotalValue, 0, normData.unit);
					overlib(showSeriesTotalValue, 10000, WIDTH, 50);
				
			});
			// $('#resizable2').bind('resizestop', function (event, ui) {
			// 	$('#' + chartSeasonalStackDiv).height($('#resizable2').height() * 0.96);
			// 	$('#' + chartSeasonalStackDiv).width($('#resizable2').width() * 0.96);
			// 	$.replot({ resetAxes: true });
			// });
		}

		chartSeasonalPieDiv = typeof chartSeasonalPieDiv !== 'undefined' ? chartSeasonalPieDiv : 'chartSeasonalPie';
		if (pieData != null && pieData[0].length > 0 && $('#' + chartSeasonalPieDiv).length) {
			var pieTotalValue = 0;
			$.each(pieData[0], function (i, item) {
				pieTotalValue = pieTotalValue + item[1];
			});
			$('#' + chartSeasonalPieDiv).attr('pieTotalValue', pieTotalValue);

			pieplot = $.jqplot(chartSeasonalPieDiv, pieData, {
				seriesColors: pieColors,
				border: false,
				seriesDefaults: {
					renderer: $.jqplot.PieRenderer,
					rendererOptions: {
						padding: 0,
						shadow: false
					}
				},
				grid: {
					borderWidth: 0,
					background: "#ffffff",
					shadow: false
				},
				legend: {
					show: false,
					location: 'w',
					fontSize: '80%'
				},
				cursor: {
					show: false,
					zoom: false
				}
			});

			//bind overlib values
			$('#' + chartSeasonalPieDiv).bind('jqplotDataHighlight',
				function (ev, seriesIndex, pointIndex, data) {
					var pieTotalValue = parseInt($('#' + chartSeasonalPieDiv).attr('pieTotalValue'));
					var showPieValue = _formatValueWithUnit((data[1] / pieTotalValue) * 100, 0, '%');
					overlib(showPieValue, WIDTH, 30);
				}
			).bind('jqplotDataUnhighlight',
				function (ev) {
					if (typeof nd === "function") {
						nd();
					}
				}
			).bind('jqplotDataMouseOver',
			function (ev, seriesIndex, pointIndex, data) {
				var pieTotalValue = parseInt($('#' + chartSeasonalPieDiv).attr('pieTotalValue'));
				var showPieValue = _formatValueWithUnit((data[1] / pieTotalValue) * 100, 0, '%');
				overlib(showPieValue, WIDTH, 30);
			});
		}

		// Show the norming bar if either n1 or n2 specified
		if (typeof normData.n1 !== "undefined" || typeof normData.n2 !== "undefined" || typeof normData.n3 !== "undefined") {
			var maxNorm = 0;

			var n1Defined = !(typeof normData.n1 === "undefined" || normData.n1 == null);
			var n2Defined = !(typeof normData.n2 === "undefined" || normData.n2 == null);
			var n3Defined = !(typeof normData.n3 === "undefined" || normData.n3 == null);

			if (n1Defined && normData.n1 > maxNorm) maxNorm = normData.n1;
			if (n2Defined && normData.n2 > maxNorm) maxNorm = normData.n2;
			if (n3Defined && normData.n3 > maxNorm) maxNorm = normData.n3;
			if (normData.you > maxNorm) maxNorm = normData.you;

			maxNorm = maxNorm * 1.1;
			if (n1Defined) {
				plotThreeNorms1 = this.normingBar('chartThreeNorms1', {
					you: normData.you,
					norm: normData.n1,
					normLabel: normData.n1Label,
					unit: normData.unit,
					decimalPlaces: normData.decimalPlaces,
					max: maxNorm
				}, { showYou: true });
			}

			if (n2Defined) {
				var n2DivName = n1Defined ? "chartThreeNorms2" : "chartThreeNorms1";
				plotThreeNorms2 = this.normingBar(n2DivName, {
					you: normData.you,
					norm: normData.n2,
					normLabel: normData.n2Label,
					unit: normData.unit,
					decimalPlaces: normData.decimalPlaces,
					max: maxNorm
				},  { showYou: !n1Defined });
			}

			if (n3Defined) {
				var n3DivName = "chartThreeNorms3";
				if (n1Defined && !n2Defined) {
					n3DivName = "chartThreeNorms2";
				} else if (!n1Defined && n2Defined) {
					n3DivName = "chartThreeNorms2";
				} else if (!n1Defined && !n2Defined) {
					n3DivName = "chartThreeNorms1";
				}

				plotThreeNorms3 = this.normingBar(n3DivName, {
					you: normData.you,
					norm: normData.n3,
					normLabel: normData.n3Label,
					unit: normData.unit,
					decimalPlaces: normData.decimalPlaces,
					max: maxNorm
				}, { showYou: (!n1Defined && !n2Defined)});
			}
		}

		//current date
		var currentDate = new Date();

		if (currentYear != null && currentMonthNumber != null) {
			currentDate = new Date(currentYear, currentMonthNumber, 1);
		}
		var showDate = formatDate(currentDate, 'MMM, yyyy');

		$("#currentDateTop").html(showDate);
		$("#currentDateTable").html(showDate);

		var prevMonthIndex = currentMonthNumber - 1;

		if (prevMonthIndex < 0) {
			prevMonthIndex = 11;
		}

		var totalCurrentMonth = 0;
		var totalCurrentMonthD = 0;
		for(x = 0; x < seriesDataLength; x = x + 1)
		{
			var currM = (seriesData[x] == null || seriesData[x].length == 0)? 0 : seriesData[x][currentMonthNumber][1];
			totalCurrentMonth = totalCurrentMonth + currM;
			if(options.highlightedSeriesIndex == null || options.highlightedSeriesIndex == x)
			{
				totalCurrentMonthD = totalCurrentMonthD + currM;
			}
		}
		
		var totalPrevMonth = 0;
		var totalPrevMonthD = 0;
		for(x = 0; x < seriesDataLength; x = x + 1)
		{
			var currM = (seriesData[x] == null || seriesData[x].length == 0)? 0 : seriesData[x][prevMonthIndex][1];
			totalPrevMonth = totalPrevMonth + currM;
			if(options.highlightedSeriesIndex == null || options.highlightedSeriesIndex == x)
			{
				totalPrevMonthD = totalPrevMonthD + currM;
			}
		}
		
		var changedPercentMonth = 0;
		if (totalPrevMonthD > 0) {
			changedPercentMonth = ((totalCurrentMonthD - totalPrevMonthD) / totalPrevMonthD) * 100.0;
		}

		$("#totalCurrentMonth").html(_formatValueWithUnit(totalCurrentMonthD, 0, normData.unit));
		$("#changedPercentMonth").html((changedPercentMonth).toFixed(0) + '<span style="font-size: 24px;">%</span>');

		if (changedPercentMonth <= 0) {
			$("#changedPercentMonthImg").attr('src', 'images/arrow-down-green.png');
		} else {
			$("#changedPercentMonthImg").attr('src', 'images/arrow-up-red.png');
		}

		if (changedPercentMonth <= 0) {
			$("#changedPercentMonth").css('color', '#006F3B');
			$("#changedPercentMonthSince").css('color', '#006F3B');
		} else {
			$("#changedPercentMonth").css('color', '#981B1E');
			$("#changedPercentMonthSince").css('color', '#981B1E');
		}

		var chartMonthPieDiv = 'chartMonthPie';
		if (pieData != null && pieData.length > 0 && pieData[0] != null && pieData[0].length > 0 && $("#" + chartMonthPieDiv).length > 0) {
			var line6 = pieData[0];
			var total = 0;
			for (x = 0; x < line6.length; x = x + 1) {
				total = total + line6[x][1];
			}

			var monthPieData = new Array();
			for (i = 0; i < line6.length; i = i + 1) {
				monthPieData[i] = [line6[i][0], seriesData[i][currentMonthNumber][1]];
			}

            var hasEV = line6.length == 6 ? true : false; 
			
			for (x = 0; x < line6.length; x = x + 1) {
				var lineName = 'line' + (x + 1);

				if(hasEV)
				{
					if(x == 3)
					{
						lineName = 'line3EV';
					} else if(x > 3)
					{
						lineName = 'line' + x;
					}
				}	

				if (options.series != null) {

					if(options.series[x].lineName != null
						&& options.series[x].lineName != '')
					{
						lineName = options.series[x].lineName;
					}

					$("#" + lineName + "Label").html(options.series[x].label);
					$("#" + lineName + "Color").attr('bgcolor', options.series[x].color);
				}

				$("#" + lineName + "Percent").html(((line6[x][1] * 100 / total).toFixed(0)) + '%');
				$("#" + lineName + "Amount").html(_formatValueWithUnit(line6[x][1], 0, normData.unit));

				$("#" + lineName + "PercentM").html(((monthPieData[x][1] * 100 / totalCurrentMonth).toFixed(0)) + '%');
				$("#" + lineName + "AmountM").html(_formatValueWithUnit(monthPieData[x][1], 0, normData.unit));
			}

			var pieTotalValue = 0;
			$.each(monthPieData, function (i, item) {
				pieTotalValue = pieTotalValue + item[1];
			});
			$('#' + chartMonthPieDiv).attr('pieTotalValue', pieTotalValue);

			pieplot = $.jqplot(chartMonthPieDiv, [monthPieData],
				{
					seriesColors: pieColors,
					border: false,
					seriesDefaults: {
						renderer: $.jqplot.PieRenderer,
						rendererOptions: {
							padding: 0,
							shadow: false
						}
					},
					grid: {
						borderWidth: 0,
						background: "#ffffff",
						shadow: false
					},
					legend: {
						show: false,
						location: 'w',
						fontSize: '80%'
					},
					cursor: {
						show: false,
						zoom: false
					}
				});

			$('#resizable').bind('resizestop', function (event, ui) {
				$('#' + chartMonthPieDiv).height($('#resizable').height() * 0.96);
				$('#' + chartMonthPieDiv).width($('#resizable').width() * 0.96);
				plot.replot({ resetAxes: true });
			});
			//bind overlib values
			$('#' + chartMonthPieDiv).bind('jqplotDataHighlight',
				function (ev, seriesIndex, pointIndex, data) {
					var pieTotalValue = parseInt($('#' + chartMonthPieDiv).attr('pieTotalValue'));
					var showPieValue = _formatValueWithUnit((data[1] / pieTotalValue) * 100, 0, '%');
					overlib(showPieValue, WIDTH, 30);
				}
			).bind('jqplotDataUnhighlight',
				function (ev) {
					if (typeof nd === "function") {
						nd();
					}
				}
			).bind('jqplotDataHighlight',
			function (ev, seriesIndex, pointIndex, data) {
				var pieTotalValue = parseInt($('#' + chartMonthPieDiv).attr('pieTotalValue'));
				var showPieValue = _formatValueWithUnit((data[1] / pieTotalValue) * 100, 0, '%');
				overlib(showPieValue, WIDTH, 30);
			}
		);
		}

		//scaleCanvas($('#' + chartSeasonalStackDiv));
		//scaleCanvas($('#' + chartSeasonalPieDiv));
	};

	/**
	 * Renders a single norm bar chart (comparing user's value to a norming value).
	 * 
	 * @param divName   	div id for the chart
	 * @param data			associative array: {
	 * 							you: user's value,
	 * 							unit: unit label for values, e.g. "kWh",
	 * 							norm: value of norm,
	 * 							normLabel: label for norm, e.g. "California",
	 *                          decimalPlaces: number precision to display,
	 *                          max: (optional) max value to scale bar
	 * 						}
	 * @param options		associative array: {
	 *							showYou: true = also display the "You: value" label,
	 *							         false = skip it
	 * 						}
	 */
	$.heaplot.normingBar = function (divName, data, options) {
		var max = 0;
		if (typeof data.max === "undefined") {
			if (data.norm > max) max = data.norm;
			if (data.you > max) max = data.you;
			max = max * 1.1;
		}
		else max = data.max;

		var decimalPlaces = data.decimalPlaces;
		if (decimalPlaces == null) decimalPlaces = 0;

		var normingOn = data.norm != null; 

		var nf1 = new NumberFormat(data.norm);
		nf1.setPlaces(decimalPlaces);
		nf1.setSeparators(true);
		var fn = nf1.toFormatted();

		var nf2 = new NumberFormat(data.you);
		nf2.setPlaces(decimalPlaces);
		nf2.setSeparators(true);
		var formattedValue = nf2.toFormatted();

		var axes = {
			xaxis: {
				showTicks: true,
				showLabel: false,
				min: -10,
				max: max,
				ticks: [
					[-10, ' '],
					[ (data.norm != null ? data.norm : ' '), data.norm != null ? (data.normLabel + ': ' + _formatWithUnit(fn, data.unit)) : '' ],
					[max, ' ']
				],
				rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
				tickOptions: {
					formatString: '%s',
					fontSize: '12pt',
					fontFamily: 'Tahoma',
					fontWeight: 'normal',
					textColor: '#373737',
					showGridline: false
				}
			},
			yaxis: { showTicks: false, showLabel: false, min: 1, max: 2 }
		};

		if (options.showYou) {
			axes.x2axis = {
				showTicks: true,
				showLabel: false,
				min: -10,
				max: max,
				ticks: [
					[-10, ' '],
					[data.you, 'You: ' + _formatWithUnit(formattedValue, data.unit)],
					[max, ' ']
				],
				rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
				tickOptions: {
					formatString: '%s',
					fontSize: '12pt',
					fontFamily: 'Tahoma',
					fontWeight: 'normal',
					textColor: '#4550A1',
					showGridline: false
				}
			}

			$("#" + divName).css('height', '74px');
		}

		$.jqplot(divName, [
			[[data.norm, 1]],
			[[data.you, 1], [data.you, 2]]
		], {
			grid: {
				drawGridlines: false,
				background: "#E3E4E5",
				borderWidth: 0,
				shadow: false
			},
			cursor: {
				show: false,
				zoom: false
			},
			seriesDefaults: {
				fill: false,
				shadow: false
			},
			series: [
				{
					showMarker: true,
					showLine: false,
					markerOptions: { style: 'filledDiamond', color: '#ffffff', size: 15 }
				},
				{
					showMarker: false,
					showLine: true,
					color: '#373737',
					lineWidth: 3,
					xaxis: (options.showYou ? 'x2axis' : undefined)
				}
			],
			axes: axes
		});

		scaleCanvas($('#' + divName));
		$('#resizableNorms').bind('resizestop', function (event, ui) {
			$('#' + divName).height($('#resizableNorms').height() * 0.96);
			$('#' + divName).width($('#resizableNorms').width() * 0.96);
			$.replot({ resetAxes: true });
		});
	};


	/**
	 * Renders a bar chart with a series of values.
	 * 
	 * @param divName   	div id for the chart
	 * @param data			associative array: {
	 * 							unit: unit label for values, e.g. "kWh" or "$",
	 * 							seriesData: [ [ label, value ], ... ] for each bar
	 * 						}
	 * @param options		associative array: {
	 *							yAxisLabel: label for the y axis, e.g. "Use",
	 *                          highlightedLabel: (optional) label of the bar that should be highlighted,
	 *                          highlightedColor: (optional) color for label of the bar that should be highlighted,
	 *                          compact: (optional) don't render axes/tick labels
	 * 						}
	 */
	$.heaplot.monthlyBarChart = function (divName, data, options) {
		if (options.highlightedColor == null
			|| options.highlightedColor == '') {//set as green
			options.highlightedColor = '#006F3B';
		}

		var barColors = $.map(data.seriesData, function (val, i) { return val[0] == options.highlightedLabel ? options.highlightedColor : '#E3E4E5'; });

		var maxY = options.maxY;

		if (maxY == null
			|| maxY == 0) {
			maxY = 0;

			for (i = 0; i < data.seriesData.length; i = i + 1) {
				if (data.seriesData[i][1] > maxY) {
					maxY = data.seriesData[i][1];
				}
			}
		}

		var numberTicks = options.numberTicks;
		if (numberTicks == null) {
			numberTicks = 5;
		}
		var tickInterval = findTickInterval(maxY, 0, numberTicks);

		if (numberTicks * tickInterval > maxY) {
			numberTicks = Math.floor(maxY / tickInterval) + 2;
		}

		$.jqplot(divName, [$.map(data.seriesData, function (val, i) { return val[1]; })], {
			//title: '12-Month Moving Avg',
			grid: {
				drawGridlines: true,
				background: "#ffffff",
				borderWidth: 0,
				shadow: false
			},
			legend: {
				show: false,
				location: 'ne',
				fontSize: '70%'
			},
			cursor: {
				show: false,
				zoom: false
			},
			highlighter: {
				showMarker: false,
				show: false
			},
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: {
					barWidth: options.compact? 30: ( $(document).width() < 768 ? 30 : 50),
					barPadding: options.compact? 30: ( $(document).width() < 768 ? 30 : 50),
					barMargin: 0,
					varyBarColor: true
				},
				fill: true,
				showMarker: false,
				shadow: false
			},
			seriesColors: barColors,
			axes: {
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer,
					ticks: $.map(data.seriesData, function (val, i) { return val[0]; }),
					rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
					tickOptions: options.compact ? { show: false } : {
						formatString: '%s',
						fontSize: '10pt',
						fontFamily: 'Tahoma',
						angle: -40,
						fontWeight: 'normal',
						showGridline: false
					}
				},
				yaxis: {
					min: 0,
					label: options.yAxisLabel,
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					labelOptions: options.compact ? { show: false } : {
						angle: 270,
						fontWeight: 'normal'
					},
					rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
					numberTicks: options.compact ? null : numberTicks,
					tickInterval: options.compact ? null : tickInterval,
					tickOptions: {
						formatString: (data.unit == '$') ? '$%d' : ('%d ' + data.unit),
						fontSize: '10pt',
						fontFamily: 'Tahoma',
						fontWeight: 'normal',
						showLabel: options.compact ? false : true
					}
				}
			}
		});

		var dataUnit = data.unit;

		$('#resizableMonthly').bind('resizestop', function (event, ui) {
			$('#' + divName).height($('#resizableMonthly').height() * 0.96);
			$('#' + divName).width($('#resizableMonthly').width() * 0.96);
			$.replot({ resetAxes: true });
		});

		//bind overlib values
		$('#' + divName).bind('jqplotDataHighlight',
			function (ev, seriesIndex, pointIndex, data) {
				var showPieValue = _formatValueWithUnit(data[1], 0, dataUnit);
				overlib(showPieValue, WIDTH, 30);
			}
		).bind('jqplotDataUnhighlight',
			function (ev) {
				if (typeof nd === "function") {
					nd();
				}
			}
		).bind('jqplotDataMouseOver',
		function (ev, seriesIndex, pointIndex, data) {
			var showPieValue = _formatValueWithUnit(data[1], 0, dataUnit);
			overlib(showPieValue, WIDTH, 30);
		}
	);

		scaleCanvas($('#' + divName));
	};

	/**
	 * Renders a hourly (24h) stacked bar chart with a series of per-hour values.
	 * 
	 * @param divName   	div id for the chart
	 * @param data			associative array: {
	 * 							unit: unit label for values, e.g. "kWh" or "$",
	 * 							seriesData: array of n subarrays, one per data series,
	 * 								each containing 24 values (one per hour)
	 * 						}
	 * @param options		associative array: {
	 *							title: chart title, e.g. "Average Hourly Water Use",
	 *							yAxisLabel: label for the y axis, e.g. "Gallons Per Week",
	 *							showLegend: true or false,
	 *							series: [
	 *								{ label: first series label, color: first series color },
	 *								{ label: second series label, color: second series color }, ... ]
	 * 						}
	 */
	$.heaplot.hourlyBarChart = function (divName, data, options) {
		var seriesData = data.seriesData;
		var maxY = options.maxY;

		if (maxY == null || maxY == 0) {
			maxY = 0;

			for (var hour = 0; hour < seriesData[0].length; hour++) {
				var yValue = 0;
				for (var seriesI = 0; seriesI < seriesData.length; seriesI++) {
					yValue += seriesData[seriesI][hour];
				}

				if (yValue > maxY) {
					maxY = yValue;
				}
			}
		}

		var numberTicks = options.numberTicks;
		if (numberTicks == null) {
			numberTicks = 7;
		}
		var tickInterval = findTickInterval(maxY, 0, numberTicks);

		$.jqplot(divName, data.seriesData, {
			title: {
				show: true,
				text: options.title,
				fontSize: '90%'
			},
			grid: {
				drawGridlines: true,
				background: "#ffffff",
				borderWidth: 0,
				shadow: false
			},
			legend: options.showLegend ? {
				show: true,
				location: 'e',
				border: 'border-style: none; border-width: 0px; padding-left: 15px',
				fontSize: '10pt',
				placement: 'outsideGrid',
				renderer: $.jqplot.EnhancedLegendRenderer,
				rendererOptions: { numberRows: 2 }
			} : { show: false },
			cursor: {
				show: false,
				zoom: false
			},
			highlighter: {
				showMarker: false
			},
			stackSeries: true,
			seriesDefaults: {
				renderer: $.jqplot.BarRenderer,
				rendererOptions: {
					barWidth: 23,
					//barPadding:-50, 
					//barMargin:0, 
					varyBarColor: false
				},
				fill: true,
				showMarker: false,
				shadow: false
			},
			series: options.series,
			axes: {
				xaxis: {
					renderer: $.jqplot.CategoryAxisRenderer,
					ticks: ['0', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
					rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
					tickOptions: {
						formatString: '%s',
						fontSize: '10pt',
						fontFamily: 'Tahoma',
						angle: 0,
						fontWeight: 'normal',
						showGridline: false
					}
				},
				yaxis: {
					min: 0,
					label: options.yAxisLabel,
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					labelOptions: {
						angle: 270,
						fontWeight: 'normal'
					},
					rendererOptions: { tickRenderer: $.jqplot.CanvasAxisTickRenderer },
					numberTicks: numberTicks,
					tickInterval: tickInterval,
					tickOptions: {
						formatString: (data.unit == '$') ? '$%d' : ('%d ' + data.unit),
						fontSize: '10pt',
						fontFamily: 'Tahoma',
						fontWeight: 'normal',
						showLabel: true
					}
				}
			}
		});

		$(window).resize(function () {
			plot1.replot({ resetAxes: true });
		});
		
		$('#resizableHourly').bind('resizestop', function (event, ui) {
			$('#' + divName).height($('#resizableHourly').height() * 0.96);
			$('#' + divName).width($('#resizableHourly').width() * 0.96);
			$.replot({ resetAxes: true });
		});
		// bind overlib values
		var dataUnit = data.unit;
		$('#' + divName).bind('jqplotDataHighlight',
			function (ev, seriesIndex, pointIndex, data) {
				var showPieValue = _formatValueWithUnit(data[1], 0, dataUnit);
				overlib(showPieValue, WIDTH, 30);
			}
		).bind('jqplotDataUnhighlight',
			function (ev) {
				if (typeof nd === "function") {
					nd();
				}
			}
		);

		scaleCanvas($('#' + divName));
	};
	
	/**
	 * 
	 * Renders the TOU pie chart:
	 * 
	 * @param pieData		array with a single element representing the pie slices, e.g. [line6]
	 * @param options		associative array: {
	 *							title: chart title, e.g. "Your Utility Bill",
	 *							showLegend: true or false,
	 *							series: [
	 *								{ label: first series label, color: first series color },
	 *								{ label: second series label, color: second series color }, ... ]
	 * 						}
	 * @param touChartPieDiv   div name for the pie chart. Default value is "chartTOUPie" if not specified
	 * 
	 */
	 $.heaplot.touPieChart = function(pieData, options, touChartPieDiv)
	 {
		 var pieColors;
		 
		 if(options.series != null)
		 {
			 pieColors = $.map(options.series, function(val, i) { return val.color; });
		 } else
		 {
			 pieColors = {series: [{color:'red'}, {color:'orange'}, {color:'green'}]};
		 }
		 
		 pieplot = $.jqplot(touChartPieDiv, pieData, {
			 seriesColors: pieColors,
			 border: false,
			 seriesDefaults: { renderer:$.jqplot.PieRenderer,	
				 rendererOptions: {
					 padding: 0,
					 shadow: false,
					 showDataLabels: true
				 }
			 },
			 grid: {
				 borderWidth: 0,
				 background: "#ffffff",
				 shadow: false
			 },
			 legend: {
				 show: false,
				 location: 'w',
				 fontSize: '80%'
			 },
			 cursor: {
				 show: false,
				 zoom: false
			 }
		 });
		 
		 $('#' + touChartPieDiv + ' .jqplot-data-label').css('color', 'white');
		 //$('#' + touChartPieDiv + ' .jqplot-data-label').css('color', 'black');
	 } 

})(jQuery);
