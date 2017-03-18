'use strict';

module.exports = function TourModel(opts) {
 return {
   id: opts.id,
   name: opts.name,
   icon: opts.name,
   up_votes: opts.up_votes,
   down_votes: opts.down_votes
 };
};
