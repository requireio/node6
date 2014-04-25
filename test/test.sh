#!/bin/bash

trap "kill 0" SIGINT

declare -a arr=(
  "blocks"
  "generators"
)

declare -a testErrors=()

for i in "${arr[@]}"
do
  (../bin/node6 $i)
  if [ $? != 0 ] ; then
    testErrors+=("$i")
  fi
done

numErrors=${#testErrors[@]}

if ! [ $numErrors == 0 ] ; then
  for i in "${testErrors[@]}"
  do
    echo "Tests Failed: $i" >&2
  done

  echo "Test Suite Failed!" >&2
  exit 1
else
  exit 0
fi

