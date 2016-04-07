import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// create class
class PostsCollection extends Mongo.Collection {
  // Insert datas
  insert(datas, callback){
    const postsDatas = datas;
    // super call the parent object
    return super.insert(postsDatas, callback);
  }
  // Update Datas
  update(selector, callback){
    Posts.update({_id: selector._id},
      {$set: { name: selector.name }}
    );
    return super.remove(selector, callback);
  }
  // Update Datas
  remove(selector, callback){
    Posts.remove({_id: selector._id});
    return super.remove(selector, callback);
  }
}

// Export Posts Global Namespace
export const Posts = new PostsCollection('Posts');

// allow db operations
Projects.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});
// deny db operations
Projects.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

// Posts Schema [Collection 2, SimpleSchema]
Posts.schema = new SimpleSchema({
  status: {
    type: Number,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  name: {
    type: String,
    optional: true,
    label: 'Name',
    max: 200,
    min: 10
  },
  description: {
    type: String,
    optional: false,
    label: 'Description',
    max: 1000,
    min: 1
  },
  userId: {
    type: String,
    label: 'userId',
    autoValue: function(){
      if (this.isInsert) {
        return this.userId;
      }
    },
    autoform: {
      type: 'hidden'
    }
  },
  createdAt: {
    type: Date,
    label: 'CreatedAt',
    autoValue: function(){
      if (this.isInsert) {
        return new Date();
      }
    },
    autoform: {
      type: 'hidden'
    }
  }
});

// attach schema to Posts Collections
Posts.attachSchema(Posts.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.
Lists.publicFields = {
  name: 1,
  description: 1,
  userId: 1,
  createdAt: 1,
};

// Helpers
Posts.helpers({

});
