module.exports = {
  name: 'banana',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/banana',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
