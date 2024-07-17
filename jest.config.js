module.exports = {
  // autres configurations Jest
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'coverage', outputName: 'test-results.xml' },
    ],
  ],
};
