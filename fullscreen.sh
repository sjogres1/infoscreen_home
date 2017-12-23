#/bin/sh

sudo rm -r ~/.cache/mozilla/firefox/*.default/*
iceweasel localhost --display=:0 &
sleep 20s;
xte "key F11" -x:0
