var gfeedfetcher_loading_image="indicator.gif";google.load("feeds","1");function gfeedfetcher(c,a,b){this.linktarget=b||"";this.feedlabels=[];this.feedurls=[];this.feeds=[];this.feedsfetched=0;this.feedlimit=5;this.showoptions="";this.sortstring="date";document.write('<div id="'+c+'" class="'+a+'"></div>');this.feedcontainer=document.getElementById(c);this.itemcontainer="<li>"}gfeedfetcher.prototype.addFeed=function(b,a){this.feedlabels[this.feedlabels.length]=b;this.feedurls[this.feedurls.length]=a};gfeedfetcher.prototype.filterfeed=function(b,a){this.feedlimit=b;if(typeof a!="undefined"){this.sortstring=a}};gfeedfetcher.prototype.displayoptions=function(a){this.showoptions=a};gfeedfetcher.prototype.setentrycontainer=function(a){this.itemcontainer="<"+a.toLowerCase()+">"};gfeedfetcher.prototype.init=function(){this.feedsfetched=0;this.feeds=[];this.feedcontainer.innerHTML='<img src="'+gfeedfetcher_loading_image+'" /> Retrieving RSS feed(s)';var a=this;for(var b=0;b<this.feedurls.length;b++){var c=new google.feeds.Feed(this.feedurls[b]);var d=(this.feedlimit<=this.feedurls.length)?1:Math.floor(this.feedlimit/this.feedurls.length);if(this.feedlimit%this.feedurls.length>0&&this.feedlimit>this.feedurls.length&&b==this.feedurls.length-1){d+=(this.feedlimit%this.feedurls.length)}c.setNumEntries(d);c.load(function(e){return function(f){a._fetch_data_as_array(f,e)}}(this.feedlabels[b]))}};gfeedfetcher._formatdate=function(a,c){var d=new Date(a);var b=(c.indexOf("datetime")!=-1)?d.toLocaleString():(c.indexOf("date")!=-1)?d.toLocaleDateString():(c.indexOf("time")!=-1)?d.toLocaleTimeString():"";return"<span class='datefield'>"+b+"</span>"};gfeedfetcher._sortarray=function(a,b){var b=(b=="label")?"ddlabel":b;if(b=="title"||b=="ddlabel"){a.sort(function(e,d){var g=e[b].toLowerCase();var f=d[b].toLowerCase();return(g<f)?-1:(g>f)?1:0})}else{try{a.sort(function(e,d){return new Date(d.publishedDate)-new Date(e.publishedDate)})}catch(c){}}};gfeedfetcher.prototype._fetch_data_as_array=function(b,a){var d=(!b.error)?b.feed.entries:"";if(d==""){alert("Google Feed API Error: "+b.error.message)}for(var c=0;c<d.length;c++){b.feed.entries[c].ddlabel=a}this.feeds=this.feeds.concat(d);this._signaldownloadcomplete()};gfeedfetcher.prototype._signaldownloadcomplete=function(){this.feedsfetched+=1;if(this.feedsfetched==this.feedurls.length){this._displayresult(this.feeds)}};gfeedfetcher.prototype._displayresult=function(a){var e=(this.itemcontainer=="<li>")?"<ul>\n":"";gfeedfetcher._sortarray(a,this.sortstring);for(var c=0;c<a.length;c++){var d='<a href="'+a[c].link+'" target="'+this.linktarget+'" class="titlefield">'+a[c].title+"</a>";var b=/label/i.test(this.showoptions)?'<span class="labelfield">['+this.feeds[c].ddlabel+"]</span>":" ";var g=gfeedfetcher._formatdate(a[c].publishedDate,this.showoptions);var f=/description/i.test(this.showoptions)?"<br />"+a[c].content:/snippet/i.test(this.showoptions)?"<br />"+a[c].contentSnippet:"";e+=this.itemcontainer+d+" "+b+" "+g+"\n"+f+this.itemcontainer.replace("<","</")+"\n\n"}e+=(this.itemcontainer=="<li>")?"</ul>":"";this.feedcontainer.innerHTML=e};
var gfeedfetcher_loading_image="indicator.gif";function gfeedrssticker(d,b,a,c){this.tickerid=d;this.delay=parseInt(a);this.mouseoverBol=0;this.itemsperpage=1;this.messagepointer=0;gfeedfetcher.call(this,d,b,c);this.itemcontainer="<div>";this.tickerdiv=document.getElementById(d)}gfeedrssticker.prototype=new gfeedfetcher;gfeedrssticker.prototype.constructor=gfeedrssticker;gfeedrssticker.prototype._displayresult=null;gfeedrssticker.prototype.entries_per_page=function(a){this.itemsperpage=a};gfeedrssticker.prototype._signaldownloadcomplete=function(){this.feedsfetched+=1;if(this.feedsfetched==this.feedurls.length){this._initscroller(this.feeds)}};gfeedrssticker.prototype._initscroller=function(a){var c=this;gfeedfetcher._sortarray(a,this.sortstring);this.itemsperpage=(this.itemsperpage>=a.length)?1:this.itemsperpage;var b=a.slice(this.messagepointer,this.itemsperpage);this.tickerdiv.innerHTML=formatrssmessage(b,this.showoptions,this.itemcontainer,this.linktarget);this.tickerdiv.onmouseover=function(){c.mouseoverBol=1};this.tickerdiv.onmouseout=function(){c.mouseoverBol=0};this.messagepointer=this.itemsperpage;if(window.attachEvent){window.attachEvent("onunload",function(){c.tickerdiv.onmouseover=c.tickerdiv.onmouseout=null})}setTimeout(function(){c._rotatemessage()},this.delay)};function formatrssmessage(d,b,f,g){var c=(f=="<li>")?"<ul>\n":"";for(var e=0;e<d.length;e++){var h='<a href="'+d[e].link+'" target="'+g+'" class="titlefield">'+d[e].title+"</a>";var j=/label/i.test(b)?'<span class="labelfield">['+d[e].ddlabel+"]</span>":" ";var k=gfeedfetcher._formatdate(d[e].publishedDate,b);var a=/description/i.test(b)?"<br />"+d[e].content:/snippet/i.test(b)?"<br />"+d[e].contentSnippet:"";c+=f+h+" "+j+" "+k+"\n"+a+f.replace("<","</")+"\n\n"}c+=(f=="<li>")?"</ul>\n":"";return c}gfeedrssticker.prototype._rotatemessage=function(){var b=this;if(this.mouseoverBol==1){setTimeout(function(){b._rotatemessage()},100)}else{var a=this.feeds.slice(this.messagepointer,this.messagepointer+this.itemsperpage);this.tickerdiv.innerHTML=formatrssmessage(a,this.showoptions,this.itemcontainer,this.linktarget);this.messagepointer=(this.messagepointer+this.itemsperpage>this.feeds.length-1)?0:this.messagepointer+this.itemsperpage;setTimeout(function(){b._rotatemessage()},this.delay)}};
