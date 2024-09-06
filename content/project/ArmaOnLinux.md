---
title: "Play Arma on Linux"
date: 2021-03-22T21:39:17+01:00
draft: false
---

## Preamble

A few months and improvements to Proton after its first release, i had the first known, good working Arma installation on Linux.

Since Proton 4.11 as good as all tweaks needed to run Arma became obsolete, and it became as easy as never before to play not only Arma and Steam Games, but also non-Steam games because of many Proton improvements being up streamed to Wine. You can check if your games are working on the Lutris website, the WineHQ and the ProtonDB websites.

With the release of Proton 6.3-8, the last major burden, BattleEye, is now working and we can play Arma 3 on Linux without **any** restriction!
As of 2023, the official Arma launcher also works on Linux using Proton.

This new guide is based on all the knowledge that got collected up until now. This guide will get continuous Updates

Last guide update: 2024-05-17 - removed outdated stuff

## Notice

**As of 2024, this guide is licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**

## Arma Reforger

### 1. Prepare (Reforger)

If you haven't done so yet, activate Steam Play for all Games in the global Steam settings. Refer to the "Prepare" Chapter of the Arma 3 Section on how to do so.

To play Arma Reforger on Linux, you'll just have to set your launch options to the following. (Refer to the Arma 3 Section again on how to do so.)

```sh
echo "%command%" | sed 's/ArmaReforger_BE.exe/ArmaReforgerSteam.exe/' | sh

```

Thats it, it should be playable now, assuming you have downloaded it.

Credits for this go to HER0#0927 on Discord.

## Arma 3

### 0. Disclaimer

