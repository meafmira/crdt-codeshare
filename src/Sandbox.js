import React, { useEffect, useRef, useState } from "react";

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
            document.write('<p>');
            document.write(...args);
            document.write('</p>');
          }

          window.console.info = (...args) => {
            document.write('<p style="color: orange">');
            document.write(...args);
            document.write('</p>');
          }

          window.console.error = (...args) => {
            document.write('<p style="color: red">');
            document.write(...args);
            document.write('</p>');
          }
        </script>
        ${js ? `<script src="${jsURL}"></script>` : ""}
      </body>
    </html>
  `;

  return getBlobURL(source, "text/html");
};

export function Sandbox({ code }) {
  const [src, setSrc] = useState();

  useEffect(() => {
    const src = getGeneratedPageURL({
      js: code,
    });

    const timeoutId = setTimeout(() => {
      setSrc(src);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [code]);

  return <iframe src={src} className="sandbox-frame" />;
}
