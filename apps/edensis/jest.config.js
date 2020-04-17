module.exports = {
  name: 'edensis',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/edensis',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
