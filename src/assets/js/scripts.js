
var	ie=document.all;
var	dom=document.getElementById;
var ns4=document.layers;

var inWorks = false;

function getUrlVars() 
{
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) 
	{
		vars[key] = value;
	});
	return vars;
}

function getUrlParam(parameter, defaultvalue)
{
	var urlparameter = defaultvalue;
	if(window.location.href.indexOf(parameter) > -1)
	{
		urlparameter = getUrlVars()[parameter];
	}
	return urlparameter;
}

function setUrlParam(uri, parameter, value)
{
	var url = new URL(uri);
	var searchParams = url.searchParams;
	searchParams.set(parameter, value);
	url.search = searchParams.toString();
	return url.toString();
}

function removeUrlParam(uri, parameter)
{
	var url = new URL(uri);
	var searchParams = url.searchParams;
	searchParams.delete(parameter);
	url.search = searchParams.toString();
	return url.toString();
}

function getBaseUrl()
{
	var baseUrl = $('#requestUrlBase').attr('content');
	baseUrl = baseUrl == null?'': (baseUrl + (baseUrl.slice(-1) == '/'?'':'/'));
	
	return baseUrl;
}
function openOverlayNavigation(divId)
{
	divId = divId == null ? "overlayNavigation" : divId;
	var overlayNavigationElement = document.getElementById(divId);
	
	if(overlayNavigationElement != null)
	{
		overlayNavigationElement.style.height = "100%";
		$('#' + divId).show();
	}
}

function closeOverlayNavigation(divId)
{
	divId = divId == null ? "overlayNavigation" : divId;
	document.getElementById(divId).style.height = "0%";
	$('#' + divId).hide();
}

function waitForIFrameCompleteAndResizeIt(id) 
{
	iFrameAutoResize(id);
	var iFrame = document.getElementById(id);
    if(iFrame.ownerDocument == null
    	|| iFrame.ownerDocument.readyState != "complete") 
	{
        setTimeout("waitForIFrameCompleteAndResizeIt('" + id + "');", 200);
    } else 
    {
    	iFrameAutoResize(id);
    }
}

function iFrameAutoResize(id)
{
	var ifDoc, ifRef = document.getElementById( id );
    try 
    {
    	ifDoc = ifRef.contentWindow.document.documentElement;
    } catch (e) 
    {
        try 
        {
        	ifDoc = ifRef.contentDocument.documentElement;
        } catch (ee) { } 
    }

    if(ifDoc
    	&& ifDoc.scrollHeight > 0) 
    {
    	var oldStyleValue = ifRef.style.height;
    	var oldValue = ifRef.height;
    	ifRef.style.height = '1px';
    	ifRef.height = 1;
    	
    	var height = ifDoc.scrollHeight;
    	
    	if(ifDoc.scrollHeight <= 1
    		&& ifDoc.ownerDocument != null
    		&& ifDoc.ownerDocument.body != null
    		&& ifDoc.ownerDocument.body.scrollHeight != null)
    	{
    		height = ifDoc.ownerDocument.body.scrollHeight;
    	}
    	
    	if(height > 20)
    	{
    		height = height + 10;
	    	ifRef.height = height;
	    	ifRef.style.height = height+'px';
    	} else
    	{
    		ifRef.height = oldValue;
	    	ifRef.style.height = oldStyleValue;
    	}
    }
}

function submitFilter(form)
{
	var filterStartRow = document.getElementById('filter.startRow');
	
	if(filterStartRow != null)
	{
		filterStartRow.value = '0';
	}
	
	return submitForm(form);
}

function onSubmitCheck()
{
	if(!inWorks)
	{
		clearChangeChecker();
		
		showLoading(true);
		inWorks = true;
		return true;
	}
	
	return false;
}

function submitForm(form)
{
	if(!inWorks)
	{
		showLoading(true);
		
		var result = true;
		
		if(form.onsubmit)
		{
			result = form.onsubmit.call(form);
		}
		if(result) 
		{
			form.submit();
			inWorks = true;
		}
	}
	
	return false;
}

function submitForm2(form, formAction)
{
	if(formAction == null)
	{
		formAction = 'refresh';
	}
	var formActionElement = document.getElementById('formAction');
	if(formActionElement != null)
	{
		formActionElement.value = formAction;
	}
	return submitForm(form);
}

