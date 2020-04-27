import React, { useEffect, useRef, useState, useCallback } from "react";

import "./Sandbox.css";

const getGeneratedPageURL = ({ js }) => {
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const jsURL = getBlobURL(
    `try { ${js} } catch (e) { console.error(e) }`,
    "text/javascript"
  );

  const source = `
    <html>
      <head>
        <style>
          body {
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <script>
          window.console.log = (...args) => {
            document.write('<p class="log">');
            document.write(...args);
            document.write('</p>');
          }

          window.console.info = (...args) => {
            document.write('<p class="log" style="color: orange">');
            document.write(...args);
            document.write('</p>');
          }

          window.console.error = (...args) => {
            document.write('<p class="log" style="color: red">');
            document.write(...args);
            document.write('</p>');
          }

          window.clear = () => {
            const list = document.querySelectorAll('.log');
            for (let node of list) {
              node.remove();
            }
          }
        </script>
        <div id="console">
          ${js ? `<script src="${jsURL}"></script>` : ""}
        </div>
      </body>
    </html>
  `;

  return getBlobURL(source, "text/html");
};

export function Sandbox({ code }) {
  const [src, setSrc] = useState();
  const frameRef = useRef();

  useEffect(() => {
    const src = getGeneratedPageURL({
      js: code,
    });

    const timeoutId = setTimeout(() => {
      setSrc(src);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code]);

  const clearSandbox = useCallback(() => {
    frameRef.current.contentWindow.clear();
  }, []);

  return (
    <div className="sandbox-wrapper">
      <iframe ref={frameRef} src={src} className="sandbox-frame" />
      <div className="toolbox">
        <button className="button" onClick={clearSandbox}>
          Clear
        </button>
      </div>
    </div>
  );
}
