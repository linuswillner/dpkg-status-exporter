const debCtrlToJson = require('../src/debian-control-to-json')

module.exports = async () => {
  return debCtrlToJson(mockIndex)
}

/*
  The below extract from a real /var/lib/dpkg/status index includes a representative sample of
  all the things this program needs to deal with: Dependencies, versioned dependencies,
  alternates and reverse dependencies along with the obvious like names and descriptions
*/
const mockIndex = `
Package: libws-commons-util-java
Status: install ok installed
Priority: optional
Section: java
Installed-Size: 101
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 1.0.1-7
Description: Common utilities from the Apache Web Services Project
 This is a small collection of utility classes, that allow high
 performance XML processing based on SAX.
Original-Maintainer: Debian Java Maintainers <pkg-java-maintainers@lists.alioth.debian.org>
Homepage: http://ws.apache.org/commons/util/

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
`.trim()
