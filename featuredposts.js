function rmHtmlTag(strx,chop){
	var s = strx.split("<");
	for(var i=0;i<s.length;i++){
		if(s[i].indexOf(">")!=-1){
			s[i] = s[i].substring(s[i].indexOf(">")+1,s[i].length);
		}
	}
	s =  s.join("");
	s = s.substring(0,chop-1);
	return s;
}

function showrecentposts(json) {
	document.write('<div id="slider" class="nivoSlider">');
	img  = new Array();
	var nTotalPost = parseInt(json.feed.openSearch$totalResults.$t);
	numposts = (nTotalPost < numposts) ? nTotalPost : numposts;

  	for (var i = 0; i < numposts; i++) {
	var outcapt;
    	var entry = json.feed.entry[i];
    	var posttitle = entry.title.$t;
	var pcm;
    	var posturl;
    	if (i == json.feed.entry.length) break;
    	for (var k = 0; k < entry.link.length; k++) {
      		if (entry.link[k].rel == 'alternate') {
        		posturl = entry.link[k].href;
        		break;
      		}
    	}
		
		for (var k = 0; k < entry.link.length; k++) {
      		if (entry.link[k].rel == 'replies' && entry.link[k].type == 'text/html') {
        		pcm = entry.link[k].title.split(" ")[0];
        		break;
      		}
    	}
		
    	if ("content" in entry) {
      		var postcontent = entry.content.$t;}
    	else
    	if ("summary" in entry) {
      		var postcontent = entry.summary.$t;}
    	else var postcontent = "";
    	
    	postdate = entry.published.$t;
	
	s = postcontent	; a = s.indexOf("<img"); b = s.indexOf("src=\"",a); c = s.indexOf("\"",b+5); d = s.substr(b+5,c-b-5);

	if((a!=-1)&&(b!=-1)&&(c!=-1)&&(d!="")) img[i] = d;

	var month = [1,2,3,4,5,6,7,8,9,10,11,12];
	var month2 = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];

	var day = postdate.split("-")[2].substring(0,2);
	var m = postdate.split("-")[1];
	var y = postdate.split("-")[0];

	for(var u2=0;u2<month.length;u2++){
		if(parseInt(m)==month[u2]) {
			m = month2[u2] ; break;
		}
	}

	var tntitle = (showTitle) ? '<h4>'+posttitle+'</h4>' : "";
	var tndesc = (showWords) ? ' '+rmHtmlTag(postcontent,showWords)+'...' : "";
	var daystr = (showPostDate) ? ' <i>'+m+' '+day+', '+y+'</i>' : "";

        if (img[i]!="" && posturl!="") {
		var outputr = '<a href="'+posturl+'"><img src="'+img[i]+'" width="'+imgwidth+'" height="'+imgheight+'" alt="'+posttitle+'" title="#cap'+i+'" /></a>';
		outcapt += '<div id="cap'+i+'">'+tntitle+tndesc+daystr+'</div>';
                document.write(outputr);
        }
}

document.write('</div>');
document.write(outcapt);
}
document.write("<script src=\""+home_page+"feeds/posts/default/-/"+catname+"/?start-index=1&max-results="+numposts+"&orderby=published&alt=json-in-script&callback=showrecentposts\"><\/script>");