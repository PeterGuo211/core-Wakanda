#!/bin/bash

echo "
 [INFO]-------------------------------------
 [INFO]
 [INFO]
 [INFO] 4D | Auto Test Mac | Wakanda Server 
 [INFO] Launcher Shell Script
 [INFO]
 [INFO]
 [INFO]--------------------------------------
"

#[INFO]--------------------------------------Global V Local---------------------------------------------
#Global Variable

source Config.sh $1 $2

DATELOG=$(date +%d%m%Y) 
LOGFILE="${HomeDirectory}${Directory}global_log_${DATELOG}/output_log_${DATELOG}/logfile.log"
host="127.0.0.1"
port="8080"
uri="rpc/"
contentType='Content-Type: application/json-rpc; charset=utf-8'
acceptType='Accept: application/json-rpc'
acceptEncoding='Accept-Encoding: Accept-Encoding: gzip,deflate'
#[INFO]------------------------------------Global V Local-----------------------------------------------------

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for Global Log's folder with all folder for each type of logs
if [ -e global_log_${DATELOG} ]
then
 echo "Log's Global Folder is already there..."
else
 echo "We are creating a new Global log folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for Log's Solution folder with log's solution files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/solution_log_${DATELOG} ]
then
 echo "Log's Solution Folder is already there..."
else
 echo "We are creating a new log's Solution folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/solution_log_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for core's folder with core files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/coreFiles_${DATELOG} ]
then
 echo "Core's Folder is already there..."
else
 echo "We are creating a new core folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/coreFiles_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for HTTP log's folder (Solution + HTTP)
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/HTTPSOL_log_${DATELOG} ]
then
 echo "HTTP's Folder is already there..."
else
 echo "We are creating a new HTTP Log folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/HTTPSOL_log_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for tmp's folder with GET files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG} ]
then
 echo "tmpGET's Folder is already there..."
else
 echo "We are creating a new tmpGET folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for GetSolutionServer's folder with GET files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetServer ]
then
 echo "GetSolutionServer's Folder is already there..."
else
 echo "We are creating a new GetSolutionServer folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetServer
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for GetSolution's folder with GET files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution ]
then
 echo "GetSolution's Folder is already there..."
else
 echo "We are creating a new GetSolution folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolution
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for GetSolutionSSL's folder with GET files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL ]
then
 echo "GetSolutionSSL's Folder is already there..."
else
 echo "We are creating a new GetSolutionSSL folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/SimpleGetSolutionSSL
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for GetIP's folder with GET files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/GetPrivateIP ]
then
 echo "GetIP's Folder is already there..."
else
 echo "We are creating a new GetIP folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/GetPrivateIP
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for GetIPSSL's folder with GET files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/GetPrivateIPSSL ]
then
 echo "GetIPSSL's Folder is already there..."
else
 echo "We are creating a new GetIPSSL folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpGET_${DATELOG}/GetPrivateIPSSL
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for tmp's folder with JSON files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG} ]
then
 echo "tmpJSON's Folder is already there..."
else
 echo "We are creating a new tmpJSON folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for Rest's folder with JSON files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}/Rest ]
then
 echo "Rest's Folder is already there..."
else
 echo "We are creating a new Rest folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}/Rest
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for RestSSL's folder with JSON files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}/RestSSL ]
then
 echo "RestSSL's Folder is already there..."
else
 echo "We are creating a new RestSSL folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpJSON_${DATELOG}/RestSSL
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for tmp's folder with CURL files
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpCURL_${DATELOG} ]
then
 echo "tmpCURL's Folder is already there..."
else
 echo "We are creating a new tmpCURL folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/tmpCURL_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for Log's folder 
if [ -e ${HomeDirectory}${Directory}global_log_${DATELOG}/output_log_${DATELOG} ]
then
 echo "Log's Folder is already there..."
else
 echo "We are creating a new Log's folder..."
 mkdir ${HomeDirectory}${Directory}global_log_${DATELOG}/output_log_${DATELOG}
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]-------------------------------------------------------------------------------------------"
#Test for Junit-report's folder 
if [ -e ${HomeDirectory}${Directory}Junit-report ]
then
 echo "Junit-report's Folder is already there..."
else
 echo "We are creating a new Junit-report's folder..."
 mkdir ${HomeDirectory}${Directory}Junit-report
fi
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "[INFO]------------------------------Init Shell Script Launch-------------------------------------"
echo "Execute Main Shell Script, write logs for each date, get tmp files, display logs through Terminal"
./Main.sh $1 $2 "$3" 2>&1 >$LOGFILE ; cat $LOGFILE
echo "[INFO]-------------------------------------------------------------------------------------------"

echo "out"
exit 0