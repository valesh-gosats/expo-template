const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

const features = ['auth', 'home', 'checkout'];
const privateSegments = ['components', 'screens', 'store', 'services', 'hooks', 'navigation'];

function otherFeaturePatterns(featureName) {
  return features
    .filter((name) => name !== featureName)
    .flatMap((other) =>
      privateSegments.flatMap((segment) => [
        `@/features/${other}/${segment}`,
        `@/features/${other}/${segment}/**`,
        `../${other}/${segment}`,
        `../${other}/${segment}/**`,
        `../../${other}/${segment}`,
        `../../${other}/${segment}/**`,
        `../../../${other}/${segment}`,
        `../../../${other}/${segment}/**`,
      ]),
    );
}

function featureBoundary(featureName) {
  return {
    files: [`src/features/${featureName}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: otherFeaturePatterns(featureName),
              message:
                'Do not import another feature’s private modules. Cross-feature navigation goes through @/navigation/navigation.types.',
            },
            {
              group: [
                '@/navigation/*',
                '!@/navigation/navigation.types',
                '../../navigation/*',
                '!../../navigation/navigation.types',
                '../../../navigation/*',
                '!../../../navigation/navigation.types',
              ],
              message: 'Import only @/navigation/navigation.types from the navigation layer.',
            },
          ],
        },
      ],
    },
  };
}

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['src/core/**/*.{ts,tsx}', 'src/shared/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '@/features',
                '@/features/**',
                '@/navigation',
                '@/navigation/**',
                '**/features/**',
                '**/navigation/**',
              ],
              message: 'core and shared cannot import features or navigation.',
            },
          ],
        },
      ],
    },
  },
  featureBoundary('auth'),
  featureBoundary('home'),
  featureBoundary('checkout'),
]);
