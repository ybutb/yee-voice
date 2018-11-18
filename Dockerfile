ARG parent_image

FROM $parent_image

# Install pulse audio / development packages
RUN apt-get update && apt-get install g++ cmake libao4 libasound2-plugins \
    libpulse-dev libpulse0 libsox-fmt-pulse paman paprefs \
    pavucontrol pavumeter pulseaudio pulseaudio-module-bluetooth \
    pulseaudio-module-gconf pulseaudio-module-jack pulseaudio-module-lirc \
    pulseaudio-module-zeroconf pulseaudio-utils oss-compat git alsa-base alsa-utils -y

# Setting up ALSA
COPY asound.conf .

RUN cp -pf ./asound.conf /etc/asound.conf

# Install sphinxbase
RUN apt-get install autoconf libtool automake bison python-dev swig build-essential -y

RUN git clone https://github.com/cmusphinx/sphinxbase.git \
    && cd sphinxbase \
    && ./autogen.sh \
    && ./configure \
    && make \
    && make install \
    && cd ..

# Install pocketsphinx
RUN git clone https://github.com/cmusphinx/pocketsphinx.git \
    && cd pocketsphinx \
    && ./autogen.sh \
    && ./configure \
    && make clean all \
    && make check \
    && make install \
    && cd ..

ENV PYTHONPATH /usr/local/lib/python2.7/site-packages

# Install nodejs / npm
RUN apt-get install npm -y

RUN export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig \
    && pkg-config --modversion pocketsphinx

RUN apt-get install wget -y

# Installing proper cmake version
RUN mkdir ~/temp \
    && cd ~/temp \
    && wget https://cmake.org/files/v3.12/cmake-3.12.3.tar.gz \
    && tar -xzvf cmake-3.12.3.tar.gz \
    && cd cmake-3.12.3/ \
    && ./bootstrap \
    && make -j4 \
    && make install

# Install proper swig version
RUN cd ~/temp \
    && git clone https://github.com/swig/swig.git \
    && cd swig \
    && ./autogen.sh \
    && ./configure \
    && make \
    && make install \
    && apt remove swig2.0 -y

WORKDIR /var/www/localhost

RUN usermod -aG audio root

RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - \
    && apt-get install -y nodejs

CMD ["npm", "run", "run"]