//destination
//url
window['StompClient'] = window['StompClient'] || function(stompClientId, cfg) 
{
	'use strict';
	
	// constructor return object
	var widget = new Object();
	
	//object members
	widget.stompClientId = stompClientId;
	widget.cfg =  cfg || {};
	widget.stompClient = null;
	
	if(widget.cfg.headers == null)
	{
		widget.cfg.headers = {};
	}
	
	function getHeaders(headers)
	{
		if(headers == null)
		{
			headers = {};
		}
		
		widget.cfg.lastHeaders = headers;
		
		return headers;
	}
	
	//------------------------------------------------------------------------------
	// Public Methods
	//------------------------------------------------------------------------------
	widget.connect = function(headers, onConnectFunction)
	{
		if(widget.cfg.url == null)
		{
			return;
		}
		
		widget.disconnect();
		
		if(widget.stompClient == null)
		{
			var socket = new SockJS(widget.cfg.url);
			widget.stompClient = Stomp.over(socket);
			widget.stompClient.debug = false;
		}
		
		widget.stompClient.connect(getHeaders(headers), function(frame) 
		{
			if(onConnectFunction != null)
			{
				onConnectFunction.call(this, frame);
			}				
        }, function(frame)
        {
        	window.console.log("Error:" + frame);
        	widget.stompClient = null;
        	setTimeout(function(){widget.connect(getHeaders(headers), onConnectFunction);}, 1000);
        });
	}
	
	widget.subscribe = function(headers, destination, onMessageFunction)
	{
		if(widget.stompClient == null
			|| onMessageFunction == null
			|| destination == null
			|| !widget.stompClient.connected)
		{
			return null;
		}
		
		var subscriptionId = widget.stompClient.subscribe(destination, function(message)
								{
									if(onMessageFunction != null)
						        	{
										onMessageFunction.call(this, JSON.parse(message.body));
						        	}
								}, getHeaders(headers)).id;
		return subscriptionId;
	}
	
	widget.unsubscribe = function(subscriptionId)
	{
		if(widget.stompClient == null
			|| subscriptionId == null
			|| !widget.stompClient.connected)
		{
			return;
		}
		
		widget.stompClient.unsubscribe(subscriptionId);
	}
	
	widget.disconnect = function(headers) 
	{
        if(widget.stompClient != null)
        {
        	try
			{
        		if(widget.stompClient.connected)
        		{
        			widget.stompClient.disconnect(widget.cfg.onDisconnectFunction, getHeaders(headers));
        		}
		    } catch(err) 
		    {
		        window.console.log("Disconnect Error:" + err);
		    }
		    
		    widget.stompClient = null;
        }
    }
	
	widget.sendMessage = function(url, message, headers) 
	{
		if(widget.stompClient != null
			&& widget.stompClient.connected) 
        {
			widget.stompClient.send(url, {}, JSON.stringify(message), getHeaders(headers));
        }
    }
	
	widget.setConfig = function(newCfg) 
	{
        if(newCfg.url != null) 
        {
        	widget.cfg.url = newCfg.url;
        }
        if(newCfg.headers != null) 
        {
        	widget.cfg.headers = newCfg.headers;
        }
    }
	
	return widget;
}

function bindForPendingMessages()
{
	var globalFormHelper = new FormHelper('global');

}
