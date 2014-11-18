
# List all variables available in CMake internals
#
# \code
# list_all_cmake_variables(mylist)
# foreach (varname ${mylist})
#	message(STATUS "${varname}=${${varname}}")
# endforeach()
# \endcode
macro(list_all_cmake_variables  varname)
	get_cmake_property(${varname} VARIABLES)
endmacro()


# List all include directories for a single target
#
# \code
# target_get_include_directories(mylist TargetExample)
# foreach (includepath ${mylist})
#	message(STATUS " + include dir = ${includepath}")
# endforeach()
# \endcode
macro(target_get_include_directories  varname targetname)
	get_property(${varname} TARGET "${targetname}" PROPERTY INCLUDE_DIRECTORIES)
endmacro()


# List all sources for a single target
#
# \code
# target_get_sources(mylist TargetExample)
# foreach (sources ${mylist})
#	message(STATUS " + source: ${sources}")
# endforeach()
# \endcode
macro(target_get_sources  varname targetname)
	get_property(${varname} TARGET "${targetname}" PROPERTY SOURCES)
endmacro()


# List all targets
macro(target_list varname)
		set(${varname} "")
		list_all_cmake_variables(__target_list_allvars)
		foreach (__var ${__target_list_allvars})
			if (__var MATCHES "(.*)_LIB_DEPENDS")
				list(APPEND ${varname} "${CMAKE_MATCH_1}")
			endif()
		endforeach()
		unset(__target_list_allvars)
endmacro()


