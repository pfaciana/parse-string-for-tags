# Parse String For Tags
Parse a string for html/xml tags, and return the matched tags, their attributes and contents to a callback.

This package takes some string and runs regex against it looking for matching opening and closing tags and returns information about the tag(s) back to a user defined callback. At present, this will NOT work for self-closing tags `<img src="/path/file.jpg" />` or tags that do not have closing tags `<br>`.

I wrote this because I wanted a script that would take in the source of a php file and look for script and style tags within it. On those tags, there were ` data-file="some/dest/path/file.ext"` attributes that defined where the contents of those file should be saved on the server. I incorporated this into my build scripts. I have since made it much more flexible to fit a variety of needs.

## API

<b><code>parseStr(options = {source: "content", tags: ['script']}, callback(attrs, contents, outerHTML, startTag, source))</code></b>

Parse String For Tags accepts two required arguments.

### options

(Object|string) The options param allows for two keys, `source` and `tags`. `tags` defaults to looking for just 'script' tags by default. As shorthand, if you only want to look for 'script' tags, the you can just pass a string (instead of an object), and that string will be the `source` to parse. For example `{source: "content", tags: ['script']}`, `{source: "content"}` and `"content"` are all identical input variations since `tags` defaults to `['script']`.

#### source

(string) The string to parse (normally the contents of a file).

#### tags

(array|string) All the tag names to look for in a string. Example: ['script', 'style']. You can also just pass a string if you are only look for one type of tag name. It will be converted to an array for you. So, for example `'script'` will be converted to `['script']` automatically.

### Callback

(function) A callback function that will run for every matching instance of the queried tag names. So if you're looking for 'script' tags, and there are five in string passed. Then this callback function will get called five times. One for each match. The signature for the callback is `callback(attrs, contents, outerHTML, startTag, source)`

#### attrs

(array) Array of attributes found for the matched instance.

#### content

(string) Content (or innerHTML) for the matched instance.

#### outerHTML

(string) Both the tag and its contents. Like `content`, but with the tag wrapping it as well.

#### starTag

(string) String output of the tagName and attributes. In case the user would like to preform additional parsing of their own. Often this can be ignored.

#### source

(string) Sending back the `source` input. Normally this would be ignored.



## Usage

``` js

var parseStr = require('parse-string-for-tags');
var fs = require('fs');

parseStr({source: '...<script data-file="/home/user/public_html/hello.js"> console.log("Hello World"); </script>...', tags: ['script']}, (attrs, content) => {
	fs.writeFileSync(attrs['data-file'], content);
});

```
