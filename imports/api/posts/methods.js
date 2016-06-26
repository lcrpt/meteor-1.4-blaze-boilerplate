import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'meteor/underscore';
import { Posts } from './posts.js';


const POST_ID = new SimpleSchema({
  postId: { type: String },
}).validator();


export const insert = new ValidatedMethod({
  name: 'posts.insert',
  validate: POST_ID,
  run(){
    return Posts.insert({});
  },
});


export const update = new ValidatedMethod({
  name: 'posts.update',
  validate: POST_ID,
  run({ postId, newName }) {
    const post = Posts.findOne(postId);

    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error('post.update.accessDenied', 'You don\'t have permission to edit this list.');
    }

    Posts.update(postId, {
      $set: { name: newName },
    });
  },
});


export const remove = new ValidatedMethod({
  name: 'posts.remove',
  validate: POST_ID,
  run({ postId }) {
    const post = Posts.findOne(postId);

    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error('post.remove.accessDenied', 'You don\'t have permission to edit this list.');
    }

    Posts.remove(postId);
  },
});


const POSTS_METHODS = _.pluck([
  insert,
  update,
  remove,
], 'name');


if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name){
      return _.contains(POSTS_METHODS, name);
    },

    connectionId(){ return true; },
  }, 5, 1000);
}
