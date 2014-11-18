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
#ifndef __VSolutionManagerConstants__
#define __VSolutionManagerConstants__

// ----------------------------------------------------------------------------
// Elements XML :
// ----------------------------------------------------------------------------
// Objet : Guidelines pour les fichiers XML du RIA Studio et RIA Server (d'après mail G.A)
// - tout en américain 
// - tout en camelCase (pour le camelCase on retiendra la variante consistant à mettre 
//   la première lettre en minuscule)
// - pas de '_'
// - pas d'acronyme ni d’abréviation ou uniquement les plus usuels (ok pour 'id', 
//   mais 'source' au lieu de 'src')
// - ne pas utiliser de nombre pour définir une valeur d’attribut mais les intitulés 
//   eux-même (ne pas utiliser '0', '1', '2'  mais 'bold', ' italic', ' underline' par exemple)
// - utiliser des noms et non des verbes ( 'NotModifiable' et non 'CannotModify')
// - éviter la forme négative ('enterable' et non 'CannotModify')
// - préférer des noms court pour un xml plus compact
// - préférer les attributs aux élements pour les données scalaires, pour un xml plus compact
// - choisir les valeurs par défaut les plus courantes et ne pas les produire dans le xml, 
//   pour un xml plus compact

extern const XBOX::VString kXML_ELEMENT_UNDEFINED;
extern const XBOX::VString kXML_ELEMENT_SOLUTION;
extern const XBOX::VString kXML_ELEMENT_SOLUTION_LINK;
extern const XBOX::VString kXML_ELEMENT_PROJECT;
extern const XBOX::VString kXML_ELEMENT_FOLDER;
extern const XBOX::VString kXML_ELEMENT_FILE;
extern const XBOX::VString kXML_ELEMENT_SOLUTION_DESCRIPTION_FILE;
extern const XBOX::VString kXML_ELEMENT_PROJECT_DESCRIPTION_FILE;
extern const XBOX::VString kXML_ELEMENT_PROJECT_METHOD_FILE;
extern const XBOX::VString kXML_ELEMENT_TAG;
extern const XBOX::VString kXML_ELEMENT_CONFIGURATION;
extern const XBOX::VString kXML_ELEMENT_SOLUTION_EXPLORER;
extern const XBOX::VString kXML_ELEMENT_EDITOR;
extern const XBOX::VString kXML_ELEMENT_LOCATOR;
extern const XBOX::VString kXML_ELEMENT_LAST_WINDOW_POS;
extern const XBOX::VString kXML_ELEMENT_TABS;
extern const XBOX::VString kXML_ELEMENT_PERMISSIONS;

