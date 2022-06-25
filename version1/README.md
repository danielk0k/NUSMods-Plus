# NUSMods-Plus

A Chrome extension for saving session data on <https://nusmods.com/>. Take your module timetable that you spent so long optimising with you on any Chrome browser. Simple save and load the session data which will be synced with your Google account.

> **Notice: Version 1.0 uses Chrome's sync function to persist the timetable data. However, due to the limitation of `chrome.storage.sync`, the data is not accessible across different browsers. See the improved Version 2.0 with Supabase integration.**

## User Guide

1. Ensure that you are signed in to your Chrome browser and have enable sync.
   <img alt="Chrome sync account enabled" src="/screenshots/shot1.png" width="60%" height="60%">
2. Download the zip file [here](https://github.com/danielk0k/NUSMods-Plus/archive/refs/heads/main.zip)
3. Unzip the file
4. Navigate to your extensions under settings and switch to developer mode
5. Click on "Load unpacked" and select the unzipped folder
6. Pin the extension to your toolbar for easy access

## Reference

Much of the code was referenced to Google's [extension documentation](https://developer.chrome.com/docs/extensions/).
