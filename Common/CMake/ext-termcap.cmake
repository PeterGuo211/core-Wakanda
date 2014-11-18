
unset(HAVE_TERMCAP)


find_package(Termcap)
if (TERMCAP_FOUND)
	message(STATUS "termcap: include: ${TERMCAP_INCLUDE_DIR}")
	message(STATUS "termcap: libs:    ${TERMCAP_LIBRARIES}")
	message(STATUS "termcap: defs:    ${TERMCAP_DEFINITIONS}")
	set(HAVE_TERMCAP true)
else()
	message(WARNING "termcap library is missing (debian: libncurses5-dev)")
endif()
