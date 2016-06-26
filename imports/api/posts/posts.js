import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
// import { UserInfosSchema } from 'imports/api/users/users'

class PostsCollection extends Mongo.Collection {
  insert(doc, callback) {
    const ourDoc = doc;
    const result = super.insert(ourDoc, callback);
    return result;
  }
  update(selector, modifier) {
    const result = super.update(selector, modifier);
    return result;
  }
  remove(selector) {
    const todos = this.find(selector).fetch();
    const result = super.remove(selector);
    return result;
  }
}

export const Posts = new PostsCollection('Posts');

Posts.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Posts.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Posts.schema = new SimpleSchema({
  title: {
    type: String,
    max: 200,
    min: 10,
  },
  description: {
    type: String,
    max: 1000,
    min: 1,
  },
  status: {
    type: String,
    optional: true,
  },
  // userInfos: {
  //   type: UserInfosSchema
  // },
  like: {
    type: [String],
    optional: true,
  },
  type: {
    type: Number,
    optional: true,
  },
  userId: {
    type: String,
    label: 'userId',
    autoValue: function(){
      if (this.isInsert) {
        return this.userId;
      }
    }
  },
  createdAt: {
    type: Date,
    label: 'CreatedAt',
    autoValue: function(){
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  lastUpdated: {
    type: Date,
    label: 'CreatedAt',
    autoValue: function(){
      if (this.isUpdate || this.isUpsert) {
        return new Date();
      }
    }
  },
});

Posts.attachSchema(Posts.schema);


Posts.publicFields = {
  name: 1,
  description: 1,
  userId: 1,
  createdAt: 1,
};


Posts.helpers({
  editableBy(userId) {
    if (!this.userId) {
      return true;
    }

    return this.userId === userId;
  },
});
