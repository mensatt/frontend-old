# Dependency licenses

## What is this?

This is a list of all the various licenses that our dependencies use and information (with source) about why they are compatible with GNUGPLv3.  
All information below should be treated as "at the time of writing".

## Installing, removing or updating dependencies

**Please make sure to update the [detailed license list](/DEPLICENSESDETAILS) and the table below whenever you change something regarding dependencies.**

### Unix-like

On UNIX-like systems you can update the [detailed license list](/DEPLICENSESDETAILS) with:

```
yarn unix:dep-licenses-update
```

and can quickly generate the first column of the table below with

```
yarn unix:dep-licenses-summary
```

### Windows

On Windows you can update the [detailed license list](/DEPLICENSESDETAILS) by running

```
yarn licenses list > DEPLICENSESDETAILS
```

and removing the `yarn licenses` and `Done in...` lines manually.

Similarly you can generate the first column of the table below by removing all lines not starting with `├` or `└` (regex: `^[^├└].*\n`).

## Summary

| License                   | Compatibility (with source)                                                                                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (AFL-2.1 OR BSD-3-Clause) | BSD-3-Clause is [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#ModifiedBSD)                                                                                                                                       |
| (MIT OR Apache-2.0)       | MIT is [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#X11License)                                                                                                                                                 |
| (MIT OR CC0-1.0)          | MIT is [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#X11License)                                                                                                                                                 |
| (WTFPL OR MIT)            | MIT is [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#X11License)                                                                                                                                                 |
| 0BSD                      | [essentially Public Domain](<https://en.wikipedia.org/wiki/BSD_licenses#0-clause_license*(%22BSD_Zero_Clause_License%22)>) => [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#PublicDomain)                        |
| Apache-2.0                | [compatible with GNUGPLv3 ](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#apache2)                                                                                                                                                          |
| BSD-2-Clause              | [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#FreeBSD)                                                                                                                                                           |
| BSD-3-Clause              | [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#ModifiedBSD)                                                                                                                                                       |
| CC-BY-3.0                 | [should be compatible with GNUGPLv3](https://web.archive.org/web/20220724123842/https://joinup.ec.europa.eu/licence/compatibility-check/CC-BY-3.0/GPL-3.0-or-later)                                                                                                                        |
| CC-BY-4.0                 | [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#ccby)                                                                                                                                                              |
| CC0-1.0                   | [essentially Public Domain](https://creativecommons.org/publicdomain/zero/1.0/) => [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#PublicDomain)                                                                   |
| ISC                       | [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#ISC)                                                                                                                                                               |
| MIT                       | [compatible with GNUGPLv3](https://directory.fsf.org/wiki/License:X11)                                                                                                                                                                                                                     |
| MPL-2.0                   | [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#MPL-2.0)                                                                                                                                                           |
| Public Domain             | [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#PublicDomain)                                                                                                                                                      |
| Python-2.0                | [only package to use this license uses the GPL compliant part from Python-2.0.1)](https://github.com/nodeca/argparse/issues/160#issuecomment-782278150) => [compatible with GNUGPLv3](https://web.archive.org/web/20220720194527/https://www.gnu.org/licenses/license-list.en.html#Python) |
