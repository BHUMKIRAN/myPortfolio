"use client";

import { useState, useEffect, useRef } from "react";

export default function CodePlayground() {
  const [code, setCode] = useState(`// Try typing JS code here
console.log("Hello, World!");
`);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <style>
                body { 
                  font-family: monospace; 
                  color: #fefcd7; 
                  background-color: #0b1b1a; 
                  padding: 8px; 
                  white-space: pre-wrap;
                  font-size: 0.875rem;
                }
                .log { color: #fff18d; margin: 0 0 2px 0; }
                .error { color: #b07818; margin: 0 0 2px 0; }
              </style>
            </head>
            <body>
              <div id="output"></div>
              <script>
                (function() {
                  const output = document.getElementById('output');
                  console.log = function(...args) {
                    args.forEach(arg => {
                      const div = document.createElement('div');
                      div.className = 'log';
                      div.textContent = arg;
                      output.appendChild(div);
                    });
                  }

                  try {
                    ${code}
                  } catch (err) {
                    const div = document.createElement('div');
                    div.className = 'error';
                    div.textContent = 'Error: ' + err;
                    output.appendChild(div);
                  }
                })();
              </script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [code]);

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto">
      {/* Code Editor */}
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1 text-amber">Editor</h3>
        <textarea
          className="w-full h-64 bg-void text-cream font-mono p-3 rounded-lg focus:outline-none border border-forest resize-none text-sm"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <div className="mt-1 text-xs text-forest">
          Tips: Use <code>console.log("Hello")</code>, <code>alert("Hi")</code>, or DOM manipulations.
        </div>
      </div>

      {/* Live Preview */}
      <div className="flex-1">
        <h3 className="text-lg font-bold mb-1 text-amber">Live Preview</h3>
        <iframe
          ref={iframeRef}
          className="w-full h-64 bg-void border border-forest rounded-lg"
        />
      </div>
    </div>
  );
}