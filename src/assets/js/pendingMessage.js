window['PendingMessages'] = window['PendingMessages'] || function(pendingMessagesId, cfg) 
{
	'use strict';
	
	// constructor return object
	var widget = new Object();
	
	widget.stompClient = null;
	widget.stompClientId = pendingMessagesId;
	widget.cfg =  cfg || {};
	
	if(widget.stompClientId == null)
	{
		widget.stompClientId = 'PendingMessages';
	}
	if(widget.cfg.url == null)
	{
		widget.cfg.url = '/hea-web/websocket/messagesWS';
	}
	if(widget.cfg.destination == null)
	{
		widget.cfg.destination = '/topic/{userId}/pendingMessagesWS';
	}
	
	widget.prepareDestination = function(userId)
	{
		return widget.cfg.destination.replace(/{userId}/g, userId);
	}
	
	widget.onNewMessage = function(pendingMessage)
	{
		if(widget.cfg.onNewMessage != null)
		{
			widget.cfg.onNewMessage.call(this, pendingMessage);
		}
		
		widget.showNotificationBar(pendingMessage.pendingMessageId, pendingMessage.message, pendingMessage.alertLevel, 60000);
	}
	
	widget.multicastPendingMessages = function(userId)
	{
		$.ajax(
		{
			type: 'POST',
			url: 'users/' + userId + '/pendingMessages',
			success: function(data, textStatus) {},
			contentType: "application/json",
			dataType: 'json'
		});
	}
	
	widget.removeMessage = function(pendingMessageId, divElement)
	{
		$.ajax(
		{
			type: 'DELETE',
			url: 'pendingMessages/' + pendingMessageId,
			success: function(data, textStatus) {divElement.remove();},
			contentType: "application/json",
			dataType: 'json'
		});
	}
	
	widget.showNotificationBar = function (id, message, alertLevel, duration, height) 
	{	
		if($('.notification-message-' + id).length)
		{
			return;
		}
		
	    /*set default values*/
		alertLevel = typeof alertLevel !== 'undefined' ? alertLevel : 10;
	    duration = typeof duration !== 'undefined' ? duration : 600000;
	    height = typeof height !== 'undefined' ? (height + 'px') : '1.5em';
	    var bgColor = alertLevel == 0?'#1798A3':(alertLevel == 5?'#E8C772':(alertLevel == 10?'#C5614A':('#C5614A')));
	    var txtColor = alertLevel == 0?'#ffffff':(alertLevel == 5?'#ffffff':(alertLevel == 10?'#ffffff':('#A42732')));
	    
	    var $messageDiv = $("<div class='notification-message' style='text-align:center; width: 95%; float: left; margin-top: 0.5em; margin-bottom: 0.5em; line-height: " + height + ";'> " + message + " </div>");
	    var $removeDiv = $("<div class='notification-message-remove' style='text-align:center; line-height: " + height + "; width: 1%; float: right; margin-right: 2%;'>x</div>");
	    var $newDiv = $("<div id='notification-message-" + id + "' class='notification-message-div notification-message-" + id + "' style='display:none; position: absolute; width: 50%; margin-left: 25%; background-color: " + bgColor + " !important; z-index: 100; color: " + txtColor + " !important; border: 1px solid " + txtColor + " !important;'></div>");
	    $newDiv.append($messageDiv).append($removeDiv);
	    $newDiv.css("border-radius", "10px");
	    
	    $('body').prepend($newDiv);
	    
	    $removeDiv.click(function()
	    {
	    	widget.removeMessage(id, $newDiv);
	    }).css('cursor', 'pointer');
	    
	    /*animate the bar*/
	    $newDiv.slideDown(function() 
	    {
	        setTimeout(function() 
	        {
	        	$newDiv.slideUp(function() {widget.removeMessage(id, $newDiv);});
	        }, duration);
	    });
	}
	
	widget.subscribe = function(userId)
	{
		if(widget.stompClient != null)
		{
			widget.stompClient.disconnect();
		}
		
		widget.stompClient = new StompClient(widget.stompClientId, {url:widget.cfg.url});
		
		widget.stompClient.connect(null, function(frame)
		{
			try
			{
				if(widget.stompClientSubscribeId != null)
				{
					widget.stompClient.unsubscribe(widget.stompClientSubscribeId);
				}
				
				widget.stompClientSubscribeId = widget.stompClient.subscribe(null, widget.prepareDestination(userId), widget.onNewMessage);
				
				widget.multicastPendingMessages(userId);
		    } catch(err) 
		    {
		    	window.console.log("Subscribe Error:" + err);
		    	
		    	setTimeout(function()
		    	{
		    		widget.subscribe(userId);
		    	}, 1000);
		    }
		});
	}
	
	return widget;
}

function initPendingMessages(userId, cfg)
{
	if(window.pendingMessagesClient == null)
	{
		window.pendingMessagesClient = new PendingMessages('PendingMessages', cfg);
	}
	
	window.pendingMessagesClient.subscribe(userId); 
}
