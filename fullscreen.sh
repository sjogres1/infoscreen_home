#/bin/sh

sudo rm -r ~/.cache/chromium/Default/Cache/*
{
DISPLAY=:0 chromium-browser --kiosk localhost
} &> /dev/null

#sleep 20s;
#xte "key F11" -x:0
