module.exports = {
  name: 'ngrx-tut',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ngrx-tut',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
