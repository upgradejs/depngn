export function createUsage() {
  const usage = `
  Usage:
  depngn <node-version> [options]

  Options:
  -h, --help      output usage information
  -r, --reporter  which reporter for output. options are: terminal (default), json

  Example:
  depngn 12.0.0 --reporter=json
  `

  console.log(usage);
}
