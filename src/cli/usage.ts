export function createUsage() {
  const usage = `
  Usage:
  depngn <node-version> [options]

  Options:
  -h, --help                    output usage information
  -r, --reporter                which reporter for output. options are: terminal (default), json, html
  --cwd                         override the current working directory where to perform dependencies check
  -d, --reportDir               specifies the directory where to write the report
  -f, --reportFileName          specifies the name of the report file

  Example:
  depngn 12.0.0 --reporter=json
  `;

  console.log(usage);
}
