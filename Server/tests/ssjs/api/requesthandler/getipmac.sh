#!/bin/sh
ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}'