'use strict';

module.exports = function PointModel(opts) {
 return {
   id: opts.id,
   name: opts.name,
   number: opts.number,
   icon: opts.icon,
   lat: opts.lat,
   lng: opts.lng,
   tour_id: opts.tour_id,
   image: 'http://www.telegraph.co.uk/content/dam/Travel/galleries/travel/activityandadventure/The-worlds-most-dangerous-mountains/mountain1_2625884a-large.jpg'
 };
};
