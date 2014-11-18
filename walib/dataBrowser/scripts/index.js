/*
* This file is part of Wakanda software, licensed by 4D under
*  (i) the GNU General Public License version 3 (GNU GPL v3), or
*  (ii) the Affero General Public License version 3 (AGPL v3) or
*  (iii) a commercial license.
* This file remains the exclusive property of 4D and/or its licensors
* and is protected by national and international legislations.
* In any event, Licensee's compliance with the terms and conditions
* of the applicable license constitutes a prerequisite to any use of this file.
* Except as otherwise expressly stated in the applicable license,
* such license does not include any other license or rights on this file,
* 4D's and/or its licensors' trademarks and/or other proprietary rights.
* Consequently, no title, copyright or other proprietary rights
* other than those specified in the applicable license is granted.
*/
WAF.onAfterInit = function onAfterInit() {
        if ( !waf.directory.currentUserBelongsTo('admin') ) {
            var loginToDataBrowser = $$("loginToDataBrowser");      
            loginToDataBrowser.showLoginDialog();

            loginToDataBrowser.onlogin = function (e) {
                location.reload();
            };

            loginToDataBrowser.onloginError = function (e) {
                loginToDataBrowser.showLoginDialog();
            };
	} else {
	loadDataSource = function load_dataSources () {
		var em,
			ems,
			html,
			color,
			emByName,
			dataClass,
			dataBrowser,
			defaultDataClass;
		
		ems = $("#dataClassContent");
		
		defaultDataClass = {};
		
		emByName = this.ds.getDataClasses();
		
		html = '<table id="dataClassContentTable" class="entityModels">' +
			'<thead>' +
				'<tr class="datastore-classes-head">' +
					'<th>' +
						// '<div>' +
						'Datastore Classes' +
						// '</div>' +
					'</th>' +
				'</tr>' +
			'</thead>' +
			'<tbody>';
		
		if(Object.keys(emByName).length > 0) {
		
			for (em in emByName) {
				
				color = null;
				dataClass = WAF.ds.getDataClass(em);
				if (dataClass != null && dataClass.extraProperties != null) {
					color = dataClass.extraProperties.panelColor;
				}
				
				html += '<tr id="outline_'+em+'" class="entityModels" data-title="'+em+'">' +
						'<td>' +
							'<div class="emMenuList">';
				
				if (color != null) {
					
					html += '<div class="colPrev" style="background-color'+color+';"></div>';
				} else {
					
					html += '<div class="colPrev"></div>';
				}
				
				html += '<div class="emName">'+em+'</div>' +
							'</div>' +
						'</td>' +
					'</tr>';
			}
			
			html += '</tbody>' +
			'</table>'+
			'<div id="dataClassContextMenuBg"></div>'+
			'<div id="dataClassContextMenuContainer"></div>';
			
			ems.height("100%");
			ems.html(html);
			$("#dataClassContextMenuContainer").bind("click", function(event) {
				event.stopPropagation();
				return false;
			})
			.hide();
			$("#dataClassContextMenuBg").hide();
	
			dataBrowser = new DataBrowser();
			dataBrowser.init();
			
			return dataBrowser;
		} else {
			
			$("#container1").hide();
			$("#loginToDataBrowser").hide();
			$("#container_dataBrowser").hide();
			
			$("body").append('<div id="dataBrowser_error_dialog" class="dataBrowser_error">Datastore is empty</div>');
			
			return null;
		}
	};
	
	$("#waf-splitter-container3").css("visibility", "hidden");
	
	$("#loginToDataBrowser").css("z-index", "-1");
	$("#waf-splitter-container3").css("visibility", "");
	DataBrowser = loadDataSource();

	if(DataBrowser !== null) {
		DataBrowser.afterInit();
	}
	$("#dataBrowserLoding").hide();
    }
	
};

function DataBrowser() {
	this.tabView = {};
	this.tabViewReference = {};
	this.dialogReference = {};
	this.splitterPosX = 0;
	this.currentDialog = null;
	this.modeTabView = true;
	this.dialogPositionX = 0;
	this.dialogPositionY = 0;
	this.draggingTabContainer = null;
	this.draggingTabIndex = null;
	this.draggingDialogContainerId = null;
	this.skinName = "";
	
	this.PERM_TO_READ_ERROR = 1557;
	this.PERM_TO_UPDATE_ERROR = 1558;
	this.PERM_TO_CREATE_ERROR = 1559;
	this.PERM_TO_DELETE_ERROR = 1560;
	this.PERM_TO_EXECUTE_ERROR = 1561;
}

