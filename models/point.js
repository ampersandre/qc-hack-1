'use strict';

module.exports = function PointModel(opts) {
 return {
   id: opts.id,
   name: opts.name,
   number: opts.number,
   lat: opts.lat,
   lng: opts.lng
 };
};
