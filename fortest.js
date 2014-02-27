$("#LinkList2 ul a").each(function () {
  var key = $(this).text();
  if (key == 'twitter') {
    $(this).html('<div class="twitter-si"/>');
  }
  if (key == 'facebook') {
    $(this).html('<div class="facebook-si"/>');
  }
  if (key == 'google') {
    $(this).html('<div class="googleplus-si"/>');
  }
  if (key == 'youtube') {
    $(this).html('<div class="youtube-si"/>');
  }
});
$("#LinkList1").each(function () {
  var a = "<a href='/' class='home-li'/><ul id='nav'><li><ul>";
  $("#LinkList1 li").each(function () {
    var c = $(this).text(),
      b = c.substr(0, 1),
      d = c.substr(1);
    "_" == b ? (b = $(this).find("a").attr("href"), a += '<li><a href="' + b + '">' + d + "</a></li>") : (b = $(this).find("a").attr("href"), a += '</ul></li><li><a href="' + b + '">' + c + "</a><ul>")
  });
  a += "</ul></li></ul>";
  $(this).html(a);
  $("#LinkList1 ul").each(function () {
    var $this = $(this);
    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
      $this.remove();
  });
  $("#LinkList1 li").each(function () {
    var $this = $(this);
    if ($this.html().replace(/\s|&nbsp;/g, '').length == 0)
      $this.remove();
  });
});
$("#new-st .widget-content").each(function () {
  var g = $(this).text();
  $.ajax({
    url: "/feeds/posts/default/-/" + g + "?alt=json-in-script&max-results=10",
    type: "get",
    dataType: "jsonp",
    success: function (b) {
      for (var h = '', d = '<h3>BREAKING NEWS</h3><ul id="new-st-bar">', a = 0; b.feed.entry.length > a; a++) {
        for (var j = 0; j < b.feed.entry[a].link.length; j++) {
          if (b.feed.entry[a].link[j].rel == "alternate") {
            h = b.feed.entry[a].link[j].href;
            break;
          }
        }
        var m = b.feed.entry[a].title.$t,
          d = d + ('<li><a href="' + h + '"><span>' + m + " </span></a></li>")
      }
      d += "</ul>";
      $("#new-st .widget-content").html(d);
      (function ($) {
        $("#new-st-bar").simplyScroll({
          'frameRate': 47
        });
      })(jQuery);
    }
  })
});
$("#slider-section .widget").each(function () {
   $(this).html();
   var a = $(this).find("img").attr("src"),
     c = $(this).find("h2").html(),
     d = $(this).find(".widget-content a").attr("href"),
       b = $(this).find(".caption").html();
  if (c == undefined) {var e=''} else { var e ='<h2>' + c + '</h2>'};
  if (b == undefined) {var p=''} else {var p='<p>' + b + '</p>'};
  if (d == undefined) {var l=''} else { var l='<a href="'+d+'">Read more</a>'};
   var f = $(this).attr("id");
   $("#slider-section .widget").each(function () {
     $(this).attr("id") == f && $(this).replaceWith("<li style='background:url(" + a + ")' class='ituns'>" + e +""+ p +""+l+"</li>")
   })
});
$("#slider-section").each(function () {
  var a = $(this).html();
  $(this).replaceWith('<ul id="slider">' + a + '</ul><div class="unslider-arrow prev"/><div class="unslider-arrow next"/>');
});
$("#recent-post-top .widget-content").each(function () {
  var t = $(this).html(),
    k = $(this).prev("h2").text();
  var z = t.split('/');
  $(this).html("<span>" + z[0] + "</span><span>" + z[1] + "</span><span>" + z[2] + "</span>");
  var kkk = $(this).text();
  var g = $(this).find("span").eq(0).text();
  var style = $(this).find("span").eq(1).text();
  var color = $(this).find("span").eq(2).text();
  if (style.match('column')) {
    $.ajax({
      url: "/feeds/posts/default/-/" + g + "?alt=json-in-script&max-results=3",
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var posturl = "";
        var htmlcode = '<ul>';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }
          var posttitle = data.feed.entry[i].title.$t;
          var author = data.feed.entry[i].author[0].name.$t;
          var date = data.feed.entry[i].published.$t.substring(0, 10);
            var content = data.feed.entry[i].content.$t;
            var $content = $('<div>').html(content);
            var src = $content.find('img:first').attr('src');
var thumb = '<a class="rcp-thumb" href="' + posturl + '" style="background:url('+src+') no-repeat center center"/>';
          htmlcode += '<li>' + thumb + '<div class="rcp-panel"><h3 class="rcp-title"><a href="' + posturl + '">' + posttitle + '</a></h3><span>' + author + '</span><span>' + date + '</span></div><div class="clear"/></li>';
        }
        htmlcode += '<div class="clear"/></ul>';

        $("#recent-post-top .widget-content").each(function () {
          var text = $(this).text();
          if (text == kkk) {
            $(this).html(htmlcode);
            $(this).parent().addClass('rcp-column');
            $(this).prev("h2").html('<a href="/search/label/' + g + '">' + k + '</a>');
            $(this).prev("h2").css('background',color);
          }
        });
      }
    });
  }
  if (style.match('fullwidth')) {
    $.ajax({
      url: "/feeds/posts/default/-/" + g + "?alt=json-in-script&max-results=5",
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var posturl = "";
        var htmlcode = '<ul>';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }
          var posttitle = data.feed.entry[i].title.$t;
          var author = data.feed.entry[i].author[0].name.$t;
          var date = data.feed.entry[i].published.$t.substring(0, 10);
            var content = data.feed.entry[i].content.$t;
            var $content = $('<div>').html(content);
            var src = $content.find('img:first').attr('src');
            
          if (i == 0) {
              var re = /<\S[^>]*>/g;
              var postcontent = content.replace(re,"");
              if(postcontent.length > 200){
                postcontent = ''+postcontent.substring(0,200)+'...';
              }
var thumb = '<a class="rcp-thumb-big" href="' + posturl + '" style="background:url('+src+') no-repeat center center"/>';
          } else {
              var thumb = '<a class="rcp-thumb" href="' + posturl + '" style="background:url('+src+') no-repeat center center"/>';
            };
          if (i == 0) {
            htmlcode += '<div class="bigfirst">' + thumb + '<div class="bigthumb-panel"><h3 class="rcp-title-big"><a href="' + posturl + '">' + posttitle + '</a></h3><span>' + author + '</span><span>' + date + '</span><p>'+postcontent+'<p></div></div>';
          } else {
            htmlcode += '<li>' + thumb + '<div class="rcp-panel"><h3 class="rcp-title"><a href="' + posturl + '">' + posttitle + '</a></h3><span>' + author + '</span><span>' + date + '</span></div><div class="clear"/></li>';
            
          }
          
        }
        htmlcode += '</ul>';

        $("#recent-post-top .widget-content").each(function () {
          var text = $(this).text();
          if (text == kkk) {
            $(this).html(htmlcode);
            $(this).parent().addClass('rcp-fullwidth');
            $(this).prev("h2").html('<a href="/search/label/' + g + '">' + k + '</a>');
            $(this).find('.bigfirst').prependTo($(this).parent());
            $(this).prev("h2").css('background',color);
          }
        });
      }
    });
  }
  if (style.match('carousel')) {
    $.ajax({
      url: "/feeds/posts/default/-/" + g + "?alt=json-in-script&max-results=6",
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var posturl = "";
        var htmlcode = '<div class="owl">';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }
          var posttitle = data.feed.entry[i].title.$t;
            var content = data.feed.entry[i].content.$t;
            var $content = $('<div>').html(content);
            var src = $content.find('img:first').attr('src');
          htmlcode += '<li><a href="' + posturl + '"><div style="background:url('+src+') no-repeat center center" class="crl-item"><h3 class="rcp-title-big">' + posttitle + '</h3></div></a></li>';
        }
        htmlcode += '</div>';

        $("#recent-post-top .widget-content").each(function () {
          var text = $(this).text();
          if (text == kkk) {
            $(this).html(htmlcode);
            $(this).parent().addClass('rcp-carousel');
            $(this).prev("h2").html('<a href="/search/label/' + g + '">' + k + '</a>');
            $(this).prev("h2").css('background',color);
            $(this).find("h3").css('background-color',color);
            $(".owl").owlCarousel({
              items : 3,
              navigation : true,
              navigationText : ["",""],
              itemsDesktop : [1000,3],
              itemsDesktopSmall : [647,1],
              itemsTablet : [396,1],
              itemsMobile : false,
              pagination : false
            });
          }
        });
      }
    });
  }
});
$("#related-posts").each(function () {
  var g = $(this).html();
    $.ajax({
      url: "/feeds/posts/default/-/" + g + "?alt=json-in-script&max-results=3",
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var posturl = "";
        var htmlcode = '<ul class="rlp">';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }
          var posttitle = data.feed.entry[i].title.$t;
          var author = data.feed.entry[i].author[0].name.$t;
          var date = data.feed.entry[i].published.$t.substring(0, 10);
            var content = data.feed.entry[i].content.$t;
            var $content = $('<div>').html(content);
            var src = $content.find('img:first').attr('src');
var thumb = '<a class="rlp-thumb" href="' + posturl + '" style="background:url('+src+') no-repeat center center"/>';
          htmlcode += '<li>' + thumb + '<div class="rlp-panel"><h3 class="rcp-title"><a href="' + posturl + '">' + posttitle + '</a></h3><span>' + author + '</span><span>' + date + '</span></div><div class="clear"/></li>';
        }
        htmlcode += '<div class="clear"/></ul>';
            $("#related-posts").html(htmlcode);
      }
    });
});
$('.widget-content').each(function () {
  var text = $(this).text();
  if (text.substr(0, 10).match('fblikebox')) {
    text = text.replace('fblikebox/', '');
    $(this).html('<iframe src="//www.facebook.com/plugins/likebox.php?href=' + text + '&amp;width=234&amp;height=258&amp;colorscheme=light&amp;show_faces=true&amp;header=false&amp;stream=false&amp;show_border=false&amp;appId=253324024767587" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:234px; height:258px;margin-left:13px" allowtransparency="true"></iframe>');
  }
  if (text.match('recentcomment')) {
    $.ajax({
      url: "/feeds/comments/default?alt=json-in-script&max-results=3",
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var posturl = "";
        var htmlcode = '<ul class="rc">';
        for (var i = 0; i < data.feed.entry.length; i++) {

          if (i == data.feed.entry.length) break;
          for (var k = 0; k < data.feed.entry[i].link.length; k++) {
            if (data.feed.entry[i].link[k].rel == 'alternate') {
              posturl = data.feed.entry[i].link[k].href;
              break;
            }
          }
          if ("content" in data.feed.entry[i]) {
            var content = data.feed.entry[i].content.$t;
          } else if ("summary" in b_rc) {
            var content = data.feed.entry[i].summary.$t;
          } else var content = "";
          var re = /<\S[^>]*>/g;
          content = content.replace(re, "");
          if(content.length > 90){
                content = ''+content.substring(0,90)+'...';
              }
          var posttitle = data.feed.entry[i].title.$t;
          var author = data.feed.entry[i].author[0].name.$t;
          var thumburl = data.feed.entry[i].author[0].gd$image.src;
          if (thumburl.match('http://img1.blogblog.com/img/blank.gif')){
          var thumb = '<img class="rc-img" src="http://img1.blogblog.com/img/anon36.png"/>';
          } else {
            if (thumburl.match('http://img2.blogblog.com/img/b16-rounded.gif')){
              var thumb = '<img class="rc-img" src="http://img1.blogblog.com/img/anon36.png"/>';
            } else {
            var thumb = '<img class="rc-img" src="' + thumburl + '"/>';
            }
          };
          htmlcode += '<li>' + thumb + '<a class="rc-panel" href="' + posturl + '"><span><b style="margin-bottom:10px">' + author + '</b><br/><i>"' + content + '"</i></span></a><div class="clear"/></li>';
        }
        htmlcode += '<div class="clear"/></ul>';
        $('.widget-content').each(function () {
          if ($(this).text().match('recentcomment')) {
            $(this).html(htmlcode);
          }
        })
      }
    });
  }
  if (text.match('randomposts')) {
    $.ajax({
      url: "/feeds/posts/default?alt=json-in-script",
      type: 'get',
      dataType: "jsonp",
      success: function (datax) {
        var numpost = datax.feed.entry.length;
var min = 0; 
var max = numpost-3; 
var random = Math.floor(Math.random() * (max - min + 1)) + min;
    $.ajax({
      url: "/feeds/posts/default?alt=json-in-script&start-index=" + random + "&max-results=3",
      type: 'get',
      dataType: "jsonp",
      success: function (data) {
        var posturl = "";
        var htmlcode = '<ul class="post-widget">';
        for (var i = 0; i < data.feed.entry.length; i++) {
          for (var j = 0; j < data.feed.entry[i].link.length; j++) {
            if (data.feed.entry[i].link[j].rel == "alternate") {
              posturl = data.feed.entry[i].link[j].href;
              break;
            }
          }
          var posttitle = data.feed.entry[i].title.$t;
          var author = data.feed.entry[i].author[0].name.$t;
          var date = data.feed.entry[i].published.$t.substring(0, 10);
            var content = data.feed.entry[i].content.$t;
            var $content = $('<div>').html(content);
            var src = $content.find('img:first').attr('src');
var thumb = '<a class="rcp-thumb" href="' + posturl + '" style="background:url('+src+') no-repeat center center"/>';
          htmlcode += '<li>' + thumb + '<div class="post-panel"><h3 class="rcp-title"><a href="' + posturl + '">' + posttitle + '</a></h3><span>' + author + '</span><span>' + date + '</span></div><div class="clear"/></li>';
        }
        htmlcode += '<div class="clear"/></ul>';
        $('.widget-content').each(function () {
          if ($(this).text().match('randomposts')) {
            $(this).html(htmlcode);
          }
        });
      }
    });
      }
    });
  }
});
$(".blog-pager").each(function () {
  var b = $(this).html(),
    b = b + '<div class="clear"/>';
  b = $("a.blog-pager-newer-link").attr("href");
  $("a.blog-pager-newer-link").load(b + " .post-title:first", function () {
    var b = $("a.blog-pager-newer-link").text();
    $("a.blog-pager-newer-link").text(b)
  });
  b = $("a.blog-pager-older-link").attr("href");
  $("a.blog-pager-older-link").load(b + " .post-title:first", function () {
    var b = $("a.blog-pager-older-link").text();
    $("a.blog-pager-older-link").text(b)
  })
});
$("[placeholder]").focus(function () {
  var b = $(this);
  b.val() == b.attr("placeholder") && (b.val(""), b.removeClass("placeholder"))
}).blur(function () {
  var b = $(this);
  if ("" == b.val() || b.val() == b.attr("placeholder")) b.addClass("placeholder"), b.val(b.attr("placeholder"))
}).blur();
  $('.post-item-list').each(function() {
    var src = $(this).find('img:first').attr('src');
    var href = $(this).find('a:first').attr('href');
    var head = $(this).find('h3:first').html();
var meta = $(this).find('.post-meta-bottom').html();
            var re = /<\S[^>]*>/g;
            var postcontent = $(this).find('.content').html().replace(re,"");
            if(postcontent.length > 110){
                postcontent = ''+postcontent.substring(0,110)+'...';
            }
    $(this).html('<a class="pi-thumb" style="background:url('+src+') no-repeat center center" href="'+href+'"/><div class="pi-panel"><h3><a class="post-item-thumb" href="'+href+'">'+head+'</a></h3><div class="post-meta-bottom">'+meta+'</div>'+postcontent+'</div>');
$(this).appendTo('#blog-archive');
  });