DataBrowser.prototype = {
	
	init : function init_dataClass_event() {
		
		var rows,
			tabWidget,
			model,
			i;
		
		this.skinName = "default";
		this.loadDefaultStyle();
		
		this.tabView = $$("databrowser_tabview");
		this.tabView.onSelect = this.selectTab;
		this.tabView.beforeRemove = this.deleteTab;
		
		this.tabViewReference = {};
		this.dialogReference = {};
		this.splitterPosX = 0;
		this.modeTabView = true;
		this.currentDialog = null;
		this.dialogPositionX = 220;
		this.dialogPositionY = 115;
		this.draggingTabContainer = null;
		this.draggingTabIndex = null;
		this.draggingDialogContainerId = null;
		
		                
                this.tabView.onResize = function () {
                    // hack : the functions was called many times while resizing. which decreases the performance
                    // now we call at the end of resizing
                    clearTimeout(this.doIt);
                    this.doIt = setTimeout(function(args){
                            var 
                            that,
                            currentTab;

                            that = args[0];

                            currentTab = that.getSelectedTab();
                            $("#"+currentTab.container.id).width("100%");
                            $$(currentTab.container.id+'_dataGrid').gridController.gridView.refresh();
                            $("#"+currentTab.container.id+"_autoForm").parent().height("100%");
                            $("#"+currentTab.container.id+"_autoForm").height("100%");
                            DataBrowser.resizeAutoForm(currentTab.container.id+"_autoForm");
                        }, 100,[this]);
                }
		
		rows = $("#dataClassContentTable tr.entityModels");
		
		for (i = 0; i < rows.length; i++) {
			
			$(rows[i]).bind("click", this.dataClassClickListener);
			$(rows[i]).bind("contextmenu" , function (event) {
				event.preventDefault();
				DataBrowser.dataClassRightClickListener(event);
				
				return false;
			});
			$(rows[i]).bind("mouseover", this.dataClassMouseoverListener);
			$(rows[i]).bind("mouseout", this.dataClassMouseoutListener);
		}
		
		this.loadDataClass({
			name : $(rows[0]).data("title"),
			query : "",
			modeTabView : this.modeTabView
		});
		
		$(rows[0]).addClass("line-selected");
		
		WAF.addListener("dataBrowserCloseAll", "click", function (event) {
			DataBrowser.closeAll();
		}, "WAF");
		
		WAF.addListener("dataBrowserExportDataClass", "click", function (event) {
		
			$("#confirmExportDialogContent").html("Do you want to export dataclass "+$("#dataClassContentTable tbody").children(".line-selected").data("title")+" ?");
			
			$("#confirmExportDialog").dialog({
				resizable: false,
				height:90,
				width:300,
				modal: true,
				draggable : false,
				title:"Export dataclass",
				buttons: {
					"No": function() {
						$(this).dialog("close");
					},
					"Yes": function() {
						DataBrowser.exportSelectedDataClass();
						$(this).dialog("close");
					}
				},
				open : true
			});
		}, "WAF");
		
		$("#dataBrowserExportDataClass").bind("mouseover", function (event) {
			DataBrowser.showImportExportTips(event, "export");
		});
		$("#dataBrowserExportDataClass").bind("mouseout", function (event) {
			DataBrowser.hideImportExportTips();
		});
		
		$("#dataBrowserImportDataClass").bind("click", function (event) {
			// TODO
			// DataBrowser.importSelectedDataClass();
		});
		$("#dataBrowserImportDataClass").bind("mouseover", function (event) {
			DataBrowser.showImportExportTips(event, "import");
		});
		$("#dataBrowserImportDataClass").bind("mouseout", function (event) {
			DataBrowser.hideImportExportTips();
		});
		
		$(".not-selectable").each(function (index) {
			$(this).bind("selectstart", function() {return false;});
			$(this).bind("select", function() {return false;});
		});
		
		$("#dataBrowserSkinSelector").bind("change", function (event) {
			DataBrowser.changeStyle($(this).val());
		});
		
		// splitter has too big z-index
		$("#waf-splitter-container3").css("z-index", "1");
	},
	
	loadDefaultStyle : function load_dataBrowser_defaultStyle() {
		var i,
			cookies,
			cookieName,
			cookieValue,
			defaultSkin;
		
		defaultSkin = "default";
		
		cookies = document.cookie.split(";");
		
		for(i=0; i < cookies.length; i++) {
			cookieName = cookies[i].substr(0,cookies[i].indexOf("="));
			cookieValue = cookies[i].substr(cookies[i].indexOf("=")+1);
			cookieName = cookieName.replace(/^\s+|\s+$/g,"");
			
			if(cookieName === "databrowser_skinname") {
				defaultSkin = cookieValue;
				//break for loop
				i = cookies.length;
			}
		}
		
		$("#dataBrowserSkinSelector").val(defaultSkin);
		
		this.changeStyle(defaultSkin);
	},
	
	afterInit : function after_init_dataBrowser() {
		
		this.tabView.removeTab(1);
		this.initTabDropEvent();
		
	},
	
	setViewMode : function set_dataBrowser_viewMode(target) {
		
		if(this.modeTabView) {
			$(target).addClass("dataBrowser-active-button");
		} else {
			$(target).removeClass("dataBrowser-active-button");
		}
		this.modeTabView = !this.modeTabView;
	},
	
	closeAll : function close_dataBrowser_all_containers() {
		
		var i,
			windowList,
			tabViewCount;
		
		/**
		 * Close window
		 */
		windowList = this.dialogReference;
		
		for(dialogHash in windowList) {
			$("#"+windowList[dialogHash]).dialog("close");
		}
		
		this.dialogPositionX = 220;
		this.dialogPositionY = 115;
		
		
		/**
		 * Close tabs
		 */
		tabViewCount = this.tabView.countTabs();
		
		for(i = tabViewCount; i > 0; i--) {
			this.tabView.removeTab(i);
		}
	},
	
	openSelectedDataClass : function open_selected_data_class(targetRow, modeTabView) {
		var dataClassOption;
		
		$(targetRow).parent().children(".line-selected").each(function(index) {
			$(this).removeClass("line-selected");
		});
		
		$(targetRow).addClass("line-selected");
		
		dataClassOption = {};
		
		dataClassOption.name = $(targetRow).data("title");
		dataClassOption.query = "";
		dataClassOption.modeTabView = modeTabView;
		
		
		DataBrowser.loadDataClass(dataClassOption);
	},
	
	dataClassClickListener : function dataClassClick_listener(event) {
		
		var targetRow,
			modeTabView;
		
		event.preventDefault();
		
		targetRow = event.currentTarget;
		modeTabView = ((event.ctrlKey || event.altKey) ? false : DataBrowser.modeTabView);
		
		DataBrowser.openSelectedDataClass(targetRow, modeTabView);
		
		event.stopPropagation();
	},
	
	dataClassRightClickListener : function dataClass_right_click_listener(event) {
		var targetRow,
			dataClass,
			contextHtml;
		
		targetRow = event.currentTarget;
		dataClass = $(targetRow).data("title");
		
		contextHtml = '<span class="context-menu-header">Open '+dataClass+' in</span>'+
			'<span class="context-menu-item" id="openTabItem">Tab</span>'+
			'<span class="context-menu-item" id="openWindowItem">Window</span>';
	
		$("#dataClassContextMenuContainer").html(contextHtml);
		$("#dataClassContextMenuContainer").show();
		$("#dataClassContextMenuBg").show();
		
		if((event.pageY + 10 + $("#dataClassContextMenuContainer").height()) > window.innerHeight) {
			
			$("#dataClassContextMenuContainer").css("bottom", "0px");
			$("#dataClassContextMenuContainer").css("top", "");
		} else {
			$("#dataClassContextMenuContainer").css("top", (event.pageY + 10) + "px");
			$("#dataClassContextMenuContainer").css("bottom", "");
		}
		
		if((event.pageX + $("#dataClassContextMenuContainer").width()) > window.innerWidth) {
			
			$("#dataClassContextMenuContainer").css("right", "0px");
			$("#dataClassContextMenuContainer").css("left", "");
		} else {
			$("#dataClassContextMenuContainer").css("left", event.pageX + "px");
			$("#dataClassContextMenuContainer").css("right", "");
		}
		
		$("#dataClassContextMenuBg").bind("click", DataBrowser.hideDataClassContextMenu)
			.bind("scroll", DataBrowser.hideDataClassContextMenu)
			.bind("resize", DataBrowser.hideDataClassContextMenu)
			.bind("contextmenu", DataBrowser.hideDataClassContextMenu);
		
		$("#dataClassContextMenuContainer .context-menu-item").each(function (index) {
			
			$(this).bind("mouseout", function(event) {
				$(this).removeClass("hover");
			})
			.bind("mouseover", function(event) {
				$(this).addClass("hover");
			});
		});
		
		$("#openTabItem").bind("click", function(event) {
			DataBrowser.openSelectedDataClass(targetRow, true);
			DataBrowser.hideDataClassContextMenu(event);
		});
		$("#openWindowItem").bind("click", function(event) {
			DataBrowser.openSelectedDataClass(targetRow, false);
			DataBrowser.hideDataClassContextMenu(event);
		});
		
		$(targetRow).addClass("line-contexted");
		
		event.stopPropagation();
	},
	
	hideDataClassContextMenu : function hide_data_class_context_menu(event) {
		$("#dataClassContextMenuContainer").hide();
		$("#dataClassContextMenuBg").hide();
		
		$("dataClassContextMenuBg").unbind("click", DataBrowser.hideDataClassContextMenu)
			.unbind("scroll", DataBrowser.hideDataClassContextMenu)
			.unbind("resize", DataBrowser.hideDataClassContextMenu);
		
		$(".line-contexted").each(function(index) {
			$(this).removeClass("line-contexted");
		});
		
		return false;
	},
	
	dataClassMouseoverListener : function dataClassMouseover_listener(event) {
		$(this).addClass("line-hover");
	},
	
	dataClassMouseoutListener : function dataClassMouseout_listener(event) {
		$(this).removeClass("line-hover");
	},
	
	loadDataClass : function load_selected_dataClass(option) {
		
		var index,
			title,
			dataGrid,
			modeTabView,
			containerId,
			dialogOption,
			tabViewWidth,
			containerHtml,
			tabViewBgColor,
			dataGridOption,
			splitterZIndex,
			dialogContainer,
			tabViewContainer;
		
		index = this.getHash(option);
		modeTabView = option.modeTabView;
		
		if(
			(modeTabView && this.tabViewReference[index] === undefined) ||
			(!modeTabView && this.dialogReference[index] === undefined)
		) {
			
			title = option.name;
			if(option.query !== "") {
				title += " "+option.query.substring(option.query.indexOf(".") + 1);
			}
			
			if(modeTabView) {
				this.tabView.addTab(title, true);
				
				this.tabViewReference[index] = this.tabView._getContainers().length;
				this.initTabDragEvent(this.tabViewReference[index]);
				
				tabViewContainer = this.tabView.getContainer(this.tabViewReference[index]);
				
				$(tabViewContainer).data("dataBrowser-dataClass", option.name);
				$(tabViewContainer).data("dataBrowser-dataQuery", option.query);
				$("#"+tabViewContainer.id).addClass("dataBrowser-tabView-container");
				containerId = tabViewContainer.id;
			} else {
				
				containerId = WAF.Widget._generateId('container');
				
				dialogContainer = $("#container_dataclass").append('<div id="'+containerId+'" data-type="container" data-lib="WAF" style="width : 600px;"></div>');
				
				dialogOption = {
					autoOpen : true,
					title : title,
					width : 600,
					minWidth : 400,
					height : 400,
					minHeight : 300,
					position : [this.dialogPositionX, this.dialogPositionY],
					resizeStart : function (event, ui) {
						$("#"+containerId+"_dataTips").hide();
					},
					resize : function (event, ui) {
						
						$("#"+containerId).height($("#"+containerId).parent().height() - 25);
						$("#"+containerId+" .dataBrowser-dataContainer").height($("#"+containerId).height() - 50);
						DataBrowser.repositionAutoFormDialog({
							ui : ui,
							containerId : containerId
						});
					},
					resizeStop : function (event, ui) {
						
						$("#"+containerId).height($("#"+containerId).parent().height() - 25);
						$("#"+containerId+" .dataBrowser-dataContainer").height($("#"+containerId).height() - 50);
						$("#"+containerId).width($("#"+containerId).parent().width() - 1);
						
						$$(containerId+'_dataGrid').gridController.gridView.refresh();
						
						DataBrowser.repositionAutoFormDialog({
							ui : ui,
							containerId : containerId
						});
					},
					dragStart : function (event, ui) {
						$("#"+containerId+"_dataTips").hide();
						splitterZIndex = $("#waf-splitter-container3").css("z-index");
						$("#waf-splitter-container3").css("z-index", "");
						
						// This is drop zone for dialog
						tabViewWidth = $("#menuBarTabView").width();
						$("#menuBarTabView").css('cssText', 'width:' +  $("#menuBarTabView").parent().width() + 'px !important');
						tabViewBgColor = $("#menuBarTabView").css("background-color");
						$("#menuBarTabView").css("background-color", "#f5f5f5")
							.css("opacity", "0.5");
						
						$("#menuBarTabView").bind("mouseover", function (e) {
							
							$(this).append('<li id="windowToTabDraggingLi" class="waf-widget waf-menuItem default inherited waf-menuItem-first waf-menuItem-level-0 waf-menuItem-horizontal waf-menuItem-last waf-tabView-tab waf-state-selected" style="width: 110px; margin-left: 0px; height: 31px; ">'+
								'<p class="waf-menuItem-text waf-menuItem-icon-top" style="height: 31px; width: 100px; ">'+title+'</p></li>');
							DataBrowser.draggingDialogContainerId = containerId;
						})
						.bind("mouseout", function (e) {
							
							if($("#windowToTabDraggingLi")) {
								$("#windowToTabDraggingLi").remove();
							}
							DataBrowser.draggingDialogContainerId = null;
						});
						$("#menuBarTabView").css("z-index", 999999);
					},
					drag : function (event, ui) {
						
						DataBrowser.repositionAutoFormDialog({
							ui : ui,
							containerId : containerId
						});
					},
					dragStop : function (event, ui) {
						
						$("#waf-splitter-container3").css("z-index", splitterZIndex);
						
						DataBrowser.repositionAutoFormDialog({
							ui : ui,
							containerId : containerId
						});
						
						$("#menuBarTabView").unbind("mouseover")
						.unbind("mouseout")
						.css("z-index", "")
						.css("opacity", "")
						.css("width", tabViewWidth+"px !Important")
						.css("background-color", tabViewBgColor);
						
						if($("#windowToTabDraggingLi")) {
							$("#windowToTabDraggingLi").remove();
						}
						
						
						if(DataBrowser.draggingDialogContainerId !== null) {
							//need option.name and option.query
							DataBrowser.transformDialogToTab(option);
						}
					},
					close : function (event, ui) {
						DataBrowser.closeDialog(index);
					},
					focus : function (event, ui) {
						var parameters = {};
						
						if(DataBrowser.currentDialog === null || DataBrowser.currentDialog[0].id !== containerId) {
							
							parameters.containerId = containerId;
							parameters.dataClassName = option.name;
							parameters.query = option.query;
							DataBrowser.selectDialog(parameters);
						}
					}
				};
				
				if((this.dialogPositionY + 25 + 400) > document.height) {
					this.dialogPositionX += 300;
					this.dialogPositionY = 115;
				} else {
					this.dialogPositionY += 25;
				}
				
				this.currentDialog = $("#"+containerId).dialog(dialogOption);
				this.dialogReference[index] = containerId;
				this.currentDialog.css("padding", "3px");
				this.currentDialog.addClass("waf-widget waf-container default inherited dataBrowser-dialog-container");
			}
			
			containerHtml = this.getDataContainerMarkup({
				"containerId" : containerId,
				"query" : option.query,
				"modeTabView" : modeTabView
			});
			
			$("#"+containerId).html(containerHtml);
			
			$("#"+containerId+"_query_form").bind(
				"submit",
				{dataClass : option.name, "modeTabView" : modeTabView, "containerId" : containerId},
				this.submitQuery
			);
			
			if(!modeTabView) {
				
				$("#"+containerId+" .dataBrowser-dataContainer").height($("#"+containerId).height() - 50);
				this.currentDialog.dialog("open");
			}
			
			$("#"+containerId+"_query_reset_button").bind("click", function (event) {
				
				event.preventDefault();
				if($(this).prevAll("input").val() !== "") {
					$(this).prevAll("input").val("");
					$(this).parent().submit();
				}
			});
			$("#"+containerId+"_query_refresh_button").bind("click", function (event) {
				
				event.preventDefault();
				$(this).parent().submit();
			});
			
			dataGridOption = this.getDataSourceDetails({
				"name" : option.name,
				"modeTabView" : modeTabView,
				"containerId" : containerId
			});
			
			dataGridOption.id = containerId+'_dataGrid';
			dataGridOption.render = containerId+'_dataGrid';
			dataGridOption["class"] = "dataBrowser-grid";
			
			dataGrid = new WAF.widget.Grid(dataGridOption);
			dataGrid.gridController.onError = function(event) {
				
				return DataBrowser.errorHandler(event, {
					"type" : "dataGrid",
					"dataGrid" : dataGrid
				});
			};
			
			if(modeTabView) {
				
				$("#"+tabViewContainer.id+"_splitter").bind("mousedown", {"containerId" : tabViewContainer.id}, this.mousedown_splitter);
				$("#"+tabViewContainer.id+"_splitter").bind("dblclick", {"containerId" : tabViewContainer.id}, this.dblClickSplitter);
			}
			
			dataGrid.gridController.onRowRightClick = function onRowRightClick_dataBrowser_dataGrid(rightClickEvent) {
				
				var parameters;
				
				parameters = {
					"containerId" : containerId,
					"dataClassName" : option.name,
					"modeTabView" : modeTabView,
					"currentEvent" : rightClickEvent
				};
				
				DataBrowser.showRelatedElementTips(parameters);
				
				rightClickEvent.stopPropagation();
				
				return false;
			};
			
			dataGrid.gridController.onRowClick = function onRowClick_dataBrowser_dataGrid(event) {
				var parameters;
				
				parameters = {
					"containerId" : containerId,
					"dataClassName" : option.name,
					"modeTabView" : modeTabView
				};
				
				DataBrowser.openAutoForm(parameters);
			};
			
			if(option.query !== "") {
				$("#"+containerId+"_query_form").submit();
			}
			
		} else {
			
			if(modeTabView) {
				this.tabView.selectTab(this.tabViewReference[this.getHash(option)]);
			} else {
				$("#"+this.dialogReference[this.getHash(option)]).dialog("moveToTop");
			}
		}
	},
	
	closeDialog : function close_dataBrowser_dialog(index) {
		
		$("#"+this.dialogReference[index]+"_dialog_autoForm").dialog("destroy");
		
		delete this.dialogReference[index];
	},
	
	selectDialog : function select_dataBrowser_dialog(parameters) {
		
		var containerId,
			dataClassName,
			query;
		
		containerId = parameters.containerId;
		dataClassName = parameters.dataClassName;
		query = parameters.query;
		
		this.currentDialog = $("#"+containerId);
		
		if($("#"+containerId+"_dialog_autoForm").dialog("isOpen") === true) {
			
			$("#"+containerId+"_dialog_autoForm").dialog("moveToTop");
		}
		
		if(query === "") {
			
			query = $("#"+containerId+"_query_input").val();
		}
		
		if(this.refreshSelectedContainer !== undefined && dataClassName != undefined && query != undefined) {
			this.refreshSelectedContainer({
				"name" : dataClassName,
				"query" : query,
				"modeTabView" : false,
				"containerId" : containerId
			});
		}
	},
	
	showRelatedElementTips : function show_dataBrowser_relatedElement_tips_listener(parameters) {
		var i,
			tipsHtml,
			sourceName,
			containerId,
			currentEvent,
			dsAttributes,
			currentSource,
			dataClassName,
			relatedElement,
			relatedDataClass,
			dataClassAttribute,
			dataClassAttributes;
		
		containerId = parameters.containerId;
		dataClassName = parameters.dataClassName;
		modeTabView = parameters.modeTabView;
		currentEvent = parameters.currentEvent;
		
		sourceName = dataClassName.toLowerCase();
		if(modeTabView === false) {
			sourceName += "_" + containerId;
		}
		
		currentSource = WAF.source[sourceName];
		dataClassAttributes = currentSource.getDataClass().getAttributes();
		relatedDataClass = {};
		
		currentEvent.preventDefault();
		
		for(i = 0; i < dataClassAttributes.length; i++) {
			
			dataClassAttribute = dataClassAttributes[i];
			
			if(dataClassAttribute.kind === "relatedEntity" || dataClassAttribute.kind === "relatedEntities") {
				
				relatedDataClass[dataClassAttribute.name] = this.getQueryForSelection(currentSource.getCurrentElement(), dataClassAttribute.name);
				relatedDataClass[dataClassAttribute.name].modeTabView = modeTabView;
			}
		}
		
		tipsHtml = "";
		for(relatedElement in relatedDataClass) {
			tipsHtml += '<span class="related-element-link" data-related="'+relatedElement+'">'+relatedElement+'</span>';
		}
		
		if(tipsHtml !== "") {
			
			tipsHtml = '<span class="related-element-link-header">Go to ..</span>'+tipsHtml;
		
			$("#"+containerId+"_dataTips").html(tipsHtml);
			$("#"+containerId+"_dataTips").show();
			
			if((currentEvent.pageY + 10 + $("#"+containerId+"_dataTips").height()) > window.innerHeight) {
				
				$("#"+containerId+"_dataTips").css("bottom", "0px");
				$("#"+containerId+"_dataTips").css("top", "");
			} else {
				$("#"+containerId+"_dataTips").css("top", (currentEvent.pageY + 10) + "px");
				$("#"+containerId+"_dataTips").css("bottom", "");
			}
			
			if((currentEvent.pageX + $("#"+containerId+"_dataTips").width()) > window.innerWidth) {
				
				$("#"+containerId+"_dataTips").css("right", "0px");
				$("#"+containerId+"_dataTips").css("left", "");
			} else {
				$("#"+containerId+"_dataTips").css("left", currentEvent.pageX + "px");
				$("#"+containerId+"_dataTips").css("right", "");
			}
			
			$("#"+containerId+"_dataGrid .waf-dataGrid-body").bind("scroll", function (event) {
				
				$("#"+containerId+"_dataTips").hide();
			});
			
			$("#"+containerId+"_dataTips .related-element-link").each(function (index) {
				var element;
				element = $(this).data("related");
				
				if(relatedDataClass[element].query !== "") {
					
					$(this).bind("click", function (event) {
						$(this).parent().hide();
						DataBrowser.loadDataClass(relatedDataClass[element]);
					})
					.bind("mouseout", function(event) {
						$(this).removeClass("hover");
					})
					.bind("mouseover", function(event) {
						$(this).addClass("hover");
					});
				} else {
					
					$(this).addClass("related-element-link-disabled");
				}
			});
		}
		currentEvent.stopPropagation();
				
	},
	
	openAutoForm : function open_dataBrowser_autoForm_listener(parameters) {
		var sourceName,
			modeTabView,
			containerId,
			dataClassName,
			autoFormOption,
			autoFormMarkup,
			autoFormWidget,
			dialogParentPosition;
		
		containerId = parameters.containerId;
		dataClassName = parameters.dataClassName;
		modeTabView = parameters.modeTabView;
		
		$("#"+containerId+"_dataTips").hide();
		if(modeTabView) {
			$("#"+containerId+"_autoForm").parent().css("right", "0");
			$("#"+containerId+"_autoForm").parent().width("50%");
			$("#"+containerId+"_autoForm").parent().show();
			$("#"+containerId+"_dataGrid").width("50%");
			$("#"+containerId+"_autoForm").height("100%");
		} else {
			
			if($("#"+containerId+"_dialog_autoForm").dialog("isOpen") === true) {
				
				$("#"+containerId+"_dialog_autoForm").dialog("moveToTop");
			} else if ($("#"+containerId+"_dialog_autoForm").dialog("isOpen") === false) {
				
				dialogParentPosition = this.currentDialog.dialog("widget").position();
				$("#"+containerId+"_dialog_autoForm").dialog({
					open : true,
					position : [(dialogParentPosition.left + this.currentDialog.dialog("widget").width()), dialogParentPosition.top]
				});
			} else {
				dialogParentPosition = this.currentDialog.dialog("widget").position();
				
				dialogParentPosition.left += this.currentDialog.dialog("widget").width();
				
				dialogContainer = $("#container_dataclass").append('<div id="'+containerId+'_dialog_autoForm" data-type="container" data-lib="WAF" style="width : 400px;"></div>');
				dialogOption = {
					autoOpen : true,
					width : 600,
					minWidth : 200,
					height : 500,
					minHeight : 300,
					draggable : false,
					position : [dialogParentPosition.left, dialogParentPosition.top],
					resize : function (event, ui) {
						DataBrowser.resizeAutoForm(containerId+"_dialog_autoForm", false);
					},
					resizeStop : function (event, ui) {
						DataBrowser.resizeAutoForm(containerId+"_dialog_autoForm", true);
					}
				};
				$("#"+containerId+'_dialog_autoForm').dialog(dialogOption);
				
				autoFormMarkup = this.getAutoFormMarkup({
					containerId : containerId,
					modeTabView : modeTabView
				});
				
				$("#"+containerId+'_dialog_autoForm').html(autoFormMarkup);
			}
			
		}
		
		if($$(containerId+'_autoForm') === undefined) {
			
			sourceName = dataClassName.toLowerCase();
			
			if(modeTabView === false) {
				sourceName += "_" + containerId;
			}
			
			autoFormOption = {
				"data-type" : "autoForm",
				"data-lib" : "WAF",
				"data-binding" : sourceName,
				"id" : containerId+'_autoForm',
				"data-withoutTable" : "true",
				"data-resize-each-widget" : "true",
				'data-resize-optimal-each-widget' : "true"
			};
			dsAttributes = WAF.source[sourceName].getAttributeNames();
			autoFormOption["data-columns"] = autoFormOption["data-column-name"] = autoFormOption["data-column-attribute"] = dsAttributes.join(",");
			
			autoFormWidget = new WAF.widget.AutoForm(autoFormOption);
			autoFormWidget.onError = function(event) {
				return DataBrowser.errorHandler(event, {
					"type" : "autoForm",
					"autoForm" : autoFormWidget
				});
			}
		}
	},
	
	repositionAutoFormDialog : function reposition_dataBrowser_autoForm_dialog(parameters) {
		var ui,
			containerId;
		
		ui = parameters.ui;
		containerId = parameters.containerId;
		
		if($("#"+containerId+"_dialog_autoForm").dialog("isOpen") === true) {
			
			$("#"+containerId+"_dialog_autoForm").dialog({
				position : [(ui.position.left + this.currentDialog.dialog("widget").width()), ui.position.top]
			});
		}
	},
	
	getDataContainerMarkup : function get_dataBrowser_dataContainer_markup(parameters) {
		var markup,
			containerId,
			query,
			modeTabView;
		
		containerId = parameters.containerId;
		query = parameters.query;
		modeTabView = parameters.modeTabView;
		
		markup = '<div id="'+containerId+'_query" class="dataBrowser-query">'+
			'<form id="'+containerId+'_query_form" action="evaluate" method="POST">'+
	 	 	 	'<label id="'+containerId+'_query_label" for="'+containerId+'_query_input" data-valign="middle" data-type="label" data-lib="WAF" class="waf-widget waf-label default inherited dataBrowser-query-label">Query</label>'+
				'<input type="text" id="'+containerId+'_query_input" value="'+query+'" class="waf-widget waf-textField default inherited dataBrowser-query-input" placeholder="ID > 0" style="padding-left: 55px; padding-right: 80px;" />'+
				'<button id="'+containerId+'_query_submit_button" class="dataBrowser-query-button" data-type="button" data-lib="WAF" data-action="submit" class="waf-widget waf-button"></button>'+
				'<button id="'+containerId+'_query_reset_button" class="dataBrowser-query-reset-button" data-type="button" data-lib="WAF" data-action="simple" class="waf-widget waf-button" title="Select All"></button>'+
				'<button id="'+containerId+'_query_refresh_button" class="dataBrowser-query-refresh-button" data-type="button" data-lib="WAF" data-action="simple" class="waf-widget waf-button" title="Refresh grid"></button>'+
			'</form>'+
		'</div>'+
		'<div class="dataBrowser-dataContainer">'+
			'<div id="'+containerId+'_dataGrid" data-type="container" data-lib="WAF" class="waf-widget waf-container default inherited"></div>'+
			((modeTabView) ? this.getAutoFormMarkup(parameters) : "")+
			'<div id="'+containerId+'_dataTips" class="dataBrowser-dataTips" style="display : none;"></div>'+
		'</div>';
		
		return markup;
	},
	
	getAutoFormMarkup : function get_dataBrowser_autoForm_markup(parameters) {
		var markup,
			containerId,
			modeTabView;
		
		containerId = parameters.containerId;
		modeTabView = parameters.modeTabView;
		
		markup = '<div class="dataBrowser-autoForm '+((modeTabView) ? "dataBrowser-autoForm-tabView" : "dataBrowser-autoForm-dialog")+'" ';
		
		if(modeTabView) {
			markup += 'style="display : none; min-width : 7px;"';
		}
		
		markup += '>'+
			'<div id="'+containerId+'_autoForm" data-type="container" data-lib="WAF" class="waf-widget waf-container default dataBrowser-autoForm-container"></div>';
		
		if(modeTabView) {
			markup += '<div id="'+containerId+'_splitter" class="waf-splitter dataBrowser-splitter">&nbsp;</div>';
		}
		markup += '</div>';
		
		return markup;
	},
	
	resizeAutoForm : function resize_dataBrowser_autoForm_fitToContainer(containerId, end) {
		var newHeight,
			$container;
		
		$container = $("#"+containerId);
		
		newHeight = $container.height() - $('.waf-widget-footer', $container).height();
		newHeight -= $('.waf-widget-header', $container).height();
		$('.waf-widget-body', $container).height(newHeight);
		
		if(!this.modeTabView && end) {
			
			$$(containerId.replace("_dialog", "")).onResize();
		}
	},
	
	mousedown_splitter : function listener_dataBrowser_mousedown_splitter (event) {
		var containerId,
			containerWidth;
		
		event.preventDefault();
		containerId = event.data.containerId;
		
		DataBrowser.splitterPosX = event.clientX;
		containerWidth = $("#"+containerId+"_dataGrid").parent().width();
		
		$("#"+containerId+"_dataTips").hide();
		$("body").bind('mousemove', {'containerId' : containerId, "containerWidth" : containerWidth}, DataBrowser.mousemoveSplitter);
		$("body").bind('mouseup', {'containerId' : containerId}, DataBrowser.mouseupSplitter);
		event.stopPropagation();
	},
	
	mouseupSplitter: function listener_dataBrowser_mouseup_splitter (event) {
		var containerId;
		
		containerId = event.data.containerId;
		
		event.preventDefault();
		$("body").unbind('mousemove', DataBrowser.mousemoveSplitter);
		$("body").unbind('mouseup', DataBrowser.mouseupSplitter);
		event.stopPropagation();
	},
	
	mousemoveSplitter: function listener_dataBrowser_mousemove_splitter (event) {
		var containerId,
			posDelta,
			currentBoxWidth,
			containerWidth;
		
		event.preventDefault();
		
		containerId = event.data.containerId;
		containerWidth = event.data.containerWidth;
		
		posDelta = event.clientX - DataBrowser.splitterPosX;
		
		currentBoxWidth = $("#"+containerId+"_dataGrid").next().width();
		if((containerWidth - (currentBoxWidth - posDelta)) > 300) {
			DataBrowser.splitterPosX = event.clientX;
		
			$("#"+containerId+"_dataGrid").width((containerWidth - (currentBoxWidth - posDelta)) + "px");
			$("#"+containerId+"_dataGrid").next().width((currentBoxWidth - posDelta) + "px");
		}
		event.stopPropagation();
	},
	
	dblClickSplitter : function listener_dataBrowser_dblclick_splitter (event) {
		var containerId;
		
		containerId = event.data.containerId;
		event.preventDefault();
		
		if($(this).parent().width() === 7) {
			
			$(this).parent().width("50%");
			$(this).parent().prev().width("50%");
		} else {
			
			$(this).parent().width("7px");
			$(this).parent().prev().width(($(this).parent().parent().width() - 7) + "px");
		}
		
		event.stopPropagation();
	},
	
	getQueryForSelection : function get_dataBrowser_related_Element_query(currentElement, attributeName) {
		var queryObject;
		
		currentElement[attributeName].att.resolve();
		queryObject = {};
		
		if(currentElement[attributeName].att.kind === "relatedEntity" || currentElement[attributeName].att.kind === "relatedEntities") {
		
			queryObject.name = currentElement[attributeName].att.relatedClass.getName();
			
			if(currentElement[attributeName].att.kind === "relatedEntity") {
				
				if(currentElement[attributeName].relKey !== null) {
					queryObject.query = 'ID='+currentElement[attributeName].relKey;
				} else {
					queryObject.query = "";
				}
				
			} else if (currentElement[attributeName].att.kind === "relatedEntities") {
				
				queryObject.query = currentElement[attributeName].att.path+'.ID='+currentElement.ID.value;
			}
		}
		
		return queryObject;
	},
	
	deleteTab : function delete_dataBrowser_tab(tabPosition, tab, container) {
		
		var key;
		
		for(key in DataBrowser.tabViewReference) {
			
			if(DataBrowser.tabViewReference[key] === tabPosition) {
				delete DataBrowser.tabViewReference[key];
			} else {
				if(DataBrowser.tabViewReference[key] > tabPosition) {
					DataBrowser.tabViewReference[key]--;
				}
			}
		}
		
	},
	
	getHash : function getHash_dataBrowser_tab(option) {
		return option.name + JSON.stringify(option.query);
	},
	
	getDataSourceDetails : function get_dataSource_detail_for_widget(parameters) {
		
		var i,
			ds,
			source,
			dsDetails,
			sourceName,
			modeTabView,
			containerId,
			dsAttribute,
			dsAttributes,
			dataSourceName;
		
		dataSourceName = parameters.name;
		containerId = parameters.containerId;
		modeTabView = parameters.modeTabView;
		
		ds = WAF.ds.getDataClass(dataSourceName);
		
		sourceName = dataSourceName.toLowerCase();
		if(modeTabView === false) {
			sourceName += "_" + containerId;
		}
		
		this.createWAFDataSource({"source" : dataSourceName, "sourceName" : sourceName, "containerId" : containerId});
		
		dsDetails = {
			columns : []
		};
		
		dsAttributes = ds.getAttributes();
		
		for(i = 0; i < dsAttributes.length; i++) {
			
			dsAttribute = dsAttributes[i];
			
			if(dsAttribute.kind !== "relatedEntity" && dsAttribute.kind !== "relatedEntities") {
				
				if(i !== 0) {
					if(dsDetails.colNames !== "") {
						dsDetails.colNames += ",";
					}
					if(dsDetails.colAttributes !== "") {
						dsDetails.colAttributes += ",";
					}
				}
				
				dsDetails.columns.push({
					sourceAttID : dsAttribute.name,
	                title : dsAttribute.name,
	                colID : dsAttribute.name,
					width : this.defaultColumnWidthForType(dsAttribute.type)
				});
				
			}
		}
		
		dsDetails.dataSource = sourceName;
		dsDetails['data-binding'] = sourceName;
		dsDetails["data-type"] = "dataGrid";
		dsDetails["data-lib"] = "WAF";
		dsDetails["data-label-position"] = "top";
		dsDetails["data-label"] = "";
		dsDetails["data-selection-mode"] = "single";
		dsDetails["data-column"] = JSON.stringify(dsDetails.columns);
		dsDetails["data-label"] = "";
		dsDetails["data-constraint-bottom"] ="false";
		dsDetails["data-constraint-right"] ="false";
		
		return dsDetails;
	},
	
	defaultColumnWidthForType : function get_dataBrowser_defaultColumnWidthForType(type) {
		
		var result = 70;
		if (type != null)
		{
			switch (type)
			{
				case 'string':
					result = 120;
					break;
					
				case 'number':
				case 'long64':
					result = 70;
					break;
					
				case 'long':
				case 'word':
					result = 50;
					break;
					
				case 'byte':
					result = 30;
					break;
					
				case 'date':
					result = 90;
					break;
			}
		}
		return result;
	},
	
	submitQuery : function submit_dataBrowser_query(event) {
		var data,
			input,
			dataContainer;
		
		event.preventDefault();
		
		data = event.data;
		
		input = $("#"+event.target.id+" .dataBrowser-query-input");
		DataBrowser.refreshDataClass({
			"name" : data.dataClass,
			"query" : input.val(),
			"modeTabView" : data.modeTabView,
			"containerId" : data.containerId
		});
		
		dataContainer = $(event.target).parent().next();
		
		dataContainer.children(".dataBrowser-autoForm").hide();
		dataContainer.children(".dataBrowser-dataTips").hide();
		dataContainer.children(".dataBrowser-grid").width("100%");
	},
	
	refreshDataClass : function refresh_dataBrowser_dataClass(parameters) {
		var name,
			query,
			source,
			sourceName,
			containerId,
			modeTabView;
		
		name = parameters.name;
		query = parameters.query;
		modeTabView = parameters.modeTabView;
		containerId = parameters.containerId;
		
		sourceName = name.toLowerCase();
		if(modeTabView === false) {
			sourceName += "_" + containerId;
		}
		
		if(WAF.sources[sourceName] === undefined) {
			
			source = this.createWAFDataSource({"source" : name, "sourceName" : sourceName, "containerId" : containerId});
		}
		
		if(query !== "") {
			WAF.sources[sourceName].query(query);
		} else {
			WAF.sources[sourceName].all();
		}
	},
	
	selectTab : function select_dataBrowser_tab(tabIndex, tabItem, tabContainer) {
		var $tabContainer,
			dataClassName,
			query;
		
		$tabContainer = $(tabContainer);
		
		dataClassName = $tabContainer.data("dataBrowser-dataClass");
		query = $tabContainer.data("dataBrowser-dataQuery");
		
		if(query === "") {
			
			query = $("#"+tabContainer.id+"_query_input").val();
		}
		
		if(DataBrowser.refreshSelectedContainer !== undefined && dataClassName != undefined && query != undefined) {
			DataBrowser.refreshSelectedContainer({
				"name" : dataClassName,
				"query" : query,
				"modeTabView" : true,
				"containerId" : tabContainer.id
			});
		}
	},
	
	refreshSelectedContainer : function refresh_dataBrowser_selectedContainer(parameters) {
		
		/*
		parameters {
			name,
			query,
			modeTabView,
			containerId
		}
		*/
		// this.refreshDataClass(parameters);
		this.selectDataClassList(parameters.name);
	},
	
	selectDataClassList : function select_dataBrowser_dataClassList(name) {
		
		$("#dataClassContentTable tr.line-selected").each(function (index) {
			$(this).removeClass("line-selected");
		});
		
		$("#dataClassContentTable tr.entityModels").each(function (index) {
			if($(this).data("title") === name) {
				$(this).addClass("line-selected");
				return;
			}
		})
	},
	
	initTabDragEvent : function init_dataBrowser_tabView_dragEvent(index) {
		var currentTab,
			currentIndex,
			currentTabContainer;
		
		currentTab = this.tabView._menuBar.getMenuItem((index-1)).$domNode;
		
		currentTab.prop("draggable", true);
		
		currentTab.bind("dragstart", function (e) {
			
			e.originalEvent.dataTransfer.effectAllowed = "move";
			e.originalEvent.dataTransfer.setData("Text", index);
			this.style.cursor = "move";
			
			currentIndex = ($(this).parent().find('li').index(this) + 1);
			
			DataBrowser.draggingTabContainer = DataBrowser.tabView.getContainer(currentIndex);
			DataBrowser.draggingTabIndex = currentIndex;
			
			$(this).parent().bind("drop", function (event) {
				e.stopPropagation();
				
				return false;
			})
			.bind("dragenter", function (e) {
				e.stopPropagation();
				
				return false;
			})
			.bind("dragleave", function (e) {
				e.stopPropagation();
				
				return false;
			})
			.bind("dragover", function (e) {
				e.stopPropagation();
				
				return false;
			});
			
			return true;
		});
		
		currentTab.bind("dragend", function (e) {
			
			e.preventDefault();
			e.stopPropagation();
			
			this.style.cursor = "default";
			
			$(this).parent().unbind("drop")
			.unbind("dragenter")
			.unbind("dragleave")
			.unbind("dragover");
			
			return true;
		});
	},
	
	initTabDropEvent : function init_dataBrowser_tabView_dropEvent() {
		
		var $tabDropZone;
		
		$tabDropZone = $("#container_dataclass");

		$tabDropZone.bind("dragover", function(e) {
			
			var $this,
				$tabToWindowDraggingDiv;
			
			e.preventDefault();
			e.stopPropagation();
			
			$tabToWindowDraggingDiv = $("#tabToWindowDraggingDiv");
			$this = $(this);
			
			$this.css("opacity", "0.5");
			$this.css("z-index", "999999");
			$tabToWindowDraggingDiv.show();
			$tabToWindowDraggingDiv.css("top", e.originalEvent.pageY + 20);
			$tabToWindowDraggingDiv.css("left", e.originalEvent.pageX);
			
			return false;
		})
		.bind("dragenter", function(e) {
			
			e.preventDefault();
			e.stopPropagation();
			
			return false;
		})
		.bind("dragleave", function(e) {
			
			e.preventDefault();
			e.stopPropagation();
			
			$(this).css("opacity", "");
			$(this).css("z-index", "");
			$("#tabToWindowDraggingDiv").hide();
			
			return false;
		})
		.bind("drop", function(e) {
			
			e.preventDefault();
			e.stopPropagation();
			
			$(this).css("opacity", "");
			$(this).css("z-index", "");
			$("#tabToWindowDraggingDiv").hide();
			
			DataBrowser.transformTabToDialog(e);
			
			return false;
		});
		
		$("body").bind("drop", function (e) {
			e.preventDefault();
			e.stopPropagation();
			DataBrowser.draggingTabContainer = null;
			
			return false;
		});
	},
	
	transformTabToDialog : function transform_dataBrowser_tab_to_dialog (event) {
		var windowX,
			windowY,
			dataQuery,
			dataClass,
			tabContainer;
		
		if(this.draggingTabContainer !== null && this.draggingTabIndex !== null) {
			tabContainer = this.draggingTabContainer;
			
			dataClass = $(tabContainer).data("dataBrowser-dataClass");
			dataQuery = $("#"+tabContainer.id+"_query_input").val();
			
			/**
			 * Position of window
			 */
			windowX = this.dialogPositionX;
			windowY = this.dialogPositionY;
			this.dialogPositionX = event.originalEvent.pageX;
			this.dialogPositionY = event.originalEvent.pageY;
			
			this.tabView.removeTab(this.draggingTabIndex);
			
			this.loadDataClass({
				name : dataClass,
				query : dataQuery,
				modeTabView : false
			});
			this.selectDataClassList(dataClass);
			
			this.dialogPositionX = windowX;
			this.dialogPositionY = windowY;
			
			this.draggingTabContainer = null;
			this.draggingTabIndex = null;
		}
	},
	
	transformDialogToTab : function transform_dataBrowser_dialog_to_tab (option) {
		var dataQuery,
			dataClass,
			dialogContainer;
		
		if(this.draggingDialogContainerId !== null) {
			
			dialogContainer = $("#"+this.draggingDialogContainerId);
			
			dataClass = option.name;
			dataQuery = $("#"+this.draggingDialogContainerId+"_query_input").val();
			
			if(dataQuery === undefined) {
				dataQuery = option.query;
			}
			
			$("#"+this.draggingDialogContainerId).dialog("close");
			
			this.loadDataClass({
				name : dataClass,
				query : dataQuery,
				modeTabView : true
			});
			this.selectDataClassList(dataClass);
			
			this.draggingDialogContainerId = null;
		}
	},
	
	exportSelectedDataClass : function export_dataBrowser_selected_dataClass() {
		
		var iframe,
			source,
			sourceID,
			mysource,
			dataClass,
			requestURL,
			progressName,
			dataClassName;
		
		sourceID = $("#dataClassContentTable tbody").children(".line-selected").data("title").toLowerCase();
		mysource = WAF.source[sourceID];
		
		if(mysource === undefined) {
			
			source = $("#dataClassContentTable tbody").children(".line-selected").data("title");
			mysource = this.createWAFDataSource({"source" : source, "sourceName" : source, "containerId" : null});
		}
		
		dataClass = mysource.getDataClass();
		dataClassName = dataClass.getName();
		
		progressName = "export_"+dataClassName+"_"+(new Date()).toISOString()+"_"+Math.random();
		requestURL = WAF.dsExport.exportData({generateRESTRequestOnly:true, callWithGet:true}, {'dataClassName': dataClassName, exportType:"csv"/*, progressInfo: progressName*/});
		
		iframe = $("#iframeexport");
		if (iframe.length === 0) {
			$('body').append('<iframe id="iframeexport"></iframe>');
			iframe = $("#iframeexport");
		}
		iframe.hide();
		iframe.attr("src", requestURL);
	},
	
	showImportExportTips : function show_dataBrowser_import_export_tips(event, type) {
		var tipsHtml;
		
		if(type === "export") {
			tipsHtml = "Export ";
		} else {
			tipsHtml = "Import to ";
		}
		
		tipsHtml += $("#dataClassContentTable tbody").children(".line-selected").data("title")+" Class";
		
		$("#importExportTips").html(tipsHtml);
		$("#importExportTips").css("top", event.pageY + 10);
		$("#importExportTips").css("left", event.pageX + 10);
		$("#importExportTips").show();
	},
	
	hideImportExportTips : function hide_dataBrowser_import_export_tips() {
		$("#importExportTips").hide();
	},
	
	createWAFDataSource : function create_dataBrowser_WAF_dataSource(parameters) {
		var source,
			sourceName,
			containerId,
			createdSource;
		
		source = parameters.source;
		sourceName = parameters.sourceName;
		containerId = parameters.containerId;
		
		createdSource = WAF.dataSource.create({
			binding: source,
			content: source.toLowerCase(),
			"data-attributes": null,
			"data-autoLoad": "true",
			"data-dataType": "string",
			"data-initialOrderBy": null,
			"data-initialQueryString": null,
			"data-lib": "WAF",
			"data-source": source,
			"data-source-type": "dataClass",
			"data-type": "dataSource",
			id: sourceName,
			name: sourceName,
			"onError" : function(event) {
				return DataBrowser.errorHandler(event, {
					"type" : "dataSource",
					"parameters" : parameters
				});
			}
		});
		
		createdSource.resolveSource({
			"onError" : function(event) {
				return DataBrowser.errorHandler(event, {
					"type" : "dataSource",
					"parameters" : parameters
				});
			}
		});
			
		return createdSource;
	},
	
	changeStyle : function change_dataBrowser_skin(val) {
		
		var paletteUrl,
			currentSkinName;
		
		paletteUrl = "/walib/WAF/widget/palette/css/widget-palette-"+val+".css";
		
		currentSkinName = this.skinName
		
		WAF.loader.styleToLoad.push(paletteUrl);
		WAF.loader.loadStyles();
		
		if(currentSkinName !== val) {
			$("link").each(function remove_old_palette(index, linkTag) {
				if($(linkTag).attr("href") === "/walib/WAF/widget/palette/css/widget-palette-"+currentSkinName+".css") {
					$(linkTag).remove();
				}
			});
		}
		
		this.skinName = val;
		document.cookie = "databrowser_skinname="+val;
	},
	
	errorHandler : function dataBrowser_error_handler(event, callbackParameters) {
		
		var i,
			error,
			errors,
			returnHandler,
			errorsToDisplay;
		
		returnHandler = true;
		errors = event.error;
		errorsToDisplay = {};
		
                for(i = 0; i < errors.length; i++) {

                        error = errors[i];

                        switch(error.errCode) {
                                case this.PERM_TO_READ_ERROR :
                                case this.PERM_TO_CREATE_ERROR :
                                case this.PERM_TO_UPDATE_ERROR :
                                case this.PERM_TO_DELETE_ERROR :
                                case this.PERM_TO_EXECUTE_ERROR :

                                        if(!errorsToDisplay.hasOwnProperty("permissionErrors")) {
                                                errorsToDisplay.permissionErrors = [];
                                        }

                                        errorsToDisplay.permissionErrors.push(error.message);

                                        returnHandler = false;
                                        break;
                        }
                }

                if(errorsToDisplay.hasOwnProperty("permissionErrors") && errorsToDisplay.permissionErrors.length > 0) {

                        this.showErrorInLoginDialog(errorsToDisplay.permissionErrors, callbackParameters);
                }
		
		return returnHandler;
	},
	
	showErrorInLoginDialog : function dataBrowser_show_error_in_error_dialog(errors, callbackParameters) {
		var i,
			htmlToAdd,
			loginDialogBody,
			loginOldCallback;
		
		htmlToAdd = '<div class="data-browser-permission-error-message">';
		for(i = 0; i < errors.length; i++) {
			htmlToAdd += "<span>"+errors[i]+"</span>";
		}
		htmlToAdd += "</div>";
		
		$$("loginToDataBrowser").showLoginDialog();
		
		loginOldCallback = $$("loginToDataBrowser").onlogin;
		
		$$("loginToDataBrowser").onlogin = function loginToDataBrowser_login(event) {
			
			var dataGrid = null;
			
			if(callbackParameters.type === "dataSource") {
				
				WAF.sources[callbackParameters.parameters.sourceName].resolveSource({
					"onError" : function(event) {
						return DataBrowser.errorHandler(event, {
							"type" : "dataSource",
							"parameters" : callbackParameters
						});
					}
				});
				dataGrid = $$(callbackParameters.parameters.containerId+"_dataGrid")
				
			} else if(callbackParameters.type === "dataGrid") {
				
				dataGrid = callbackParameters.dataGrid;
			} else if(callbackParameters.type === "autoForm") {
				
				// TODO
				// callbackParameters.autoForm.refresh();
			}
			
			if(dataGrid !== null) {
				dataGrid.gridController.gridView.refresh();
			}
			
			this.onlogin = loginOldCallback;
		};
		
		loginDialogBody = $$("loginToDataBrowser").dialog;
		
		loginDialogBody.children(".data-browser-permission-error-message").remove();
		loginDialogBody.prepend(htmlToAdd);
	}
};
