#
# Wakanda Server
# http://www.wakanda.org
#
# Note on compiling on 32 bits on Ubuntu 64:
# The following packages are required :
#   - libc6-dev-i386
#   - g++-multilib (or g++-4.8-multilib)
cmake_minimum_required(VERSION 2.8.6)

# Compiler init should be done before any "project" instruction
set(CMAKE_C_COMPILER clang)
set(CMAKE_CXX_COMPILER clang++)

project(Wakanda)

#
# Allow export (Compilation Database Format Specification)
#
set(CMAKE_EXPORT_COMPILE_COMMANDS true)



#
# Monolitic mode
#
if (NOT DEFINED MONOLITIC OR ${MONOLITIC} EQUAL 0)
	set(MONOLITIC false)
else()
	message(STATUS "building in monolitic mode")
	set(MONOLITIC true)
endif()


#
# Branch configuration
#
if(NOT DEFINED BRANCH)
	set(BRANCH "Main")
endif()
string(TOUPPER ${BRANCH} BRANCH)
if(BRANCH STREQUAL "MAIN")
	set(BRANCH_LABEL "Main")
	set(BRANCH_TAG   "Main")
	set(BRANCH_u     "Main")
	set(BRANCH_l     "main")
else()
	set(BRANCH_LABEL ${BRANCH})
	set(BRANCH_TAG   "${BRANCH}")
	set(BRANCH_u     ${BRANCH})
	set(BRANCH_l     ${BRANCH})
endif()


set(CMAKE_CONFIGURATION_TYPES Debug Beta Release)

if (NOT DEFINED CMAKE_BUILD_TYPE)
	set(CMAKE_BUILD_TYPE Debug)
endif()


if(NOT DEFINED ARCH)
	if (${CMAKE_SYSTEM_PROCESSOR} STREQUAL "x86")
		set(ARCH "32")
	else()
		set(ARCH "64")
	endif()
endif()

if(ARCH STREQUAL     "64")
	set(ARCH_FLAGS   "-m64")
	set(ARCH_LABEL   "x64")
	set(ARCH_TAG     "64")
elseif(ARCH STREQUAL "32")
	set(ARCH_FLAGS   "-m32")
	set(ARCH_LABEL   "386")
	set(ARCH_TAG     "32")
else()
  message(SEND_ERROR "Unknown arch '${ARCH}'")
endif()


#
# CMake stuff / tools
#
include(CheckCXXCompilerFlag)
include(CheckCCompilerFlag)
include(CheckIncludeFiles)
include(CheckLibraryExists) 
include(CheckFunctionExists)

include(utils.cmake)
include(completion.cmake)


message(STATUS "Build configuration for ${PROJECT_NAME}: ${BRANCH_LABEL} ${CMAKE_BUILD_TYPE} ${ARCH_LABEL}")





# detect the clang compiler
if ("${CMAKE_CXX_COMPILER_ID}" STREQUAL "Clang")
	set(CLANG 1)
	add_definitions("-DCOMPIL_CLANG")
endif()

# detect linux
if(${CMAKE_SYSTEM_NAME} MATCHES "Linux")
	set(LINUX 1)
	add_definitions("-DVERSION_LINUX=1")
endif()



macro(compile_flag  flag varname)
	check_cxx_compiler_flag("${flag}" "WAK_HAS_COMPILER_CXX_FLAG_${varname}")
	if ("${WAK_HAS_COMPILER_CXX_FLAG_${varname}}")
		foreach (arg ${ARGN})
			set("CMAKE_CXX_FLAGS_${arg}" "${CMAKE_CXX_FLAGS_${arg}} ${flag}")
		endforeach()
	endif()
	check_c_compiler_flag("${flag}" "WAK_HAS_COMPILER_C_FLAG_${varname}")
	if ("${WAK_HAS_COMPILER_C_FLAG_${varname}}")
		foreach (arg ${ARGN})
			set("CMAKE_C_FLAGS_${arg}" "${CMAKE_C_FLAGS_${arg}} ${flag}")
		endforeach()
	endif()
endmacro()

macro(link_flag  flag varname)
	set(CMAKE_REQUIRED_FLAGS "-Wl,${flag}")
	check_c_compiler_flag("" "WAK_HAS_COMPILER_C_FLAG_${varname}")
	if ("${WAK_HAS_COMPILER_C_FLAG_${varname}}")
		foreach (arg ${ARGN})
			set("CMAKE_${arg}_LINKER_FLAGS" "${CMAKE_${arg}_LINKER_FLAGS} -Wl,${flag}")
		endforeach()
	endif()
