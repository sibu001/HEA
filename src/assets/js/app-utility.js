function plotChartWithParams(chartExpression,chartSeries,attempt){
  
  const chartParamsArray  = new Array;
  for (const areaSeries of chartSeries) {

    let valueArray = [];      
    for (const areaSeriesValue of areaSeries.seriesValues) {
      valueArray.push([areaSeriesValue.label, areaSeriesValue.value]);
    }
    chartParamsArray.push([areaSeries.chartSeries.field,valueArray]);
  }

  for(let j=0; j<chartParamsArray.length; j++){
    eval('var ' + chartParamsArray[j][0] + ' =  chartParamsArray[j][1];');
  };

  if(!attempt) attemp = 1;

  // let i, plot1, pieplot, loadIdle, loadStandby, data1, s, stackplot, seriesData;
  try{ eval(chartExpression) }
  catch(e){ console.error(e);
    if(attempt <= 5) {
      setTimeout(() => {
      plotChartWithParams(chartExpression, chartSeries, attempt + 1 );
      console.log('attempt : ' + attempt);
    }, (attempt + 1) * 100);
   } else { 
    console.error(e);
    alert('Please reload the page.'); }
  }

}