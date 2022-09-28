export function createUsage() {
  console.log('Usage:');
  console.log('depngn <node-version> [options]');
  console.log('');
  console.log('Options:');
  console.log('-h, --help       output usage information');
  console.log('-r, --reporter   which reporter for output. options are: terminal (default), json');
  console.log('');
  console.log('Example:')
  console.log('depngn 12.0.0 --reporter=json');
}