endmacro()

macro(check_function funcname varname includename def)
	set(__copy_cmake_required_includes    "${CMAKE_REQUIRED_INCLUDES}")
	set(__copy_cmake_required_definitions "${CMAKE_REQUIRED_DEFINITIONS}")
	if (NOT "${includename}" STREQUAL "")
		list(APPEND CMAKE_REQUIRED_INCLUDES  "${includename}")
	endif()
	if (NOT "${def}" STREQUAL "")
		list(APPEND CMAKE_REQUIRED_DEFINITIONS "${def}")
	endif()

	check_function_exists(${funcname} ${varname})

	set(CMAKE_REQUIRED_INCLUDES  "${__copy_cmake_required_includes}")
	set(CMAKE_REQUIRED_DEFINITIONS "${__copy_cmake_required_definitions}")
endmacro()





# reset compiler flags
set(CMAKE_CXX_FLAGS_DEBUG    "${ARCH_FLAGS}")
set(CMAKE_CXX_FLAGS_BETA     "${ARCH_FLAGS}")
set(CMAKE_CXX_FLAGS_RELEASE  "${ARCH_FLAGS} -DNDEBUG")

set(CMAKE_C_FLAGS_DEBUG      "${ARCH_FLAGS}")
set(CMAKE_C_FLAGS_BETA       "${ARCH_FLAGS}")
set(CMAKE_C_FLAGS_RELEASE    "${ARCH_FLAGS} -DNDEBUG")




if (NOT MSVC)
	# C++ Standard mode
	#compile_flag("-std=c++11" CPP_STD_11  DEBUG BETA RELEASE)

	# no optimization
	compile_flag("-O0" OPTIMIZATION_LEVEL_0  DEBUG)
	# "standard" optimisation level for GCC compatible compilers
	compile_flag("-O3" OPTIMIZATION_LEVEL_3  BETA RELEASE)
	# currently only clang support -O4. gcc will prefer -lto
	compile_flag("-O4" OPTIMIZATION_LEVEL_4  BETA RELEASE)

	# Link Time Optimization, for GCC compatible (equivalent -O4 for clang)
	compile_flag("-flto" LTO  BETA RELEASE)

	# produce debugging informations
	compile_flag("-g" DEBUG_SYMBOLS  DEBUG BETA)
	# produces debugging informations for gdb
	compile_flag("-ggdb"  DEBUG_SYMBOLS_FOR_GDB  DEBUG BETA)
	# produces all debugging informations (even template source code) for gdb
	compile_flag("-ggdb3" DEBUG_SYMBOLS_FOR_GDB_LEVEL_3  DEBUG BETA)
	# produces all debugging informations (even template source code) for gdb (apple)
	compile_flag("-gfull" DEBUG_SYMBOLS_FOR_GDB_FULL  DEBUG)

	# Enable AddressSanitizer, a fast memory error detector
	#compile_flag("-fsanitize=address"  SANITIZE_ADDRESS  DEBUG)
	# Enable ThreadSanitizer, a fast data race detector
	#compile_flag("-fsanitize=thread"  SANITIZE_THREAD  DEBUG)


	if (NOT CLANG)
		# clang does not support yet these options
		# export all debug symbols (to have proper backtraces)
		compile_flag("-rdynamic" R_DYNAMIC  DEBUG BETA RELEASE)
		# export all debug symbols (to have proper backtraces) - same as rdynamic
		compile_flag("-export-dynamic" EXPORT_DYNAMIC  DEBUG BETA RELEASE)
	endif()

	# no inlining in debug
	compile_flag("-fno-inline" NO_INLINE  DEBUG)
	# keep symbols of inline functions
	compile_flag("-fkeep-inline-functions" KEEP_INLINE_FUNCTIONS  DEBUG)

	# optimisations with SSE and SSE2
	compile_flag("-msse"  SSE   BETA RELEASE)
	compile_flag("-msse2" SSE2  BETA RELEASE)
	compile_flag("-mfpmath=sse" FPMATH_SSE  BETA RELEASE)

	# symbols visibility
	# This flag is mandatory to avoid silent symbol collisions
	compile_flag("-fvisibility=hidden" VISIBILITY_HIDDEN  DEBUG BETA RELEASE)

	# dynamic lib
	#link_flag("-dynamiclib" DYNAMIC_LIB  EXE MODULE SHARED)

	# warnings will mainly be set later, only for internal projects

	# do not warn about unknown pragmas
	compile_flag("-Wno-unknown-pragmas" W_NO_UNKNOWN_PRAGMAS  DEBUG BETA RELEASE)
	compile_flag("-Wno-pragmas"  W_NO_PRAGMAS_ERROR   DEBUG BETA RELEASE)

	# do not warn for future c++11 extensions
	compile_flag("-Wno-c++11-extensions" W_NO_CPP11_EXTENSIONS  DEBUG BETA RELEASE)

