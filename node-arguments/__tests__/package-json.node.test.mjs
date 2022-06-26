import * as PackageJsonNode from '../package-json.node.mjs';

test('removePrefix from "^27.3.1" to "27.3.1"', () => {
  expect(PackageJsonNode.removePrefix('^27.3.1')).toBe('27.3.1');
});
