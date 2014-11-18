#!/bin/sh

#
##
## Specific function to call in a SystemWorker with simple args
## 
#

#
##
## How to ? : ./scriptLinux.sh showContents,argsX : $X,argsX+1 : $X+1 
##
#

example()
{
	echo "example $1 $2 $3";
}

# execute this following line : ./scriptLinux.sh example,a,b,c | Display : example a b c
 

#
# \brief Functions for installer automatic Tests
#
showContents()
{
	dpkg --contents "$1"
	return $?
}


displayRights()
{
	# local list=$(ls -ld "$1")
	# if [ $? -ne 0 ]; then
	# 	return 1
	# fi
	# echo "${list}" | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/)*2^(8-i));if(k)printf("%0o ",k);print $1}'
	ls -ld "$1" | awk '{k=0;for(i=0;i<=8;i++)k+=((substr($1,i+2,1)~/[rwx]/)*2^(8-i));if(k)printf("%0o ",k);print $1}'
}


displayArchitectureType()
{
	if [ -f "${1}" ]; then
		# wak always returns 0
		local tofind="64"
		if [ ! "$(arch)" = "x86_64" ]; then 
			tofind="32"
		fi 
		file "$1" | cut -d':' -f 2 | cut -d ' ' -f 3 | grep --color=never "${tofind}"
		if [ "$?" -ne 0 ]; then
			return 1
		fi
	else
		return 1
	fi
}


licenceCheck()
{
	ls "$1" | tail -1	
	return $?
}


enterpriseSpecific()
{
	local FILEFOLDERNAME="$1"

	if [ -d "${FILEFOLDERNAME}" ]; then 
		echo "${FILEFOLDERNAME} exist";
	else
		if [ -f "${FILEFOLDERNAME}" ]; then
			echo "${FILEFOLDERNAME} exist";
		else
			echo "${FILEFOLDERNAME} doesn't exist";
		fi
	fi
	return 0
}



command=${1}
shift
"${command}" "$@"
ret=$?

if [ "${ret}" -ne 0 ]; then
	return ${ret}
fi