endif()



if (MINGW)
	# detect variables not initialized
	compile_flag("-mthreads"  MINGW_THREADS_SUPPORT  DEBUG BETA RELEASE)
endif()


# library / standard function detection
# getenv
check_function("getenv" HAVE_GETENV "stdlib.h" "")
check_function("secure_getenv" HAVE_SECURE_GETENV "stdlib.h" "-D_GNU_SOURCE")




# keep a copy of all minimal flags for clang/gcc
set(WAK_MINIMAL_CXX_FLAGS_DEBUG    "${CMAKE_CXX_FLAGS_DEBUG}")
set(WAK_MINIMAL_CXX_FLAGS_BETA     "${CMAKE_CXX_FLAGS_BETA}")
set(WAK_MINIMAL_CXX_FLAGS_RELEASE  "${CMAKE_CXX_FLAGS_RELEASE}")
set(WAK_MINIMAL_C_FLAGS_DEBUG      "${CMAKE_C_FLAGS_DEBUG}")
set(WAK_MINIMAL_C_FLAGS_BETA       "${CMAKE_C_FLAGS_BETA}")
set(WAK_MINIMAL_C_FLAGS_RELEASE    "${CMAKE_C_FLAGS_RELEASE}")


# disable all standard warnings (for now) for all external libraries
compile_flag("-w" NO_WARNING  DEBUG BETA RELEASE)




if(ASSERT_SHOULD_BREAK STREQUAL No)
	# prevent the process from beeing killed on assert if not ran inside debugger
	add_definitions(-DASSERT_DONT_BREAK)
	message(STATUS "Asserts won't break !")
else()
	message(STATUS "Asserts will break !")
endif()


#Default lib name is libHTTPServer.so for all configurations, but KernelIPC doesn't like it.
#To Please KernelIPC, components have to adopt the following convention on lib name :
# - Debug   : HTTPServerDebug.so
# - Beta    : HTTPServerBeta.so
# - Release : HTTPServer.so
if(CMAKE_BUILD_TYPE STREQUAL Debug)
	set(CMAKE_SHARED_LIBRARY_PREFIX "")
	set(CMAKE_SHARED_LIBRARY_SUFFIX "Debug.so")

elseif(CMAKE_BUILD_TYPE STREQUAL Beta)
	set(CMAKE_SHARED_LIBRARY_PREFIX "")
	set(CMAKE_SHARED_LIBRARY_SUFFIX "Beta.so")

elseif(CMAKE_BUILD_TYPE STREQUAL Release)
	set(CMAKE_SHARED_LIBRARY_PREFIX "")
	set(CMAKE_SHARED_LIBRARY_SUFFIX ".so")
else()
	message(SEND_ERROR "Unknown configuration '${CMAKE_BUILD_TYPE}'")
endif()



#Our objective is to craft inside each library (and binary) a 'search lib path' relative
#to our binary (same dir actualy). It frees us from any ld or env conf on install host.
SET(CMAKE_SKIP_BUILD_RPATH TRUE)
SET(CMAKE_BUILD_WITH_INSTALL_RPATH TRUE)
SET(CMAKE_INSTALL_RPATH "\$ORIGIN/Libs:::::::::::::::::::::::::::::::::::::::::"
"::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
"::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::"
"::::::::::::::::::::::::::::::::::::::::::::::")



set(Depot	${PROJECT_SOURCE_DIR}/../../../..)

