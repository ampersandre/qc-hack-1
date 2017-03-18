'use strict';

module.exports = function PointModel(opts) {
 return {
   id: opts.id,
   name: opts.name,
   number: opts.number,
   icon: opts.icon,
   lat: opts.lat,
   lng: opts.lng,
   tour_id: opts.tour_id
 };
};
