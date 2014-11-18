
_extend = function(destination, source) {
   for (var property in source) {
     if (typeof source[property] === "object" &&
      source[property] !== null ) {
       destination[property] = destination[property] || {};
       arguments.callee(destination[property], source[property]);
     } else {
       destination[property] = source[property];
     }
   }
   return destination;
 };

exports.extend = _extend;