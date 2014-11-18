#!/bin/sh
ifconfig eth0 | grep inet | grep -v inet6 | awk -F'[:B]' '{print $2}'