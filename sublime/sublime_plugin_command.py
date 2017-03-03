import sublime, sublime_plugin
import os.path
import re


# Put in Packages/User
# To Run, open the sublime console with Ctrl-` (camel case)
# view.run_command('sublime_plugin')
class SublimePluginCommand(sublime_plugin.TextCommand):

    def replaceFn(self, matchObj):
        if matchObj.group(2): return matchObj.group(2).upper()
        else: return ''

    def run(self, edit):
        print("Running...")
        # (filepath, filename) = os.path.split(self.view.file_name())
        # fullpath = [filename]
        # path = ""
        #
        # while path != "project-path" or path == None:
        #     fullpath.insert(0, path);
        #     (filepath, path) = os.path.split(filepath)

        # Inject into buffer
        cursorPosition = self.view.sel()[0].begin()
        self.view.insert(edit, cursorPosition, "<!-- a comment -->")
