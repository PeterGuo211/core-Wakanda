(function($) {
    $(function() {
        
        var feature,
            ul,
            diagnosis = {
                NAV: {},
                CSS3: {},
                WAF: {
                    PLATFORM: WAF.PLATFORM,
                    BUILD: WAF.BUILD,
                    VERSION: WAF.VERSION
                }
            }
            /*,
            clip = new ZeroClipboard(document.getElementById('copy'), { moviePath: 'swf/ZeroClipboard.swf' });
        console.log('clip', clip);*/
        
        // CSS 3 stuff
        ul = $('#specCSS3').find('ul');
        for (feature in Modernizr) {
            if (typeof Modernizr[feature] === 'boolean') {
                diagnosis['CSS3'][feature] = Modernizr[feature];
                $('<li></li>').html("<strong>" + feature + "</strong> <span>" + Modernizr[feature] + "</span>").appendTo(ul);
            }
        }
        
        // navigator
        ul = $('#nav').find('ul');
        for (feature in navigator) {
            if (typeof navigator[feature] === 'string') {
                diagnosis['NAV'][feature] = navigator[feature];							
                $('<li></li>').html("<strong>" + feature + "</strong> <span>" + navigator[feature] + "</span>").appendTo(ul);
            }
        }  
        
        // waf
        ul = $('#wafSec').find('ul');
        $('<li/>').html('<strong>PLATFORM</strong> <span>' + JSON.stringify(WAF.PLATFORM) + '</span>').appendTo(ul);
        $('<li/>').html('<strong>BUILD</strong> <span>' + WAF.BUILD + '</span>').appendTo(ul);
        $('<li/>').html('<strong>VERSION</strong> <span>' + WAF.VERSION + '</span>').appendTo(ul);

        // Display or not
        $('section h3').click(function(){
            if($(this).hasClass('expanded')) {
                var that = this ;
                $('+ div', this).slideUp(300, function() {
                    $(that).removeClass('expanded');
                })
            } else {
                var that = this ;
                $('+ div', this).slideDown(300, function() {
                    $(that).addClass('expanded');
                })
            }
        })

        // Fill textarea and select
        $('#summary textarea').html(JSON.stringify(diagnosis, null, '\t')).get(0).select();
        
        // Keep nav bar fixed
        $('nav').affix({
            offset: {
                top: function() { 
                    return $('.menu').offset().top;
                },
            }
        });
        // ScrollSpy 
        // $('.nav').scrollspy();
        /* ------- 
    
        $('#copy').zclip({
            path:'swf/ZeroClipboard.swf',
            copy: function(){ return $('#summary textarea').text(); },
            beforeCopy: function(){
                console.log('toto');
            }
        });
            */
        /*
        clip.setText(JSON.stringify(diagnosis));
        
        clip.on('mouseover', function() { console.log('mouseOver'); });
        clip.on('load', function() { console.log('loaded'); });
        clip.on('wrongflash', function() { console.log('wrongFlash'); });
        clip.on('mouseover', function() { console.log('mouseOver'); });        
        */
    });
})(jQuery);