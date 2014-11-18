(function(Text) {
    "use strict";
    Text.setWidth(50);
    Text.setHeight(16);

    Text.setPanelStyle({
        fClass: true, //This property is for the design panel
        text: true,
        background: true,
        border: true,
        sizePosition: true,
        label: true,
        textShadow: true,
        dropShadow: true,
        innerShadow: true,
        disabled: ['border-radius']
    });
});
