---
title: "Arma on Linux"
date: 2021-03-22T21:39:17+01:00
draft: false
---

### Preamble:

A few months and improvements to Proton after its first release, i had the first known, good working Arma installation on Linux.

Since Proton 4.11 as good as all tweaks needed to run Arma became obsolete, and it became as easy as never before to play not only Arma and Steam Games, but also non-Steam games because of many Proton improvements being up streamed to Wine. You can check if your Games are working on the Lutris Website, the WineHQ and the ProtonDB Websites.

With the release of Proton 6.3-8, the last major burden, BattleEye, is now working and we can play Arma 3 on Linux without **any** restriction!  
The only flaw is the non-working original Launcher, which is no problem due to the excellent work of some amazing people that made amazing 3rd-party launchers.

This new Guide is based on all the knowledge that got collected up until now. This Guide will get continuous Updates

### 0. Disclaimer

**I don't take any responsibility if any (im)possible damage occurs on your hardware, software or your health, if you lose your job because you were late because your alarm clock didn't ring or if a thermonuclear war breaks out. You are responsible for all changes you are making! Please read everything carefully and if needed twice to prevent misunderstandings. You can contact me via the information provided on my [website](https://ninelore.github.io)**

### 1. Prepare

You should have
- Basic terminal/Bash knowledge
- All software and drivers up to date
- wine-staging (make sure all dependencies are installed)
- For BattleEye: Steam beta client (switch via steam settings)

### 2. Downloading Arma

Do the following before starting to download Arma!

Go into Steam settings and then click on "Steam Play". Check both boxes and choose the newest Proton version available (not Experimental)
{{< image src="/pictures/armalinux/steamplaysettings.png" set="fit" >}}

Now go into the Steam game settings menu and add the `%command% -nolauncher` to the launch options
{{< image src="/pictures/armalinux/armalaunchoptions.png" set="fit" >}}

Then go into the "Compatibility" Tab and set the Proton Version again
{{< image src="/pictures/armalinux/armaprotonversion.png" set="fit" >}}

Now you can start the downlaod of Arma 3.  

### 3. Starting and playing the Game

When the download is finished, start the game once and exit it again after reaching the main menu.

Now you need a Launcher to manage Mods and launch options. I highly recommend using the [Arma 3 Unix Launcher by muttleyxd](https://github.com/muttleyxd/arma3-unix-launcher).  
Download: [Arch Linux AUR](https://aur.archlinux.org/packages/arma3-unix-launcher-bin) | [as .deb or .AppImage](https://github.com/muttleyxd/arma3-unix-launcher/releases/latest)

This is everything you need to play Arma 3 on Linux without ACRE2 or TFAR. Congratulations to get this far. ;)

### 4. The Helper script and ACRE2 / TFAR

#### 4.1 The Helper script
The Arma3Helper Script (formerly Arma3TS.sh) is reqired to run ACRE2 or TFAR on Linux. It also provides utility to make some Troubleshooting (see Chapter 5) easier.

Place the `Arma3Helper.sh` [provided here (click me)](https://github.com/ninelore/armaonlinux) in your home directory for easy access.  
Edit the file and adjust the settings inside the marked area in that file according to the comments.

#### 4.2 Preperation for ACRE2 / TFAR
The Arma3Helper script provides a wrapper for winetricks that will set the wineprefix to Arma's compatdata folder after you adjusted the settings inside the script.  
To install a variety of DLLs/features that are required for ACRE2 / TFAR as well as fix alot of common issues, run the following command.  
`./Arma3Helper.sh winetricks Arma`
For transparency: The DLLs/features installed are `d3dcompiler_43`, `d3dx10_43`, `d3dx11_43`, `mfc140` and `xact_x64`.

#### 4.3 ACRE2 / TFAR
Download a recent **Windows Installer(!)** of Teamspeak 3.  
Install Teamspeak into the compatdata directory of Arma by running `./Arma3TS-*.sh install path/to/TS3-Installer.exe`.  
**IMPORTANT: In the Teamspeak Installer, select "Install for all Users" and leave the default path!!!**

After the Insallation you can start TeamSpeak by just running `./Arma3TS-*.sh` **After you have started Arma**.

### 5. Troubleshooting
Note: Some troubleshooting steps require the Arma3Helper script. See Chapter 4.1 for more info. Alternatively you can use [protontricks](https://github.com/Matoking/protontricks).

#### 5.1 I have problems with sound and/or thermal vision  
See Chapter 4.2 


#### 5.2 I still have problems with sound
You have 2 options to achieve the same fix.   
Either you can set the env variable `WINEDLLOVERRIDES="xaudio2_7=n"` in the Steam startup options (or via the Arma 3 Unix Launcher).  
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

#### 5.98 Use the right Linux Distro
Note: This is only a recommendation. If you want to stick to distro X then feel free to, however keep in mind that you can run into issues which we cannot be easily solve in Chapter 5.99.

What I mean by that is **not** something like "go Arch" or something similar, but to avoid certain kinds of distros that are known to cause problems yb their design.  
The Distros to avoid are unofficial derivates of Arch Linux, Ubuntu or Debian that are using altered package repositories, as they are known to cause dependency issues (especially if you throw PPA's into the mix) and are generally hard to troubleshoot.  
Worst offenders in these terms are (absolutely non-exhaustive):
-  Arch based: Manjaro
-  Ubuntu based: Pop! OS, elementaryOS

Recommended distros are
- [Ubuntu](https://ubuntu.com/desktop) or an [official flavour](https://ubuntu.com/download/flavours) (excluding Studio for practical reasons)
- Arch Linux or one of the following derivates that do not touch package repositories
  - [EndeavourOS](https://endeavouros.com/)
  - [Garuda Linux](https://garudalinux.org/)

#### 5.99 I still have a problem
More help is available on the [ArmaOnUnix Discord](https://discord.gg/p28Ra36)

### 6. Increasing Performance

#### 6.1 Additional Launch Parameters
Try a combination of the following to see what works for you the best. Set them as desired via the Arma 3 Unix Launcher or add them to the Steam command line.
-  `-noSplash` No splash screens. Very minor game startup speedup.
-  `-skipIntro` Static Background for main manu. Minor game startup speedup.
-  `-world=empty` Load an empty world for main menu background. Significant game startup speedup.

-  `-exThreads=3` for 2 CPU cores or `-exThreads=7` for 4 cores or more; Offloads some work onto different threads. usually minor FPS Increase
-  `-enableHT` enables use of logical cores instead of only physical cores. May improve or harm FPS depending of your PC. Try if it works for you. This is overwritten by `-cpuCount`.
-  `-hugepages` Enable huge page size for memory allocation. Try if it works for you.
-  `-noLogs` Not having to write logs may increase performance, but be sure to disable this if you need to troubleshoot problems.
-  `-malloc=<string>` Use a particular Memory Allocator (for advanced users)(More infos [here](https://community.bistudio.com/wiki/Arma_3:_Custom_Memory_Allocator)).

-  `-cpuCount=1` Reportedly solves some issure for some people but might decrease performance by a noticable amount. NOTE: This is fixed on the arma perf branch and will find its way into the release branch of Arma soon.

#### 6.2 General Linux gaming optimizations
Note: These Tips aren't exclusive to Arma, but will apply to almost all Linux gaming.
- Use a non-standard kernel:
  - Arch Linux oficially supports the `linux-zen` kernel in its repositories
  - Debian / Ubuntu users can try the [Liquorix](https://liquorix.net/) or [XanMod](https://xanmod.org/) kernels
  - Advanced users can build a customized kernel for their system with the help of [linux-tkg](https://github.com/Frogging-Family/linux-tkg)
- Use different desktop enviroment or optimize a slow one:
  - KDE Plasma users can replace `kwin` with `kwin-lowlatency`
  - You might want to switch to a slimmer desktop enviroment like XFCE, LXQt or a bare window manager setup (advanced users)

### Epilogue

This Guide was first released in the [Armaworld Forums](https://armaworld.de/forum/thread/4992-ger-eng-arma-on-linux-ninelore-s-guide-acre-tfar-working/?postID=39909#post39909) by me. If you have Feedback or Questions dont hesitate to open a Issue.
