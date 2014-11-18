

set(OpenSSLRoot	${Depot}/openssl/1.0.0d CACHE INTERNAL "Path to openssl src.")




if (NOT MONOLITIC)

	find_package(OpenSSL REQUIRED)
	if (OPENSSL_FOUND)
		message(STATUS "openssl: include: ${OPENSSL_INCLUDE_DIRS}")
		message(STATUS "openssl: libs: ${OPENSSL_LIBRARIES}")
		message(STATUS "openssl: definitions: ${OPENSSL_DEFINITIONS}")

		set(OpenSSLIncludeDir ${OPENSSL_INCLUDE_DIRES})
		set(OpenSSLLibs       ${OPENSSL_LIBRARIES})
	else()
		message(SEND_ERROR "openssl not found.")
		message(SEND_ERROR "package: debian/ubuntu: libssl-dev")
	endif()

else()

	# External auto-tools libs
	include(ExternalProject)



	if(CMAKE_BUILD_TYPE STREQUAL Debug)
		set (OpenSSLBuildType "debug-")
	endif()

	if(ARCH STREQUAL "64")
		set (OpenSSLArchFlags "${OpenSSLBuildType}linux-generic64")
	elseif(ARCH STREQUAL "32")
		set (OpenSSLArchFlags "${OpenSSLBuildType}linux-generic32")
	else()
		message(SEND_ERROR "OpenSSL - Unknown arch '${ARCH}'")
	endif()

	message(STATUS "Set OpenSSL architecture to ${OpenSSLArchFlags}")

	# BUG - "make clean" in the main build directory doesn't call "make clean" in
	#       in OpenSSL directory. I seems to be a known/wanted limitation of
	#       ExternalProject_Add. See this thread : http://cmake.3232098.n2.nabble.\
	#       com/External-Project-Add-and-custom-build-configurations-td6537361.html

	ExternalProject_Add(
		OpenSSL
		PREFIX              ${OpenSSLRoot}/openssl
		STAMP_DIR           ${OpenSSLRoot}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG}/stamps
		DOWNLOAD_COMMAND    true
		SOURCE_DIR          ${OpenSSLRoot}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG}/openssl
		CONFIGURE_COMMAND   ../../../WakandaSetup.sh Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG}
		                    ${OpenSSLArchFlags}
		                    no-asm no-static no-zlib shared
		                    ${ARCH_FLAGS}
		BUILD_IN_SOURCE     1
		BUILD_COMMAND       make build_crypto build_ssl
		INSTALL_COMMAND     true
	)

	foreach(lib crypto ssl)
		add_library(${lib} SHARED IMPORTED)
		add_dependencies(${lib} OpenSSL)
		set_property(TARGET ${lib} PROPERTY IMPORTED_LOCATION ${OpenSSLRoot}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG}/openssl/lib${lib}.so.1.0.0)
		message(STATUS "Add OpenSSL autotools lib: ${lib}")
	endforeach()

	set(OpenSSLIncludeDir	${OpenSSLRoot}/Build/${BRANCH_TAG}${CMAKE_BUILD_TYPE}${ARCH_TAG}/openssl/include)
	set(OpenSSLLibs         crypto ssl)

endif()
