import glob
import os
from staticjinja import Site
from csscompressor import compress
from rjsmin import jsmin
import htmlmin
import sass
import time


def pre_render_minify():
    '''
    Minify the JavaScript and Cascading Style Sheets 
    before rendering of HTML files so that the 
    minifed version can be included in rendered HTML
    '''
    path_included = os.path.join(os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "templates"), "included")
    path_css = os.path.join(path_included, "css")
    path_scss = os.path.join(path_css, "scss")
    path_js = os.path.join(path_included, "js")
    # Compile SCSS
    original_name = os.path.join(path_scss, "_main.scss")
    compile_name = os.path.join(path_scss, "main.min.scss")
    os.rename(original_name, compile_name)
    sass.compile(dirname=(path_scss, path_css), output_style='compressed')
    os.rename(compile_name, original_name)
    os.rename(os.path.join(path_css, "main.min.css"),
              os.path.join(path_css, "_main.min.css"))
    # Javascript
    for filepath in glob.glob(os.path.join(path_js, '*.js')):
        filename = os.path.splitext(os.path.basename(filepath))[0]
        if not filename.endswith("min"):
            with open(filepath, 'r') as js_file:
                text = jsmin(js_file.read())
                with open(os.path.join(path_js, filename + ".min.js"), 'w+') as minified:
                    minified.write(text)


def post_render_minify():
    '''
    Create the final minified HTML, JavaScript 
    and Cascading Style Sheets that will be used
    for content delivery.
    '''
    # Read path
    path_built = os.path.dirname(os.path.abspath(__file__))
    path_css = os.path.join(os.path.join(path_built, "static"), "css")
    path_js = os.path.join(os.path.join(path_built, "static"), "js")
    # Write path
    path_root = os.path.join(path_built, os.pardir)
    css_root = os.path.join(os.path.join(path_root, 'assets'), 'css')
    js_root = os.path.join(os.path.join(path_root, 'assets'), 'js')
    # HTML
    for filepath in glob.glob(os.path.join(path_built, '*.html')):
        print(filepath)
        with open(filepath, 'r') as html_file:
            text = htmlmin.minify(html_file.read(),
                                  remove_empty_space=True,
                                  remove_comments=True)
            with open(os.path.join(path_root, 'index.html'), 'w+') as minified:
                minified.write(text)
    # Cascading Style Sheets
    for filepath in glob.glob(os.path.join(path_css, '*.css')):
        filename = os.path.splitext(os.path.basename(filepath))[0]
        if not filename.endswith("min"):
            with open(filepath, 'r') as css_file:
                text = compress(css_file.read())
                with open(os.path.join(css_root, filename + ".min.css"), 'w+') as minified:
                    minified.write(text)
    # JavaScript
    for filepath in glob.glob(os.path.join(path_js, '*.js')):
        filename = os.path.splitext(os.path.basename(filepath))[0]
        if not filename.endswith("min"):
            with open(filepath, 'r') as js_file:
                text = jsmin(js_file.read())
                with open(os.path.join(js_root, filename + ".min.js"), 'w+') as minified:
                    minified.write(text)


def website_complete_render():
    pre_render_minify()
    site.render()
    post_render_minify()


if __name__ == "__main__":
    site = Site.make_site(contexts=[
        ('index.html', {})
    ])
    while True:
        website_complete_render()
        time.sleep(5)