function showLoading(hideAll)
{
	var loadingElement2 = document.getElementById('loading2');
	if(loadingElement2 != null)
	{
		loadingElement2.style.display = "block";
		loadingElement2.style.visibility = 'visible';
		setTimeout( 'document.getElementById("loadingImage2").src = document.getElementById("loadingImage").src', 200 );
		return;
	}
	
	var loadingElement = document.getElementById('loading');
	if(loadingElement != null)
	{		
		if(loadingElement.style != null)
		{
			var x = (windowWidth() / 2) - (parseInt(loadingElement.style.width) / 2);
			var y = (windowHeight() / 2) - (parseInt(loadingElement.style.height) / 2);
			
			loadingElement.style.left = x+'px';
			loadingElement.style.top = y+'px';
			loadingElement.style.display = "block";
			loadingElement.style.visibility = 'visible';
			
			setTimeout( 'document.getElementById("loadingImage").src = document.getElementById("loadingImage").src', 200 );
		}
	}	
}

function hideLoading()
{
	var loadingElement2 = document.getElementById('loading2');
	if(loadingElement2 != null)
	{
		loadingElement2.style.display = "none";
		loadingElement2.style.visibility = 'hide';
		setTimeout( 'document.getElementById("loadingImage2").src = document.getElementById("loadingImage").src', 200 );
		return;
	}
	
	var loadingElement = document.getElementById('loading');
	if(loadingElement != null)
	{		
		if(loadingElement.style != null)
		{
			var x = (windowWidth() / 2) - (parseInt(loadingElement.style.width) / 2);
			var y = (windowHeight() / 2) - (parseInt(loadingElement.style.height) / 2);
			
			loadingElement.style.left = x+'px';
			loadingElement.style.top = y+'px';
			loadingElement.style.display = "none";
			loadingElement.style.visibility = 'hide';
			
			setTimeout( 'document.getElementById("loadingImage").src = document.getElementById("loadingImage").src', 200 );
		}
	}	
}

function back(form, action)
{
	form.method='POST';
	form.action=action;
	return submitForm(form);
}

function back2(formName, action)
{
	var f = document.getElementById(formName);
	return back(f, action);
}

function hideElement( elmID, overDiv )
{
  if( ie )
  {
	for( i = 0;	i <	document.all.tags( elmID ).length; i++ )
	{
	  obj =	document.all.tags( elmID )[i];
	  if( !obj || !obj.offsetParent	)
	  {
		continue;
	  }
	  // Find the element's	offsetTop and offsetLeft relative to the BODY tag.
	  objLeft	= obj.offsetLeft;
	  objTop	= obj.offsetTop;
	  objParent	= obj.offsetParent;
	  while( objParent.tagName.toUpperCase() !=	"BODY" )
	  {
		objLeft	 +=	objParent.offsetLeft;
		objTop	 +=	objParent.offsetTop;
		objParent =	objParent.offsetParent;
		if (objParent.tagName == "HTML") break;
	  }
	  objHeight	= obj.offsetHeight;
	  objWidth = obj.offsetWidth;
	  if(( overDiv.offsetLeft +	overDiv.offsetWidth	) <= objLeft );
	  else if((	overDiv.offsetTop +	overDiv.offsetHeight ) <= objTop );
	  else if( overDiv.offsetTop >=	( objTop + objHeight ));
	  else if( overDiv.offsetLeft >= ( objLeft + objWidth ));
	  else
	  {
		obj.style.visibility = "hidden";
	  }
	}
  }
}
function showElement( elmID	)
{
  if( ie )
  {
	for( i = 0;	i <	document.all.tags( elmID ).length; i++ )
	{
	  obj =	document.all.tags( elmID )[i];
	  if( !obj || !obj.offsetParent	)
	  {
		continue;
	  }
	  obj.style.visibility = "";
	}
  }
}
function openPopup(ref,w,h){
	var winl = (screen.width-w)/2;
	var wint = (screen.height-h)/2;
	if (winl < 0) winl = 0;
	if (wint < 0) wint = 0;
	var page = ref;
	windowprops = "height="+h+",width="+w+",top="+ wint +",left="+ winl +",location=no,"
	+ "scrollbars=yes,menubars=no,toolbars=no,resizable=no,status=yes";
	window.open(page, "Popup", windowprops);
	return false;
}

