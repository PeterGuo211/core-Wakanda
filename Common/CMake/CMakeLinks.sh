#!/bin/sh

##################################################
# NEEDS PROTECTIONS AGAINST SILLY WHITE SPACES ! #
##################################################


repo=${REPO:=$(pwd | sed 's:/depot\(/.*\)\?::g')}

if [ -z "${repo}" ]
then
    echo "Can't find repository root !"
    exit 1
else
    echo "Repository root is ${repo}"
fi

IFS=":
"

for cmakelist in $(find ${repo} -name CMakeLists.txt)
do
    cmakedir=$(dirname ${cmakelist})
    dir=$(echo ${cmakedir} | sed s:${repo}/*::g)

    while [ -n "${dir}" -a ${dir} != "." ]
    do
	alias=$(basename ${dir} | tr -d " ")

	if echo ${alias} | grep -q -i -E "^(src|sources?|libs?|scripts?|projects?|cmake|[0-9\.]+|.?.?)$"
	then
	    dir=$(dirname ${dir})
	else
	    ln -f -s ${cmakelist} ${cmakedir}/${alias}.cmake
	    echo "${alias}:${cmakelist}"
	    break
	fi
    done
done | sort | while read alias target
do
    if [ "${lastalias}" != ${alias} ]
    then
     	echo "Alias '${alias}' :"
     	lastalias=${alias}
    fi

    echo "   - ${target}"
done