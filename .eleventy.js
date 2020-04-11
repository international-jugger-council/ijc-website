module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy({
    'node_modules/bulma/css/bulma.min.css': 'css/bulma.min.css',
  });
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'css',
      'html',
      'ico',
      'jpg',
      'njk',
      'png',
      'svg',
      'txt',
    ],
  };
};
