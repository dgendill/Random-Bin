REM Toggling between file names
@echo off
IF EXIST C:\f1.pac (
move C:\f1-disabled.pac
) ELSE (
move C:\f1.pac
)
