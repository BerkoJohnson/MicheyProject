module.exports = {
  name: 'tailapp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tailapp',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
