import { createUsage } from 'cli/usage';

const originalConsoleLog = console.log;

describe('createUsage', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  it('uses console.log', () => {
    createUsage();
    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('returns an usage message', () => {
    createUsage();

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
    expect(console.log).toHaveBeenCalledWith(usage);
  });
});
