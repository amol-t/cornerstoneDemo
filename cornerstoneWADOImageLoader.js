/*! cornerstoneWADOImageLoader - v0.1.0 - 2014-04-11 | (c) 2014 Chris Hafey | https://github.com/chafey/cornerstoneWADOImageLoader */
!function(a,b){function c(a){var b=a.string("x00280030");if(b&&b.length>0){var c=b.split("\\");return{row:parseFloat(c[0]),column:parseFloat(c[1])}}return{row:void 0,column:void 0}}function d(a){var b=a.uint16("x00280103"),c=a.uint16("x00280100");return 0===b&&8===c?1:0===b&&16===c?2:1===b&&16===c?3:void 0}function e(a,b){var c=d(a),e=a.elements.x7fe00010,f=e.dataOffset;return 1===c?new Uint8Array(b.buffer,f):2===c?new Uint16Array(b.buffer,f):3===c?new Int16Array(b.buffer,f):void 0}function f(a){var b={intercept:0,slope:1},c=a.floatString("x00281052"),d=a.floatString("x00281053");return c&&(b.intercept=c),d&&(b.slope=d),b}function g(a){var b={windowCenter:void 0,windowWidth:void 0},c=a.floatString("x00281050"),d=a.floatString("x00281051");return c&&(b.windowCenter=c),d&&(b.windowWidth=d),b}function h(a){for(var b=65535,c=-32768,d=a.width*a.height,e=a.storedPixelData,f=0;d>f;f++){var g=e[f];b=Math.min(b,g),c=Math.max(c,g)}a.minPixelValue=b,a.maxPixelValue=c}function i(a,b){var d=new Uint8Array(a),i=dicomParser.parseDicom(d),j=c(i),k=i.uint16("x00280010"),l=i.uint16("x00280011"),m=f(i),n=g(i),o={imageId:b,minPixelValue:-32767,maxPixelValue:65535,slope:m.slope,intercept:m.intercept,windowCenter:n.windowCenter,windowWidth:n.windowWidth,storedPixelData:e(i,d),rows:k,columns:l,height:k,width:l,color:!1,columnPixelSpacing:j.column,rowPixelSpacing:j.row,data:i,invert:!1};h(o);var p=i.string("x00280004");if(void 0!==p&&"MONOCHROME1"===p.trim()&&(o.invert=!0),void 0===o.windowCenter){var q=o.maxPixelValue*o.slope+o.intercept,r=o.minPixelValue*o.slope+o.intercept;o.windowWidth=q-r,o.windowCenter=(q+r)/2}return o}function j(b){var c=a.Deferred(),d=new XMLHttpRequest;return d.open("get",b,!0),d.responseType="arraybuffer",d.onreadystatechange=function(){if(4===d.readyState)if(200===d.status){var a=i(d.response,b);c.resolve(a)}else c.reject()},d.send(),c}return b.registerImageLoader("http",j),b.registerImageLoader("https",j),b}($,cornerstone);