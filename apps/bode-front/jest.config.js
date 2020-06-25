module.exports = {
  name: 'bode-front',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/bode-front',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
