'use strict';

module.exports = function (opts, callback) {
	opts = typeof opts === 'string' ? {source: opts} : opts;

	let {source, tags = 'script'} = opts;
	let matchTag, outerHTML, contents, matchAttrs, attrKey, attrVal, ignore;

	tags = (Array.isArray(tags) ? tags : [tags]).join('|');
	const regex = {
		contents: new RegExp(`<${tags}[^>]*>([\\s\\S]*?)<\\/${tags}>`, 'g'),
		startTag: new RegExp(`(<${tags}[^>]*>)`, 'g'),
		attrs: /(\S+)=['"]?((?:(?!\/>|>|"|').)+)/g,
	};

	while ((matchTag = regex.contents.exec(source)) !== null) {
		[outerHTML, contents] = matchTag;
		const attrs = {};
		const startTag = outerHTML.match(regex.startTag)[0];
		while ((matchAttrs = regex.attrs.exec(startTag)) != null) {
			[ignore, attrKey, attrVal] = matchAttrs;
			attrs[attrKey] = attrVal;
		}
		callback(attrs, contents, outerHTML, startTag, source);
	}
};