function previousPage(objectId, pageSize)
{	
	var startRow = document.getElementById(objectId);
	
	if(startRow == null)
	{
		return false;
	}
	
	if(startRow.value == null
		|| startRow.value == '')
	{
		startRow.value = 0;
	}
	startRow.value = Number(startRow.value) - Number(pageSize);
	if(startRow.value < 0)
	{
		startRow.value = 0;
	}
	return submitForm(startRow.form);
}

function nextPage(objectId, pageSize)
{
	var startRow = document.getElementById(objectId);
	
	if(startRow == null)
	{
		return false;
	}
	
	
	if(startRow.value == null
		|| startRow.value == ''
		|| startRow.value < 0)
	{
		startRow.value = 0;
	}
	
	startRow.value = Number(startRow.value) + Number(pageSize);
	
	return submitForm(startRow.form);
}

function firstPage(objectId)
{
	var startRow = document.getElementById(objectId);
	
	if(startRow == null)
	{
		return false;
	}
	
	startRow.value = 0;
	return submitForm(startRow.form);
}

var currentPageSize = new Array();
currentPageSize['filter'] = 10;
                
function setPageSize(filterPageSize, defaultPageSize, filter)
{
	if(filter == null
		|| filter == '')
	{
		filter = 'filter';
	}
	
	currentPageSize[filter] = Number(filterPageSize);
	if(currentPageSize[filter] == null
		|| currentPageSize[filter] == ''
		|| currentPageSize[filter] == 0)
	{
		currentPageSize[filter] = Number(defaultPageSize);
	}
	if(currentPageSize[filter] == null
		|| currentPageSize[filter] == ''
		|| currentPageSize[filter] == 0)
	{
		currentPageSize[filter] = 10;
	}
}

function pageSize(filter)
{
	if(filter == null
		|| filter == '')
	{
		filter = 'filter';
	}
	return Number(currentPageSize[filter]);
}


function changeSort(form, fieldName, sortOrder, sqlOrder)
{
	if(sqlOrder == null)
	{
		sqlOrder = false;
	}
	var sortFieldElement = document.getElementById('sortField');
	if(sortFieldElement != null)
	{
		sortFieldElement.value = fieldName;
	}
	var actionFieldElement = document.getElementById('formAction');
	
	if(actionFieldElement != null)
	{
		actionFieldElement.value = 'sort';
	}
	
	var sortOrderFieldElement = document.getElementById('sortOrder');
	if(sortOrderFieldElement != null)
	{
		sortOrderFieldElement.value = sortOrder;
	}
	
	var sqlOrderFieldElement = document.getElementById('sqlOrder');
	if(sqlOrderFieldElement != null)
	{
		sqlOrderFieldElement.value = sqlOrder;
	}
	
	form.method='POST';
	return submitForm(form);
}

function changeSort2(formName, fieldName, sortOrder)
{
	var f = document.getElementById(formName);
	return changeSort(f, fieldName, sortOrder);
}

function windowWidth()
{
	var width = document.body.clientWidth;
	
	if(window.innerWidth)
	{
		width = window.innerWidth;
	}
	
	return width;
}

function windowHeight()
{
	var height = document.body.clientHeight;
	
	if(window.innerHeight)
	{
		height = window.innerHeight;
	}
	
	return height;
}

function callGoogleTrackingSnippet(requetedUri) {
}

function preventPressEnter(submitButtonId, event) 
{
    var arrInputs = document.getElementsByTagName("input");
    for (var i = 0; i < arrInputs.length; i++) 
    {
        var oCurInput = arrInputs[i];
        if (oCurInput.type == "text") 
        {
            oCurInput.onkeypress = function(evt) 
            {
                if (typeof evt == "undefined" || evt == null)
                    evt = window.event;
                var keyCode = evt.keyCode || evt.which;
                if (keyCode == 13) 
                {
                    document.getElementById(submitButtonId).click();
                    return false;
                }
                return true;
            }
        }
    }
}

function bindEvent(el, eventName, eventHandler) 
{
	if(el.addEventListener)
	{
		el.addEventListener(eventName, eventHandler, false); 
	} else if(el.attachEvent)
	{
		el.attachEvent('on'+eventName, eventHandler);
	}
}

