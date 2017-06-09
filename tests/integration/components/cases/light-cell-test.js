import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cases/light-cell', 'Integration | Component | cases/light cell', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cases/light-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cases/light-cell}}
      template block text
    {{/cases/light-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
