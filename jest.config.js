
// module.exports = {
//     roots: ['<rootDir>'],
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
//     testPathIgnorePatterns: ['/node_modules/', '/.next/'],
//     transform: {
//       '^.+\\.(ts|tsx)$': 'babel-jest',
//     },
//     transformIgnorePatterns: ['/node_modules/'],
//     moduleNameMapper: {
//       '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
//     },
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
//   };
  


module.exports = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '/.next/' ],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
        transformIgnorePatterns: ['/node_modules/'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  };
  