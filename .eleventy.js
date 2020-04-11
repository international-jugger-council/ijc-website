module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("**/*.css");
  eleventyConfig.addPassthroughCopy("**/*.ico");
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.js");
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("**/*.svg");
  eleventyConfig.addPassthroughCopy("**/*.txt");
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
