FROM resin/rpi-raspbian

# Install pulse audio / development packages
#RUN sudo apt-get install g++ cmake gstreamer0.10-pulseaudio libao4 libasound2-plugins libgconfmm-2.6-1c2 libglademm-2.4-1c2a libpulse-dev libpulse-mainloop-glib0 libpulse-mainloop-glib0-dbg libpulse0 libpulse0-dbg libsox-fmt-pulse paman paprefs pavucontrol pavumeter pulseaudio pulseaudio-dbg pulseaudio-esound-compat pulseaudio-esound-compat-dbg pulseaudio-module-bluetooth pulseaudio-module-gconf pulseaudio-module-jack pulseaudio-module-lirc pulseaudio-module-lirc-dbg pulseaudio-module-x11 pulseaudio-module-zeroconf pulseaudio-module-zeroconf-dbg pulseaudio-utils oss-compat -y

# Setting up ALSA
#RUN sudo \cp -pf /etc/asound.conf /etc/asound.conf.ORIG
#    echo 'pcm.pulse {
#        type pulse
#    }
#
#    ctl.pulse {
#        type pulse
#    }
#
#    pcm.!default {
#        type pulse
#    }
#
#    ctl.!default {
#        type pulse
#    }' | sudo tee /etc/asound.conf
#
# Install sphinxbase
# Install pocketsphinx
#