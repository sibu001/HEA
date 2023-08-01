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

// Function to check the number of open tabs
var allowNewTab = true;
const MAX_TABS = 1;

function checkTabsLimit() {
  const currentTabs = parseInt(localStorage.getItem('openTabs') || '0', 10);
  
  const users = JSON.parse(localStorage.getItem('users'));
  if(users && users.role == 'USERS') { return; }

  if (currentTabs >= MAX_TABS) {
      allowNewTab = false;
      alert('Cannot open new tab for user screen. Close all other HomeIntel tabs first.');
      return false;
  }

  // Increment the counter and store it in localStorage
  localStorage.setItem('openTabs', (currentTabs + 1).toString());
  allowNewTab = true;
  return true;
  }

  // Function to decrement the openTabs counter when a tab is closed
  function decrementTabCounter() {
  const currentTabs = parseInt(localStorage.getItem('openTabs') || '0', 10);
  if (currentTabs > 0 && allowNewTab) {
      localStorage.setItem('openTabs', (currentTabs - 1).toString());
  }
  }

  // Attach event listener to decrement the counter when a tab is closed
  window.addEventListener('beforeunload', decrementTabCounter);