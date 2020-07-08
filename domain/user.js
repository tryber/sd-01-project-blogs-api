const { attributes } = require('structure');

const Tweet = attributes({
  id: Number,
  text: {
    type: String,
    required: true,
    maxLength: 150,
  },
  createdAt: Date,
  isVisible: Boolean,
})(
  class Tweet {
    isUnderEighteen() {
      return !this.text.includes(Tweet.UNDER_18_FORBIDDEN_WORDS);
    }
  }
);

Tweet.UNDER_18_FORBIDDEN_WORDS = 'sex';

module.exports = Tweet;
