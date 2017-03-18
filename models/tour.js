'use strict';

module.exports = function TourModel(opts) {
 return {
   name: opts.name,
   icon: opts.name,
   up_votes: opts.up_votes,
   down_votes: opts.down_votes,
   points: opts.points
 };
};
