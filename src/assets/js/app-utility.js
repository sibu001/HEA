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

var allowNewTab = true;

function checkTabsLimit() {
  const isSurveyInUse = JSON.parse(localStorage.getItem('surveyInUse'));
  
  const users = JSON.parse(localStorage.getItem('users'));
  if(users && users.role == 'USERS') { return true; }

  if (isSurveyInUse && allowNewTab ) {
      alert('Cannot open new tab for user screen. Close all other HomeIntel tabs first.');
      return false;
  }

  localStorage.setItem('surveyInUse', true);
  allowNewTab = false;
  return true;
}

  function decrementTabCounter() {
  const isSurveyInUse = JSON.parse(localStorage.getItem('surveyInUse'));
  if (isSurveyInUse && !allowNewTab) {
      allowNewTab = true;
      localStorage.setItem('surveyInUse', false);
  }
}

window.addEventListener('beforeunload', decrementTabCounter);


//  getting used by the classic ui to prevent using classic UI in multiple tabs.
var sameTabAlert = false;
window.addEventListener('storage', (e) => 
					{
						if(!sameTabAlert && e.key == 'dummy-HEA-APP')
						{
							sameTabAlert = true;
							// var message = 'Another window or tab is working with the same application. Close one of it!';
							
							// if(window.pendingMessagesClient != null)
							// {
							// 	window.pendingMessagesClient.showNotificationBar(1, message, 10, 60000);
							// } else
							// {
							// 	window.alert(message);
							// }
							sameTabAlert = false;
						}
					}, false)
					localStorage.setItem('dummy-HEA-APP', Math.random());