function confirmBox(titleText, basicText, okButtonText, cancelButtonText, width, height, functionOK, functionCancel, functionClose)
{
	$("<div title='" + titleText + "'>" + basicText + "</<div>" ).dialog(
	{
		resizable: false,
		modal: true,
		width: width,
		height: height,
		buttons: 
		[
		 {
			 text: ("" + (okButtonText == null?"Ok":okButtonText)),
			 click: function() 
			 {
			 	if(functionOK != null)
			 	{
			 		functionOK.call();
			 	}
			  	$(this).dialog("close");
			 }
		 },
		 {
			 text:("" + (cancelButtonText == null?"Cancel":cancelButtonText)),
			 click: function() 
			 {
			 	if(functionCancel != null)
			 	{
			 		functionCancel.call();
			 	}
				$(this).dialog("close");
			 }
		 }
		],
		close: function(event, ui) 
		{
			if(functionClose != null)
		 	{
				functionClose.call();
		 	}
		}
	});
}

function setAllHyperlinkAsExternal()
{
	$('a').each(function()
	{
		var $link = $(this);
		
		var target = $link.attr('target');
		var href = $link.attr('href');
		if((target == null
			|| target == '')
			&& href != null
			&& href != ''
			&& href.length > 2
			&& href.indexOf(".hea.com") == 0)
		{
			$link.attr('target', '_blank');
		}
	});
}

