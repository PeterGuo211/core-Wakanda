/*
* This file is part of Wakanda software,licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3),or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event,Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently,no title,copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/

/**
 * @extends Object
 */
function Widget(){}
Widget.prototype.id= ''; 
Widget.prototype.domNode= ''; 
Widget.prototype.config= {}; 
Widget.prototype.kind=''; 
Widget.prototype.Basics= ''; 
Widget.prototype.unlink=function(){};
Widget.prototype.link=function(){};
Widget.prototype.setParent=function(){};
Widget.prototype.addChild=function(){};
Widget.prototype.setRight=function(){};
Widget.prototype.setBottom=function(){};
Widget.prototype.setTop=function(){};
Widget.prototype.setLeft=function(){};
Widget.prototype.getPosition=function(){ return {}; };
Widget.prototype.getHeight=function(){ return 0; };
Widget.prototype.setHeight=function(){};
Widget.prototype.setWidth=function(){};
Widget.prototype.getLinks=function(){ return []; };
Widget.prototype.getChildren=function(){ return []; };
Widget.prototype.addClass=function(){};
Widget.prototype.removeClass=function(){};
Widget.prototype.show=function(){};
Widget.prototype.resize=function(){};
Widget.prototype.resizable=function(){};
Widget.prototype.removeListener=function(){};
Widget.prototype.redraw=function(){};
Widget.prototype.hide=function(){};
Widget.prototype.getTheme=function(){ return ''; };
Widget.prototype.draggable=function(){};
Widget.prototype.destroy=function(){};
Widget.prototype.getWidth=function(){ return 0; };
Widget.prototype.addListener=function(){};
Widget.prototype.toggle=function(){};
Widget.prototype.getParent=function(){ return new Widget(); };
Widget.prototype.addChildren=function(){};
Widget.prototype.move=function(){};
Widget.prototype.rebuild=function(){};
Widget.prototype.isVisible=function(){ return true; };
Widget.prototype.removeState=function(){};
Widget.prototype.getState=function(){ return ''; };
Widget.prototype.setState=function(){};

/**
 * @extends Widget
 * @return {Widget}
 */
function $$(){}

/**
 * @extends Object
 * @return {$}
 */
