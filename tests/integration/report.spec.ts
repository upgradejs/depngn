import path from 'path';
import { report } from 'src/report';
import { Reporter } from 'src/types';
import { table } from 'table';
import { blue, green, red, yellow } from 'kleur/colors';
import { mkdir, stat, rm } from 'src/utils';
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

  test('should generate an HTML report when reportOutputPath ends with .html and reporter is not specified', async () => {
    const reportOutputPath = path.join(testOutputPath, 'report.html');
    await report(compatData, { reportOutputPath, version: '18.0.0' });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should generate an HTML report when reportOutputPath ends with .html and the path does not exist', async () => {
    const reportOutputPath = path.join(testOutputPath, './out/report.html');
    await report(compatData, { reportOutputPath, version: '18.0.0' });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));
    expect(reportExists).toBe(true);
  });

  test('should generate a JSON report when reportOutputPath ends with .json and reporter is not specified', async () => {
    const reportOutputPath = path.join(testOutputPath, 'report.json');
    await report(compatData, { reportOutputPath, version: '18.0.0' });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should generate a report with the specified reporter when reportOutputPath does not end with .html or .json', async () => {
    const reportOutputPath = path.join(testOutputPath, 'extra');
    await mkdir(reportOutputPath);
    const reporter = Reporter.Json;
    await report(compatData, { reportOutputPath, reporter, version: '18.0.0' });

    const reportExists = !!(await stat(`${reportOutputPath}/compat.${reporter}`).catch(
      () => false
    ));

    expect(reportExists).toBe(true);
  });

  test('should generate a report with the reporter matching the file extension when both reporter and reportOutputPath are specified', async () => {
    const reportOutputPath = path.join(testOutputPath, 'report.json');
    const reporter = Reporter.Json;
    await report(compatData, { reportOutputPath, reporter, version: '18.0.0' });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should ignore specified reporter when it does not match the file extension in reportOutputPath', async () => {
    const reportOutputPath = path.join(testOutputPath, 'report.json');
    const reporter = Reporter.Html;
    await report(compatData, { reportOutputPath, reporter, version: '18.0.0' });

    const reportExists = !!(await stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should ignore specified reporter as terminal and fallback html', async () => {
    const reportOutputPath = path.join(testOutputPath, 'extra');
    await mkdir(reportOutputPath);
    const reporter = Reporter.Terminal;
    await report(compatData, { reportOutputPath, reporter, version: '18.0.0' });

    const reportExists = !!(await stat(`${reportOutputPath}/compat.html`).catch(() => false));

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
