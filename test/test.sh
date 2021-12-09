#!/bin/bash

echo $(date +"%b %d %Y %H:%M:%S.%N")
echo "test start"

for i in {1..100}
do
        nohup sh _src.sh $i >> ./log.txt &>/dev/null &
done

wait

echo $(date +"%b %d %Y %H:%M:%S.%N")
echo "test done"