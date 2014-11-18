{
    "name": "TestStudio",
    "author": "Widget Developer",
	"contributors": [
	    "Developer 1", 
	    "Developer 2"
	],
    "version": "1.0.0",
    "copyright": "(c) 2014 Widget Developer",
	"repository": {
	    "type": "git",
	    "url": "https://github.com/developer/Widget.git"
	},
	"keywords": ["wakanda", "widget"],
	"engines": {"wakanda" : ">= 8"},
	"license": "MIT", 
    "loadDependencies": [
    	{"id": "Widget_V2"},
        {"id": "TestStudio/widget.js", "version": "1.0.0", "path": "WIDGETS_CUSTOM"},
        {"id": "TestStudio/css/widget.css", "version": "1.0.0", "path": "WIDGETS_CUSTOM"},
        {"id": "TestStudio/designer.js", "studioOnly": true, "version": "1.0.0", "path": "WIDGETS_CUSTOM"},
        {"id": "TestStudio/css/designer.css", "studioOnly": true, "version": "1.0.0", "path": "WIDGETS_CUSTOM"},
        {"id": "TestStudio/runtime.js", "runtimeOnly": true, "version": "1.0.0", "path": "WIDGETS_CUSTOM"},
        {"id": "TestStudio/css/runtime.css", "runtimeOnly": true, "version": "1.0.0", "path": "WIDGETS_CUSTOM"}
    ]
}
