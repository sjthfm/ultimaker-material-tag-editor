# Ultimaker Material Tag Editor

In the CURA file structure there are several “material.xml” files, which are linked to a particular material via a GUID. 

This functionality is used to point to materials based on a provided identifier from an NFC tag which is attached to a material reel.

A reel “PLA-Transparent” has a GUID of “532e8b3d-5fd4-4149-b936-53ada9bd6b85” which points to a material of the same GUID within the printer.

The aim of this project was to change the identifier in a way so that a tag can point to other materials.

## Stack

With thanks to...
  * Apache Cordova
    * cordova-plugin-file
    * cordova-plugin-whitelist
    * cordova-plugin-mifare-ultralight
    * jQuery
    * Onsen UI 2

## Issues

The following issues do not affect Ultimaker branded materials, and probably won’t affect custom materials provided they point to an existing GUID on the printer.

* Writing an unknown GUID may cause the printer to crash with [ES27](https://ultimaker.com/en/resources/52525-unspecified-error/)

## Release
* [Android] - See /apk/app-debug.apk

## Contributing
Pull requests welcome.

* iOS version otw. 

## License
[MIT](https://choosealicense.com/licenses/mit/)