$('.pagenavi').appendTo('#blog-archive');
var commentcontent = $("#comment-holder").html();
commentcontent = commentcontent.replace(/\:ambivalent:/g,'<img src="https://lh5.googleusercontent.com/-Hf9qKo7agp8/Us1sKyj0hjI/AAAAAAAAAK8/GIVHgjmSNT4/s128/Ambivalent.png"/>');
commentcontent = commentcontent.replace(/\:angry:/g,'<img src="https://lh6.googleusercontent.com/-hgWisxAans4/Us1sK4D16KI/AAAAAAAAAK4/iBhZZ27bebM/s128/Angry.png"/>');
commentcontent = commentcontent.replace(/\:confused:/g,'<img src="https://lh5.googleusercontent.com/-RoTqv7WptS4/Us1sK6hIKaI/AAAAAAAAALE/5VhBfZhMZ2s/s128/Confused.png"/>');
commentcontent = commentcontent.replace(/\:content:/g,'<img src="https://lh6.googleusercontent.com/-W4NEtkVqgeE/Us1sLXbb5WI/AAAAAAAAALM/RyR4R8ssnlA/s128/Content.png"/>');
commentcontent = commentcontent.replace(/\:cool:/g,'<img src="https://lh3.googleusercontent.com/-vD41z2CTxUg/Us1sLzvivjI/AAAAAAAAALU/DtZx1OFoLdM/s128/Cool.png"/>');
commentcontent = commentcontent.replace(/\:crazy:/g,'<img src="https://lh3.googleusercontent.com/-ZVCDgMSiP7E/Us1sL0si0_I/AAAAAAAAALc/L3doK3Ighdo/s128/Crazy.png"/>');
commentcontent = commentcontent.replace(/\:cry:/g,'<img src="https://lh6.googleusercontent.com/-6dMqi5LPmkg/Us1sMRbvI9I/AAAAAAAAALk/kv3xTwuk1EI/s128/Cry.png"/>');
commentcontent = commentcontent.replace(/\:embarrassed:/g,'<img src="https://lh6.googleusercontent.com/-LSz90gbnuQQ/Us1sMqFm9NI/AAAAAAAAALs/dpIsct5T2Mo/s128/Embarrassed.png"/>');
commentcontent = commentcontent.replace(/\:footinmouth:/g,'<img src="https://lh5.googleusercontent.com/-HsPj4kLZ-ak/Us1sNOz_62I/AAAAAAAAALw/6P5YwQSNq2A/s128/Footinmouth.png"/>');
commentcontent = commentcontent.replace(/\:frown:/g,'<img src="https://lh4.googleusercontent.com/-JBPEIn41Qhg/Us1sNd-VauI/AAAAAAAAAMA/yY_ZbQhvVJE/s128/Frown.png"/>');
commentcontent = commentcontent.replace(/\:gasp:/g,'<img src="https://lh4.googleusercontent.com/-HFbQ-Z7SlyU/Us1sN3AbrfI/AAAAAAAAAMM/cni4I-jbzjE/s128/Gasp.png"/>');
commentcontent = commentcontent.replace(/\:grin:/g,'<img src="https://lh4.googleusercontent.com/-Ee8OV785Oeg/Us1sNzGbEOI/AAAAAAAAAME/e1Kv1TM6bBI/s128/Grin.png"/>');
commentcontent = commentcontent.replace(/\:heart:/g,'<img src="https://lh5.googleusercontent.com/-etrLul2_QDc/Us1sO7SMzLI/AAAAAAAAAMk/CpKe7BVUzPw/s128/Heart.png"/>');
commentcontent = commentcontent.replace(/\:hearteyes:/g,'<img src="https://lh5.googleusercontent.com/-Fbp5EwSv0eg/Us1sO0uIUzI/AAAAAAAAAMU/99C9Rs9ngLc/s128/HeartEyes.png"/>');
commentcontent = commentcontent.replace(/\:innocent:/g,'<img src="https://lh5.googleusercontent.com/-jBzfzHvAmYU/Us1sO6z8rqI/AAAAAAAAAMc/Om1jqdk4KcQ/s128/Innocent.png"/>');
commentcontent = commentcontent.replace(/\:kiss:/g,'<img src="https://lh4.googleusercontent.com/-TcbtEVSfmh8/Us1sP4eP6kI/AAAAAAAAAMs/fA_YSePf320/s128/Kiss.png"/>');
commentcontent = commentcontent.replace(/\:laughing:/g,'<img src="https://lh4.googleusercontent.com/-RMeT3xiJe2Q/Us1sQTT9A2I/AAAAAAAAAM8/uNWyDQiNEFU/s128/Laughing.png"/>');
commentcontent = commentcontent.replace(/\:minifrown:/g,'<img src="https://lh3.googleusercontent.com/-fBbv0WXlNcc/Us1sQdmIjEI/AAAAAAAAAM0/1E0D1Gh43UU/s128/Mini-Frown.png"/>');
commentcontent = commentcontent.replace(/\:minismile:/g,'<img src="https://lh3.googleusercontent.com/-PLMoO9pKPhE/Us1sQwByaNI/AAAAAAAAANE/B7_Pc_3-nSA/s128/Mini-Smile.png"/>');
commentcontent = commentcontent.replace(/\:moneymouth:/g,'<img src="https://lh6.googleusercontent.com/-_niiqiLTlsE/Us1sQyAhe6I/AAAAAAAAANM/kZFA0v3cl18/s128/Money-Mouth.png"/>');
commentcontent = commentcontent.replace(/\:naughty:/g,'<img src="https://lh3.googleusercontent.com/-LdJCIkNNnxY/Us1sRo-vVgI/AAAAAAAAANU/UlcoTQ9ptkY/s128/Naughty.png"/>');
commentcontent = commentcontent.replace(/\:nerd:/g,'<img src="https://lh6.googleusercontent.com/-Ne7Z9rGqGKE/Us1sSMggsrI/AAAAAAAAANc/wqnn0j6184s/s128/Nerd.png"/>');
commentcontent = commentcontent.replace(/\:notamused:/g,'<img src="https://lh6.googleusercontent.com/-p-d9MXFhgPQ/Us1sSCrQqcI/AAAAAAAAANk/nY_D4wN8Yq0/s128/Not-Amused.png"/>');
commentcontent = commentcontent.replace(/\:sarcastic:/g,'<img src="https://lh4.googleusercontent.com/-EHqVrCUIpdc/Us1sSm24qMI/AAAAAAAAANs/qY9_ilHe-90/s128/Sarcastic.png"/>');
commentcontent = commentcontent.replace(/\:sealed:/g,'<img src="https://lh4.googleusercontent.com/-1nvOdXX5nyg/Us1sS33rqcI/AAAAAAAAAN0/HI29ZZedazc/s128/Sealed.png"/>');
commentcontent = commentcontent.replace(/\:sick:/g,'<img src="https://lh6.googleusercontent.com/-CN3rkPQpjkg/Us1sTd9POrI/AAAAAAAAAN8/1xkgPXgupdE/s128/Sick.png"/>');
commentcontent = commentcontent.replace(/\:slant:/g,'<img src="https://lh5.googleusercontent.com/-LSqQ2KBSYuc/Us1sTtg5CpI/AAAAAAAAAOE/O2bbD4tAO-M/s128/Slant.png"/>');
commentcontent = commentcontent.replace(/\:smile:/g,'<img src="https://lh6.googleusercontent.com/-Px2XFI2VcgQ/Us1sT4Adm2I/AAAAAAAAAOI/zSktG_YvyVE/s128/Smile.png"/>');
commentcontent = commentcontent.replace(/\:thumbsdown:/g,'<img src="https://lh5.googleusercontent.com/-Szf-ptqy_Eo/Us1sU1x4WCI/AAAAAAAAAOc/HueQ-oB_470/s128/Thumbs-Down.png"/>');
commentcontent = commentcontent.replace(/\:thumbsup:/g,'<img src="https://lh5.googleusercontent.com/-p1W0A2R8poY/Us1sUwHc-LI/AAAAAAAAAOY/TzQhXzTdqSM/s128/Thumbs-Up.png"/>');
commentcontent = commentcontent.replace(/\:wink:/g,'<img src="https://lh6.googleusercontent.com/-XzQCsVWiQ2M/Us1sVLIMRiI/AAAAAAAAAOg/-_GnZYYPw3k/s128/Wink.png"/>');
commentcontent = commentcontent.replace(/\:yuck:/g,'<img src="https://lh5.googleusercontent.com/-s1pnpWi-300/Us1sV8GcmsI/AAAAAAAAAOs/n3LZqZoKCFA/s128/Yuck.png"/>');
commentcontent = commentcontent.replace(/\:yum:/g,'<img src="https://lh6.googleusercontent.com/-qrob0u10SCI/Us1sV4kNdQI/AAAAAAAAAOw/rjxFORTo2j0/s128/Yum.png"/>');
$("#comment-holder").html(commentcontent);
$('.emo-btn').click(function() {
$('.emo-list').toggle("fast");
});
