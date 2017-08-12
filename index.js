var Transform = require('readable-stream/transform');
var fs = require('fs');
var transformJs = require('transform-js');

module.exports = function (cssx) {
	cssx = fs.readFileSync(cssx, { encoding: 'utf8' });
	return new Transform({
		objectMode: true,
		transform: function (file, encoding, callback) {
			file.contents = new Buffer(transformJs(cssx)(file.contents.toString()));
			callback(null, file);
		}
	});
};
