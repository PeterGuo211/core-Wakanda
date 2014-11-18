
# perform checking about cap-ng library on all unix platforms
if (NOT WIN32)

	unset(HAVE_CAP_NG)

	# cap-ng is not available in 32bit on compilatux
	if (ARCH STREQUAL "64")

		# checking for the main include
		check_include_files(cap-ng.h HAVE_CAP_NG_H)

		if (HAVE_CAP_NG_H)
			# checking for a few routines...
			# check for the function capng_have_capabilities()
			check_library_exists(cap-ng capng_have_capabilities "" HAVE_CAP_NG_FUNC_HAVE_CAPABILITIES)
			# check for the function capng_clear()
			check_library_exists(cap-ng capng_clear "" HAVE_CAP_NG_FUNC_CLEAR)
			# check for the function capng_apply()
			check_library_exists(cap-ng capng_apply "" HAVE_CAP_NG_FUNC_APPLY)
		
			if (HAVE_CAP_NG_FUNC_APPLY AND HAVE_CAP_NG_FUNC_CLEAR AND HAVE_CAP_NG_FUNC_HAVE_CAPABILITIES)
				set(HAVE_CAP_NG true)
			endif()
		endif()
	
		if (HAVE_CAP_NG)
			message(STATUS "POSIX capabilities library: ok")
		else()
			message(STATUS  "POSIX capabilities library: disabled")
			message(STATUS  "	packages: debian: libcap-ng-dev")
			message(WARNING "missing library libcap-ng")
		endif()
  
	else()
		message(STATUS "POSIX capabilities library: disabled for 32 bits arch")
	endif()
	  
endif()

