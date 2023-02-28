import { getPackageData } from '../../../../src/depngn/getPackageData';

describe('getPackageData', () => {
  it('has correct output when package is compatible', async () => {
    const output = getPackageData({ package: 'test-package', range: '>=8.0.0' }, "8.0.0");
    expect(output).toStrictEqual({ compatible: true, range: ">=8.0.0" });
  });

  it('has correct output when package is incompatible', async () => {
    const output = getPackageData({ package: 'test-package', range: '^8.0.0' }, "9.0.0");
    expect(output).toStrictEqual({ compatible: false, range: "^8.0.0" });
  });

  it('has correct output when package has no engine data', async () => {
    const output = getPackageData({ package: 'test-package', range: '' }, "8.0.0");
    expect(output).toStrictEqual({ compatible: undefined, range: "n/a" });
  });
});