#Special target that remove dyn. libs and binaries, in order to force re-link
#(Don't remove anything in Apps directory)
add_custom_target(unlink
	COMMAND find "${Depot}" -name "*.so" "!" -path "*/Apps/*" -type f -exec rm "{}" "\;"
	COMMAND find "${Depot}" -name "Wakanda" "!" -path "*/Apps/*" -type f -exec rm "{}" "\;")








# Usefull Directories
set(4DRoot			${Depot}/4eDimension/${BRANCH_l}/4D)
set(WakandaRoot		${Depot}/Wakanda/${BRANCH_l})
set(CopyFilesRoot	${Depot}/Tools/BuildLinux/scripts_compil_${BRANCH_l}/Scripts)
set(AppRoot			${WakandaRoot}/Apps/Linux/${CMAKE_BUILD_TYPE}${ARCH_TAG})
set(ComponentsRoot	${Depot}/Components/${BRANCH_u})
set(XBoxRoot		${Depot}/XToolbox/${BRANCH_u})




# Tell to cmake how to find our custom Find<Package>
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} ${CMAKE_SOURCE_DIR})

#
# EXTERNAL LIBS (configure/autotools required)
#

# cap-ng
include("ext-cap-ng.cmake")

# openssl
include("ext-openssl.cmake")

# termcap
include("ext-termcap.cmake")



#
# EXTERNAL LIBS with CMake (not branched)
#

