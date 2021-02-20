module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/css/*.css');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/img/**/*');
  eleventyConfig.addPassthroughCopy('src/files/*');
  eleventyConfig.addPassthroughCopy('src/fonts/*');
  eleventyConfig.addPassthroughCopy('src/js/*.js');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy({
    'node_modules/bulma/css/bulma.min.css': 'css/bulma.min.css',
  });
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
    templateFormats: [
      'html',
      'njk',
    ],
  };
};
