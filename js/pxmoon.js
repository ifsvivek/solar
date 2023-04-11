var lightspeed=299792
var _1km=3474.8
var unit='km'
var delimeter=','
var decimalmark='.'
var unitname='km'
var language=languages.English
var currentRAFID=0
var isSpeeding=0
var unitTable={km:1,mi:0.621371,au:6.68458712e-9,lightminutes:0.0000000555941,earths:0.0000785238,buses:79.36,bluewhales:33.3333,greatwalls:0.00011297137305,pixels:0.0002877863474156786}
var msgTimer
var msgNum=[$('#msg1'),$('#msg2'),$('#msg3'),$('#msg4'),$('#msg5')]
var msgIndex=0
var startX=window.pageXOffset
$(document).ready(function(){$('html, body').mousewheel(function(e,delta){if(Math.abs(e.deltaX)){return}else{this.scrollLeft-=(e.deltaY*15);}
e.preventDefault();});});$(function(){if(typeof window.performance==='undefined'){window.performance={};}
if(!window.performance.now){var nowOffset=Date.now();if(performance.timing&&performance.timing.navigationStart){nowOffset=performance.timing.navigationStart}
window.performance.now=function now(){return Date.now()-nowOffset;}}
$('ul.nav a.planetjump').bind('click',function(event){cancelLightMsg()
stopSpeeding();var $anchor=$(this);$('html, body').stop().animate({scrollLeft:$($anchor.attr('href')).offset().left},5000,'easeInOutExpo');event.preventDefault();})
var essayMarks=[];$('.essay').each(function(){essayMarks.push($(this).offset().left-200)});var planetMarks=[$('#suntxt').offset().left-200,$('#merctxt').offset().left-200,$('#venustxt').offset().left-200,$('#earthtxt').offset().left-200,$('#marstxt').offset().left-200,$('#jupitertxt').offset().left-200,$('#saturntxt').offset().left-200,$('#neptunetxt').offset().left-200,$('#uranustxt').offset().left-200,$('#plutotxt').offset().left-200,];var destinations=$.makeArray(essayMarks).concat($.makeArray(planetMarks));destinations.sort(function(a,b){return a-b});var destinationNext=destinations[0];$('ul.nav a.nextjump').bind('click',function(event){cancelLightMsg()
stopSpeeding();var currentDist=(window.pageXOffset);$.each(destinations,function(index,value){if(currentDist>=value-100){destinationNext=destinations[index+1];}
else{return false}});$('html, body').stop().animate({scrollLeft:destinationNext},4500,'easeInOutQuad');event.preventDefault();})
$('ul.nav a.prevjump').bind('click',function(event){cancelLightMsg()
stopSpeeding();var currentDist=(window.pageXOffset);$.each(destinations,function(index,value){if(currentDist<=value+100){destinationNext=destinations[index-1];return false}});$('html, body').stop().animate({scrollLeft:destinationNext},4500,'easeInOutQuad');event.preventDefault();})
$('#distance-counter').on('click',function(e){var $units=$('#unitselect')
$units.css('display',$units.css('display')=='none'?'block':'none')})
$('#unitselect li').on('click',function(e){unit=$(e.target).attr('id')
unitname=$(e.target).text()
updateDistance()
$('#unitselect').css('display','none')
return false})
$('#langselect').on('click',function(e){var $lang=$('#langs')
$lang.css('display',$lang.css('display')=='none'?'block':'none')})
$('#langselect a').on('click',function(e){language=languages[$(e.target).text()]
delimeter=delimeters[$(e.target).text()]
decimalmark=decimalmarks[$(e.target).text()]
$('#titleimg').attr('src','img/maintitle-'+language+'.svg')
$('#scaleimg').attr('src','img/scale-'+language+'.svg')
$('#langs').css('display','none')
for(var translation in translations){$('#'+translation).text(translations[translation][language])}
updateDistance()
return false})
$('#lightspeeder a').on('click',function(e){stopSpeeding()
if(isSpeeding==1){cancelLightMsg()
stopSpeeding()
isSpeeding=0
return false}
else{isSpeeding=1
fadeInLightMsg()
changeUnitToLight()
$('#lightspeeder a').css('opacity',1.0)
$('#lightspeedmsg').css('display','block')
currentRAFID=startSpeedingAt()
return false}})});function startSpeedingAt(){stopSpeeding()
var startX=window.pageXOffset
var lastTime=window.performance.now()
var onEnterFrame=function(now){var timeDelta=now-lastTime
var distance=(lightspeed*timeDelta)/(_1km*1000)
$('html, body').scrollLeft(startX+distance)
currentRAFID=requestAnimationFrame(onEnterFrame)}
return requestAnimationFrame(onEnterFrame)}
function changeUnitToLight(){unit='lightminutes'
unitname=$('#lightminutes').text()
updateDistance()};function fadeInLightMsg(){msgNum[msgIndex].fadeIn(500)
msgTimer=window.setTimeout(fadeOutLightMsg,4500)};function fadeOutLightMsg(){msgNum[msgIndex].fadeOut(500)
if(msgIndex<msgNum.length-1){msgIndex=msgIndex+1
fadeInLightMsg()}else{return}};function cancelLightMsg(){msgNum[msgIndex].fadeOut(500)
msgIndex=0
isSpeeding=0
window.clearTimeout(msgTimer)
$('#lightspeedmsg').css('display','none')
$('#lightspeeder a').css('opacity',0.7)};function updateDistance(){var px=(window.pageXOffset-$('#bigspace').position().left+$(window).width()/2);var km=px*_1km;var distance=km*unitTable[unit];$('#counter').text(Math.max(0,distance.toFixed(1)).toString().replace(".",decimalmark).replace(/\B(?=(\d{3})+(?!\d))/g,delimeter)+' '+$('#'+unit).text());}
function stopSpeeding(){cancelAnimationFrame(currentRAFID);}
$('#monitors').text(Math.floor($('#bigspace').width()/screen.availWidth/window.devicePixelRatio));$(window).scroll(updateDistance);