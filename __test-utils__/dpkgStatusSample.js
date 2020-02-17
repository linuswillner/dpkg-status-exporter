/*
  The below extract from a real /var/lib/dpkg/status index includes a representative sample of
  all the things this program needs to deal with: Dependencies, versioned dependencies,
  alternates and reverse dependencies along with the obvious like names and descriptions
*/

const sample = `
Package: base-files
Essential: yes
Status: install ok installed
Priority: required
Section: admin
Installed-Size: 419
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Version: 6.5ubuntu6.4
Replaces: base, dpkg (<= 1.15.0), lsb-release (<< 3.0-8), miscutils
Provides: base
Pre-Depends: awk
Breaks: initscripts (<< 2.88dsf-13.3)
Conffiles:
 /etc/debian_version 931870fda5e3f942afc004db670b3cae
 /etc/dpkg/origins/debian 731423fa8ba067262f8ef37882d1e742
 /etc/dpkg/origins/ubuntu ea35901c45553c3451f60476be94d2d8
 /etc/host.conf 89408008f2585c957c031716600d5a80
 /etc/issue 5213fbddfa79f1443d0f1419d2dfdd2e
 /etc/issue.net 5689c23b919d3d82209eaafa465066aa
 /etc/lsb-release 37023395a1273affd4cea893eb4768b1
 /etc/os-release 4753a44a35d6394c737f205510d42d50
 /etc/update-motd.d/00-header 4a1e6eed7a59f200b4267085721750a3
 /etc/update-motd.d/10-help-text 5064fb57493325202dded183ab0c4ebd
 /etc/update-motd.d/99-footer b0541f3c2e55c44149cd92bcc599c94c
Description: Debian base system miscellaneous files
 This package contains the basic filesystem hierarchy of a Debian system, and
 several important miscellaneous files, such as /etc/debian_version,
 /etc/host.conf, /etc/issue, /etc/motd, /etc/profile, /etc/nsswitch.conf,
 and others, and the text of several common licenses in use on Debian systems.
Original-Maintainer: Santiago Vila <sanvila@debian.org>

Package: bc
Status: install ok installed
Priority: standard
Section: math
Installed-Size: 320
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Version: 1.06.95-2
Depends: libc6 (>= 2.4), libncurses5 (>= 5.6+20071006-3), libreadline6, dpkg (>= 1.15.4) | install-info
Description: The GNU bc arbitrary precision calculator language
 GNU bc is an interactive algebraic language with arbitrary precision which
 follows the POSIX 1003.2 draft standard, with several extensions including
 multi-character variable names, an 'else' statement and full Boolean
 expressions.  GNU bc does not require the separate GNU dc program.
 Home page: http://directory.fsf.org/GNU/bc.html
Original-Maintainer: John G. Hasler <jhasler@debian.org>

Package: python-pkg-resources
Status: install ok installed
Priority: optional
Section: python
Installed-Size: 175
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Source: distribute
Version: 0.6.24-1ubuntu1
Replaces: python2.3-setuptools, python2.4-setuptools
Provides: python2.6-setuptools, python2.7-setuptools
Depends: python (>= 2.6), python (<< 2.8)
Suggests: python-distribute, python-distribute-doc
Conflicts: python-setuptools (<< 0.6c8-3), python2.3-setuptools (<< 0.6b2), python2.4-setuptools (<< 0.6b2)
Description: Package Discovery and Resource Access using pkg_resources
  The pkg_resources module provides an API for Python libraries to
  access their resource files, and for extensible applications and
  frameworks to automatically discover plugins.  It also provides
  runtime support for using C extensions that are inside zipfile-format
  eggs, support for merging packages that have separately-distributed
  modules or subpackages, and APIs for managing Python's current
  "working set" of active packages.
Original-Maintainer: Matthias Klose <doko@debian.org>
Homepage: http://packages.python.org/distribute
Python-Version: 2.6, 2.7

Package: tcpd
Status: install ok installed
Multi-Arch: foreign
Priority: optional
Section: net
Installed-Size: 132
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: tcp-wrappers
Version: 7.6.q-21
Replaces: libwrap0 (<< 7.6-8)
Depends: libc6 (>= 2.4), libwrap0 (>= 7.6-4~)
Description: Wietse Venema's TCP wrapper utilities
  Wietse Venema's network logger, also known as TCPD or LOG_TCP.
  .
  These programs log the client host name of incoming telnet,
  ftp, rsh, rlogin, finger etc. requests.
  .
  Security options are:
  - access control per host, domain and/or service;
  - detection of host name spoofing or host address spoofing;
  - booby traps to implement an early-warning system.
Original-Maintainer: Marco d'Itri <md@linux.it>

Package: memtest86+
Status: install ok installed
Priority: optional
Section: misc
Installed-Size: 2404
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Version: 4.20-1.1ubuntu1
Depends: debconf (>= 0.5) | debconf-2.0
Suggests: hwtools, memtester, kernel-patch-badram, memtest86, grub-pc | grub-legacy, mtools
Conffiles:
  /etc/grub.d/20_memtest86+ 6dc48efccb95680ab07349956a48fef3
Description: thorough real-mode memory tester
  Memtest86+ scans your RAM for errors.

Package: debconf
Status: install ok installed
Multi-Arch: foreign
Priority: required
Section: admin
Installed-Size: 609
Maintainer: Colin Watson <cjwatson@ubuntu.com>
Architecture: all
Version: 1.5.42ubuntu1
Replaces: debconf-tiny
Provides: debconf-2.0
Pre-Depends: perl-base (>= 5.6.1-4)
Recommends: apt-utils (>= 0.5.1), debconf-i18n
Suggests: debconf-doc, debconf-utils, whiptail | dialog | gnome-utils, libterm-readline-gnu-perl, libgtk2-perl (>= 1:1.130), libnet-ldap-perl, perl, libqtgui4-perl, libqtcore4-perl
Conflicts: apt (<< 0.3.12.1), cdebconf (<< 0.96), debconf-tiny, debconf-utils (<< 1.3.22), dialog (<< 0.9b-20020814-1), menu (<= 2.1.3-1), whiptail (<< 0.51.4-11), whiptail-utf8 (<= 0.50.17-13)
Conffiles:
  /etc/apt/apt.conf.d/70debconf 7e9d09d5801a42b4926b736b8eeabb73
  /etc/bash_completion.d/debconf 8fa1862734fbe54d7178aaaa419f5a11
  /etc/debconf.conf 8c0619be413824f1fc7698cee0f23811
Description: Debian configuration management system
  Debconf is a configuration management system for debian packages. Packages
  use Debconf to ask questions when they are installed.
Original-Maintainer: Debconf Developers <debconf-devel@lists.alioth.debian.org>

Package: python
Status: install ok installed
Priority: important
Section: python
Installed-Size: 658
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: python-defaults
Version: 2.7.3-0ubuntu2
Replaces: python-dev (<< 2.6.5-2)
Provides: python-ctypes, python-email, python-importlib, python-profiler, python-wsgiref
Depends: python2.7 (>= 2.7.3), python-minimal (= 2.7.3-0ubuntu2)
Suggests: python-doc (= 2.7.3-0ubuntu2), python-tk (= 2.7.3-0ubuntu2)
Breaks: python-bz2 (<< 1.1-8), python-csv (<< 1.0-4), python-email (<< 2.5.5-3), update-manager-core (<< 0.200.5-2)
Conflicts: python-central (<< 0.5.5)
Description: interactive high-level object-oriented language (default version)
  Python, the high-level, interactive object oriented language,
  includes an extensive class library with lots of goodies for
  network programming, system administration, sounds and graphics.
  .
  This package is a dependency package, which depends on Debian's default
  Python version (currently v2.7).
Homepage: http://www.python.org/
Original-Maintainer: Matthias Klose <doko@debian.org>

Package: install-info
Status: install ok installed
Multi-Arch: foreign
Priority: important
Section: doc
Installed-Size: 218
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: amd64
Source: texinfo
Version: 4.13a.dfsg.1-8ubuntu2
Replaces: texinfo (<< 4.13a.dfsg.1-2)
Depends: libc6 (>= 2.14)
Breaks: texinfo (<< 4.13a.dfsg.1-2)
Description: Manage installed documentation in info format
 The install-info utility creates the index of all installed documentation
 in info format and makes it available to info readers.
Original-Maintainer: Debian TeX maintainers <debian-tex-maint@lists.debian.org>
`.trim()

module.exports = {
  raw: sample,
  index: require('../src/debian-control-to-json')(sample)
}
