module.exports = {
  name: 'newapp',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/newapp',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
