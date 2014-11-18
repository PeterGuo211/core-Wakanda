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

killServer() 
{
if [ -f /tmp/pidWakanda.txt ]; then
    for i in $(grep '[0-9]\{4\}' /tmp/pidWakanda.txt)
    do
        sudo kill -9 $i > /dev/null 2>&1
        echo "Processus with PID : ${i} killed for Release Version"
        return $?
    done
else
    echo "File pidWakanda.txt doesn't exist"
    return 1
fi
}

removeFile()
{
if rm /tmp/pidWakanda.txt; then
    echo "File pidWakanda.txt is removed"
    return 0
else
    echo "File pidWakanda.txt is already removed"
    return 1
fi
}


command=${1}
shift
"${command}" "$@"
ret=$?

if [ "${ret}" -ne 0 ]; then
	return ${ret}
fi


