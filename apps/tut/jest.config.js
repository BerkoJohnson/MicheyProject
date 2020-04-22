module.exports = {
  name: 'tut',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/tut',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