// Les Guidelines ci-dessus s'appliquent ici aussi :
namespace ProjectItemBagKeys
{
	EXTERN_BAGKEY_WITH_DEFAULT(path, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT(parentPath, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT(lastAddedNewProjectFolder, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT(lastAddedExistingProjectFolder, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(table_number, XBOX::VLong, sLONG );		//	TO DO A VOIR avec FM ?
	EXTERN_BAGKEY_WITH_DEFAULT(form_name, XBOX::VString);						//	TO DO A VOIR avec FM ?
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(eventHandlerIndex, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT(methodName, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(active, XBOX::VBoolean, bool);
	EXTERN_BAGKEY_WITH_DEFAULT(name, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT(solutionLink, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(height, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(width, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(x, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(y, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(maximized, XBOX::VBoolean, bool );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(maximized_x, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(maximized_y, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(zPos, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(currentIndex, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT_SCALAR(currentLine, XBOX::VLong, sLONG );
	EXTERN_BAGKEY_WITH_DEFAULT(lastSelectedPath, XBOX::VString);
	EXTERN_BAGKEY_WITH_DEFAULT(displayName, XBOX::VString);
}


// ----------------------------------------------------------------------------
// pour stocker l'etat des treeItems
// ----------------------------------------------------------------------------
const XBOX::VString kTREE_ITEM_STATE	=	CVSTR("tree_item_state");

// ----------------------------------------------------------------------------
// Definitions de constantes NEW INTERFACE
// ----------------------------------------------------------------------------

#define WAK_LEFT_FRAME						CVSTR("explorer.frame.left.resize")
#define WAK_RIGHT_FRAME						CVSTR("editor.frame.right.resize")
#define WAK_CODE_EDITOR_FRAME				CVSTR("codeEditor.frame.resize")
#define WAK_SOLUTION_LIST					CVSTR("C_Solution_List")
// ------
#define WAK_TREE_LIST_O						CVSTR("explorer.list.resize")
#define WAK_TREE_LIST_V						CVSTR("PjM_C_Solution_List_V")
// ------
#define WAK_LIST_FILES						CVSTR("details.files")
#define WAK_LIST_TABLES						CVSTR("details.entities")
#define WAK_LIST_FIELDS						CVSTR("details.attributes")
// ------
#define WAK_THUMBNAILS_O					CVSTR("thumbnails")
#define WAK_THUMBNAILS_V					CVSTR("C_ObjectList_Chooser#")
// ------
#define WAK_CODEEDITOR_TABS					CVSTR("tabs")
// ------
#define WAK_FILES_O							CVSTR("files")
#define WAK_FILES_V							CVSTR("PJM_X_itemLstb_array1")
#define WAK_FILES_COL_ICON_V				CVSTR("PJM_C_fileIcon_array1")
#define WAK_FILES_COL_NAME_O				CVSTR("column.file.name")
#define WAK_FILES_COL_NAME_V				CVSTR("PJM_C_fileName_array1")
#define WAK_FILES_COL_PROJECT_V				CVSTR("C_FILE_PROJECT_ARRAY")
#define WAK_FILES_COL_TYPE_V				CVSTR("PJM_C_fileType_array1")
#define WAK_FILES_COL_FILE_MODIFIED_V		CVSTR("PJM_C_fileModifed_array1")
#define WAK_FILES_COL_PRJ_ITEM_KIND_V		CVSTR("pjm_C_projectItemKind_array1")
#define WAK_FILES_COL_HIDDEN_REF_V			CVSTR("pjm_C_projectItemRef_array1")
#define WAK_FILES_HIDDEN_ROWS_ARRAY			CVSTR("PJM_itemLstbHiddenRows_array1")

#define WAK_ENTITIES_O						CVSTR("entities")
#define WAK_ENTITIES_V						CVSTR("PJM_X_itemLstb_array2")
#define WAK_ENTITIES_COL_ICON_V				CVSTR("PJM_C_entitityIcon_array2")
#define WAK_ENTITIES_COL_NAME_O				CVSTR("items.list.column.name2")
#define WAK_ENTITIES_COL_NAME_V				CVSTR("PJM_C_entitityName_array2")
#define WAK_ENTITIES_COL_TABLE_SCHEMA_V		CVSTR("PJM_C_entitityExtends_array2")
#define WAK_ENTITIES_COL_PRJ_ITEM_KIND_V	CVSTR("pjm_C_projectItemKind_array2")
#define WAK_ENTITIES_COL_HIDDEN_REF_V		CVSTR("pjm_C_projectItemRef_array2")
#define WAK_ENTITIES_HIDDEN_ROWS_ARRAY		CVSTR("PJM_itemLstbHiddenRows_array2")

#define WAK_ATTRIBUTES_O					CVSTR("attributes")
#define WAK_ATTRIBUTES_V					CVSTR("PJM_X_itemLstb_array3")
#define WAK_ATTRIBUTES_COL_ICON_V			CVSTR("PJM_C_attributeIcon_array3")
#define WAK_ATTRIBUTES_COL_NAME_O			CVSTR("items.list.column.name3")
#define WAK_ATTRIBUTES_COL_NAME_V			CVSTR("PJM_C_attributeName_array3")
#define WAK_ATTRIBUTES_COL_TYPE_V			CVSTR("PJM_C_attributeKind_array3")
#define WAK_ATTRIBUTES_COL_PRJ_ITEM_KIND_V	CVSTR("pjm_C_projectItemKind_array3")
#define WAK_ATTRIBUTES_COL_HIDDEN_REF_V		CVSTR("pjm_C_projectItemRef_array3")
#define WAK_ATTRIBUTES_HIDDEN_ROWS_ARRAY	CVSTR("PJM_itemLstbHiddenRows_array3")

#define WAK_STATUSBAR_GIT_BUTTON			CVSTR("c_git_branch")
#define WAK_STATUSBAR_GIT_BUTTON_DEFTITLE	CVSTR("Git Branch")

// ----------------------------------------------------------------------------
// Definitions de constantes OLD INTERFACE
// ----------------------------------------------------------------------------
//#define SOLUTION_EXPLORER_DIALOG			CVSTR("PjM_Explorer")
#define SAVE_AS_TEMPLATE_DIALOG				CVSTR("TPL_Set_As_Template")
#define CREATE_PROJECT_FROM_TEMPLATE_DIALOG	CVSTR("TPL_New_project")
#define SOLUTION_EXPLORER_DIALOG			CVSTR("SM_Perspective_1")
#define LEFT_FRAME_RESIZE_O					CVSTR("list.frame.resize")
#define HIERARCHICAL_LIST_ON_LEFT_O			CVSTR("explorer.list.resize")
#define HIERARCHICAL_LIST_ON_LEFT_V			CVSTR("PjM_C_Solution_List_V")
#define RIGHT_FRAME_RESIZE_O				CVSTR("right.frame.resize")
#define RIGHT_TOP_FRAME_MOVE_O				CVSTR("detail.frame.move")
#define DEFAULT_PROJECT_FOLDER_NAME			CVSTR("Project")
#define PREVIEW_FRAME_RESIZE_O				CVSTR("preview.frame.resize")
// ---------------------------------------------
// List box details 1 -> vue standard : fichiers
// ---------------------------------------------
#define LIST_BOX_ON_RIGHT_1_O				CVSTR("files")
#define LIST_BOX_ON_RIGHT_1_V				CVSTR("PJM_X_itemLstb_array1")
#define LIST_BOX_COL_ICON_1_V				CVSTR("PJM_C_fileIcon_array1")
#define LIST_BOX_COL_NAME_1_O				CVSTR("column.file.name")
#define LIST_BOX_COL_NAME_1_V				CVSTR("PJM_C_fileName_array1")
#define LIST_BOX_COL_TYPE_1_V				CVSTR("PJM_C_fileType_array1")
#define LIST_BOX_COL_FILE_MODIFIED_1_V		CVSTR("PJM_C_fileModifed_array1")
#define LIST_BOX_HIDDEN_ROWS_ARRAY_1		CVSTR("PJM_itemLstbHiddenRows_array1")
#define LIST_BOX_COL_PROJECT_ITEM_KIND_1_V	CVSTR("pjm_C_projectItemKind_array1")
#define LIST_BOX_COL_HIDDEN_REF_1_V			CVSTR("pjm_C_projectItemRef_array1")
// --------------------------------------------
// List box details 2 -> vue catalogue : entités
// --------------------------------------------
#define LIST_BOX_ON_RIGHT_2_O				CVSTR("entities")
#define LIST_BOX_ON_RIGHT_2_V				CVSTR("PJM_X_itemLstb_array2")
#define LIST_BOX_COL_ICON_2_V				CVSTR("PJM_C_entitityIcon_array2")
#define LIST_BOX_COL_NAME_2_O				CVSTR("items.list.column.name2")
#define LIST_BOX_COL_NAME_2_V				CVSTR("PJM_C_entitityName_array2")
#define LIST_BOX_COL_TABLE_SCHEMA_2_V		CVSTR("PJM_C_entitityExtends_array2")
#define LIST_BOX_HIDDEN_ROWS_ARRAY_2		CVSTR("PJM_itemLstbHiddenRows_array2")
#define LIST_BOX_COL_PROJECT_ITEM_KIND_2_V	CVSTR("pjm_C_projectItemKind_array2")
#define LIST_BOX_COL_HIDDEN_REF_2_V			CVSTR("pjm_C_projectItemRef_array2")
// -----------------------------------------
// List box details 3 -> vue entités : attributs
// -----------------------------------------
#define LIST_BOX_ON_RIGHT_3_O				CVSTR("attributes")
#define LIST_BOX_ON_RIGHT_3_V				CVSTR("PJM_X_itemLstb_array3")
#define LIST_BOX_COL_ICON_3_V				CVSTR("PJM_C_attributeIcon_array3")
#define LIST_BOX_COL_NAME_3_O				CVSTR("items.list.column.name3")
#define LIST_BOX_COL_NAME_3_V				CVSTR("PJM_C_attributeName_array3")
//#define LIST_BOX_COL_TYPE_3_V				CVSTR("PJM_C_attributeKind_array3")
#define LIST_BOX_COL_TYPE_3_V				CVSTR("PJM_C_attributeType_array3")
#define LIST_BOX_HIDDEN_ROWS_ARRAY_3		CVSTR("PJM_itemLstbHiddenRows_array3")
#define LIST_BOX_COL_PROJECT_ITEM_KIND_3_V	CVSTR("pjm_C_projectItemKind_array3")
#define LIST_BOX_COL_HIDDEN_REF_3_V			CVSTR("pjm_C_projectItemRef_array3")
// -----------------------------------------
// List box thumbnails
// -----------------------------------------
#define LIST_BOX_ON_RIGHT_THUMBNAILS_O		CVSTR("thumbnails")
#define LIST_BOX_ON_RIGHT_THUMBNAILS_V		CVSTR("C_ObjectList_Chooser#")
// -----------------------------------------
// Onlets preview, QuickEdit, Plug-in
// -----------------------------------------
#define EDITOR_AREA_O						CVSTR("plugineditor")
#define EDITOR_MODE_CHANGE					CVSTR("editor.mode")
#define EDITOR_TAB_NEW						CVSTR("editor.open")
#define EDITOR_TAB_SELECT					CVSTR("editor.select")
#define EDITOR_TAB_NEXT						CVSTR("editor.next")
#define EDITOR_TAB_PREVIOUS					CVSTR("editor.previous")
#define EDITOR_TAB_DELETE					CVSTR("editor.close")

#define TAB_LIST_O							CVSTR("header.rb.list")
#define TAB_THUMBNAILS_O					CVSTR("header.rb.thumbnails")
#define TAB_PREVIEW_O						CVSTR("header.rb.1")
#define TAB_QUICK_EDIT_O					CVSTR("header.rb.2")
#define TAB_PLUGIN_O						CVSTR("header.rb.3")

#define INFO_BAR_V							CVSTR("Txt_C_infoBar")
#define WEB_AREA_O							CVSTR("area.web")
#define WEB_AREA_V							CVSTR("SM_Lon_webArea")
#define WEB_AREA_URL						CVSTR_V("SM_Txt_webAreaURL")
#define WEB_AREA_PROGRESS					CVSTR_V("SM_Lon_webAreaProgress")
// Buttons
#define BTN_ACTION_O						CVSTR("0.action.button")
#define BTN_ACTION_V						CVSTR("PJM_C_bAction")
#define BTN_DEL_O							CVSTR("0.delete.button")
#define BTN_DEL_V							CVSTR("PJM_C_bDel")
#define BTN_NEW_O							CVSTR("0.new.button")
#define BTN_NEW_V							CVSTR("PJM_C_bNew")
#define BTN_HOME_O							CVSTR("PJM_bHome")
#define BTN_HOME_V							CVSTR("PJM_C_bHome")
#define BTN_PREVIOUS_O						CVSTR("PJM_bPrevious")
#define BTN_PREVIOUS_V						CVSTR("PJM_C_bPrevious")
#define BTN_UP_O							CVSTR("PJM_bUp")
#define BTN_UP_V							CVSTR("PJM_C_bUp")


// ----------------------------------------------------------------------------
// Items de menus :
// ----------------------------------------------------------------------------
// les noms doivent correspondre à ceux utilises dans les Dial4D correspondants
extern const XBOX::VString kPROJECT_ITEM_KIND;
extern const XBOX::VString kPROJECT_ITEM_FULL_PATH;

// Menu temporaire : // TO DO
extern const XBOX::VString kITEM_MNU_SELECT_PERFORCE;
extern const XBOX::VString kITEM_MNU_SELECT_SUBVERSION;

// ---------------------------------
// Menu contextuel Hierarchical List
// ---------------------------------
extern const XBOX::VString kITEM_MNU_CLOSE_SOLUTION;
extern const XBOX::VString kITEM_MNU_EDIT_PROJECT_SETTINGS;
extern const XBOX::VString kITEM_MNU_EDIT_BUILD_SETTINGS;
extern const XBOX::VString kITEM_MNU_EDIT_DEPLOYEMENT_SETTINGS;
extern const XBOX::VString kITEM_MNU_ADD_NEW_STANDARD_FOLDER;
extern const XBOX::VString kITEM_MNU_SET_AS_STARTUP_PROJECT;
extern const XBOX::VString kITEM_MNU_ADD_NEW_PROJECT;
extern const XBOX::VString kITEM_MNU_ADD_NEW_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_JAVASCRIPT_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_HTML_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_FORM_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_XML_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_CSS_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_PHP_FILE;
extern const XBOX::VString kITEM_MNU_ADD_NEW_TEXT_FILE;
extern const XBOX::VString kITEM_MNU_ADD_EXISTING_PROJECT;
extern const XBOX::VString kITEM_MNU_IMPORT_EXISTING_FOLDER;
extern const XBOX::VString kITEM_MNU_IMPORT_EXISTING_FILES;
extern const XBOX::VString kITEM_MNU_REFERENCE_EXTERNAL_FOLDER;
extern const XBOX::VString kITEM_MNU_REFERENCE_EXTERNAL_FILES;
extern const XBOX::VString kITEM_MNU_OPEN_IN_NEW_WINDOW;
extern const XBOX::VString kITEM_MNU_OPEN_IN_NEW_TAB;
extern const XBOX::VString kITEM_MNU_SAVE_AS_TEMPLATE;
extern const XBOX::VString kITEM_MNU_SET_AS_ACTIVE;
extern const XBOX::VString kITEM_MNU_TAG_AS_RPC;
extern const XBOX::VString kITEM_MNU_REVEAL_IN_FINDER;
extern const XBOX::VString kITEM_MNU_CUT;
extern const XBOX::VString kITEM_MNU_COPY;
extern const XBOX::VString kITEM_MNU_PASTE;
extern const XBOX::VString kITEM_MNU_DELETE;
extern const XBOX::VString kITEM_MNU_RENAME;

// ------------------------
// Menu contextual List Box
// ------------------------
extern const XBOX::VString kITEM_MNU_LB_OPEN_IN_NEW_WINDOW;
extern const XBOX::VString kITEM_MNU_LB_OPEN_IN_NEW_TAB;
extern const XBOX::VString kITEM_MNU_LB_REVEAL_IN_FINDER;
extern const XBOX::VString kITEM_MNU_LB_REVEAL_IN_SOLUTION_EXPLORER;
extern const XBOX::VString kITEM_MNU_LB_REVEAL_PARENT_IN_SOLUTION_EXPLORER;
extern const XBOX::VString kITEM_MNU_LB_EXCLUDE_FROM_SOLUTION;
extern const XBOX::VString kITEM_MNU_LB_CUT;
extern const XBOX::VString kITEM_MNU_LB_COPY;
extern const XBOX::VString kITEM_MNU_LB_DELETE;
extern const XBOX::VString kITEM_MNU_LB_RENAME;

// --------------------------
// Menu contextual Thumbnails
// --------------------------
extern const XBOX::VString kITEM_MNU_TH_OPEN_IN_NEW_WINDOW;
extern const XBOX::VString kITEM_MNU_TH_OPEN_IN_NEW_TAB;
extern const XBOX::VString kITEM_MNU_TH_REVEAL_IN_FINDER;
extern const XBOX::VString kITEM_MNU_TH_REVEAL_IN_SOLUTION_EXPLORER;
extern const XBOX::VString kITEM_MNU_TH_REVEAL_PARENT_IN_SOLUTION_EXPLORER;
extern const XBOX::VString kITEM_MNU_TH_EXCLUDE_FROM_SOLUTION;
extern const XBOX::VString kITEM_MNU_TH_CUT;
extern const XBOX::VString kITEM_MNU_TH_COPY;
extern const XBOX::VString kITEM_MNU_TH_DELETE;
extern const XBOX::VString kITEM_MNU_TH_RENAME;

// -----------------------------------
// Menu contextual Tool Bar principale
// -----------------------------------
extern const XBOX::VString kITEM_MNU_TB_OPEN_FILE;
extern const XBOX::VString kITEM_MNU_TB_IMPORT_FILES;

// -----------------------------------
// Tool Bar Solution Explorer
// -----------------------------------
extern const XBOX::VString kITEM_BTN_HOME;
extern const XBOX::VString kITEM_BTN_PARENT;
extern const XBOX::VString kITEM_BTN_PREVIOUS;
extern const XBOX::VString kITEM_BTN_NEXT;

// ----------------------------------------------------------------------------
// Fichiers :
// ----------------------------------------------------------------------------
extern const XBOX::VString kUSER_TEMPLATES_FOLDER;
extern const XBOX::VString kDEFAULT_PROJECT_TEMPLATE_FOLDER;
extern const XBOX::VString kUSER_CONFIGURATION_FOLDER;

extern const XBOX::VString	kTEMPLATE_PROJECT_NAME_MACRO;
extern const XBOX::VString	kTEMPLATE_SOLUTION_NAME_MACRO;

// ----------------------------------------------------------------------------
// Chaines speciales :
// ----------------------------------------------------------------------------
extern const char POSIX_FOLDER_SEPARATOR;

#define WIDGET_TEMPLATE			"WidgetTemplate"
#define DEFAULT_FILES_PATH		"DefaultFiles"
#define INTRO_HTML_BASIC		"Standard.html"
#define INTRO_HTML_FORM			"WakandaForm.html"
#define INTRO_JS				"WakandaJavaScript.js"
#define INTRO_MODULE_JS			"WakandaModule.js"
#define INTRO_MODULE_RPC		"WakandaRPCModule.js"
#define INTRO_MODULE_SERVICE	"WakandaServiceModule.js"
#define INTRO_MODEL_JS			"EntityModelEditorScriptTemplate.js"
#define INTRO_FORM_JS			"GUIDesignerScriptTemplate.js"
#define INTRO_XML_UTF8			"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
#define INTRO_JAVASCRIPT		"/**\n\r* @author admin\n\r*/"
#define INTRO_CSS				"body {\n\r}"
#define INTRO_PHP				"<?php\n\r?>"
//#define INTRO_CATALOG			"<?xml version=\"1.0\" encoding=\"UTF-8\"?><EntityModelCatalog></EntityModelCatalog>"
#define INTRO_CATALOG			"{\"dataClasses\":[], \"toJSON\":true}"
#define INTRO_REMOTECATALOG		"{\"dataClasses\":[], \"toJSON\":true}"
#define INTRO_REMOTECONFIG		"{\"remoteAccess\":{\"hostname\":\"\",\"user\":\"\",\"password\":\"\",\"SQL\":false},\"dataClasses\":[], \"toJSON\":true}"

#define INTRO_PERM				"<?xml version=\"1.0\" encoding=\"UTF-8\"?><permissions></permissions>"

// ----------------------------------------------------------------------------
// Properties :
// ----------------------------------------------------------------------------
extern const XBOX::VString kPROJECT_ITEM_FILE_SIZE;
extern const XBOX::VString kPROJECT_ITEM_FILE_TYPE;
extern const XBOX::VString kPROJECT_ITEM_LAST_MODIFICATION;
// not used extern const XBOX::VString kPROJECT_ITEM_CREATION_TIME;
// not used extern const XBOX::VString kPROJECT_ITEM_LAST_ACCESS;
// to_delete extern const XBOX::VString kPROJECT_ITEM_SCHEMA_ID;
// to_delete extern const XBOX::VString kPROJECT_ITEM_TABLE_POS;
// to_delete extern const XBOX::VString kPROJECT_ITEM_TABLE_SCHEMA;
// to_delete extern const XBOX::VString kPROJECT_ITEM_TABLE_ATTRIBUTES;
// to_delete extern const XBOX::VString kPROJECT_ITEM_TABLE_COMMENT;
// to_delete extern const XBOX::VString kPROJECT_ITEM_FIELD_POS;
// to_delete extern const XBOX::VString kPROJECT_ITEM_FIELD_TYPE;
// to_delete extern const XBOX::VString kPROJECT_ITEM_FIELD_SIZE_LIMIT;
// to_delete extern const XBOX::VString kPROJECT_ITEM_FIELD_ATTRIBUTES;
// to_delete extern const XBOX::VString kPROJECT_ITEM_FIELD_COMMENT;
// to_delete extern const XBOX::VString kPROJECT_ITEM_STAMP;
// to_delete extern const XBOX::VString kPROJECT_ITEM_UUID;




// ----------------------------------------------------------------------------
// VError
// ----------------------------------------------------------------------------
const OsType kSOLUTION_MANAGER_SIGNATURE = 'SOMA';
const XBOX::VString kSOLUTION_MANAGER_PREFIX_RESNAME = "ERR_SOMA_";

const XBOX::VString kSOMA_FOLDER_FULL_PATH = "folder_full_path";
const XBOX::VString kSOMA_FILE_FULL_PATH = "file_full_path";
const XBOX::VString kSOMA_DESTINATION_FOLDER_NAME = "destination_folder_name";
const XBOX::VString kSOMA_SOURCE_FOLDER_NAME = "source_folder_name";
const XBOX::VString kSOMA_PROJECT_NAME = "project_name";

const XBOX::VError VE_SOMA_EXTERNAL_REFERENCE_NOT_FOUND = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1001);
const XBOX::VError VE_SOMA_EXTERNAL_REFERENCE_COULD_NOT_ADDED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1002);
const XBOX::VError VE_SOMA_PROJECT_FILE_COULD_NOT_OPENED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1003);
const XBOX::VError VE_SOMA_PROJECT_FILE_NOT_FOUND = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1004);
const XBOX::VError VE_SOMA_SOLUTION_FILE_COULD_NOT_OPENED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1005);
const XBOX::VError VE_SOMA_FILE_ALREADY_EXISTS = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1006);
const XBOX::VError VE_SOMA_FILE_COULD_NOT_BE_CREATED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1007);
const XBOX::VError VE_SOMA_DEST_FOLDER_IS_SUBFOLDER_OF_SRC_FOLDER = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1008);
const XBOX::VError VE_SOMA_SOLUTION_LINK_FILE_COULD_NOT_OPENED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1009);
const XBOX::VError VE_SOMA_INVALID_EXTERNAL_REFERENCE = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1010);
const XBOX::VError VE_SOMA_INVALID_POSIX_PATH = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1011);
const XBOX::VError VE_SOMA_INCLUSIVE_EXTERNAL_REFERENCE_NOT_AUTHORIZED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1012);
const XBOX::VError VE_SOMA_FILE_NOT_FOUND = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1013);
const XBOX::VError VE_SOMA_SETTINGS_FILE_NOT_FOUND = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1014);
const XBOX::VError VE_SOMA_PROJECT_ALREADY_EXISTS = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1015);
const XBOX::VError VE_SOMA_SOLUTION_FILE_NOT_FOUND = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1016);
const XBOX::VError VE_SOMA_CANNOT_RENAME_SOLUTION = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1017);
const XBOX::VError VE_SOMA_CANNOT_RENAME_PROJECT = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1018);
const XBOX::VError VE_SOMA_UNKNOWN_PROJECT = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1019);
const XBOX::VError VE_SOMA_CANNOT_REMOVE_PROJECT = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1020);
const XBOX::VError VE_SOMA_FAILED_TO_LOAD_SOLUTION_PERMISSIONS = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1021);
const XBOX::VError VE_SOMA_DEBUGGER_GROUP_NOT_DEFINED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1022);
const XBOX::VError VE_SOMA_DEBUGGER_ACTION_NOT_DEFINED = MAKE_VERROR(kSOLUTION_MANAGER_SIGNATURE, 1023);


