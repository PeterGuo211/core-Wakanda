

file(GLOB Sources ${WakandaServerRoot}/Sources/*.cpp)
list(REMOVE_ITEM Sources 
	${WakandaServerRoot}/Sources/testMySQLConnector.cpp
	${WakandaServerRoot}/Sources/testForeignKeys.cpp
	${WakandaServerRoot}/Sources/testHighLevelAPI.cpp
	${WakandaServerRoot}/Sources/testODBCConnector.cpp
	${WakandaServerRoot}/Sources/testSQLModel.cpp
	${WakandaServerRoot}/Sources/testLDAPComponent.cpp
)

file(GLOB SourcesCommon ${WakandaRoot}/Common/Sources/*.cpp)

list(APPEND Sources ${SourcesCommon})



set(versnum_build_file "${CMAKE_CURRENT_BINARY_DIR}${CMAKE_FILES_DIRECTORY}/wakanda-vers-num.h.wdeps")
# always remove this file to fore re-generation of the program version
# each time the cmake is generated
file(REMOVE ${versnum_build_file})

add_custom_command(
	OUTPUT   ${versnum_build_file}
	DEPENDS  ${Depot}/Tools/Versionning/Wakanda_versionning_linux.perl
	COMMAND
		perl ${Depot}/Tools/Versionning/Wakanda_versionning_linux.perl ${WakandaRoot}/Server/Projet/Visual/WakandaVersNum.h
	COMMAND
		${CMAKE_COMMAND} -E touch ${versnum_build_file})

list(APPEND Sources ${versnum_build_file})



add_executable(Wakanda EXCLUDE_FROM_ALL ${Sources})

add_executable(WakandaEnterprise ${Sources})

if (UNIX AND NOT MINGW AND NOT MSYS)
	add_definitions(-DVERSION_LINUX=1)
endif()

add_definitions(-DRIA_SERVER)


include_directories(
	${ComponentsRoot}
	${DB4DIncludeDir}
	${IcuIncludeDir}
	${JsCoreIncludeDir}
	${WakandaRoot}/Common/Sources
	${WakandaServerRoot}/Sources
	${XBoxRoot})






target_link_libraries(Wakanda
	DB4D Graphics JavaScript JsDebugger Kernel KernelIPC ServerNet Xml)

target_link_libraries(WakandaEnterprise
	DB4D Graphics JavaScript JsDebugger Kernel KernelIPC ServerNet Xml)


add_dependencies(Wakanda
	DB4D HTTPServer LanguageSyntax SecurityManager UsersAndGroups Zip)

add_dependencies(WakandaEnterprise
	DB4D HTTPServer LanguageSyntax SecurityManager UsersAndGroups Zip
	RemoteEntity ODBCConnector
	MSSQLConnector MySQLConnector SQLEntity SQLModel SQLUtilities)




set_target_properties(Wakanda PROPERTIES COMPILE_FLAGS
	"-DIS_WAKANDA_COMMUNITY_SERVER=1")

set_target_properties(WakandaEnterprise PROPERTIES COMPILE_FLAGS
	"-DIS_WAKANDA_ENTERPRISE_SERVER=1")





add_custom_command(TARGET Wakanda POST_BUILD
  COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
  COMMAND mkdir -p ${AppRoot}/Wakanda\ Server
  COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh ${AppRoot}/Wakanda\ Server E
  COMMAND rm -Rf ${AppRoot}/Wakanda\ Server/walib/minifiedCoresWAF)

add_custom_command(TARGET WakandaEnterprise POST_BUILD
  COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
  COMMAND mkdir -p ${AppRoot}/Wakanda\ Enterprise\ Server
  COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh ${AppRoot}/Wakanda\ Enterprise\ Server E
  COMMAND rm -Rf ${AppRoot}/Wakanda\ Server/walib/minifiedCoresWAF)


add_custom_target(WakandaResources 
  DEPENDS Wakanda
  COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
  COMMAND mkdir -p ${AppRoot}/Wakanda\ Server
  COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh ${AppRoot}/Wakanda\ Server E
  COMMAND rm -Rf ${AppRoot}/Wakanda\ Server/walib/minifiedCoresWAF)

add_custom_target(WakandaEnterpriseResources
  DEPENDS WakandaEnterprise
  COMMAND perl ${Depot}/Tools/Versionning/versionning_waf.pl ${WakandaRoot}/walib/WAF/Loader.js
  COMMAND mkdir -p ${AppRoot}/Wakanda\ Enterprise\ Server
  COMMAND ${CopyFilesRoot}/CopyFiles_Linux.sh ${AppRoot}/Wakanda\ Enterprise\ Server E
  COMMAND rm -Rf ${AppRoot}/Wakanda\ Server/walib/minifiedCoresWAF)


