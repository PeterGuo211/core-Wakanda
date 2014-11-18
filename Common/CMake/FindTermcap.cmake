
# find Termcap (terminal input library) includes and library
#
# TERMCAP_FOUND       - TRUE if TERMCAP was found
# TERMCAP_INCLUDE_DIR - where the directory containing the TERMCAP headers can be found
# TERMCAP_LIBRARIES   - full path to the TERMCAP library
# TERMCAP_DEFINITIONS - definitions list

set(TERMCAP_FOUND false)
set(TERMCAP_DEFINITIONS "")
if (NOT WIN32)
	find_path(TERMCAP_INCLUDE_DIR termcap.h
		/usr/include
		/usr/local/include
		/opt/local/include)

	find_library(TERMCAP_LIBRARIES NAMES termcap PATH
		/usr/lib
		/usr/local/lib
		/opt/local/lib
		/usr/lib64)

	if (TERMCAP_INCLUDE_DIR AND TERMCAP_LIBRARIES)
		set(TERMCAP_FOUND true)
	endif ()
endif()

