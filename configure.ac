# gnome-shell-extension-bugzilla
# Copyright (C) 2012  Federico Simoncelli <federico.simoncelli@gmail.com>
#
# This program is free software: you can redistribute it and/or modify
## it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

AC_PREREQ([2.68])
AC_INIT([gnome-shell-extension-bugzilla],
        [0.1],
        [federico.simoncelli@gmail.com])

AC_SUBST([EXTUUID], [bugzilla@bytenix.com])
AC_SUBST([gshellextdir],
	 ['${HOME}/.local/share/gnome-shell/extensions/${EXTUUID}'])

AM_INIT_AUTOMAKE()
AC_PATH_PROG([ZIP], [zip])

AC_CONFIG_FILES([Makefile])
AC_OUTPUT
