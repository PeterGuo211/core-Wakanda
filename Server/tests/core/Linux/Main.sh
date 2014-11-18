#!/bin/bash

echo "
 [INFO]-------------------------------------
 [INFO]
 [INFO]
 [INFO] 4D | Auto Test Linux | Wakanda Server 
 [INFO] Main Shell Script
 [INFO]
 [INFO]
 [INFO]--------------------------------------
"

#Time Start : 
TIME_START=$(date +%s)

#Include Lib through Shell Script 
#Include <sys/systeminfo.h>

echo "[INFO]-----------------Invoke Script File Config-------------------"
echo "[INFO]-------------------------------------------------------------"

source Config.sh $1 $2

echo "[INFO]-----------------Invoke Script File Config-------------------"
echo "[INFO]-------------------------------------------------------------"

echo "[INFO]---------------------------Init------------------------------"
echo "[INFO]----------------------Killing Wakanda Processus Release---------------------"

echo "We must kill all Wakanda Server processus in Release Version"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]------------------------Killing Wakanda Processus Release-------------------"
echo "[INFO]---------------------------Init------------------------------"

echo "[INFO]--------Junit File creation----------"

#We need to check if the file aren't already created
if [ -e ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml ]
  then 
cd ${HomeDirectory}${Directory}Junit-report/
rm reportGoNoGoServer.xml
  else 
#Create a new file for XML Junit
> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml 
fi

#Wrote in the Junit File
cat > ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
<?xml version="1.0" encoding="UTF-8" ?>
EOF

echo "[INFO]--------Junit File creation----------"


echo "[INFO]----------------START-----------------"

echo "[INFO]--------------------------------------"
echo "[INFO] Output | General Information"
echo "#User : $USER, User Number :";who | wc -l
echo "#Launch date :";date
echo $(bash --version)
echo "[INFO]-------------------------------------"

echo "[INFO]---GONOGO | Checklist Linux----------"

#Beginning  
echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 1------------------------" 
TESTCASE1=$(echo "Test Case Number 1 : What is your Operating System?")
echo "${TESTCASE1}"

echo "Operating System version : "

if uname -arv

then 

#[INFO]-------------Score for Junit----------

SCORE1=0 

