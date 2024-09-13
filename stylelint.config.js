/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-idiomatic-order'
  ],
  rules: {
    'selector-class-pattern': '^([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(_([a-z0-9]+-?)+){0,2}$',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep', 'global']
      }
    ]
  }
}
