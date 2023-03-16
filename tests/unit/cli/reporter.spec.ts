import { createReport } from 'src/cli/reporter';
import { Reporter } from 'src/types';
import { writeFile } from 'src/utils';
import { table } from 'table';
import { blue, green, red, yellow } from 'kleur/colors';

const mockCompatData = {
  'test-package-1': {
    compatible: true,
    range: '>=8.0.0',
  },
  'test-package-2': {
    compatible: false,
    range: '^6.0.0',
  },
  'test-package-3': {
    compatible: undefined,
    range: 'n/a',
  },
};

jest.mock('../../../src/utils', () => ({
  writeFile: jest.fn(),
}));

jest.mock('table', () => ({
  table: jest.fn(),
}));

const htmlExpected =
  '<!DOCTYPEhtml><htmllang="en"><head><style>h1{font-family:arial,sans-serif;}table{font-family:arial,sans-serif;border-collapse:collapse;width:100%;}td,th{border:1pxsolid#dddddd;text-align:left;padding:8px;}tr:nth-child(even){background-color:#dddddd;}.red{color:#ff0000;}.green{color:#0f9b4e;}.yellow{color:#ce8d02;}</style><title>depngn</title></head><body><h1>Nodeversion:8.0.0</h1><table><tr><th>package</th><th>compatible</th><th>range</th></tr><tr><td>test-package-1</td><tdclass="green">true</td><td>>=8.0.0</td></tr><tr><td>test-package-2</td><tdclass="red">false</td><td>^6.0.0</td></tr><tr><td>test-package-3</td><tdclass="yellow">undefined</td><td>n/a</td></tr></table></body></html>';

const originalConsoleLog = console.log;

describe('createReport', () => {
  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
    jest.resetAllMocks();
  });

  it('outputs correct table', async () => {
    await createReport(mockCompatData, '8.0.0', Reporter.Terminal);
    expect(table).toHaveBeenCalledWith(
      [
        ['package', 'compatible', 'range'].map((title) => blue(title)),
        ['test-package-1', green('true'), '>=8.0.0'],
        ['test-package-2', red('false'), '^6.0.0'],
        ['test-package-3', yellow('undefined'), 'n/a'],
      ],
      {
        header: {
          alignment: 'center',
          content: green('\nNode version: 8.0.0\n'),
        },
      }
    );
  });

  it('outputs correct json', async () => {
    await createReport(mockCompatData, '8.0.0', Reporter.Json);
    expect(writeFile).toHaveBeenCalledWith(
      'compat.json',
      `{
  \"node\": \"8.0.0\",
  \"dependencies\": {
    \"test-package-1\": {
      \"compatible\": true,
      \"range\": \">=8.0.0\"
    },
    \"test-package-2\": {
      \"compatible\": false,
      \"range\": \"^6.0.0\"
    },
    \"test-package-3\": {
      \"range\": \"n/a\"
    }
  }
}`
    );
  });

  it('outputs correct html', async () => {
    await createReport(mockCompatData, '8.0.0', Reporter.Html);
    expect(writeFile).toHaveBeenCalled();
    // this is necessary because whitespace is wonky with template literals
    // so we grab the args directly from the mock function's metadata
    const [path, htmlInput] = (writeFile as jest.Mock).mock.calls[0];
    expect(path).toEqual('compat.html');
    expect(htmlInput.replace(/\s+/g, '')).toEqual(htmlExpected);
  });
});
