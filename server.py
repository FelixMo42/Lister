import os
import sys
import SimpleHTTPServer
import SocketServer
import urlparse

PORT = 8002
FALLBACK = "index.html"

class SinglePageHTTPRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    def do_GET(self):
        urlparts = urlparse.urlparse(self.path)
        request_file_path = urlparts.path.strip('/')

        if not os.path.exists(request_file_path):
            self.path = FALLBACK

        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)

httpd = SocketServer.TCPServer(("", PORT), SinglePageHTTPRequestHandler)

print "serving at port", PORT
httpd.serve_forever()