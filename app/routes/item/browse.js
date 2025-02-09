import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        status: {
            refreshModel: true
        },
        type: {
            refreshModel: true
        },
        pageSize: {
            refreshModel: true
        },
        pageNumber: {
            refreshModel: true
        },
        condition: {
            refreshModel: true
        }
    },

    model: function (params) {
        var self = this,
            appController = self.controllerFor('application'),
            userId = self.get('session.secure.id');

        return self.store.query('item', Ember.merge(params, {
            requester: userId,
            longitude: appController.get('baseLongitude'),
            latitude: appController.get('baseLatitude')
        }));
    },

    setupController: function(controller, model) {
        // we get the total item count so we can generate the right pagination.
        controller.set('model', model);
        controller.set('keepPageNumber', false);
        if (model.get('length') > 0) {
            var totalRecordCount = model.get('firstObject').get('queryCount');
            if (totalRecordCount !== controller.get('queryCount')) {
                controller.set('queryCount', totalRecordCount);
            }
        }
    },

    resetController: function (controller, isExiting, transition) {
        if (isExiting) {
            // isExiting would be false if only the route's model was changing
            controller.set('pageNumber', 1);
        }
    }
});
