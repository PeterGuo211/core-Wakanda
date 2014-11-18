
WAF.onAfterInit = function onAfterInit() {// @lock

    var toCheck = [
        {
            widget: $$('loginTF'),
            mondatory: true,
            messageIfEmpty: 'username is mandatory'
        },
        {
            widget: $$('password'),
            mondatory: true,
            messageIfEmpty: 'password is mandatory'
        }
    ];


    function check() {
        var
                res = true,
                focus;
        for (var i = 0, attr; attr = toCheck[i]; i++) {
            var $widget = attr.widget.$domNode;
            if (attr.mondatory && !$widget.val()) {
                //if(withErrors){
                $widget.attr({
                    placeholder: attr.messageIfEmpty
                }).addClass('smError');
                //}
                res = false;
                if (!focus) {
                    focus = $widget;
                }
            }
        }

        if (focus) {
            focus.focus();
        }

        return res;
    }
// @region namespaceDeclaration// @startlock
    var password = {};	// @textField
    var loginTF = {};	// @textField
    var button1 = {};	// @button
    var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

    password.keyup = function password_keyup(event)// @startlock
    {// @endlock
        if (event.keyCode == 13 && check()) {
            $$('button1').$domNode.click();
        }
    };// @lock

    loginTF.keyup = function loginTF_keyup(event)// @startlock
    {// @endlock
        if (event.keyCode == 13 && check()) {
            $$('button1').$domNode.click();
        }
    };// @lock

    button1.click = function button1_click(event)// @startlock
    {// @endlock
        var IsLoggedIn = waf.directory.loginByPassword(login.username, login.password);
        if ( check() && IsLoggedIn ) {           
            if ( waf.directory.currentUserBelongsTo('admin') ) {
                location.href = '/index.html';
            } else {
                $('#error').text('You do not have access rights to log into the Web Server Administration.');
            }
        } else {
            $('#error').text('Incorrect username and/or password. Please try again');
        }       
    };// @lock

    documentEvent.onLoad = function documentEvent_onLoad(event)// @startlock
    {// @endlock
        var container = $$("container1");
        $$('loginTF').$domNode.focus();

        container.show();

        container.$domNode.css({
            'display': 'block !important'
        });

        container.center({center: 'vh'});

        $(window).resize(function() {
            container.center({center: 'vh'});
        });
    };// @lock


    $.get(window.location.origin + '/runningSolution', function(response) {

        if (response.name) {
            solution = 'Enter your username and password to log into the ' + response.name + ' solution:';
            sources.solution.sync();
        }
    });

    $.get(window.location.origin + '/productName', function(response) {

        if (response.name) {
            var title = response.name +' Administration'
            $('#title').text(title);
            document.title = title;
        }
    });
// @region eventManager// @startlock
    WAF.addListener("password", "keyup", password.keyup, "WAF");
    WAF.addListener("loginTF", "keyup", loginTF.keyup, "WAF");
    WAF.addListener("button1", "click", button1.click, "WAF");
    WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion);
};// @endlock