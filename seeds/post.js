
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('post').del()
    .then(function () {
      const posts = [{
        title: 'Test Post one',
        subTitle: 'Subtitle',
        author: 'Lulu Caitcheon',
        body: 'This is the first blog post, and this is the body content of it',
        private: false,
        date: new Date()
      },
      {
        title: 'Test Post Two',
        subTitle: 'Subtitle',
        author: 'Lulu Caitcheon',
        body: 'This is the second blog post, and this is the body content of it',
        private: false,
        date: new Date()
      },
      {
        title: 'Test Post Three',
        subTitle: 'Subtitle',
        author: 'Lulu Caitcheon',
        body: 'This is the third blog post, and this is the body content of it',
        private: true,
        date: new Date()
      }];
    return knex('post').insert(posts);
    });
};
