module.exports = {
  name: 'annex',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/annex',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