function mobilecheck() 
{
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

function sendBrowserInfo()
{
	$.ajax(
	{
		type: 'POST',
		url: (getBaseUrl() + 'free/browserInfo.do'),
		data: JSON.stringify({
			screenWidth: screen.width,
			screenHeight: screen.height,
			timezoneOffset: (new Date().getTimezoneOffset()),
			mobilecheck: mobilecheck()
			}),
		success: function(data, textStatus) {},
		contentType: "application/json",
		dataType: 'json'
	});
}

function csvField(value, isString)
{
	return (isString == null || isString?'"':'') + (value == null? '': value) + (isString == null || isString?'"':'');
}

function downloadFile(fileName, fileBody, dataType)
{
	var link = document.createElement("a");
	link.download = fileName;
	link.href = 'data:' + (dataType == null ? 'text/csv' : dataType) + ';base64,' + btoa(fileBody);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

function formToJSON(elements)
{
	var data = new Object();
	
	$(elements).each(function() 
	{
		var name = $(this).attr("name");;
		var value;
		if($(this).attr('type') == "checkbox")
		{
			if($(this).prop("checked"))
			{
				value = true;
			} else
			{
				value = false;
			}
		} else
		{
			value = $(this).val();
		}
		
		if(!(typeof name === "undefined") 
			&& name != null
			&& name != '')
		{
			data[name] = value;
		}
	});
	
	return data;
}

function callPostAjax(URI, prepareDataFunction, onSuccessFunction, onErrorFunction)
{
	var inputData = prepareDataFunction.call();
	
	$.ajax(
	{
		type: 'POST',
		url: baseUrl + URI,
		data: JSON.stringify(inputData),
		contentType: "application/json",
		dataType: 'json',
		success: function(data)
		{
			var errorText = data.errorMessage;
			if(data.errorMessage != null && data.errorMessage != '')
			{
				if(onErrorFunction != null)
				{
					onErrorFunction.call(this, data.errorMessage, data);
				}
			} else
			{
				if(onSuccessFunction != null)
				{
					onSuccessFunction.call(this, data);
				}
			}
		},
		error: function(error) 
		{
			var errorText = error.errorMessage;
			if(errorText == null || errorText == '')
			{
				if(error.responseJSON != null 
					&& error.responseJSON.errorMessage != null
					&& error.responseJSON.errorMessage != '')
				{
					errorText = error.responseJSON.errorMessage;
				} else
				{
					errorText = error.statusText;
				}
			}
			if(onErrorFunction != null)
			{
				onErrorFunction.call(this, errorText, error);
			}
		},
		global: function() 
		{
		} 
	});
}

function showNotificationBar(id, message, alertLevel, duration, height, bgColor, txtColor) 
{	 
    /*set default values*/
	alertLevel = (typeof alertLevel !== 'undefined' && alertLevel != null)? alertLevel : 10;
    duration = (typeof duration !== 'undefined' && duration != null)? duration : 600000;
    height = (typeof height !== 'undefined' && height != null)? height : 40;
    bgColor = (typeof bgColor !== 'undefined' && bgColor != null)? bgColor : (alertLevel == 0?'#1798A3':(alertLevel == 5?'#E8C772':(alertLevel == 10?'#C5614A':('#C5614A'))));
    txtColor = (typeof txtColor !== 'undefined' && txtColor != null)? txtColor : (alertLevel == 0?'#ffffff':(alertLevel == 5?'#ffffff':(alertLevel == 10?'#ffffff':('#A42732'))));
    
    $('.notification-message-' + id).remove();
    var $messageDiv = $("<div class='notification-message' style='text-align:center; width: 95%; float: left; line-height: " + height + "px;'> " + message + " </div>");
    var $removeDiv = $("<div style='text-align:center; line-height: " + height + "px; width: 1%; float: right; margin-right: 2%;'>x</div>");
    var $newDiv = $("<div id='notification-message-" + id + "' class='notification-message-div notification-message-" + id + "' style='display:none; position: absolute; width: 50%; margin-left: 25%; background-color: " + bgColor + "; z-index: 100; color: " + txtColor + ";border: 1px solid " + txtColor + ";'></div>");
    $newDiv.append($messageDiv).append($removeDiv);
    $newDiv.css("border-radius", (parseInt(height)/4) + "px");
    
    $('body').prepend($newDiv);
    
    $removeDiv.click(function()
    {
    	$newDiv.remove();
    }).css('cursor', 'pointer');
    
    /*animate the bar*/
    $newDiv.slideDown(function() 
    {
        setTimeout(function() 
        {
        	$newDiv.slideUp(function() {$newDiv.remove();});
        }, duration);
    });
}

function openModalWindow(modalWindowClassId, data, onOpenFunction, onCloseFunction)
{
	closeModalWindow(modalWindowClassId);
	var $data = $(data);
	$data.off('hidden.bs.modal').one('hidden.bs.modal', function (e) 
	{
		if(onCloseFunction != null)
		{
			onCloseFunction.call(this, $(this));
		}
		$(this).remove();		
	}).off('shown.bs.modal').one('shown.bs.modal', function (e) 
	{
		if(onOpenFunction != null)
		{
			onOpenFunction.call(this, $(this));
		}
	});
	
	$('body').append($data);
	$data.modal('show');
}

function closeModalWindow(modalWindowClassId)
{
	$('.' + modalWindowClassId).off('hidden.bs.modal').one('hidden.bs.modal', function (e) 
	{
		$(this).remove();
	}).modal('hide');
	return false;
}

function callSelectWindow(actionCallback, alertHeader, alertMessage, selectOptions, actionButtonMessage, cancelButtonMessage)
{
	var modalWindowClassId = 'alertModalWindow';
	var div = 'alertModalWindowBody';
	
	//prepare modal window	
	var modalWindowBody = '' +
	' <div class="modal fade alertModalWindow" role="dialog" style="z-index: 9999;"> ' +
	' 	<div class="modal-dialog modal-md"> ' +
	' 		<div class="modal-content"> ' +
	' 			<div class="modal-header"> ' +
	' 				<h4 class="modal-title">' + alertHeader + '</h4> ' +
	' 				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> ' +	
	' 			</div> ' +
	' 			<div id="' + div + '" class="modal-body text-center">' +
	' 				<p><h4> ' + (alertMessage == null?'':alertMessage) + ' </h4></p>' +
	' 				<p><select class="selectElementId form-control" required>';
	
	for (var index = 0; index < selectOptions.length; index++) 
	{
		var option = selectOptions[index];
		modalWindowBody = modalWindowBody + '<option value="' + option.value + '">' + option.label + '</option>';
	}
	
	modalWindowBody = modalWindowBody + ' 				</select></p>' +
	' 			</div> ' +
	' 			<div class="modal-footer" style="white-space: nowrap;"> ' +
	' 				<button type="button" class="btn btn-default" data-dismiss="modal">' + cancelButtonMessage + '</button> ' +
	(actionButtonMessage != null?' 				<button type="button" class="btn btn-danger danger actionButtonForAlertWindow">' + actionButtonMessage + '</button> ':'') +
	' 			</div> ' +
	' 		</div> ' +
	' 	</div> ' +
	' </div>';
	
	openModalWindow(modalWindowClassId, modalWindowBody, function(modalWindow)
	{
		if(actionButtonMessage != null)
		{
			$(modalWindow).find('.actionButtonForAlertWindow').off('click')
				.button("refresh")
				.click(function (e) 
				{
					if(actionCallback != null)
					{
						var optionValue = $(modalWindow).find('.selectElementId').val();
						actionCallback.call(this, optionValue);
						closeModalWindow(modalWindowClassId);
					}
				});
		} else
		{
			$(modalWindow).find('.actionButtonForAlertWindow').hide();
		}
	});
		
	return true;
}

function clearChangeChecker() 
{
	$(window).unbind("beforeunload");
}

function setupUnloadChecker(message) 
{
	var unsavedMessage = message == null?"You have made changes to the page":message;
	
	$(window).bind("beforeunload", function (e)
	{
		e.preventDefault();
		showNotificationBar(0, unsavedMessage, 5);		
		e.returnValue = unsavedMessage;
		return unsavedMessage;
	});
}

function setupChangeChecker(message, forAllPage, form) 
{
	var unsavedMessage = message == null?"You have made changes to the page":message;
	var unsaved = false;
	
	if(forAllPage || forAllPage == null)
	{
		unsaved = false;
	} else
	{
		if(form == null)
		{
			$("input:not(:button,:submit),textarea,select").change(function()
			{
				unsaved = true;
			});
		} else
		{
			$(form).each(function()
			{
				var $form = $(this);
				
				$form.find("input:not(:button,:submit),textarea,select").each(function()
				{
					$(this).change(function()
					{
						$form.unsaved = true;
					})
				});
			});
		}
	}
	
	$(window).bind("beforeunload", function (e)
	{
		e.preventDefault();
		
		if(forAllPage || forAllPage == null)
		{
			unsaved = true;
		} else
		{
			if(form == null)
			{
				$("input:not(:button,:submit),textarea,select").change(function()
				{
					unsaved = true;
				});
			} else
			{
				$(form).each(function()
				{
					var $form = $(this);
					
					if($form.unsaved)
					{
						unsaved = true;
					}
				});
			}
		}
		
		if(unsaved)
		{
			showNotificationBar(0, unsavedMessage, 5);
			
			var dialogText = unsavedMessage;
			e.returnValue = dialogText;
			return dialogText;
		}
	});
}

//Restricts input for the set of matched elements to the given inputFilter function.
(function($) 
{
  $.fn.inputFilter = function(inputFilter) 
  {
    return this.on("input keydown keyup mousedown mouseup select contextmenu drop", function() 
    {
      if (inputFilter(this.value)) 
      {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) 
      {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else 
      {
        this.value = "";
      }
    });
  };
}(jQuery));


function fixOptionValues(selectId, selectValue, values)
{
	if(values == null || values == '' || selectId == null || selectId == '')
	{
		return;
	}
	
	var valuesArray = values.split(',');
	
	//remove unused
	$('#' + selectId).find('option').each(function()
	{
		var $option = $(this);
		var optionValue = $option.attr('value');
		var exists = false;
		for(var i = 0; i < valuesArray.length; i++)
		{
			if(optionValue == valuesArray[i])
			{
				exists = true;
				break;
			}
		}
		
		if(!exists)
		{
			$(this).remove();
		}
	});
	
	//add new values
	var lastElement = null;
	for(var i = 0; i < valuesArray.length; i++)
	{		
		var exists = 0 != $('#' + selectId + ' option[value=' + valuesArray[i] + ']').length;
		
		if(!exists)
		{
			var newOption = new Option(valuesArray[i], valuesArray[i]);
			
			if(lastElement != null)
			{
				lastElement.after(newOption);
			} else
			{
				$('#' + selectId).prepend(newOption);
			}
		}
		
		lastElement = $('#' + selectId + ' option[value=' + valuesArray[i] + ']');
	}
	
	$('#' + selectId).val(selectValue);
}
