#!/bin/bash

#Utilisation : ./ResetBuild.sh [clang] [eclipse]

usage()
{
    echo "usage: $0 [-j N] [-DSOME_DEFINE=xxx] [-DSOME_OTHER_DEFINE=yyy]"
    exit 1
}



arch="unknown"
repo="unknown"
branch="unknown"
conf="unknown"
tag="unknown"
dir="/tmp"
cmake="echo"
ExtraDefs="-DMONOLITIC=1"
pids=""
nbjobs=1
log=""

while getopts ":j:D:" o; do
	case "${o}" in
		j)
			nbjobs=$(expr ${OPTARG} + 0)
			if [ ${nbjobs} -lt 1 ]; then
				nbjobs=1
			fi
			if [ ${nbjobs} -gt 32 ]; then
				nbjobs=32
			fi
			;;
		D)
			ExtraDefs="$ExtraDefs -D${OPTARG}"
			;;
		?)
			echo "Bad option : ${OPTARG}" ; usage ;;
    esac
done
shift $((OPTIND-1))


# set trap, for killing all sub process when ctrl-c is pressed
trap 'kill $pids; echo -e "\n\n[ctrl-c] aborting. stopping all subprocess\n\n"; exit 1' INT



runcmake()
{
	printf "   configuring branch %s conf %-7s %-3s &\n" "${branch}" "${conf}" "${arch}"

	if [ ${arch} != "64" ]; then
		tag=${arch}
	else
		tag=${arch}
	fi

	log="cmake-${branch}-${conf}-${arch}.log"
	log="cmake.log"

	dir="${repo}/Wakanda/${branch}/Common/CMake/Build/${conf}${tag}"
	mkdir -p "${dir}"
			
	cat > "${dir}/Refresh.sh" <<EOF
#!/bin/bash

#Cmake generators are described here :
#http://www.vtk.org/Wiki/CMake_Generator_Specific_Information

#Infamous Eclipse stuff is documented here :
# - http://www.vtk.org/Wiki/CMake:Eclipse_UNIX_Tutorial
# - http://www.vtk.org/Wiki/Eclipse_CDT4_Generator
#Look for '.cproject' and '.project' files

Generator='Unix Makefiles'
Defs='-DASSERT_SHOULD_BREAK=No'

if [ -n "\${1}" ]
then
    choice=\$(echo \${1} | tr "[A-Z]" "[a-z]")
    case "\${choice}" in
     "make")
	  Generator='Unix Makefiles' ;;
      "eclipse")
	  Generator='Eclipse CDT4 - Unix Makefiles'
	  Defs='-DASSERT_SHOULD_BREAK=Yes'
	  FixIt=${repo}/depot/Wakanda/${branch}/Common/CMake/FixEclipse.sh ;;
      "codeblocks")
	  Generator='CodeBlocks - Unix Makefiles' ;;
      "kdevelop")
	  Generator='KDevelop3 - Unix Makefiles' ;;
      *)
	  echo "Bad Generator '\${choice}'; Valid choices are : make, eclipse, codeblocks, kdevelop"
	  exit 1
    esac
fi

#jmo - this pushd sucks but I can't find any good way to call cmake without going
#      to config directory first : cmake only generates its files in its CWD !
conf_dir=${dir}

pushd "\${conf_dir}" > /dev/null

echo " - selected generator: '\${Generator}' : "
${cmake} -G "\${Generator}" \${Defs} ${ExtraDefs} -DCMAKE_BUILD_TYPE=${conf} -DARCH=${arch} -DBRANCH=${branch} ../..
rv=\${?}

#Sometimes we need to apply some fix to cmake generated stuff.
\${FixIt:true}

popd > /dev/null

#If we are called with multiple generators, recurse and process them.
#jmo - ok, it's poorly written ;)
shift

if [ -n "\${1}" ]
then
    "\${0}" "\${*}"
fi

exit \${rv}

EOF

	cat > "${dir}/Clean.sh" <<EOF
echo "Cleaning branch ${branch}, conf ${conf}, arch ${arch}"

