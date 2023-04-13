import { promises as fs } from 'fs';
import path from 'path';
import { depngn } from 'src/core';

describe('depngn', () => {
  const cwd = process.cwd();
  const testOutputPath = path.join(cwd, 'testOutput');

  beforeAll(async () => {
    await fs.mkdir(testOutputPath);
  });

  afterAll(async () => {
    await fs.rm(testOutputPath, { recursive: true });
  });

  afterEach(async () => {
    try {
      await fs.rm(path.join(testOutputPath, 'report.html'));
      await fs.rm(path.join(testOutputPath, 'report.json'));
    } catch (error) {
      // Ignore file deletion errors
    }
  });

  test('should generate an HTML report when reportOutputPath ends with .html', async () => {
    const reportOutputPath = path.join(testOutputPath, 'report.html');
    await depngn({ cwd, reportOutputPath, version: '18.0.0' });

    const reportExists = !!(await fs.stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should generate a JSON report when reportOutputPath does not end with .html', async () => {
    const reportOutputPath = path.join(testOutputPath, 'report.json');
    await depngn({ cwd, reportOutputPath, version: '18.0.0' });

    const reportExists = !!(await fs.stat(reportOutputPath).catch(() => false));

    expect(reportExists).toBe(true);
  });

  test('should not generate a report when reportOutputPath is not provided', async () => {
    const result = await depngn({ cwd, version: '18.0.0' });
    expect(result).toBeDefined();
  });
});