**I don't take any responsibility if any (im)possible damage occurs on your hardware, software or your health, if you lose your job due to you being late because your alarm clock didn't ring or if a thermonuclear war breaks out. You are responsible for all changes you are making! Please read everything carefully and if needed twice to prevent misunderstandings. You can contact me via the information provided on my [website](https://ninelore.github.io)**

### 1. Prepare (Arma 3)

You should have

- Basic terminal/Bash knowledge
- All software and drivers up to date
- wine-staging installed (make sure all dependencies are installed)
- For BattleEye: Steam beta client (switch via steam settings)

### 2. Downloading Arma

Do the following before starting to download Arma!

Go into Steam settings and then click on "Steam Play". Check both boxes and choose the newest Proton version available (not Experimental)
{{< image src="/pictures/armalinux/steamplaysettings.png" set="fit" >}}

Now go into the Steam game settings menu and add the `%command% -nolauncher` to the launch options
{{< image src="/pictures/armalinux/armalaunchoptions.png" set="fit" >}}

Then go into the "Compatibility" Tab and set the Proton version again
{{< image src="/pictures/armalinux/armaprotonversion.png" set="fit" >}}

Now you can start the downlaod of Arma 3.

### 3. Starting and playing the Game

When the download is finished, start the game once and exit it again after reaching the main menu.

Now you need a launcher to manage Mods and launch options. I highly recommend using the [Arma 3 Unix Launcher by muttleyxd](https://github.com/muttleyxd/arma3-unix-launcher) instead of the official launcher.
Download: [Arch Linux AUR](https://aur.archlinux.org/packages/arma3-unix-launcher-bin) | [as .deb or .AppImage](https://github.com/muttleyxd/arma3-unix-launcher/releases/latest)

This is everything you need to play Arma 3 on Linux without ACRE2 or TFAR. Congratulations to get this far. ;)

### 4. The Helper script and ACRE2 / TFAR

**Important: Make sure to start Arma at least once into the main menu before moving on!**

#### 4.1 The Helper script

The Arma3Helper Script (formerly Arma3TS.sh) is reqired to run ACRE2 or TFAR on Linux. It also provides utility to make some troubleshooting (see Chapter 5) easier.

Place the `Arma3Helper.sh` [provided here (click me)](https://github.com/ninelore/armaonlinux) in your home directory for easy access.  
Edit the file and adjust the settings inside the marked area in that file according to the comments.

#### 4.2 Preperation for ACRE2 / TFAR

The Arma3Helper script provides a wrapper for winetricks that will set the wineprefix to Arma's compatdata folder after you adjusted the settings inside the script.  
To install a variety of DLLs/features that are required for ACRE2 / TFAR as well as fix alot of common issues, run the following command.  
`./Arma3Helper.sh winetricks Arma`  
For transparency: The DLLs/features installed are `d3dcompiler_43`, `d3dx10_43`, `d3dx11_43`, `mfc140` and `xact_x64`.

#### 4.3 ACRE2 / TFAR

Download TeamSpeak 3 for **Windows x64(!)**.  
Install TeamSpeak 3 into the compatdata directory of Arma by running  
`./Arma3Helper.sh install path/to/TS3-Installer.exe`.  
**IMPORTANT: In the TeamSpeak installer, select "Install for all Users" and leave the default path!!!**

After the insallation you can start TeamSpeak 3 by just running `./Arma3Helper.sh` **After you have started Arma**.

Before joining a TeamSpeak 3 server, disable the "Gamepad and Joystick Hotkey Support" plugin to prevent it from crashing.

For TFAR you need to manually copy the plugin dll's folders into your TeamSpeak 3 path (`c/Program Files/TeamSpeak 3 Client/plugins/`). Note that a `.ts3plugin` file is nothing but a ZIP with a different extension. Just unzip it with the tool of your choice.

### 5. Troubleshooting

Note: Some troubleshooting steps require the Arma3Helper script. See Chapter 4.1 for more info. Alternatively you can use [protontricks](https://github.com/Matoking/protontricks).

#### 5.1 I have problems with sound and/or thermal vision

See Chapter 4.2

#### 5.2 I still have problems with sound (**only for Proton 6.3 and older!**)

You have 2 options to achieve the same fix.  
You can set the enviromental variable `WINEDLLOVERRIDES="xaudio2_7=n"` in the Steam startup options (or via the Arma 3 Unix Launcher).  
{{< image src="/pictures/armalinux/armalaunchoptions-xaudio.png" >}}  
The other way is to set it via `./Arma3Helper.sh winecfg` and then under "Libraries".  
{{< image src="/pictures/armalinux/winecfg-xaudio.png" >}}

#### 5.3 Arma doesnt open or crashes instantly

Run the following command depending on your linux distro to install possibly missing dependencies  
Arch Linux based: `sudo pacman -S vulkan-tools`  
Debian/Ubuntu based: `sudo apt install mesa-vulkan-drivers vulkan-utils`  
Fedora: `sudo dnf install mesa-vulkan-drivers vulkan-tools`

#### 5.4 Command X returns error Y

Double check for software and driver updates as well as the spelling of the commands and the settings. If you still got errors continue to Chapter 5.99

#### 5.99 I still have a problem

More help is available on the [ArmaOnUnix Discord](https://discord.gg/p28Ra36)  
**Important:** Do not open a issue in [ninelore/armaonunix](https://github.com/ninelore/armaonlinux) before asking on the Discord!

### 6. Increasing Performance

#### 6.1 Additional Launch Parameters

Try a combination of one or more of the following to see what works for you the best. Set them as desired via the Arma 3 Unix Launcher or add them to the Steam command line.

- `-noSplash` No splash screens. Game startup speedup.
- `-skipIntro` Static Background for main manu. Minor game startup speedup.
- `-world=empty` Load an empty world for main menu background. Significant game startup speedup.
- `-exThreads=3` for 2 CPU cores or `-exThreads=7` for 4 cores or more; Offloads some work onto different threads. Usually a minor FPS Increase.
- `-enableHT` enables use of logical cores instead of only physical cores. May improve or harm FPS depending of your PC. Try if it works for you. This is overwritten by `-cpuCount`.
- `-hugepages` Enable huge page size for memory allocation. Try if it works for you.
- `-noLogs` Not having to write logs may increase performance, but be sure to disable this if you need to troubleshoot problems.
- `-malloc=<string>` Use a particular Memory Allocator (for advanced users, more info [here](https://community.bistudio.com/wiki/Arma_3:_Custom_Memory_Allocator)).
- `-cpuCount=1` Reportedly solves some issure for some people but might decrease performance. NOTE: This should be fixed on the arma perf branch and will find its way into the release branch of Arma soon.

#### 6.2 General Linux gaming optimizations

Note: These Tips aren't exclusive to Arma, but will apply to almost all Linux gaming.

- Advanced users can build a customized kernel for their system with the help of [linux-tkg](https://github.com/Frogging-Family/linux-tkg) for performance gains

### Epilogue

This Guide was first released in the [Armaworld Forums](https://armaworld.de/forum/thread/4992-ger-eng-arma-on-linux-ninelore-s-guide-acre-tfar-working/?postID=39909#post39909) by me. If you have Feedback or Questions dont hesitate to open a Issue.