function $(){}
$.ajax=function(){};
$.ajaxPrefilter=function(){};
$.ajaxSetup=function(){};
$.ajaxTransport=function(){};
$.boxModel=false;
$.browser={};
$.Callbacks=function(){};
$.contains=function(){};
$.cssHooks={};
$.data=function(){};
$.Deferred=function(){};
$.dequeue=function(){};
$.each=function(){};
$.error=function(){};
$.extend=function(){};
$.get=function(){};
$.getJSON=function(){};
$.getScript=function(){};
$.globalEval=function(){};
$.grep=function(){};
$.hasData=function(){};
$.holdReady=function(){};
$.inArray=function(){};
$.isArray=function(){};
$.isEmptyObject=function(){};
$.isFunction=function(){};
$.isNumeric=function(){};
$.isPlainObject=function(){};
$.isWindow=function(){};
$.isXMLDoc=function(){};
$.makeArray=function(){};
$.map=function(){};
$.merge=function(){};
$.noConflict=function(){};
$.noop=function(){};
$.now=function(){};
$.param=function(){};
$.parseJSON=function(){};
$.parseXML=function(){};
$.post=function(){};
$.prototype={};
$.proxy=function(){};
$.queue=function(){};
$.sub=function(){};
$.support={};
$.trim=function(){};
$.type=function(){};
$.unique=function(){};
$.when=function(){};
$.prototype.add=function(){};
$.prototype.addClass=function(){};
$.prototype.after=function(){};
$.prototype.ajaxComplete=function(){};
$.prototype.ajaxError=function(){};
$.prototype.ajaxSend=function(){};
$.prototype.ajaxStart=function(){};
$.prototype.ajaxStop=function(){};
$.prototype.ajaxSuccess=function(){};
$.prototype.andSelf=function(){};
$.prototype.animate=function(){};
$.prototype.append=function(){};
$.prototype.appendTo=function(){};
$.prototype.attr=function(){};
$.prototype.before=function(){};
$.prototype.bind=function(){};
$.prototype.blur=function(){};
$.prototype.change=function(){};
$.prototype.children=function(){};
$.prototype.clearQueue=function(){};
$.prototype.click=function(){};
$.prototype.clone=function(){};
$.prototype.closest=function(){};
$.prototype.contents=function(){};
$.prototype.context={};
$.prototype.css=function(){};
$.prototype.data=function(){};
$.prototype.dblclick=function(){};
$.prototype.delay=function(){};
$.prototype.delegate=function(){};
$.prototype.dequeue=function(){};
$.prototype.detach=function(){};
$.prototype.die=function(){};
$.prototype.each=function(){};
$.prototype.empty=function(){};
$.prototype.end=function(){};
$.prototype.eq=function(){};
$.prototype.error=function(){};
$.prototype.fadeIn=function(){};
$.prototype.fadeOut=function(){};
$.prototype.fadeTo=function(){};
$.prototype.fadeToggle=function(){};
$.prototype.filter=function(){};
$.prototype.find=function(){};
$.prototype.first=function(){};
$.prototype.focus=function(){};
$.prototype.focusin=function(){};
$.prototype.focusout=function(){};
$.prototype.get=function(){};
$.prototype.has=function(){};
$.prototype.hasClass=function(){};
$.prototype.height=function(){};
$.prototype.hide=function(){};
$.prototype.hover=function(){};
$.prototype.html=function(){};
$.prototype.index=function(){};
$.prototype.innerHeight=function(){};
$.prototype.innerWidth=function(){};
$.prototype.insertAfter=function(){};
$.prototype.insertBefore=function(){};
$.prototype.is=function(){};
$.prototype.jquery="";
$.prototype.keydown=function(){};
$.prototype.keypress=function(){};
$.prototype.keyup=function(){};
$.prototype.last=function(){};
$.prototype.length=0;
$.prototype.live=function(){};
$.prototype.load=function(){};
$.prototype.map=function(){};
$.prototype.mousedown=function(){};
$.prototype.mouseenter=function(){};
$.prototype.mouseleave=function(){};
$.prototype.mousemove=function(){};
$.prototype.mouseout=function(){};
$.prototype.mouseover=function(){};
$.prototype.mouseup=function(){};
$.prototype.next=function(){};
$.prototype.nextAll=function(){};
$.prototype.nextUntil=function(){};
$.prototype.not=function(){};
$.prototype.off=function(){};
$.prototype.offset=function(){};
$.prototype.offsetParent=function(){};
$.prototype.on=function(){};
$.prototype.one=function(){};
$.prototype.outerHeight=function(){};
$.prototype.outerWidth=function(){};
$.prototype.parent=function(){};
$.prototype.parents=function(){};
$.prototype.parentsUntil=function(){};
$.prototype.position=function(){};
$.prototype.prepend=function(){};
$.prototype.prependTo=function(){};
$.prototype.prev=function(){};
$.prototype.prevAll=function(){};
$.prototype.prevUntil=function(){};
$.prototype.promise=function(){};
$.prototype.prop=function(){};
$.prototype.pushStack=function(){};
$.prototype.queue=function(){};
$.prototype.ready=function(){};
$.prototype.remove=function(){};
$.prototype.removeAttr=function(){};
$.prototype.removeClass=function(){};
$.prototype.removeData=function(){};
$.prototype.removeProp=function(){};
$.prototype.replaceAll=function(){};
$.prototype.replaceWith=function(){};
$.prototype.resize=function(){};
$.prototype.scroll=function(){};
$.prototype.scrollLeft=function(){};
$.prototype.scrollTop=function(){};
$.prototype.select=function(){};
$.prototype.selector="";
$.prototype.serialize=function(){};
$.prototype.serializeArray=function(){};
$.prototype.show=function(){};
$.prototype.siblings=function(){};
$.prototype.size=function(){};
$.prototype.slice=function(){};
$.prototype.slideDown=function(){};
$.prototype.slideToggle=function(){};
$.prototype.slideUp=function(){};
$.prototype.stop=function(){};
$.prototype.submit=function(){};
$.prototype.text=function(){};
$.prototype.toArray=function(){};
$.prototype.toggle=function(){};
$.prototype.toggleClass=function(){};
$.prototype.trigger=function(){};
$.prototype.triggerHandler=function(){};
$.prototype.unbind=function(){};
$.prototype.undelegate=function(){};
$.prototype.unload=function(){};
$.prototype.unwrap=function(){};
$.prototype.val=function(){};
$.prototype.width=function(){};
$.prototype.wrap=function(){};
$.prototype.wrapAll=function(){};
$.prototype.wrapInner=function(){};
