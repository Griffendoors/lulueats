var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

//TODO SECURE THESE AND ALL APIS/RESOURCES WITH TOKEN CHECK


/* GET users listing. */
router.get('/allPreviews', function(req, res, next) {
  knex('post')
  .select('id','title', 'subTitle', 'author','date')
  .orderBy('id', 'asc')
  .then(posts => {
    res.status(200);
    res.json(posts);
  }).catch(function(error) {
      console.log("error getting all previews:");
      console.log(error);
      res.status(500);
      res.json({});
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
      res.status(200);
      res.json(post);
    }).catch(function(error) {
        res.status(500);
        res.json({});
    });
  }
  else{
    res.status(500);
    res.json({});

  }

});



function insertOrUpdate(req,res,callback){
    if(validPost(req.body)){
        var postObject = req.body;
        var title = postObject.title;
        var subTitle = postObject.subTitle;
        var author = postObject.author;
        var body = postObject.body;
        var banner_image_url = null;
        if(postObject.banner_image_url !== null) banner_image_url = postObject.banner_image_url;
        if(author === null) author = "Lulu Caitcheon";

        const post = {
          title: title,
          subTitle: subTitle,
          author: author,
          body: body,
          private: false,
          banner_image_url: banner_image_url,
        };
        callback(post);
    }
    else{
      res.status(500);
      res.json({});
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
         res.status(200);
         res.json({id:id});

      }).catch(function(error) {
          res.status(500);
          res.json({});
      });
  });
});

router.put('/:id/edit',function(req,res,next){

  insertOrUpdate(req,res, (post) =>{
    knex('post')
      .where('id', req.params.id)
      .update(post, 'id')
      .then(ids => {
        const id = ids[0];
        res.status(200);
        res.json({id:id});
      }).catch(function(error) {
          res.status(500);
          res.json({});
      });
  });

});


  //TODO CHECK IF AUTHOR IS null

  //TODO INPUT VALIDATION / CHECKS AT ALL STEPS

  // TODO RES CODES. ERROR HANDLING. NEVER LOSE POST. TRY NOT TO LET USER BREAK - ALL THAT SHIT.

  // TODO - will be having private field on post


  // TODO - action confirmation to user - ie post created - 'sorry error' or 'success' - return to home screen

  // TODO - create post - cancel or draft?

  // TODO - post validation ie title cannot be empty

  // TODO: ROUTes order, when called etc. check can access, and not when shouldnt

  // TODO: VALIDATE EVERYTHING EVERYWHERE ESPECIALLY ON SERVER IN ROUTE WHEN DOING SOMETHING



router.delete('/:id',function(req,res,next){

  const id = req.params.id;

  knex('post')
    .where('id', id)
    .del()
    .then(() => {
      res.status(200);
      res.json({});
    }).catch(function(error) {
        res.status(500);
        res.json({});
    });
});


module.exports = router;
