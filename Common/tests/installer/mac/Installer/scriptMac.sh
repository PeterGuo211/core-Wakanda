#!/bin/bash
echo "y" | hdiutil attach "$1" > $WORKSPACE/license.txt
hdiutil info