const XBOX::VString kSOMA_NEW_FOLDER = "new_folder";
const XBOX::VString kSOMA_NEW_FILE = "new_file";
const XBOX::VString kSOMA_FOLDER_IS_ALREADY_REFERENCED = "folder_is_already_referenced";
const XBOX::VString kSOMA_SELECTION_TOO_LARGE = "selection_is_too_large";
const XBOX::VString kSOMA_REVEAL_IN_FINDER = "reveal_in_finder";
const XBOX::VString kSOMA_ARE_YOU_SURE_TO_PROCESS_ALL_SELECTED_FILES = "are_you_sure_to_process_all_selected_files";
const XBOX::VString kSOMA_PROJECT_ALREADY_EXISTS = "project_already_exists";
const XBOX::VString kSOMA_SOLUTION_FILE_COULD_NOT_BE_SAVED = "solution_file_could_not_be_saved";
const XBOX::VString kSOMA_PROJECT_COULD_NOT_BE_CREATED = "project_could_not_be_created";
const XBOX::VString kSOMA_DEFAULT_TEMPLATES_PROJECT_FOLDER_NOT_FOUND = "default_templates_project_folder_not_found";
const XBOX::VString kSOMA_COULD_NOT_OPEN_THE_SYMBOL_DATABASE = "could_not_open_the_symbol_database";
const XBOX::VString kSOMA_PROJECT_FILE_COULD_NOT_BE_SAVED = "project_file_could_not_be_saved";
const XBOX::VString kSOMA_EXCLUDE_PROJECT_WARNING = "exclude_project_warning";
const XBOX::VString kSOMA_TEMPLATE_ALREADY_EXISTS = "template_already_exists";
const XBOX::VString kSOMA_TEMPLATE_FOLDER_MISSING = "template_folder_missing";
const XBOX::VString kSOMA_DESTINATION_FOLDER_ALREADY_EXISTS_NO_IMPORT = "destination_folder_already_exists_no_abort";


extern const XBOX::ScrapKind kSOLUTION_UUID_SCRAP_KIND;
extern const XBOX::ScrapKind kCUT_SESSION_UUID_SCRAP_KIND;


// ----------------------------------------------------------------------------
// defines et typedef
// ----------------------------------------------------------------------------

typedef enum {
		e_NONE,				
		e_CUT,				
		e_COPY				
		} e_Copy_Flag;

typedef enum {
		e_NO_SAVE,				
		e_CANCEL,				
		e_SAVE,
		e_DO_NOTHING
		} e_Save_Action;


typedef enum
{
	ePA_RenameItem = 0,
	ePA_RemoveItem,
	ePA_ReferenceExternalFolder,
	ePA_ReferenceExternalFile,
	ePA_TagItem,
	ePA_UntagItem,
	ePA_SynchronizeWithFileSystem,
	ePA_BeforeClosing

} EProjectAction;


typedef enum
{
	eSA_CreateProject = 0,
	eSA_AppendProject,
	eSA_RemoveProject,
	eSA_RenameItem,
	eSA_RemoveItem,
	eSA_ChangeTag,
	eSA_RenameProject,
	eSA_BeforeClosing,
	eSA_SynchronizeWithFileSystem

} ESolutionAction;

#endif
