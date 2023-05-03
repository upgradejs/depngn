import path from 'path';
import { report } from 'src/report';
import { Reporter } from 'src/types';
import { table } from 'table';
import { blue, green, red, yellow } from 'kleur/colors';
import { mkdir, rm, stat } from 'src/utils';
import compatData from './mocks/compat-data';

jest.mock('table', () => ({
  table: jest.fn(),
}));

describe('report', () => {
  const cwd = process.cwd();
  const testOutputPath = path.join(cwd, 'testOutput');

  beforeEach(async () => {
    await mkdir(testOutputPath);
  });

  afterEach(async () => {
    await rm(testOutputPath, { recursive: true });
  });

  test('should generate a report in desired path', async () => {
    const reportOutputPath = path.join(testOutputPath, 'compat.html');
    await report(compatData, {
      reporter: Reporter.Html,
      reportDir: testOutputPath,
      version: '18.0.0',
    });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should generate a report in desired path with a desired name', async () => {
    const reportFileName = 'compat';
    const reportOutputPath = path.join(testOutputPath, `${reportFileName}.html`);
    await report(compatData, {
      reporter: Reporter.Html,
      reportFileName,
      reportDir: testOutputPath,
      version: '18.0.0',
    });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should generate a report to the console when the reporter is specified as terminal', async () => {
    const reporter = Reporter.Terminal;
    const npmDir = 'tests/unit/core/getEngines/mocks/npm/lockfileVersion2';
    process.chdir(npmDir);
    await report(compatData, { reporter, version: '18.0.0' });
    process.chdir(cwd);
    expect(table).toHaveBeenCalledWith(
      [
        ['package', 'compatible', 'range'].map((title) => blue(title)),
        ['test-package-1', red('false'), '1.0.0'],
        ['test-package-2', yellow('undefined'), 'n/a'],
      ],
      {
        header: {
          alignment: 'center',
          content: green('\nNode version: 18.0.0\n'),
        },
      }
    );
  });
});
