module.exports = {
    transform: {
      '^.+\\.ts?$': 'babel-jest',
    },
    moduleDirectories: ['node_modules', 'src'],
    coveragePathIgnorePatterns: ['/node_modules/', '/vendor/'],
    coverageDirectory: 'coverage',
  };
  