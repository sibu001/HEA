function plotChartWithParams(chartExpression, chartSeries, paneCode, attempt){
  
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

  if(!attempt) attempt = 1;

  var i, plot1, pieplot, loadIdle, loadStandby, data1, s, stackplot, seriesData;
  if (paneCode === 'pv_ElectricUse') {
    seriesData = [line1, line2];
  }

  try{ eval(chartExpression) }
  catch(e){ console.error(e);
    if(attempt <= 5) {
      setTimeout(() => {
      plotChartWithParams(chartExpression, chartSeries,'', attempt + 1 );
      console.log('attempt : ' + attempt);
    }, (attempt + 1) * 100);
   } else { 
    console.error(e);
    // alert('Please reload the page.');
 }
  }

}

/**
 * over-writting the overlib.js function 'overlib' to make the tooltip/popup appear close the tap (touched screen) in small(touch screen) devices,
 * here removing the parameter 'FOLLOWMOUSE' from the actual call to the function(overlib.js).
 */
function overlib(){

  const args = Array.from(overlib.arguments)
    .filter( (val) => val != FOLLOWMOUSE); // removing FOLLOWMOUSE argument
  
  overLib.call(window,...args);
}



function addForceQueryParam() {

  const currentUrl = window.location.href;

  let newUrl = '';

  if (currentUrl.includes('force=')) {
     newUrl = currentUrl.replace(/force=(true|false)/, 'force=true');
  }else{
    newUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'force=true';
  }
  
  window.history.replaceState({}, '', newUrl);
}

window.addEventListener('popstate', (event) => {
  addForceQueryParam();
});

// function selectSurvey(){
//   const eventName = 'selectSurvey';
//   const selectSurveyObject = { surveyCode : selectSurvey.arguments[0] };
//   const event = new CustomEvent(eventName, { detail: selectSurveyObject });
//   window.dispatchEvent(event);

//   return false;
//  }

function selectSurvey(...surveyCode) {
  const eventName = 'selectSurvey';
  const selectSurveyObject = { surveyCode };
  const event = new CustomEvent(eventName, { detail: selectSurveyObject });
  window.dispatchEvent(event);
  return false;
}


$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
  // Check if the request URL does not already start with 'hea-web/' or 'http'
  if (!options.url.startsWith('hea-web/') && !options.url.startsWith('http') && !options.url.startsWith('https') ) {
      options.url = 'hea-web/' + options.url;
  }
});
  

