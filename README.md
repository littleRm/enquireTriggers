# enquireTriggers.js
jQuery media match height and width triggers

##

###Default Media Queries:

```javascript
queries = [
	{
	 'mq'		:'(max-width: 767px)',
	 'trigger'	:'isMobile',
	},{
	 'mq'		:'(min-width: 768px) and (max-width:1023px)',
	 'trigger'	:'isTablet',
	},{
	 'mq'		:'(min-width: 1024px)',
	 'trigger'	:'isDesktop',
	},{
	 'mq'		:'(min-width: 1200px)',
	 'trigger'	:'isBigDesktop',
	},{
	 'mq'		:'(min-height: 768px)',
	 'trigger'	:'isMinHeight',
	},{
	 'mq'		:'(orientation : landscape)',
	 'trigger'	:'isLandscape',
	},{
	 'mq'		:'(orientation : portrait)',
	 'trigger'	:'isPortrait',
	}
];
```

###Use jQuery Triggers:

```javascript

	$(document).on('ET:isMobile', function(matches){
		if(matches)
			alert("IS MOBILE!");
		else
			alert("IS NOT MOBILE!");	
	});

```

###Use live boolean variables:

```javascript

	if(ETisMobile){
		alert("IS MOBILE!");
	else
		alert("IS NOT MOBILE!");	

```

###Add your own Media Queries

```javascript

	var customQueries = [
		{
		 'mq':		'(min-height: 900px)',
		 'trigger':	'is900plus'
		 }	
	];
	
	$(document).enquireTriggers(customQueries);

	$(document).on('ET:is900plus', function(matches){
		if(matches)
			alert("IS 900px OR LARGER!");
		else
			alert("IS LESS THAN 900px!");	
	});

```


##License

License: MIT (http://www.opensource.org/licenses/mit-license.php)

