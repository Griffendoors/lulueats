var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

/* GET users listing. */
router.get('/allPreviews', function(req, res, next) {
  knex('post')
  .select('id','title', 'subTitle', 'author')
  .orderBy('id', 'asc')
  .then(posts => {
    res.json(posts)
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  if(typeof id != 'undefined'){
    knex('post')
    .select()
    .where('id', id)
    .first()
    .then(post => {
      res.json(post)
    });
  }
  else{
    res.status(500);
    next('error');
    // TODO: Error page? ie message saying invalid id.
    // TODO: can put post/id in url and will pull up post
    // TODO: sanity check post api
  }

});



function insertOrUpdate(req,res,callback){
    if(validPost(req.body)){

        var postObject = req.body;
        var title = postObject.title;
        var subTitle = postObject.subTitle;
        var author = postObject.author;
        var body = postObject.body;
        if(author === null) author = "Lulu Caitcheon";

        const post = {
          title: title,
          subTitle: subTitle,
          author: author,
          body: body,
          private: false,
        };

        callback(post);
    }
    else{
      res.status(500);
      next('error');
    }
}



function validPost(post){
  return true;
//  return typeof post.title == 'string'
  //    && post.title.trim() != '';
}

router.post('/create', function(req,res,next){
  insertOrUpdate(req,res, (post) =>{
    post.date = new Date();
    knex('post')
      .insert(post, 'id')
      .then(ids => {
         const id = ids[0];
         res.redirect('*');
      });
  });

});

router.put('/:id/edit',function(req,res,next){

  insertOrUpdate(req,res, (post) =>{
    knex('post')
      .where('id', req.params.id)
      .update(post, 'id')
      .then(() => {
         res.redirect('*');
      });
  });

});


  //TODO CHECK IF AUTHOR IS null

  //TODO INPUT VALIDATION / CHECKS AT ALL STEPS

  // TODO RES CODES. ERROR HANDLING. NEVER LOSE POST. TRY NOT TO LET USER BREAK - ALL THAT SHIT.

  // TODO - will be having private field on post

  // TODO - work through video as he may cover something useful i havent thoguht of

  // TODO - action confirmation to user - ie post created - 'sorry error' or 'success' - return to home screen

  // TODO - create post - cancel or draft?

  // TODO - post validation ie title cannot be empty

  // TODO: ROUTes order, when called etc. check can access, and not when shouldnt

  // TODO: VALIDATE EVERYTHING EVERYWHERE ESPECIALLY ON SERVER IN ROUTE WHEN DOING SOMETHING



router.delete('/:id',function(req,res,next){
  // TODO: VALIDATE ID
const id = req.params.id;

  knex('post')
    .where('id', id)
    .del()
    .then(() => {
       res.status(200).end();
    });
});

// when edit button pressed, grab the post fields out of the object in post.js, (grab everything that will be updated).
// inject all this data into the 'create' page (duplicate create page to edit page
// or make create page check for data to see if its a new creation or should show data ie its an edit)\
// when Update post is pressed, call this /update endpoint to overwrite the data in the database.
// (could not overwrite, but create a new db entry with different date, when retrieving grab one with latest data)
// Will need Seperate Edit page as need to differentiate between call to create new and call to edit.


module.exports = router;
