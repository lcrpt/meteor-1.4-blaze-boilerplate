import { Meteor } from 'meteor/meteor';
import { Posts } from '/imports/api/posts/posts';

Meteor.publish('posts.all', function() {
  return Posts.find();
});

Meteor.publish('posts.one', function(postId) {
  return Posts.findOne(postId);
});
