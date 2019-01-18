import glob
import os
from staticjinja import Site
from staticjinja.reloader import Reloader
from csscompressor import compress
from rjsmin import jsmin
import htmlmin
import sass
import time
import json


class WatchAction(Reloader):

    def __init__(self, site):
        super(WatchAction, self).__init__(site)
        self.elapsed = time.time()

    def event_handler(self, event_type, src_path):
        self.current = time.time()
        filename = os.path.relpath(src_path, self.searchpath)
        if self.should_handle(event_type, src_path) and (self.current - self.elapsed > 2):
            print("%s %s" % (event_type, filename))
            self.elapsed = time.time()
            self.site.render_action()


class RenderJinja(Site):

    def is_template(self, filename):
        is_template = super(RenderJinja, self).is_template(filename)
        return is_template and filename.endswith("jinja")

    def render_action(self):
        self.pre_render()
        self.render_templates(self.templates)
        self.post_render()

    def render(self, use_reloader=False):
        self.render_action()

        if use_reloader:
            self.logger.info("Watching '%s' for changes..." %
                             self.searchpath)
            self.logger.info("Press Ctrl+C to stop.")
            WatchAction(self).watch()

    def pre_render(self):
        '''
        Minify the JavaScript and Cascading Style Sheets
        before rendering of HTML files so that the
        minifed version can be included in rendered HTML.
        '''
        path_included = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                     "templates",
                                     "included")
        path_js = os.path.join(path_included, "js")
        minifed_js = os.path.join(path_js, "minified")
        path_css = os.path.join(path_included, "css")
        path_scss = os.path.join(path_css, "scss")

        # Compile and minify SCSS
        sass.compile(dirname=(path_scss, path_css), output_style='compressed')
        # Minify Javascript
        for filepath in glob.glob(os.path.join(path_js, '*.js')):
            filename = os.path.splitext(os.path.basename(filepath))[0]
            outname = os.path.join(minifed_js, filename + ".min.js")
            with open(outname, 'w+') as outfile, open(filepath, 'r') as infile:
                content = jsmin(infile.read())
                outfile.write(content)

    def post_render(self):
        '''
        Create the final minified HTML, JavaScript
        and Cascading Style Sheets that will be used
        for content delivery.
        '''
        # Read path
        path_built = os.path.dirname(os.path.abspath(__file__))
        path_css = os.path.join(path_built, "static", "css")
        path_js = os.path.join(path_built, "static", "js")
        # Write path
        path_root = os.path.join(path_built, os.pardir)
        css_root = os.path.join(path_root, "assets", "css")
        js_root = os.path.join(path_root, "assets", "js")
        # HTML
        for filepath in glob.glob(os.path.join(path_root, '*.jinja')):
            with open(filepath, 'r') as html_file:
                content = htmlmin.minify(html_file.read(),
                                         remove_empty_space=True,
                                         remove_comments=True)
                filename = os.path.splitext(os.path.basename(filepath))[0]
                outname = os.path.join(path_root, filename + ".html")
                if os.path.exists(outname):
                    os.remove(outname)
                with open(outname, 'w+') as outfile:
                    outfile.write(content)
            os.remove(filepath)
        # Cascading Style Sheets
        for filepath in glob.glob(os.path.join(path_css, '*.css')):
            filename = os.path.splitext(os.path.basename(filepath))[0]
            outname = os.path.join(css_root, filename + ".min.css")
            with open(filepath, 'r') as infile,  open(outname, 'w+') as outfile:
                content = compress(infile.read())
                outfile.write(content)
        # JavaScript
        for filepath in glob.glob(os.path.join(path_js, '*.js')):
            filename = os.path.splitext(os.path.basename(filepath))[0]
            outname = os.path.join(js_root, filename + ".min.js")
            with open(filepath, 'r') as infile, open(outname, 'w+') as outfile:
                content = jsmin(infile.read())
                outfile.write(content)


if __name__ == "__main__":
    build_dir = os.path.dirname(os.path.abspath(__file__))
    outpath = os.path.join(build_dir, os.pardir)
    data_dir = os.path.join(build_dir, "data")
    with open(os.path.join(data_dir, "experience.json"), 'r') as file:
        experiences = json.load(file)
    with open(os.path.join(data_dir, "meta.json"), 'r') as file:
        meta = json.load(file)
    with open(os.path.join(data_dir, "skills.json"), 'r') as file:
        skills = json.load(file)
    with open(os.path.join(data_dir, "quotes.json"), 'r') as file:
        quotes = json.load(file)
    with open(os.path.join(data_dir, "contacts.json"), 'r') as file:
        contacts = json.load(file)
    site = RenderJinja.make_site(outpath=outpath,
                                 env_globals={
                                     'experiences': experiences,
                                     'meta': meta,
                                     'skills': skills,
                                     'quotes': quotes,
                                     'contacts': contacts,
                                 })
    site.render(use_reloader=True)
