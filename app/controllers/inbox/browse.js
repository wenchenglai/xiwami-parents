import Ember from 'ember';

export default Ember.ArrayController.extend({
    isAllChecked: false,

    watchAllChecked: function(){
        var self = this,
            model = self.get('model');

        for (var i = 0; i < model.get('length'); i++) {
            model.content[i].set('isChecked', self.get('isAllChecked'));
        }
    }.observes('isAllChecked'),

    hasSelection: function() {
        var model = this.get('model');
        return model.filterBy('isChecked', true).get('length');
    }.property('model.@each.isChecked'),

    actions: {
        viewDetail: function() {
            
        },

        deleteEmail: function() {
            var self = this,
                model = self.get('model'),
                length = model.get('length'),
                entity;

            for (var i = 0; i < length; i++) {
                entity = model.content[i];
	        	if (entity.get('isChecked')) {
		            entity.destroyRecord();
		        }
	        }
	        self.send('refresh');
        },

        refresh: function() {
            var self = this;
            self.send('refresh');
        },

        markRead: function() {
            var self = this,
                model = self.get('model'),
                length = model.get('length'),
                entity;

            for (var i = 0; i < length; i++) {
                entity = model.content[i];
                if (entity.get('toStatus') === "unread") {
                    entity.set('toStatus', 'read');
                    entity.save();
                }
            }
            self.send('refresh');
        },

        markReadSelected: function() {
            var self = this,
                model = self.get('model'),
                length = model.get('length'),
                entity;

            for (var i = 0; i < length; i++) {
                entity = model.content[i];
                if (entity.get('isChecked')) {
                    entity.set('toStatus', 'read');
                    entity.save();
                }
            }
            self.send('refresh');
        }
    }
});
