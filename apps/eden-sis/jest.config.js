module.exports = {
  name: 'eden-sis',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/eden-sis',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
