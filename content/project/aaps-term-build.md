---
title: "Build AndroidAPS in a terminal"
date: 2022-03-08T16:36:38+01:00
draft: false
---

This is a guide on how to build a signed [AndroidAPS](https://androidaps.readthedocs.io) APK from a terminal (headless) without Android Studio.  
A example use case for this would be building AAPS via SSH from your phone if you need a new apk for whatever reason while you have no physical access to your PC.

Note: This Guide is a draft that aims to be integrated into the AAPS Wiki once finished!

## Ubuntu Setup

### apt Deps: 
Get these packages from your package manager
`sudo apt install wget git openjdk-8-jre-headless openjdk-11-jre-headless zip unzip zipalign gradle`

### non-pkg Deps: 
Run these commands to get the Android command line tools
```
wget https://dl.google.com/android/repository/commandlinetools-linux-6200805_latest.zip
mkdir android-sdk
unzip commandlinetools-linux-6200805_latest.zip -d $HOME/android-sdk
```

### Setup Enviromental Variables
Add this to your `.bashrc` if using bash or to the rc file of your shell.
```bash
export ANDROID_HOME="$HOME/android-sdk"
if [ -n "$ANDROID_HOME" ] ; then
	PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$PATH"
fi
```
Restart your Terminal/Shell

### Setup SDK
Run these commands to install the SDK and build tools
```
sdkmanager --sdk_root=${ANDROID_HOME} "tools"
sdkmanager --update
sdkmanager "build-tools;28.0.3" "platform-tools" "platforms;android-28" "tools"
sdkmanager --licenses
```


## Windows Setup

### WIP
- install git
- install android sdk tools and stuff
- add both of above to PATH


## Build

### Clone AAPS git
```
git clone https://github.com/nightscout/androidaps.git
cd AndroidAPS
```

### Build
Note: Unlike in Android Studio, this will always build both the main apk and the wear apk.
```
./gradlew :app:assembleFullRelease
```
The `.apk`'s can be found in:
- Main app: `app/build/outputs/apk/full/release/app-full-release-unsigned.apk`
- Wear app: `wear/build/outputs/apk/full/release/wear-full-release-unsigned.apk`

### Sign
#### Create a single keystore file if not done already
Give it a password, your Name and leave everything else empty. Confirm by typing "yes".
```
keytool -genkey -v -keystore ~/my-aaps-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias aaps1
```

#### Align the apk's and sign them
```
cd app/build/outputs/apk/full/release/
# align
zipalign -v -p 4 app-full-release-unsigned.apk app-full-release-unsigned-aligned.apk
# sign
apksigner sign --ks ~/my-aaps-key.jks --out app-full-release-signed.apk app-full-release-unsigned-aligned.apk
# (optional) verify successful signing
apksigner verify --verbose app-full-release-signed.apk
```

#### (Optional) Repeat align and sign for wear
```
cd wear/build/outputs/apk/full/release/
# align
zipalign -v -p 4 wear-full-release-unsigned.apk wear-full-release-unsigned-aligned.apk
# sign
apksigner sign --ks ~/my-aaps-key.jks --out wear-full-release-signed.apk wear-full-release-unsigned-aligned.apk
# (optional) verify successful signing
apksigner verify --verbose wear-full-release-signed.apk
```

## Install app
Copy the apk to your phone via your preferred way and install it.