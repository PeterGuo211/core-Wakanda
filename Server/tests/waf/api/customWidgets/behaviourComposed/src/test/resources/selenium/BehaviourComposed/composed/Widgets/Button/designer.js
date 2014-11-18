(function(Button) {
    "use strict";
    Button.setWidth(92);
    Button.setHeight(22);

    Button.setPanelStyle({
        fClass: true, //This property is for the design panel
        text: true,
        background: true,
        border: true,
        sizePosition: true,
        shadow: true,
        textShadow: true,
        innerShadow: true,
        label: false
    });

    Button.addStates('hover', 'active', 'focus', 'disabled');
});
