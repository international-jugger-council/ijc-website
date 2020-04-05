module.exports = function(eleventyConfig) {
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
      'js',
      'njk',
      'png',
      'txt',
    ],
  };
};