if [ "${SCORE1}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

echo "[INFO]---------------TIMER-------------------"

. ${HomeDirectory}${Directory}Functions

TIMER

echo "[INFO]---------------TIMER-------------------"

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
<testsuite failures="DV" time="${DIFF}" errors="DV" skipped="DV" tests="DV" name="$(date +%d-%m-%Y)-GoNoGo-Server-Junit">
  <testcase name="${TESTCASE1}-[Passed]" passed="true" time="DV">
     <success message="Test Passed"><![CDATA[Test passed]]></success>
  </testcase>
EOF

#[INFO]----------------Number 1 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
<testsuite failures="DV" time="${DIFF}" errors="DV" skipped="DV" tests="DV" name="$(date +%d-%m-%Y)-GoNoGo-Server-Junit">
  <testcase name="${TESTCASE1}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]--------Number 1 / Error--------------

fi

#[INFO]------------ Score for Junit----------

#[INFO]--------------------------------------
 uname -arv
#[INFO]--------------------------------------

else
 
#[INFO]-------------Score for Junit-----------

SCORE1_1=1

if [ "${SCORE1_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed, there is no version to define"

#[INFO]--------Junit File creation-----------

echo "[INFO]---------------TIMER-------------------"

. ${HomeDirectory}${Directory}Functions

TIMER

echo "[INFO]---------------TIMER-------------------"

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
<testsuite failures="DV" time="${DIFF}" errors="DV" skipped="DV" tests="DV" name="$(date +%d-%m-%Y)-GoNoGo-Server-Junit">
  <testcase name="${TESTCASE1}-[Failed]" passed="false" time="DV">
     <failure message="The operating system is wrong, there is no version to define"><![CDATA[The operating system is wrong, there is no version to define]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 1 / false-------

else
    echo ":1 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
<testsuite failures="DV" time="${DIFF}" errors="DV" skipped="DV" tests="DV" name="$(date +%d-%m-%Y)-GoNoGo-Server-Junit">
  <testcase name="${TESTCASE1}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 1 / Error-------

fi

#[INFO]------------ Score for Junit-----------

fi
echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 2------------------------" 
#TESTCASE2=$(echo "Test Case Number 2 : Test Mail")
#echo "${TESTCASE2}"
#echo "Test Case 2 : Test removed for now"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE2}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 3------------------------" 
#TESTCASE3=$(echo "Test Case Number 3 : Checking through 4D Network if versions are there")
#echo "${TESTCASE3}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE3}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 4-----------------------"
#TESTCASE4=$(echo "Test Case Number 4 : Start the compilation test with CMake")
#echo "${TESTCASE4}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE4}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "Execute CMD : refresh.sh | deleteBuild.sh | CMake.sh --> Compile"
#echo "[INFO]----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 5------------------------"
#TESTCASE5=$(echo "Test Case Number 5 : Make sure that installation has been done correctly")
#echo "${TESTCASE5}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE5}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]----------------------------------------------------------"

# echo "[INFO]-----------------------------------------------------------"
# echo "[INFO]-----------------Test Case number 6------------------------"
# TESTCASE6=$(echo "Test Case Number 6 : We need to check if the permission file is X")
# TESTCASE6_1=$(echo "Test Case Number 6_1 : We need to check if the permission file is W")
# echo "${TESTCASE6}"
# echo "${TESTCASE6_1}"

# #Le test doit être effectué pour chaque OS

# echo "For X permission"
# if [ -x ${HomeDirectoryRelease}Wakanda\ Server/Wakanda ]  
# then 
#  echo "Wakanda File is executable well in Release"
 
# #[INFO]-------------Score for Junit----------

# SCORE6=0

# if [ "${SCORE6}" -eq "0" ]
 
# then
#     echo ":1 : Test passed"

# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6-[Passed]" passed="true" time="DV">
#      <success message="Test Passed, The Permission are Ok"><![CDATA[Test passed, The permission are Ok]]></success>
#   </testcase>
# EOF

# #[INFO]----------------Number 6 / true-------

# else
#     echo ":0 : Test got an error"

# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6-[Error]" passed="false" time="DV">
#      <error message="Test Error"><![CDATA[Test Error]]></error>
#   </testcase>
# EOF

# #[INFO]----------------Number 6 / Error------

# fi

# #[INFO]-------------Score for Junit----------  

# else
#  echo "Wakanda File isn't executable in Release"

# #[INFO]-------------Score for Junit-----------

# SCORE6_1=1

# if [ "${SCORE6_1}" -eq "1" ]
 
# then
#     echo ":0 : Test Failed"

# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6-[Failed]" passed="false" time="DV">
#      <failure message="Test Failed, The permission aren't Ok"><![CDATA[Test Failed, The permission aren't Ok]]></failure>
#   </testcase>
# EOF

# #[INFO]----------------Number 6_1 / false-------

# else
#     echo ":1 : Test got an error"
# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6-[Error]" passed="false" time="DV">
#      <error message="Test error"><![CDATA[Test Error]]></error>
#   </testcase>
# EOF

# #[INFO]----------------Number 6_1 / Error-------

# fi
# #[INFO]-------------Score for Junit-----------
 
# fi

# echo "For W permission" 
# if [ -w ${HomeDirectoryRelease}Wakanda\ Server/Wakanda ]
# then 
#   echo "Wakanda File can be written well in Release"
  
# #[INFO]-------------Score for Junit----------

# SCORE6_1=0

# if [ "${SCORE6_1}" -eq "0" ]
 
# then
#     echo ":1 : Test passed"

# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6_1-[Passed]" passed="true" time="DV">
#      <success message="Test Passed, The permission are Ok"><![CDATA[Test passed, The permission are Ok]]></success>
#   </testcase>
# EOF

# #[INFO]----------------Number 6_1 / true-------

# else
#     echo ":0 : Test got an error"

# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6_1-[Error]" passed="false" time="DV">
#      <error message="Test Error"><![CDATA[Test Error]]></error>
#   </testcase>
# EOF

# #[INFO]----------------Number 6_1 / Error------

# fi

# #[INFO]-------------Score for Junit---------- 

# else 
#   echo "Wakanda File cannot be written well in Release"
  
# #[INFO]-------------Score for Junit-----------

# SCORE6_2_1=1

# if [ "${SCORE6_2_1}" -eq "1" ]
 
# then
#     echo ":0 : Test Failed"

# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6_1-[Failed]" passed="false" time="DV">
#      <failure message="Test Failed, The permission aren't Ok"><![CDATA[Test Failed, The permission aren't Ok]]></failure>
#   </testcase>
# EOF

# #[INFO]----------------Number 6_2_1 / false-------

# else
#     echo ":1 : Test got an error"
# #[INFO]--------Junit File creation-----------

# #Wrote in the Junit File
# cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#   <testcase name="$TESTCASE6_1-[Error]" passed="false" time="DV">
#      <error message="Test error"><![CDATA[Test Error]]></error>
#   </testcase>
# EOF

# #[INFO]----------------Number 6_2_1 / Error-------

# fi
# #[INFO]-------------Score for Junit-----------

# fi
# echo "[INFO]-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 7------------------------"
#Ajouter les solutions A, B, C de test dans Perforce et ajouter une commander pour effectuer un checkout des données.
TESTCASE7=$(echo "Test Case Number 7 : We need to check the Default configuration for a default solution and for a default configuration on Web Server (XML Files) :")
echo "${TESTCASE7}" 

echo "Checking the Settings (XML File for a Solution) :"
#Utiliser un outils pour analyser les noeuds et les attributs du fichier XML

#[INFO]-----------Local Variable---------
#-----------------Project----------------
DEFAULT_HTTP_PORT='port="8081"'
DEFAULT_HOSTNAME=localhost
#-----------------Project----------------
#-----------------HTTP-------------------
DEFAULT_HTTP_START=true
DEFAULT_RESPONSEFORMAT=json
DEFAULT_DOCUMENTROOT=./WebFolder
DEFAULT_RPCSERVICE=true
DEFAULT_RPCSERVICE_PATTERN=/rpc/
DEFAULT_DATASERVICE=true
DEFAULT_DATASERVICE_PATTERN=/rest/.*
DEFAULT_FILESERVICE=true
DEFAULT_SSL=false
DEFAULT_SSL_PORT=443
DEFAULT_CACHE=FALSE
DEFAULT_PAGECACHE_SIZE=5192
DEFAULT_TIMEOUT=5
DEFAULT_STANDARDSET=UTF-8
DEFAULT_KEEPALIVECONNECTIONS=true
DEFAULT_MAXREQUESTBYCONNECTION=100
DEFAULT_MAXTIMEOUT=15
DEFAULT_LOGFORMAT=ELF
DEFAULT_LOGPATH=Logs/
DEFAULT_LOGMAXSIZE=10000
#-----------------HTTP-------------------
#-----------------SQL--------------------
DEFAULT_SQL_SERVER=true
DEFAULT_PORT=19812
DEFAULT_RESOURCES=/walib/
#-----------------SQL--------------------
#[INFO]-----------Local Variable---------

echo "Go to Solution A..."
cd ${SolutionsTest}${SolutionName[0]}/${SolutionName[0]}

echo "[INFO]-------------------Section Default XML Settings : Project | Port :---------------------"

if grep ${DEFAULT_HTTP_PORT} Settings.waSettings
then
 echo "Default Port configuration is good."
 DEFAULT_HTTP_PORT_S=1
else
 DEFAULT_HTTP_PORT_S=0
 echo "Default Port configuration is wrong."
 
fi

echo "[INFO]-------------------Section Default XML Settings : Project | Port :---------------------"

echo "[INFO]----------------Section Default XML Settings : Project | Hostname :--------------------"

echo "Project | Hostname :"

if grep ${DEFAULT_HOSTNAME} Settings.waSettings
then
 echo "Default Hostname configuration is good."
 DEFAULT_HOSTNAME_S=1
else
 echo "Default Hostname configuration is wrong."
 DEFAULT_HOSTNAME_S=0
fi

echo "[INFO]----------------Section Default XML Settings : Project | Hostname :--------------------"

echo "[INFO]----------------Section Default XML Settings : Project | HTTP Start :------------------"

echo "HTTP |  HTTP Start :"

if grep ${DEFAULT_HTTP_START} Settings.waSettings
then
 echo "Default HTTP Start configuration is good."
 DEFAULT_HTTP_START_S=1
else
 echo "Default HTTP Start configuration is wrong."
 DEFAULT_HTTP_START_S=0
fi

echo "[INFO]----------------Section Default XML Settings : Project | HTTP Start :------------------"

echo "[INFO]-------------Section Default XML Settings : Project | Responce Format :----------------"

echo "HTTP | RESPONSE Format :"

if grep ${DEFAULT_RESPONSEFORMAT} Settings.waSettings 
then
 echo "Default Response Format configuration is good."
 DEFAULT_RESPONSEFORMAT_S=1
else
 echo "Default Response Format configuration is wrong."
 DEFAULT_RESPONSEFORMAT_S=0
fi

echo "[INFO]-------------Section Default XML Settings : Project | Responce Format :----------------"

echo "[INFO]-------------Section Default XML Settings : Project | DocumentROOT :-------------------"

echo "HTTP | DocumentROOT :"

#if grep ${DEFAULT_DOCUMENTROOT} Settings.waSettings
#then
# echo "Default DocumentRoot  configuration is good."
# DEFAULT_DOCUMENTROOT_S=1
#else
# echo "Default DocumentRoot  configuration is wrong."
# DEFAULT_DOCUMENTROOT_S=0
#fi


echo "[INFO]-------------Section Default XML Settings : Project | DocumentROOT :-------------------"

if [ ${DEFAULT_HTTP_START_S} -eq 1 ] && [ ${DEFAULT_HOSTNAME_S} -eq 1 ] && [ ${DEFAULT_HTTP_START_S} -eq 1 ] && [ ${DEFAULT_RESPONSEFORMAT_S} -eq 1 ] 
then

#[INFO]-------------Score for Junit----------

SCORE7=0

if [ "${SCORE7}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE7}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, All different configuration in the setting XML are fine"><![CDATA[Test passed, All different configuration in the setting XML are fine]]></success>
  </testcase>
EOF

#[INFO]----------------Number 7 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE7}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 7 / Error------

fi

#[INFO]-------------Score for Junit----------

else 

#[INFO]-------------Score for Junit-----------

SCORE7_1=1

if [ "${SCORE7_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE7}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Some or all configuration are wrong, please check them"><![CDATA[Test Failed, Some or all configuration are wrong, please check them]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 7_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE7}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 7_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------

fi 

#You have to do the same thing about admin settings
echo "Go to Server Admin Settings..."

echo "Next.."

echo "[INFO]-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 8------------------------"
TESTCASE8=$(echo "Test Case Number 8 : We need to check that the processus is launched well with good default values for CPU and memory, with a limit number of thread for one processus :")
echo "${TESTCASE8}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "Checking for Wakanda processus in Release version :"

echo "[INFO]-----------------Wakanda Server Processus launched? Release-------------------" 
if ps aux | grep Wakanda | grep -v grep
then
 echo "There is a/serveral processus for Wakanda Server Release Version"
 
#[INFO]-------------Score for Junit----------

SCORE8=0

if [ "${SCORE8}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE8}-[Passed]" passed="true" time="DV"> 
    <success message="Test Passed,Wakanda Processus are there : Release Version"><![CDATA[Test passed, Wakanda Processus are there : Release Version]]></success>
  </testcase>
EOF

#[INFO]----------------Number 8 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE8}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 8 / Error------

fi

#[INFO]-------------Score for Junit----------

else
 echo "There is no processus launched for Wakanda Server Release Version"

#[INFO]-------------Score for Junit-----------

SCORE8_1=1

if [ "${SCORE8_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE8}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Wakanda Processus aren't launched : Release Version"><![CDATA[Test Failed, Wakanda Processus aren't launched : Release Version]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 8_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE8}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 8_1 / Error-------

fi
#[INFO]-------------Score for Junit----------- 

fi

echo "[INFO]---------------Wakanda Server Processus launched? Release-------------------" 

echo "[INFO]---------------Basics Information about Wakanda Processus-------------------"

echo "Checking for limit number of thread for one processus Release Version :"

echo "With one processus launched for Wakanda Server, we have Add here the batch code for windows to see thread(s) in Release Version"

echo "[INFO]----------------Basics Information about Wakanda Processus------------------"

echo "[INFO]----------------------Killing Wakanda Processus Release---------------------"

echo "We must kill all Wakanda Server processus in Release Version"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]------------------------Killing Wakanda Processus Release-------------------"


echo "[INFO]-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 9------------------------"
TESTCASE9="$(echo "Test Case Number 9 : We need to check if Localhost adress and his port is good")"
echo "${TESTCASE9}"

echo "[INFO]-------------------Wakanda Execution : Version Release----------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release----------------------"

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

echo "Checking if the adress ${LOCALHOST} is running well on port 8080"

. ${HomeDirectory}${Directory}Functions 

SimpleGETServer 

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

echo "[INFO]-------------------Wakanda Execution : Version Release----------------------"

echo "Checking if 127.0.0.1:8080 give a response on a Socket with the stat LISTENING" 

if netstat -an | grep ${port[0]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetServer/logSimpleGetServer
then
    echo "${WEBADMIN} is OK and ready on 127.0.0.1:8080"

#[INFO]-------------Score for Junit----------

SCORE9_1_1=0

if [ "${SCORE9_1_1}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE9}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Wakanda Server is ready on 127.0.0.1:8080 : Version Release"><![CDATA[Test passed, Wakanda Server is ready on 127.0.0.1:8080 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 9_1 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE9}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 9_1 / Error------

fi

#[INFO]-------------Score for Junit----------

    else
    echo "${WEBADMIN} isn't OK"

 
#[INFO]-------------Score for Junit-----------

SCORE9_2_1=1

if [ "${SCORE9_2_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE9}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Wakanda Server isn't ready on 127.0.0.1:8080 : Version Release"><![CDATA[Test Failed, Wakanda Server isn't ready on 127.0.0.1:8080: Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 9_2_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE9}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test ignored]]></error>
  </testcase>
EOF

#[INFO]----------------Number 9_1 / Error-------

fi
#[INFO]-------------Score for Junit----------- 

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 10-----------------------"
#TESTCASE10="$(echo "Test Case Number 10 : We need to check if the logs are ok in the WebAdmin | En cours")"
#echo "${TESTCASE10}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE10}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 11-----------------------" 
#TESTCASE11="$(echo "Test Case Number 11 : We need to check if tmp files are created well for WS")"
#echo "${TESTCASE11}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE11}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 12-----------------------"
#TESTCASE12="$(echo "Test Case Number 12 : We need to check if HTTP logs are ok and if there is no status more than 399 | En cours")"
#echo "$TESTCASE12"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE12}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test ignored]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 13-----------------------"
#TESTCASE13="$(echo "Test Case Number 13 : We need to check if there is Dump core file in the WS folders | En cours")"
#echo "$TESTCASE13"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE13}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "[INFO]-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 14-----------------------"
TESTCASE14="$(echo "Test Case Number 14 : We need to check if the solution are loaded well")"
echo "$TESTCASE14"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "Launching a Solution"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

echo "Launching one Request to Solution"

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

echo "Checking if ${WEBADMIN_SOLUTION} give a response on the socket with the stat LISTENING" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution/logSimpleGetSolution
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE14=0

if [ "${SCORE14}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE14}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Solution is loaded correctly : Version Release"><![CDATA[Test passed, Solution is loaded correctly : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 14 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE14}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 14 / Error------

fi

#[INFO]-------------Score for Junit----------
    
else
    echo "${WEBADMIN_SOLUTION} isn't OK"    

#[INFO]-------------Score for Junit-----------

SCORE14_1=1

if [ "${SCORE14_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE14}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Solution isn't loaded correctly : Version Release"><![CDATA[Test Failed, Solution isn't loaded correctly : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 14_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE14}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 14_1 / Error-------

fi
#[INFO]-------------Score for Junit----------- 

 
fi

echo "Launching a Solution"

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_CLOSE_Wakanda_Solution 0 0

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "[INFO]-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 15-----------------------"
#TESTCASE15="$(echo "Test Case Number 15 : We need to check that all services (HTTP, File service, WebApp, Data Service, RPC, IP, Hotsname) are loaded at the first time | En cours")"
#echo "${TESTCASE15}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE15}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 16-----------------------"
#TESTCASE16="$(echo "Test Case Number 16 : We need to check that the processus don't make lot of time to stop with the processus killed (ctrl+c) | En cours")"
#echo "${TESTCASE16}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE16}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 17-----------------------"
TESTCASE17="$(echo "Test Case Number 17 : We have to re-execute WS and to check connection on port 8080")"
TESTCASE17_1="$(echo "Test Case Number 17_1 : We have to launch the A solution and to check connection on port 8081")"
echo "${TESTCASE17}"
echo "${TESTCASE17_1}"

echo "Execute a solution and Wakanda Server"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"


echo "Launching a Solution"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETServer 

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

echo "Checking if ${WEBADMIN} give a response on a socket with the stat LISTENING" 
if netstat -an | grep ${port[0]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetServer/logSimpleGetServer
then
    echo "${WEBADMIN} is OK"
#[INFO]-------------Score for Junit----------

SCORE17=0

if [ "${SCORE17}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Re-execution : We have got a responce from 127.0.0.1:8080 : Version Release"><![CDATA[Test passed, Re-execution : We have got a responce from 127.0.0.1:8080 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 17 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 17 / Error------

fi

#[INFO]-------------Score for Junit----------
    
else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE17_1=1

if [ "${SCORE17_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Re-execution : We have no responce from 127.0.0.1:8080 : Version Release"><![CDATA[Test Failed, Re-execution : We have no responce from 127.0.0.1:8080 : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 17_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 17_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

echo "Checking if ${WEBADMIN_SOLUTION} give a response on a socket with the stat LISTENING" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution/logSimpleGetSolution
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE17_2=0

if [ "${SCORE17_2}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17_1}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Re-execution : We got a responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test passed, Re-execution : We got a responce from 127.0.0.1:8081 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 17_2 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17_1}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 17_2 / Error------

fi

#[INFO]-------------Score for Junit----------
else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE17_2_1=1

if [ "${SCORE17_2_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17_1}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Re-execution : We have no responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test Failed, Re-execution : We have no responce from 127.0.0.1:8081 : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 17_2_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE17_1}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 17_2_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 18-----------------------"
TESTCASE18="$(echo "Test Case Number 18 : Close the solution")"
echo "${TESTCASE18}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_CLOSE_Wakanda_Solution 0 0

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

echo "Checking if 127.0.0.1:8081 give no response on the socket with the stat : LISTENING" 

if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution/logSimpleGetSolution
then
    echo "${WEBADMIN_SOLUTION} is there : KO"

#[INFO]-------------Score for Junit-----------

SCORE18=1

if [ "${SCORE18}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE18}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Re-execution : We have a responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test Failed, Re-execution : We have a responce from 127.0.0.1:8081 : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 18 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE18}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 18 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

else
    echo "${WEBADMIN_SOLUTION} isn't there : OK"
#[INFO]-------------Score for Junit----------

SCORE18_1=0

if [ "${SCORE18_1}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE18}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Re-execution : We have got no responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test passed, Re-execution : We have got no responce from 127.0.0.1:8081 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 18_1 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE18}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 18_1 / Error------

fi

#[INFO]-------------Score for Junit----------   

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 19-----------------------"
TESTCASE19="$(echo "Test Case Number 19 : Open and Close solution (A, B or C) several time")"
echo "${TESTCASE19}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

for op in $(seq 2)
 do 

echo "${op} : Open SolutionA" 
echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

sleep 5

echo "${op} : Close SolutionA" 
echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_CLOSE_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

sleep 15

echo "${op} : Open SolutionB" 
echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 1 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

sleep 5

echo "${op} : Close SolutionB" 
echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_CLOSE_Wakanda_Solution 0 1 

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

done

sleep 15

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETServer 

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

if netstat -an | grep ${port[0]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetServer/logSimpleGetServer
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE19=0

if [ "${SCORE19}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE19}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We have  a responce from 127.0.0.1:8080 : Version Release"><![CDATA[Test passed,  We have a responce from 127.0.0.1:8080 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 19 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE19}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 19 / Error------

fi

#[INFO]-------------Score for Junit----------

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE19_1=1

if [ "${SCORE19_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE19}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We have no responce from 127.0.0.1:8080 : Version Release"><![CDATA[Test Failed, Re-execution : We have no responce from 127.0.0.1:8080 : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 19_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE19}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 19_1 / Error-------

fi

#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]------------------------Killing Wakanda Processus Release---------------------" 

echo "We must kill all Wakanda Server processus in release Version"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]------------------------Killing Wakanda Processus Release---------------------" 

echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 20-----------------------"
TESTCASE20="$(echo "Test Case Number 20 : Open solution (A, B or C) several time, without to close the solution")"
echo ${TESTCASE20}

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

for op in $(seq 2)
 do 

echo "${op} : Open SolutionA" 
echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

sleep 5

echo "${op} : Open SolutionB" 
echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 1

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

 done

sleep 15

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution/logSimpleGetSolution
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE20=0

if [ "${SCORE20}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE20}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We have  a responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test passed,  We have a responce from 127.0.0.1:8081 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 20 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE20}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 20 / Error------

fi

#[INFO]-------------Score for Junit----------

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE20_1=1

if [ "${SCORE20_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE20}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We have no responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test Failed, Re-execution : We have no responce from 127.0.0.1:8081 : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 20_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE20}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 20_1 / Error-------

fi

#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]------------------------Killing Wakanda Processus Release---------------------" 

echo "We must kill all Wakanda Server processus in release Version"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]------------------------Killing Wakanda Processus Release---------------------" 


echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 21-----------------------"
#TESTCASE21="$(echo "Test Case Number 21 : We need to check that we have to be able to open recent solution | En cours ")"
#echo "${TESTCASE21}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE21}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 22-----------------------" 
#TESTCASE22="$(echo "Test Case Number 22 : We need to check that lock / unlock works perfectly | En cours")"
#echo "${TESTCASE22}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE22}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 23-----------------------" 
#TESTCASE23="$(echo "Test Case Number 23 : We need to check that the feature Flush Database works perfectly | En cours")"
#echo "${TESTCASE23}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE23}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"


echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 24----------------------- "
TESTCASE24="$(echo "Test Case Number 24 : We need to check that rest is enabled")"
echo ${TESTCASE24}

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 1

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

sleep 15

echo "Make a wget on Catalog Data to get JSON file"
echo "[INFO]------------------------------GETrestInfo-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

GETrestFile 1

echo "[INFO]------------------------------GETrestInfo-------------------------------------"

if grep "true" "${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}/Rest/index.html"
 then
    echo "rest is enabled"

#[INFO]-------------Score for Junit----------

SCORE24=0

if [ "${SCORE24}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE24}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Rest is enabled : Version Release"><![CDATA[Test passed, Rest is enabled : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 24 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE24}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 24 / Error------

fi

#[INFO]-------------Score for Junit----------

 else
    echo "rest isn't enabled"

#[INFO]-------------Score for Junit-----------

SCORE24_1=1

if [ "${SCORE24_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE24}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Rest isn't enabled : Version Release"><![CDATA[Test Failed, Rest isn't enabled : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 24_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE24}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 24_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi 

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 25-----------------------" 
TESTCASE25="$(echo "Test Case Number 25 : We need to check that the Solution A is ok at the runtime for this localhost IP adress : 127.0.0.1:808X")"
echo "${TESTCASE25}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"


echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"


echo "Checking if 127.0.0.1 give a response on a socket with the stat LISTENING" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution/logSimpleGetSolution
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE25=0

if [ "${SCORE25}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE25}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We got a responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test passed, We got a responce from 127.0.0.1:8081 : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 25 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE25}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 25 / Error------

fi

#[INFO]-------------Score for Junit----------

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE25_1=1

if [ "${SCORE25_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE25}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We didn't get a responce from 127.0.0.1:8081 : Version Release"><![CDATA[Test Failed, We didn't get a responce from 127.0.0.1:8081 : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 25_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE25}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 25_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 26-----------------------"
TESTCASE26="$(echo "Test Case Number 26 : We need to check that the Solution / WS can be reach from another Computer with a Public IP adress :192.168.XX.XX without 399 and more status")"
echo "${TESTCASE26}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

echo "Checking if the adress ${PRIVATE_IP} is running well on port 8081"
echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

GETNetworkIP 

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

echo "Checking if ${PRIVATE_IP_PORT} give a response" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/GetPrivateIP/logGetNetworkIP
then
    echo "${PRIVATE_IP_PORT} is OK"

#[INFO]-------------Score for Junit----------

SCORE26=0

if [ "${SCORE26}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE26}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We can reach Wakanda Server/Solution on ${PRIVATE_IP_PORT} : Version Release"><![CDATA[Test passed, We can reach Wakanda Server/Solution on ${PRIVATE_IP_PORT} : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 26 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE26}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 26 / Error------

fi

#[INFO]-------------Score for Junit----------


else
    echo "${PRIVATE_IP_PORT} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE26_1=1

if [ "${SCORE26_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE26}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We cannot reach Wakanda Server/Solution on ${PRIVATE_IP_PORT} : Version Release"><![CDATA[Test Failed, We cannot reach Wakanda Server/Solution on ${PRIVATE_IP_PORT} : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 26_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE26}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 26_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 27-----------------------" 
TESTCASE27="$(echo "Test Case Number 27 : We need to check that WS can handle several GET request during 5 minutes with a static Solution")"
echo "${TESTCASE27}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

for LT_STATIC in $(seq ${NUMBER_LOOP})
 do
  
echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

 done

#Checking current IP address if she's always enabled 

echo "Checking if ${WEBADMIN_SOLUTION} give a response" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} 
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE27=0

if [ "${SCORE27}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE27}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, After ${NUMBER_LOOP} requests with a Static Solution : Version Release"><![CDATA[Test passed, After ${NUMBER_LOOP} request with a Static Solution : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 27 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE27}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 27 / Error------

fi

#[INFO]-------------Score for Junit----------    

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE27_1=1

if [ "${SCORE27_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE27}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, After ${NUMBER_LOOP} requests with a Static Solution : Version Release"><![CDATA[Test Failed, After ${NUMBER_LOOP} request with a Static Solution : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 27_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE27}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 27_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  
   
fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 28-----------------------"
TESTCASE28="$(echo "Test Case Number 28 : We need to check that WS can handle several GET/POST request during 5 minutes with a dynamical Solution")"
echo "${TESTCASE28}"


echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 1

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"


for LT_STATIC in $(seq ${NUMBER_LOOP})
 do
  
echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"
 
 done

#Checking current IP address if she's always enabled 

echo "Checking if ${WEBADMIN_SOLUTION} give a response" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} 
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE28=0

if [ "${SCORE28}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE28}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, After ${NUMBER_LOOP} requests with a Dynamic Solution : Version Release"><![CDATA[Test passed, After ${NUMBER_LOOP} request with a Dynamic Solution : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 28 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE28}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 28 / Error------

fi

#[INFO]-------------Score for Junit----------     

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE28_1=1

if [ "${SCORE28_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE28}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, After ${NUMBER_LOOP} request with Dynamic Solution : Version Release"><![CDATA[Test Failed, After ${NUMBER_LOOP} request with a Dynamic Solution : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 28_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE28}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 28_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 29-----------------------"
TESTCASE29="$(echo "Test Case Number 29 : We need to check that the logs are splitted well")"
echo "${TESTCASE29}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 0

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

echo "Launching several request during several minutes as soon as we have a log splitted, the WS must to stay ready"

for LT_STATIC in $(seq ${NL_LOG})
 do
  
echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolution 

echo "[INFO]------------------------------SimpleGETSolution-------------------------------------"

 done

echo "Checking if ${WEBADMIN_SOLUTION} give a response" 
if netstat -an | grep ${port[1]} | grep ${SocketStat[1]} 
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE29=0

if [ "${SCORE29}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE29}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Logs are splitted well : Version Release"><![CDATA[Test passed, Logs are splitted well : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 29 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE29}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 29 / Error------

fi

#[INFO]-------------Score for Junit----------     

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE291_1=1

if [ "${SCORE29_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE29}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Logs are splitted well : Version Release"><![CDATA[Test Failed, Logs are splitted well : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 29_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE29}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 29_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 30-----------------------"
#TESTCASE30="$(echo "Test Case Number 30 : We need to check that the RequestHandler works fine with the Solution C")"
#echo "${TESTCASE30}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE30}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "Wakanda processus with PID : ${PID} is killed"
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 31-----------------------"
#TESTCASE31="$(echo "Test Case Number 31 : We need to check a simple GET request with his headers En cours")"
#echo "${TESTCASE31}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE31}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "Wakanda processus with PID : ${PID} is killed"
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 32-----------------------"
#TESTCASE32="$(echo "Test Case Number 32 : We need to check a simple POST request with his headers | En cours")"
#echo "${TESTCASE32}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE32}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 33-----------------------"
#TESTCASE33="$(echo "Test Case Number 33 : We need to check a simple DELETE request with his headers | En cours")"
#echo "${TESTCASE33}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE33}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

#echo "[INFO]-----------------------------------------------------------"
#echo "[INFO]-----------------Test Case number 34-----------------------"
#TESTCASE34="$(echo "Test Case Number 34 : We need to check a simple PUT request with his headers | En cours")"
#echo "${TESTCASE34}"
#Wrote in the Junit File
#cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
#  <testcase name="${TESTCASE34}-[Ignored]" ignored="true" time="DV">
#     <skipped message="Test ignored"><![CDATA[Test Skipped]]></skipped>
#  </testcase>
#EOF
#echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 35-----------------------"
TESTCASE35="$(echo "Test Case Number 35 : We need to check if the solution are loaded well with SSL enabled")"
echo "$TESTCASE35"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "Launching a Solution"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 3 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

echo "Launching one Request to Solution"

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolutionSSL 1 3

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

echo "Checking if ${WEBADMIN_SOLUTION} give a response on the socket with the stat LISTENING" 
if netstat -an | grep ${port[3]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL/logSimpleGetSolutionSSL
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE35=0

if [ "${SCORE35}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE35}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Solution is loaded correctly in SSL mode : Version Release"><![CDATA[Test passed, Solution is loaded correctly in SSL mode : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 35 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE35}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 35 / Error------

fi

#[INFO]-------------Score for Junit----------
    
else
    echo "${WEBADMIN_SOLUTION} isn't OK"    

#[INFO]-------------Score for Junit-----------

SCORE35_1=1

if [ "${SCORE35_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE35}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Solution isn't loaded correctly in SSL mode : Version Release"><![CDATA[Test Failed, Solution isn't loaded correctly in SSL mode: Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 35_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE35}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 35_1 / Error-------

fi
#[INFO]-------------Score for Junit----------- 

 
fi

echo "Launching a Solution"

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_CLOSE_Wakanda_Solution 0 3

echo "[INFO]-------------------Wakanda Execution : Close Solution------------------------"

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "[INFO]-----------------------------------------------------------"


echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 36-----------------------"
TESTCASE36="$(echo "Test Case Number 36 : Open solution (A-SSL, B-SSL) several time with SSL enabled, without to close the solution")"
echo ${TESTCASE36}

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

for op in $(seq 2)
 do 

echo "${op} : Open SolutionA" 
echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 3 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

sleep 5

echo "${op} : Open SolutionB" 
echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 4

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

 done

sleep 15

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolutionSSL 1 3  

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

if netstat -an | grep ${port[3]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL/logSimpleGetSolutionSSL
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE36=0

if [ "${SCORE36}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE36}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We have a responce from 127.0.0.1:${port[3]} in SSL mode : Version Release"><![CDATA[Test passed,  We have a responce from 127.0.0.1:${port[3]} in SSL mode : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 36 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE36}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 36 / Error------

fi

#[INFO]-------------Score for Junit----------

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE36_1=1

if [ "${SCORE36_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE36}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We have no responce from 127.0.0.1:${port[3]} : Version Release"><![CDATA[Test Failed, Re-execution : We have no responce from 127.0.0.1:${port[3]} : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 36_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE36}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 36_1 / Error-------

fi

#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]------------------------Killing Wakanda Processus Release---------------------" 

echo "We must kill all Wakanda Server processus in release Version"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]------------------------Killing Wakanda Processus Release---------------------" 
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 37----------------------- "
TESTCASE37="$(echo "Test Case Number 37 : We need to check that rest is enabled in SSL mode")"
echo ${TESTCASE37}

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 3

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

sleep 15

echo "Make a wget on Catalog Data to get JSON file"
echo "[INFO]------------------------------GETrestInfoSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

GETrestFileSSL 1 3

echo "[INFO]------------------------------GETrestInfoSSL-------------------------------------"

if grep "true" "${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}/RestSSL/index.html"
 then
    echo "rest is enabled"

#[INFO]-------------Score for Junit----------

SCORE37=0

if [ "${SCORE37}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE37}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, Rest is enabled in SSL mode : Version Release"><![CDATA[Test passed, Rest is enabled in SSL mode : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 37 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE37}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 37 / Error------

fi

#[INFO]-------------Score for Junit----------

 else
    echo "rest isn't enabled"

#[INFO]-------------Score for Junit-----------

SCORE37_1=1

if [ "${SCORE37_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE37}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, Rest isn't enabled in SSL mode : Version Release"><![CDATA[Test Failed, Rest isn't enabled in SSL mode : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 37_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE37}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 37_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi 

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 38-----------------------" 
TESTCASE38="$(echo "Test Case Number 38 : We need to check that the Solution A-SSL is ok at the runtime for this localhost IP adress : 127.0.0.1:808X")"
echo "${TESTCASE38}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 3 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"


echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolutionSSL 1 3

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"


echo "Checking if 127.0.0.1 give a response on a socket with the stat LISTENING" 
if netstat -an | grep ${port[3]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL/logSimpleGetSolutionSSL
then
    echo "${WEBADMIN_SOLUTION} is OK"

#[INFO]-------------Score for Junit----------

SCORE38=0

if [ "${SCORE38}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE38}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We got a responce from 127.0.0.1:${port[3]} : Version Release"><![CDATA[Test passed, We got a responce from 127.0.0.1:${port[3]} : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 38 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE38}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 38 / Error------

fi

#[INFO]-------------Score for Junit----------

else
    echo "${WEBADMIN_SOLUTION} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE38_1=1

if [ "${SCORE38_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE38}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We didn't get a responce from 127.0.0.1:${port[3]} : Version Release"><![CDATA[Test Failed, We didn't get a responce from 127.0.0.1:${port[3]} : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 38_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE38}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 38_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"

echo "-----------------------------------------------------------"


echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 39-----------------------"
TESTCASE39="$(echo "Test Case Number 39 : We need to check that the Solution / WS can be reach from another Computer with a Public IP adress :192.168.XX.XX without 399 and more status in SSL mode")"
echo "${TESTCASE39}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 3 

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

echo "Checking if the adress ${PRIVATE_IP} is running well on port ${port[3]}"
echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

GETNetworkIPSSL 1 3

echo "[INFO]------------------------------SimpleGETServer-------------------------------------"

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolutionSSL 1 3

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

echo "Checking if ${PRIVATE_IP_PORT} give a response" 
if netstat -an | grep ${port[3]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/GetPrivateIPSSL/logGetNetworkIPSSL
then
    echo "${PRIVATE_IP}:${port[3]} is OK"

#[INFO]-------------Score for Junit----------

SCORE39=0

if [ "${SCORE39}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE39}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, We can reach Wakanda Server/Solution on ${PRIVATE_IP}:${port[3]} : Version Release"><![CDATA[Test passed, We can reach Wakanda Server/Solution on ${PRIVATE_IP}:${port[3]} : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 39 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE39}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 39 / Error------

fi

#[INFO]-------------Score for Junit----------


else
    echo "${PRIVATE_IP}:${port[3]} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE39_1=1

if [ "${SCORE39_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE39}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, We cannot reach Wakanda Server/Solution on ${PRIVATE_IP}:${port[3]} : Version Release"><![CDATA[Test Failed, We cannot reach Wakanda Server/Solution on ${PRIVATE_IP}:${port[3]} : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 39_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE39}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 39_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 40-----------------------" 
TESTCASE40="$(echo "Test Case Number 40 : We need to check that WS can handle several GET request during 5 minutes with a static Solution in SSL mode")"
echo "${TESTCASE40}"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 3

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

for LT_STATIC in $(seq ${NUMBER_LOOP})
 do
  
echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolutionSSL 1 3 

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

 done

#Checking current IP address if she's always enabled 

echo "Checking if ${LOCALHOST}:${port[3]} give a response" 
if netstat -an | grep ${port[3]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL/logSimpleGetSolutionSSL
then
    echo "${LOCALHOST}:${port[3]} is OK"

#[INFO]-------------Score for Junit----------

SCORE40=0

if [ "${SCORE40}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE40}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, After ${NUMBER_LOOP} requests with a Static Solution in SSL mode : Version Release"><![CDATA[Test passed, After ${NUMBER_LOOP} request with a Static Solution in SSL mode : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 40 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE40}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 40 / Error------

fi

#[INFO]-------------Score for Junit----------    

else
    echo "${LOCALHOST}:${port[3]} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE40_1=1

if [ "${SCORE40_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE40}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, After ${NUMBER_LOOP} requests with a Static Solution in SSL mode : Version Release"><![CDATA[Test Failed, After ${NUMBER_LOOP} request with a Static Solution in SSL mode : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 40_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE40}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 40_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  
   
fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "[INFO]-----------------------------------------------------------"
echo "[INFO]-----------------Test Case number 41-----------------------"
TESTCASE41="$(echo "Test Case Number 41 : We need to check that WS can handle several GET/POST request during 5 minutes with a dynamical Solution in SSL mode")"
echo "${TESTCASE41}"


echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

. ${HomeDirectory}${Directory}Functions

WakandaInstanceRelease "$3"

echo "[INFO]-------------------Wakanda Execution : Version Release------------------------"

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"

. ${HomeDirectory}${Directory}Functions 

cURL_RPC_OPEN_Wakanda_Solution 0 4

echo "[INFO]-------------------Wakanda Execution : Launch Solution------------------------"


for LT_STATIC in $(seq ${NUMBER_LOOP})
 do
  
echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"

. ${HomeDirectory}${Directory}Functions 

SimpleGETSolutionSSL 1 3 

echo "[INFO]------------------------------SimpleGETSolutionSSL-------------------------------------"
 
 done

#Checking current IP address if she's always enabled 

echo "Checking if ${LOCALHOST}:${port[3]} give a response" 
if netstat -an | grep ${port[3]} | grep ${SocketStat[1]} && grep "200 OK" ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL/logSimpleGetSolutionSSL
then
    echo "${LOCALHOST}:${port[3]} is OK"

#[INFO]-------------Score for Junit----------

SCORE41=0

if [ "${SCORE41}" -eq "0" ]
 
then
    echo ":1 : Test passed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE41}-[Passed]" passed="true" time="DV">
     <success message="Test Passed, After ${NUMBER_LOOP} requests with a Dynamic Solution in SSL mode : Version Release"><![CDATA[Test passed, After ${NUMBER_LOOP} request with a Dynamic Solution in SSL mode : Version Release]]></success>
  </testcase>
EOF

#[INFO]----------------Number 41 / true-------

else
    echo ":0 : Test got an error"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE41}-[Error]" passed="false" time="DV">
     <error message="Test Error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 41 / Error------

fi

#[INFO]-------------Score for Junit----------     

else
    echo "${LOCALHOST}:${port[3]} isn't OK"

#[INFO]-------------Score for Junit-----------

SCORE41_1=1

if [ "${SCORE41_1}" -eq "1" ]
 
then
    echo ":0 : Test Failed"

#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE41}-[Failed]" passed="false" time="DV">
     <failure message="Test Failed, After ${NUMBER_LOOP} request with Dynamic Solution in SSL mode : Version Release"><![CDATA[Test Failed, After ${NUMBER_LOOP} request with a Dynamic Solution in SSL mode : Version Release]]></failure>
  </testcase>
EOF

#[INFO]----------------Number 41_1 / false-------

else
    echo ":1 : Test got an error"
#[INFO]--------Junit File creation-----------

#Wrote in the Junit File
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
  <testcase name="${TESTCASE41}-[Error]" passed="false" time="DV">
     <error message="Test error"><![CDATA[Test Error]]></error>
  </testcase>
EOF

#[INFO]----------------Number 41_1 / Error-------

fi
#[INFO]-------------Score for Junit-----------  

fi

echo "[INFO]---------------Killing one WS Processus-------------------"

. ${HomeDirectory}${Directory}Functions

Kill_All_WS_PROC

echo "[INFO]---------------Killing one WS Processus-------------------"
echo "-----------------------------------------------------------"

echo "***------------------Report------------------***"

TIME_END=$(date +%s)
DIFF=$(( $TIME_END - $TIME_START ))
echo "Test suite took $DIFF seconds"

echo "***------------------Report------------------***"


#[INFO]--------Junit File creation----------

#Wrote in the Junit File, the end
cat >> ${HomeDirectory}${Directory}Junit-report/reportGoNoGoServer.xml <<EOF
</testsuite>
EOF

echo "[INFO]---------------END--------------------"

#Create a backup from script files

#[INFO]-----------------------------------------------------------
#
#Clean Logs Folders since last Day-
#
#[INFO]-----------------------------------------------------------

#. Functions

#ClearFile

#[INFO]-----------------------------------------------------------
#
#Clean Logs Folders since last Week 
#
#[INFO]-----------------------------------------------------------

#. Functions

#ClearFile

echo "Out"
exit 0
 
