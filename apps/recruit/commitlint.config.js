const Configuration = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'revert',
        'chore',
        'security',
        'ui',
        'comment',
        'name',
        'file',
      ],
    ],
    'subject-empty': [2, 'never'],
  },
};

module.exports = Configuration;
