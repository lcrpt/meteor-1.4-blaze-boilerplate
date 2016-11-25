/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

// import { Factory } from 'meteor/dburles:factory';
// import { chai, assert } from 'meteor/practicalmeteor:chai';
// import { Random } from 'meteor/random';

import { Meteor } from 'meteor/meteor';
import { Posts } from './posts.js';
// import { insertPost, updatePost, removePost } from './methods.js';

if (Meteor.isServer) {
  describe('Posts', () => {
    describe('methods', () => {
      beforeEach(() => {
        Posts.remove({});
      });

      describe('Insert', () => {
        it('Should insert a post', () => {
          return true;
        });
      });

      describe('Update', () => {
        it('Should update a post', () => {
          return true;
        });
      });

      describe('Remove', () => {
        it('Should delete a post', () => {
          return true;
        });
      });
    });
  });
}
