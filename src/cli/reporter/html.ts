import log from 'fancy-log';
import { writeFileWithFolder } from 'src/utils';
import { CompatData } from 'src/types';

export async function createHtml(
  compatData: Record<string, CompatData>,
  version: string,
  path = 'compat.html'
) {
  const compatDataKeys = Object.keys(compatData);
  const classGreen = 'green';
  const classRed = 'red';
  const classYellow = 'yellow';

  const style = `
  h1{
    font-family: arial, sans-serif;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  .${classRed}{
    color: #ff0000;
  }
  .${classGreen}{
    color: #0f9b4e;
  }
  .${classYellow}{
    color: #ce8d02;
  }`;

  const tableData = compatDataKeys
    .map((key) => {
      const compatible = compatData[key].compatible;
      const compatibleClass =
        compatible === undefined || compatible === 'invalid'
          ? classYellow
          : compatible
          ? classGreen
          : classRed;
      return `
        <tr>
          <td>${key}</td>
          <td class="${compatibleClass}">${compatible}</td>
          <td>${compatData[key].range}</td>
        </tr>
        `;
    })
    .join('');

  const out = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <style>
      ${style}
    </style>
    <title>depngn</title>
  </head>
  <body>
    <h1>Node version: ${version}</h1>
    <table>
      <tr>
        <th>package</th>
        <th>compatible</th>
        <th>range</th>
      </tr>
      ${tableData}
    </table>
  </body>
  </html>`;

  await writeFileWithFolder(path, out);
  log.info(`File generated at ${path}`);
}
