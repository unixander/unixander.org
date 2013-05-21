'use strict';

/* Services */
angular.module('ManageCookies',[]).factory('cookies', function () {
	return{
		get: function(name){
			var i, x, y, ARRcookies = document.cookie.split(";");
			for (i = 0; i < ARRcookies.length; i++) {
			    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			    x = x.replace(/^\s+|\s+$/g, "");
			    if (x == name) {
			        return unescape(y);
			    }
			}
			return undefined;
		},
		set: function(name,value,params){
			var exdays=params.exdays;
			if(!exdays) exdays=1;
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + exdays);
			var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
			document.cookie = name + "=" + c_value;
		}
	}
});

angular.module('LocalStorage',[]).factory('storage',function(){
	return {
		set: function (key, value) {
	        window.localStorage[key] = value;
	    },
	    get: function (key) {
	        return window.localStorage[key];
	    }
    }
});

angular.module('dateFormatter',[]).factory('dateFormat',function(){
	return{
		now: function(){
			var date = new Date(), 
			dd = date.getDate(), 
			mm = date.getMonth()+1, 
			yyyy = date.getFullYear(),
			hh = date.getHours(),
			MM = date.getMinutes(),
			ss = date.getSeconds();
			if ( dd < 10 ) dd = '0' + dd ; 
			if ( mm < 10 ) mm = '0' + mm ;
			if ( hh < 10 ) hh = '0' + hh ;
			if ( MM < 10 ) MM = '0' + MM ;
			if ( ss < 10 ) ss = '0' + ss ;
			return mm + '/' + dd + '/' + yyyy + ' ' 
				+ hh + ':' + MM + ':' + ss;
		}	
	}
})