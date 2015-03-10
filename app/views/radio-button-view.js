import Ember from 'ember';

export default Ember.View.extend({
    classNameBindings: [':btn', ':btn-info', ':radioButtonGroup'],

    attributeBindings: ['name'],

    click: function () {
        this.set("selection", this.get('value'));

        Em.$('div.radioButtonGroup').removeClass('active');
    },

    active: function () {
        var flag = this.get("value") === this.get("selection");
        var selector = 'div[name=' + this.get('name') + ']';

        if (!flag) {
            if (Em.$(selector).hasClass('active')) {
                Em.$(selector).removeClass('active');
            }
        }

        return flag;
    },

    didInsertElement: function () {
        var flag = this.get("value") === this.get("selection");
        var selector = 'div[name=' + this.get('name') + ']';

        if (!flag) {
            if (Em.$(selector).hasClass('active')) {
                Em.$(selector).removeClass('active');
            }
        } else {
            //if (!Em.$(selector).hasClass('active')) {
            Em.$(selector).addClass('active');
            //}
        }
    },
});