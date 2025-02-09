import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import StatesDataMixin from '../../mixins/states-data';

export default Ember.Route.extend(AuthenticatedRouteMixin, StatesDataMixin, {
    model: function() {
        var self = this;
        return self.store.createRecord('family');
    },

    actions: {
        save: function (params) {
            var self = this,
                model = self.currentModel,
                zipCode = model.get('zipCode'),
                session = self.get('session');

            var onSuccess = function (json) {
                var cityState = json.results[0].formatted_address;

                var arr = cityState.split(",");

                model.set('city', arr[0].trim());
                model.set('state', arr[1].trim().substr(0, 2));

                model.save().then(function (newlySavedfamily) {
                    var userId = self.get('session.secure.id');

                    // after we create a new family, we should add current user as a member of the family
                    self.store.findRecord('member', userId).then(function(member) {
                        member.set('family', newlySavedfamily);
                        member.set('city', newlySavedfamily.get('city'));
                        member.set('state', newlySavedfamily.get('state'));
                        session.set('baseCity', newlySavedfamily.get('city'));
                        session.set('baseState', newlySavedfamily.get('state'));

                        self.controllerFor('application').set('baseCity', newlySavedfamily.get('city'));
                        self.controllerFor('application').set('baseState', newlySavedfamily.get('state'));

                        member.save().then(function(user) {
                            session.set("user", user);
                            self.transitionTo('family.my');
                        }, onFail);
                    }, onFail);
                }, onFail);
            };

            var onFail = function (error) {
                self.send('error', error);
            };

            var onGoogleApiFail = function (error) {
                self.send('error', error);
            };

            // we need to get the cityState info based on the provided zip code using Google API
            Ember.$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' + zipCode + '&sensor=true').then(onSuccess, onGoogleApiFail);
        },

        cancel: function() {
            this.transitionTo('family.my');
        },

        goBack: function() {
            var self = this,
                session = self.get('session'),
                previousURL = self.controllerFor('application').get('previousURL');

            if (previousURL) {
              self.transitionTo(previousURL);
            } else {
              self.transitionTo('family.my');
            }
        }
    }
});
