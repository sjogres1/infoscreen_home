#/bin/sh

sudo rm -r ~/.cache/chromium/Default/Cache/*
chromium-browser localhost --display=:0 &
sleep 20s;
xte "key F11" -x:0
