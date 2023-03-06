#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse
from urllib.parse import parse_qs

#print('source code for "http.server":', http.server.__file__)

class web_server(http.server.SimpleHTTPRequestHandler):
    
    def do_GET(self):

        print(self.path)
        
        #if self.path == '/':
        #    self.protocol_version = 'HTTP/1.1'
        #    self.send_response(200)
        #    self.send_header("Content-type", "text/html; charset=UTF-8")
        #    self.end_headers()            
        #    self.wfile.write(b"Hello World!\n")
            
        #else:
        #    super().do_GET()v
        parsed_url = urlparse(self.path)
        vid = parse_qs(parsed_url.query)['videoPlayer'][0]
        self.wfile.write(vid)
    
# --- main ---

PORT = 4080

print(f'Starting: http://localhost:{PORT}')

tcp_server = socketserver.TCPServer(("",PORT), web_server)
tcp_server.serve_forever()

