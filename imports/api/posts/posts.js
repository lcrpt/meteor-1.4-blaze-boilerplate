import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

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
    const result = super.remove(selector);

    return result;
  }
}

const Posts = new PostsCollection('Posts');

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
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
    autoValue() {
      return this.isInsert ? this.userId : this.unset();
    },
  },
  createdAt: {
    type: Date,
    label: 'CreatedAt',
    autoValue() {
      return this.isInsert ? new Date() : this.unset();
    },
  },
  lastUpdated: {
    type: Date,
    label: 'CreatedAt',
    autoValue() {
      return this.isUpdate || this.isUpsert ? new Date() : this.unset();
    },
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

export { Posts };
