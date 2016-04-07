import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';

import { Posts } from './posts.js';

// define Post id schema
const POST_ID = new SimpleSchema({
  postId: { type: String },
}).validator();

// insert method
export const insert = new ValidatedMethod({
  name: 'posts.insert',
  validate: new SimpleSchema({}).validator(),
  run(){
    return Posts.insert({});
  },
});

// update Posts
export const update = new ValidatedMethod({
  name: 'posts.update',
  validate: new SimpleSchema({
    postId: { type: String },
    newName: { type: String },
  }).validator(),
  run({ postId, newName }) {
    const post = Posts.findOne(postId);

    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error('post.update.accessDenied',
        'You don\'t have permission to edit this list.');
    }

    Posts.update(postId, {
      $set: { name: newName },
    });
  },
});

// update Posts
export const remove = new ValidatedMethod({
  name: 'posts.update',
  validate: POST_ID,
  run({ postId }) {
    const post = Posts.findOne(postId);

    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error('post.remove.accessDenied',
        'You don\'t have permission to edit this list.');
    }

    Posts.remove(postId);
  },
});


// get list of all method names on Posts

const POSTS_METHODS = _.pluck([
  insert,
  update,
  remove,
], 'name');

if (Meteor.isServer) {
  // only allow 5 lists operations per connection per second
  DDPRateLimiter.addRule({
    name(name){
      return _.contains(POSTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId(){ return true; },
  }, 5, 1000);
}
