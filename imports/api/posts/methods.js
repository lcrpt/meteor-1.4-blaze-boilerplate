import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { _ } from 'underscore';
import { Posts } from './posts.js';

const insertPost = new ValidatedMethod({
  name: 'posts.insert',
  validate: Posts.schema.validator({ clean: true, filter: false }),
  run(post) {
    return Posts.insert(post);
  },
});

const updatePost = new ValidatedMethod({
  name: 'posts.update',
  validate: Posts.schema.validator({ clean: true, filter: false }),
  run(post) {
    const postFound = Posts.findOne(post._id);

    if (!postFound.editableBy(this.userId)) {
      throw new Meteor.Error(
        'post.update.accessDenied',
        'You don\'t have permission to edit this list.'
      );
    }

    Posts.update(post._id, { $set: post });
  },
});

const removePost = new ValidatedMethod({
  name: 'posts.remove',
  validate: Posts.schema.validator({ clean: true, filter: false }),
  run({ postId }) {
    const post = Posts.findOne(postId);

    if (!post.editableBy(this.userId)) {
      throw new Meteor.Error(
        'post.remove.accessDenied',
        'You don\'t have permission to edit this list.'
      );
    }

    Posts.remove(postId);
  },
});

const POSTS_METHODS = _.pluck([
  insertPost,
  updatePost,
  removePost,
], 'name');

if (Meteor.isServer) {
  DDPRateLimiter.addRule({
    name(name) {
      return _.contains(POSTS_METHODS, name);
    },

    connectionId() {
      return true;
    },
  }, 5, 1000);
}

export { insertPost, updatePost, removePost };
