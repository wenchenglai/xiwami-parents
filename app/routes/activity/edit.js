import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        return this.store.find('activity', params.id);
    },

    afterModel: function(model, transition) {
        if (model.get('hasDirtyAttributes')) {
            model.rollback();
        }
    },

    actions: {
        goBack: function() {
            var self = this,
                previousURL = self.controllerFor('application').get('previousURL');

            if (!Ember.isEmpty(previousURL) && previousURL.indexOf("/activity/my") > -1) {
                history.back();
            } else {
                self.transitionTo('activity.my');
            }

        },

        save: function() {
            var self = this,
                model = self.currentModel,
                userId = self.get('session.secure.id');

            self.store.findRecord('member', userId).then(function(user) {
                model.save().then(function(obj) {
                    //self.transitionTo('activity.show', obj.get('id'));
                    self.transitionTo('admin.events.list')
                });
            });
        },

        cancel: function() {
            var model = this.currentModel;

            if (model.get('hasDirtyAttributes')) {
                model.rollback();
            }

            history.back();
        }
    }
});
