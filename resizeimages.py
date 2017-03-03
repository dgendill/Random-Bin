#-------------------------------------------------------------------------------
# Name:        resizeimages
# Purpose:     resizes all images of a certain type inside a directory
#
# Author:      Dominick Gendill
# Website:     http://dgendill.com
#
# Created:     March 13, 2011
# Copyright:   (c) Dominick Gendill 2011
# Licence:     Public Domain
#-------------------------------------------------------------------------------
#!/usr/bin/env python
'''
NAME

    resizeimages - resizes images inside a directory
    Coded by Dominick Gendill
    Date: March 12, 2011
    Version 1.0


SYNOPSIS

    imageresize [-d ] or [--directory=]
                [-w ] or [--width=]
                [-h ] or [--height=]
                [-e ] or [--extension=]
                [-o ] or [--ovewrite]


OPTIONS

    --directory     Optional.  Default is the current working directory.

    --width         Optional.  If not set, the image's width will be set
                    to 800 or be auto caluclated based on the given height.

    --height        Optional.  If not set, the height is automatically
                    calculated to maintain the image's aspect ratio.

    --extension     Required.  You can specify any combination of the
                    following seperated by commas: jpg, png, gif, jpeg.
                    You can also pass the argument 'all' to include all image
                    types.

    --overwrite     If set, the tranformed image will overwrite the old file.
                    if not set, 'rewrite-' will be prepended to the file name.

    --help          Display this how to manual.

EXAMPLE

    # Resizes png and jpg images in the current directory.
    resizeimages -w 500 -e png,jpg

    # Resizes jpg and gif images in the current directory.
    resizeimages --width=200 --height=200 --extension=jpg,gif

    # Resizes all jpeg images in the parent directory.
    resizeimages --directory=../ --width=100 --extension=jpeg


RESOURCES

    You will need the Python Imaging Library to run the script.

    Python Imaging Libary (PIL)
    http://www.pythonware.com/products/pil/

'''

from PIL import Image
import getopt
import os
import sys
import re

def getRatio (width, height):
    return float(width)/float(height)

def getHeight (ratio, width):
    return int(float(width)/ratio)

def getWidth (ratio,height):
    return int(ratio*float(height))

try:
    optlist, args = getopt.getopt(sys.argv[1:],"d:w:h:e:o",["directory=","width=", "height=","extension=","overwrite","help"])
    isWidthSet = False
    isHeightSet = False
    folder = os.getcwd()
    ext = ""
    overwriteOld = False
    width = 800
except getopt.GetoptError, err:
    print str(err)
    sys.exit(2)

for opt, arg in optlist:
    if opt in ("-d", "--directory"):
        folder = arg
    elif opt in ("-w", "--width"):
        isWidthSet = True
        width = arg
    elif opt in ("-h", "--height"):
        isHeightSet = True
        height = arg
    elif opt in ("-e","--extension"):
        if arg=="all":
            ext='.*\.jpg|.*\.png|.*\.jpeg|.*\.gif'
            continue
        for fileType in arg.split(","):
            ext = ext + ".*\." + fileType + "|"
        ext = ext[:-1]
        if ext=="":
            print "No image extension specified"
            sys.exit()
    elif opt in ("-o","--overwrite"):
        overwriteOld = True
    elif opt=="--help":
        print __doc__
        sys.exit()

print "Resizing images in " + folder
print "Working with image extensions: " + ext
print "Overwrite flag is: " + ("ON" if overwriteOld else "OFF")
print "Image width will be: " + ("Auto Calculated" if  not isWidthSet else width)
print "Image height will be: " + ("Auto Calculated" if not isHeightSet else height)

if isWidthSet!=False and isHeightSet!=False:
    # If the user has set both the width and height, we will use
    # the same ratio for every image
    ratio = getRatio(width, height)

re.IGNORECASE
files = []
for x in os.listdir(folder):
  if re.match(ext, x):
    files.append(folder + "\\" + x)

for file in files:
    img = Image.open(file)
    size = img.size

    try:
        # If the user has set the width and height the ratio
        # will be set and remain the same for every image
        ratio
    except NameError:
        ratio = float(size[0])/float(size[1])
        if isWidthSet==False and isHeightSet==False:
            #No dimensions given.
            height = getHeight(ratio,width)
        elif isWidthSet:
            #Only width is given
            height = getHeight(ratio,width)
        elif isHeightSet:
            #Only height is given
            width = getWidth(ratio,height)

    img = img.resize((int(width),int(height)), resample=1) # resample=1 ANITALIAS

    if overwriteOld==False:
        head, tail = os.path.split(file)
        file = head + os.sep + "resized-" + tail

    img.save(file)
    print "Resized image saved as: " + file
    if (isWidthSet==True ^ isHeightSet==True) or (isWidthSet==False and isHeightSet==False):
        # If either the width or height is set, we will undefine ratio so it
        # can be recalculated.  If neight the width or height is set, we will
        # undefine ratio so it can be recalculated
        del ratio

keypress = raw_input('--- Resizing Complete.  Press any key to continue. ---')
