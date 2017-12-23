# infoscreen_home
Infoscreen that shows real time bus schedules at my house
Infoscreen RaspberryPi documentation
Tuukka Rouhiainen & Sauli Sj¨ogren
13.12.2016
1 Description
This is short documentation of RaspberryPi‘s settings and installed packages
for Infoscreen which is running in Startup Sauna.
2 IP addresses
These IP’s aren’t static so they doesn’t necessarily hold.
Left: 10.100.14.75
Right: 10.100.28.220
3 Installed packages
cec-utils - This package is to control CEC (Consumer Electronic Control) supported
TV via RaspberryPi.
unclutter - Used to remove mouse cursor.
xautomation
iceweasel
4 Config files
4.1 Crontab
To edit crontab, write crontab -e.
#S h u t t i n g s c r e e n down a t 0 2 : 0 0 and t u r n i n g i t on a t 0 6 : 0 0
0 2 ∗ ∗ ∗ /home/ pi / i n f o S c r e e n / s c r i p t s / t o g gl eM o ni t o r . sh o f f </dev / n u l l 2>&1
0 6 ∗ ∗ ∗ /home/ pi / i n f o S c r e e n / s c r i p t s / t o g gl eM o ni t o r . sh on </dev / n u l l 2>&1
#S c r i p t t o make s u re t h a t newe s t e v e n t s are shown
0 3 ∗ ∗ ∗ sudo k i l l $ ( pgrep i c e w e a s e l )
2 3 ∗ ∗ ∗ python /home/ pi / i n f o S c r e e n / s i t e / j a v a s c r i p t / getEventsV4 . py >/dev / n u l l 2>&1
4 3 ∗ ∗ ∗ mv /home/ pi / e v e n t s . j s o n /home/ pi / i n f o S c r e e n / s i t e / j a v a s c r i p t / e v e n t s . j s o n >/dev / n u l l 2>&1
5 3 ∗ ∗ ∗ /home/ pi / i n f o S c r e e n / s c r i p t s / f u l l s c r e e n . sh
4.2 Autostart
In NOOBS autostart file is located at ∼ /.conf ig/lxsession/LXDE − pi
In Rasbian Pixel file is located at ∼ /.conf ig/lxsession/LXDE/autostart
@lxpanel −−p r o f i l e LXDE−pi
@pcmanfm −−de sk t op −−p r o f i l e LXDE−pi
@ x s c r e e n s a v e r −no−s pl a s h
@xset s o f f
@xset −dpms
@sudo x s e t s noblank
@ u ncl u t t e r
@/home/ pi / f u l l s c r e e n . sh
4.3 Fullscreen script
#/ b i n / sh
#i c e w e a s e l i n f o 2 . a a l t o e s . com −−p r i v a t e −window −−d i s p l a y =:0 &
sudo rm −r ˜ /. c ache / m o zill a / f i r e f o x / ∗ . d e f a u l t /∗
i c e w e a s e l l o c a l h o s t −−d i s p l a y =:0 &
s l e e p 1 0;
x te ” key F11” −x : 0
4.4 Script to toggle TV on/off
2
#! / b i n / ba sh −e
CMD=” $1 ”
function main {
i f [ ”$CMD” == ”on” ] ; then
echo ”on 0 ” | cec−c l i e n t −s
e l i f [ ”$CMD” == ” o f f ” ] ; then
echo ” standby 0 ” | cec−c l i e n t −s
f i
ex it 0
}
main
5 Facebook events
Python script requires tokens given file facetoken.conf. Format is:
[FACEBOOK]
app_id:XXX
app_secret:XXX
Current fetched Facebook events are from: aaltoes, sosaaltoes, startupsauna
You can change them in getEventsV4.py
3
