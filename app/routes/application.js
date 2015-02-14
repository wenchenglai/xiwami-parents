import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    _saveTransition: function (transition) {
        if (transition.targetName !== 'login') {
            if (this.controllerFor('login')) {
                this.controllerFor('login').set('previousTransition', transition);   
            }
        }
    },

    actions: {
        error: function(error, transition) {
            var self = this,
                title = error.name,
                message = error.message;

            if (error) {
                Em.run(function(){
                    self.controller._toggleAlert(true, title, message, 'alert-danger');
                });
                return false;
            }
            return true;
        },

        willTransition: function (transition) {
            var self = this;

            Em.run(function(){
                self.controller._toggleAlert(false);
            });

            self._saveTransition(transition);
        }
    }
});