#jmo - Don't forget to update bsd/stdlib.h for default symbol visibility
set(BsdRoot		${Depot}/libbsd/4.2 CACHE INTERNAL "Path to BSD src.")
set(BsdProj		${BsdRoot}/CMake)
set(BsdBuild	${BsdProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${BsdProj} ${BsdBuild})


#include("ext-uuid.cmake")
#jmo - Don't forget to update zconf.h for default symbol visibility
set(UuidRoot	${Depot}/libuuid/2.22 CACHE INTERNAL "Path to UUID src.")
set(UuidProj	${UuidRoot}/CMake)
set(UuidBuild	${UuidProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${UuidProj} ${UuidBuild})


set(IcuRoot		${Depot}/icu/4.8 CACHE INTERNAL "Path to ICU distrib.")
set(IcuProj		${IcuRoot}/projets/CMake)
set(IcuBuild	${IcuProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_definitions(-Dxbox_icu=icu_48)
add_subdirectory(${IcuProj} ${IcuBuild})


set(XercesRoot	${Depot}/xerces/3.0.1 CACHE INTERNAL "Path to xerces src.")
set(XercesProj	${XercesRoot}/xerces/projects/CMake)
set(XercesBuild	${XercesProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_definitions(-DXERCES_3_0_1)
add_subdirectory(${XercesProj} ${XercesBuild})


#ael - Don't forget to patch sqltypes.h for default symbol visibility
set(UnixODBCRoot	${Depot}/unixODBC/2.3.1 CACHE INTERNAL "Path to UnixODBC src.")
set(UnixODBCProj	${UnixODBCRoot}/Projects/CMake)
set(UnixODBCBuild	${UnixODBCProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${UnixODBCProj} ${UnixODBCBuild})


#jmo - Don't forget to update zconf.h for default symbol visibility
set(ZLibRoot	${Depot}/zlib/1.2.5 CACHE INTERNAL "Path to zlib src.")
set(ZLibProj	${ZLibRoot}/projects/CMake)
set(ZLibBuild	${ZLibProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ZLibProj} ${ZLibBuild})


# curl
include("ext-curl.cmake")


set(LibZipRoot	${Depot}/libzip/0.10 CACHE INTERNAL "Path to libzip src.")
set(LibZipProj	${LibZipRoot}/Projects/CMake)
set(LibZipBuild	${LibZipProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${LibZipProj} ${LibZipBuild})


set(WebKitRoot	${Depot}/webkit/534.53 CACHE INTERNAL "Path to WebKit src.")
set(WebCoreRoot	${WebKitRoot}/WebCore CACHE INTERNAL "Path to JavascriptCore src.")

set(JsCoreRoot	${WebKitRoot}/JavaScriptCore CACHE INTERNAL "Path to JavascriptCore src.")
set(JsCoreProj	${JsCoreRoot}/CMake)
set(JsCoreBuild	${JsCoreProj}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory("${JsCoreProj}" "${JsCoreBuild}")












#
# INTERNAL LIBS
#

# restore default compiler flags
set(CMAKE_CXX_FLAGS_DEBUG    "${WAK_MINIMAL_CXX_FLAGS_DEBUG}")
set(CMAKE_CXX_FLAGS_BETA     "${WAK_MINIMAL_CXX_FLAGS_BETA}")
set(CMAKE_CXX_FLAGS_RELEASE  "${WAK_MINIMAL_CXX_FLAGS_RELEASE}")
set(CMAKE_C_FLAGS_DEBUG      "${WAK_MINIMAL_C_FLAGS_DEBUG}")
set(CMAKE_C_FLAGS_BETA       "${WAK_MINIMAL_C_FLAGS_BETA}")
set(CMAKE_C_FLAGS_RELEASE    "${WAK_MINIMAL_C_FLAGS_RELEASE}")

# enable more flags (mainly for warnings detection)
if (NOT MSVC)

	# enable static analyzer for clang
	compile_flag("--analyze" ANALYZER  DEBUG BETA RELEASE)

	# enable al lwarnings
	compile_flag("-W"      W        DEBUG BETA RELEASE)
	compile_flag("-Wall"   W_ALL    DEBUG BETA RELEASE)
	compile_flag("-Wextra" W_EXTRA  DEBUG BETA RELEASE)
	# warn about missing return
	compile_flag("-Wreturn-type" W_RETURN_TYPE  DEBUG BETA RELEASE)

	# do not warn for invalid comparison of integers of different signs 
	compile_flag("-Wno-sign-compare"  W_NO_SIGN_COMPARE  DEBUG BETA RELEASE)
	# do not warn for unused parameters
	compile_flag("-Wno-unused-parameter" W_NO_UNUSED_PARAMETER  DEBUG BETA RELEASE)
	# do not warn about fields initialized after another fields
	compile_flag("-Wno-reorder"  W_NO_REORDER DEBUG BETA RELEASE)
	# do not warn about some deprecated includes
	compile_flag("-Wno-deprecated" W_NO_DEPRECATED  DEBUG BETA RELEASE)
endif()

# platform.h
add_definitions("-DHAVE_CMAKE_PLATFORM_H")
# Thread safety - prefer reentrant versions
add_definitions("-D_REENTRANT")

if (ARCH STREQUAL "64")
	# enable large files
	add_definitions("-D_FILE_OFFSET_BITS=64")
endif()



set(KernelRoot		${XBoxRoot}/Kernel CACHE INTERNAL "Path to Kernel src.")
set(KernelProj		${KernelRoot}/Projects/CMake)
set(KernelBuild		${KernelProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${KernelProj} ${KernelBuild})


set(KernelIPCRoot	${XBoxRoot}/KernelIPC CACHE INTERNAL "Path to KernelIPC src.")
set(KernelIPCProj	${KernelIPCRoot}/Projects/CMake)
set(KernelIPCBuild	${KernelIPCProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${KernelIPCProj} ${KernelIPCBuild})


set(ServerNetRoot	${XBoxRoot}/ServerNet CACHE INTERNAL "Path to ServerNet src.")
set(ServerNetProj	${ServerNetRoot}/Projects/CMake)
set(ServerNetBuild	${ServerNetProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ServerNetProj} ${ServerNetBuild})


set(XMLRoot			${XBoxRoot}/XML CACHE INTERNAL "Path to XML src.")
set(XMLProj			${XMLRoot}/Projects/CMake)
set(XMLBuild		${XMLProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${XMLProj} ${XMLBuild})


set(JavaScriptRoot	${XBoxRoot}/JavaScript CACHE INTERNAL "Path to JavaScript src.")
set(JavaScriptProj	${JavaScriptRoot}/Projects/CMake)
set(JavaScriptBuild ${JavaScriptProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${JavaScriptProj} ${JavaScriptBuild})


set(JsDebuggerRoot	${XBoxRoot}/JSDebugger CACHE INTERNAL "Path to JsDebugger src.")
set(JsDebuggerProj	${JsDebuggerRoot}/Projects/CMake)
set(JsDebuggerBuild ${JsDebuggerProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${JsDebuggerProj} ${JsDebuggerBuild})


set(GraphicsRoot	${XBoxRoot}/Graphics CACHE INTERNAL "Path to Graphics src.")
set(GraphicsProj	${GraphicsRoot}/Projects/CMake)
set(GraphicsBuild	${GraphicsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${GraphicsProj} ${GraphicsBuild})

set(TextCoreRoot	${XBoxRoot}/TextCore CACHE INTERNAL "Path to TextCore src.")
set(TextCoreProj	${TextCoreRoot}/Projects/CMake)
set(TextCoreBuild	${TextCoreProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${TextCoreProj} ${TextCoreBuild})

set(SQLUtilitiesRoot	${XBoxRoot}/SQL CACHE INTERNAL "Path to SQLUtilities src.")
set(SQLUtilitiesProj	${SQLUtilitiesRoot}/Projects/CMake)
set(SQLUtilitiesBuild	${SQLUtilitiesProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SQLUtilitiesProj} ${SQLUtilitiesBuild})


set(SQLModelRoot	${XBoxRoot}/SQLModel CACHE INTERNAL "Path to SQLModel src.")
set(SQLModelProj	${SQLModelRoot}/Projects/CMake)
set(SQLModelBuild	${SQLModelProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SQLModelProj} ${SQLModelBuild})






################################################################################
# Components
################################################################################

set(NativeRoot		${AppRoot}/Native\ Components)
set(ContentDir		Contents/Linux)


set(UsersAndGroupsRoot	${ComponentsRoot}/UsersAndGroups CACHE INTERNAL "Path to UsersAndGroups src.")
set(UsersAndGroupsProj	${UsersAndGroupsRoot}/projects/CMake)
set(UsersAndGroupsBuild ${UsersAndGroupsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${UsersAndGroupsProj} ${UsersAndGroupsBuild})


set(SecurityManagerRoot		${ComponentsRoot}/Security\ Manager CACHE INTERNAL "Path to SecurityManager src.")
set(SecurityManagerProj		${SecurityManagerRoot}/Projects/CMake)
set(SecurityManagerBuild	${SecurityManagerProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SecurityManagerProj} ${SecurityManagerBuild})


set(HTTPServerRoot	${ComponentsRoot}/HTTPServer CACHE INTERNAL "Path to HttpServer src.")
set(HTTPServerProj	${HTTPServerRoot}/Projects/CMake)
set(HTTPServerBuild ${HTTPServerProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${HTTPServerProj} ${HTTPServerBuild})


set(RemoteEntityRoot	${ComponentsRoot}/RemoteEntity CACHE INTERNAL "Path to RemoteEntity src.")
set(RemoteEntityProj	${RemoteEntityRoot}/Projects/CMake)
set(RemoteEntityBuild	${RemoteEntityProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${RemoteEntityProj} ${RemoteEntityBuild})

set(SQLEntityRoot	${ComponentsRoot}/SQLEntity CACHE INTERNAL "Path to SQLEntity src.")
set(SQLEntityProj	${SQLEntityRoot}/Projects/CMake)
set(SQLEntityBuild	${SQLEntityProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${SQLEntityProj} ${SQLEntityBuild})

set(DB4DRoot	${ComponentsRoot}/DB4D CACHE INTERNAL "Path to DB4D src.")
set(DB4DProj	${DB4DRoot}/projects/CMake)
set(DB4DBuild	${DB4DProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${DB4DProj} ${DB4DBuild})


set(LanguageSyntaxRoot	${ComponentsRoot}/Language\ Syntax CACHE INTERNAL "Path to LanguageSyntax src.")
set(LanguageSyntaxProj	${LanguageSyntaxRoot}/Projects/CMake)
set(LanguageSyntaxBuild ${LanguageSyntaxProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${LanguageSyntaxProj} ${LanguageSyntaxBuild})


set(MySQLConnectorRoot  ${ComponentsRoot}/MySQLConnector CACHE INTERNAL "Path to MySQLConnector src.")
set(MySQLConnectorProj  ${MySQLConnectorRoot}/Projects/CMake)
set(MySQLConnectorBuild ${MySQLConnectorProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${MySQLConnectorProj} ${MySQLConnectorBuild})

set(MSSQLConnectorRoot  ${ComponentsRoot}/MSSQLConnector CACHE INTERNAL "Path to MsSQLConnector src.")
set(MSSQLConnectorProj  ${MSSQLConnectorRoot}/Projects/CMake)
set(MSSQLConnectorBuild ${MSSQLConnectorProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${MSSQLConnectorProj} ${MSSQLConnectorBuild})

set(ODBCConnectorRoot  ${ComponentsRoot}/ODBCConnector CACHE INTERNAL "Path to ODBC Connector src.")
set(ODBCConnectorProj  ${ODBCConnectorRoot}/Projects/CMake)
set(ODBCConnectorBuild ${ODBCConnectorProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ODBCConnectorProj} ${ODBCConnectorBuild})


set(ZipRoot		${ComponentsRoot}/Zip CACHE INTERNAL "Path to Zip src.")
set(ZipProj		${ZipRoot}/Projects/CMake)
set(ZipBuild	${ZipProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

add_subdirectory(${ZipProj} ${ZipBuild})






################################################################################
# Tests
################################################################################

# set(VTaskTestsRoot	${XBoxRoot}/Tests/Tasks CACHE INTERNAL "Path to VTaskTests")
# set(VTaskTestsProj	${VTaskTestsRoot}/Projects/CMake)
# set(VTaskTestsBuild	${VTaskTestsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

# add_subdirectory(${VTaskTestsProj} ${VTaskTestsBuild})


# set(VFileTestsRoot	${XBoxRoot}/Tests/Files CACHE INTERNAL "Path to VFileTests")
# set(VFileTestsProj	${VFileTestsRoot}/Projects/CMake)
# set(VFileTestsBuild	${VFileTestsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

# add_subdirectory(${VFileTestsProj} ${VFileTestsBuild})


# set(VStringTestsRoot	${XBoxRoot}/Tests/Strings CACHE INTERNAL "Path to VStringTests")
# set(VStringTestsProj	${VStringTestsRoot}/Projects/CMake)
# set(VStringTestsBuild ${VStringTestsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

# add_subdirectory(${VStringTestsProj} ${VStringTestsBuild})


# set(ServerNetTestsRoot	${XBoxRoot}/Tests/ServerNet CACHE INTERNAL "Path to VServerNetTests")
# set(ServerNetTestsProj	${ServerNetTestsRoot}/Projects/CMake)
# set(ServerNetTestsBuild	${ServerNetTestsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

# add_subdirectory(${ServerNetTestsProj} ${ServerNetTestsBuild})


# set(VFSNTestsRoot		${XBoxRoot}/Tests/Notifications CACHE INTERNAL "Path to VFSNTests")
# set(VFSNTestsProj		${VFSNTestsRoot}/Projects/CMake)
# set(VFSNTestsBuild	${VFSNTestsProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

# add_subdirectory(${VFSNTestsProj} ${VFSNTestsBuild})


# set(JSContextTestsRoot	${XBoxRoot}/Tests/JSContexts CACHE INTERNAL "Path to VJSContextTests")
# set(JSContextTestsProj	${JSContextTestsRoot}/Projects/CMake)
# set(JSContextTestsBuild	${JSContextTestsRoot}/Build/${CMAKE_BUILD_TYPE})

# add_subdirectory(${JSContextTestsProj} ${JSContextTestsBuild})


#set(JavaScriptV8Root	${XBoxRoot}/Tests/V8 CACHE INTERNAL "Path to JavaScript src.")
#set(JavaScriptV8Proj	${JavaScriptV8Root}/Projects/CMake)
#set(JavaScriptV8Build ${JavaScriptV8Proj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})

#add_subdirectory(${JavaScriptV8Proj} ${JavaScriptV8Build})


################################################################################
# Wakanda Server
################################################################################

set(WakandaServerRoot	${WakandaRoot}/Server CACHE INTERNAL "Path to WakandaServer")
set(WakandaServerProj	${WakandaServerRoot}/Projet/CMake)
set(WakandaServerBuild	${WakandaServerProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})
add_subdirectory(${WakandaServerProj} ${WakandaServerBuild})

set(ShellRoot	    ${WakandaRoot}/shell CACHE INTERNAL "Path to wakanda shell")
set(ShellProj	    ${ShellRoot}/Project/cmake)
set(ShellBuild	    ${ShellProj}/Build/${CMAKE_BUILD_TYPE}${ARCH_TAG})
#add_subdirectory(${ShellProj} ${ShellBuild})


#
# Post processing
#
completion_write()

#
# platform.h
#
message(STATUS "configure file: ${XBoxRoot}/Kernel/Sources/CMakePlatform.h")
configure_file(${CMAKE_CURRENT_SOURCE_DIR}/platform.h.cmake  ${XBoxRoot}/Kernel/Sources/CMakePlatform.h)