refresh_org="${dir}/Refresh.sh"
clean_org="${dir}/Clean.sh"

refresh_tmp="/tmp/Refresh${RANDOM}.sh"
clean_tmp="/tmp/Clean${RANDOM}.sh"

mv "\${refresh_org}" "\${refresh_tmp}"
mv "\${clean_org}" "\${clean_tmp}"

#jmo - Le /.* à la fin de la regexp evite que les répertoires dans lesquels les shells sont ouverts soient supprimés 
find "${repo}" -regextype posix-egrep -iregex ".*/${branch}/.*/CMake/Build/${conf}${tag}/.*" -prune -exec rm -Rf -- {} \;

#jmo - Le .* à la fin de la regexp permet de prendre les xxx.done des target non gérées par CMake (ie OpenSSL)
find "${repo}" -regextype posix-egrep -iregex ".*/Build/${branch}${conf}${tag}.*" -prune -exec rm -Rf -- {} \;

mv "\${refresh_tmp}" "\${refresh_org}"
mv "\${clean_tmp}" "\${clean_org}"

"${dir}/Refresh.sh"

EOF

	chmod +x ${dir}/Refresh.sh ${dir}/Clean.sh

	${dir}/Refresh.sh ${*} 2>&1 >${dir}/${log}
	rv=${?}
	if [ "${rv}" -ne 0 ]; then
		printf "   !! failed to generate branch %s conf %-7s %-3s (see %s)\n" "${branch}" "${conf}" "${arch}" "${dir}/${log}"
   	fi

	# append a direct link once ready
	if [ ${arch} = "${current_arch}" ]
	then
		`cd "${repo}/Wakanda/${branch}/Common/CMake/Build" && ln -sf "./${conf}${tag}" "${conf}"`
	fi
	printf "   configuring branch %s conf %-7s %-3s [done]\n" "${branch}" "${conf}" "${arch}"
}



main()
{
	echo "wakanda configure"

	# print the environment
	env
	echo

	#Initialisation de la commande CMake
	if [ -x "${HOME}/local/bin/cmake" ]; then
	    cmake="${HOME}/local/bin/cmake"
	elif [ -x "/opt/cmake/bin/cmake" ]; then
	    cmake="/opt/cmake/bin/cmake"
	else
		cmake="cmake"
	fi

	# The absolute filename of the current script
	rootscript=$(realpath "${0}")

	# Absolute current path
	root=$(dirname "${rootscript}")
	echo "  root: $root"

	# Repository root
	repo=$(echo "${root}" | sed -E 's:/depot.*:/depot:g')
	if [ -z "${repo}" ]; then
	    echo "Can't find repository root !"
	    exit 1
	else
	    echo "  repo: ${repo}"
	fi

	# Current branch name
	branch=$(echo "${root}" | sed "s:${repo}/Wakanda/::g" | sed "s:/Common/CMake::g")
	echo "branch: ${branch}"

	# Current arch
	if [ "`uname -p`" = "x86_64" ]; then
		current_arch="64"
	else
		current_arch="32"
	fi
	echo "  arch: ${current_arch}"
	echo "  jobs: -j ${nbjobs}"


	# Cleanup
	echo
	echo "cleaning..."
	find "${repo}" -regextype posix-egrep \
		-iregex ".*/Build/(Main|WAK[0-9]+)?(Debug|Beta|Release)(32|64)?.*$" \
		-prune -exec echo ' - removing' '{}' \; -exec rm -Rf "{}" \;



	echo
	echo "configuring..."
	n=0
	#for branch in $(ls "${repo}/Wakanda/" | sort)
	#do
		for conf in "Debug" "Beta" "Release"; do
			for arch in "64" "32"; do
				runcmake &
				n=$(expr $n + 1)
				pids="${pids} $!"

				# not the most effective but it should be good enough
				if [ `expr $n % $nbjobs` -eq 0 ]; then
					wait $pids
					pids=""
				fi
			done
		done
	#done

	# wait for all sub process
	wait $pids
}



# run the program
main

