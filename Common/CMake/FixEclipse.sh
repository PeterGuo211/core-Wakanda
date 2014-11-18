#!/bin/bash 

echo "Fix for Eclipse projects :"

echo "-> Fix Project Explorer"

############################################################
# Old fix ; worked with cmake 2.8.0
############################################################

# cat .project | sed 's:\(/[^/]*roje[^/]*\)*/CMake::g' > tmp.project

# depo=$(dirname $(dirname ${0}))

# cat > tmp.links <<EOF
# <link>
#     <name>Wakanda Server App</name>
#     <type>2</type>
#     <location>${depo}/4eDimension/main/Apps/Linux/Debug/Wakanda Server</location>
# </link>
# EOF

# awk '/<\/linkedResources>/ {system("cat ./tmp.links")}
# /./ {print $0}' tmp.project > .project

# rm -f tmp.links tmp.project > /dev/null

############################################################
# New fix ; for cmake >= 2.8.1
############################################################

depo=$(dirname $(dirname ${0}))

cat "${depo}/CMake/compilatux.project" | sed "s:%depo%:${depo}:g" > .project 


echo -n "-> Add targets :"

for target in $(make help | grep '^\.\.\.\ ' | cut -d' ' -f2 | sort) 
do

    echo -n " ${target}"

    cat >> tmp.targets <<EOF
<target name="${target}" path="" targetID="org.eclipse.cdt.make.MakeTargetBuilder">
<buildCommand>/usr/bin/make</buildCommand>
<buildArguments/>
<buildTarget>${target}</buildTarget>
<stopOnError>true</stopOnError>
<useDefaultCommand>true</useDefaultCommand>
</target>
EOF

done

echo

mv .cproject tmp.cproject

awk '/<\/buildTargets>/ {system("cat ./tmp.targets")}
/./ {print $0}' tmp.cproject > .cproject

rm -f tmp.targets tmp.cproject > /dev/null

