var express = require( 'express' );
var router = express.Router();
var mongoose = require( 'mongoose' );
var Pets = require( '../models/pets' );


router.post( '/', function(req, res){
  console.log('hit the post (ouch!), req.body ->', req.body);
  var data = req.body;

  var newPet = new Pets({
    name: data.name,
    animal: data.animal,
    age: data.age,
    imageUrl: data.imageUrl
  });

  newPet.save(function(err) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else {
      console.log('new pet was added');
      res.sendStatus(201);
    }// end if else
  }); // end save
});// end post /

router.get( '/', function(req, res){
  console.log('hit the get');
  //find allo
  Pets.find({}, function(err, allPets){
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('Pets -> ', allPets);
      res.send( allPets );
    } //end if else
  });// end find
} );// end get /

router.delete('/:id', function(req, res) {
  console.log('hit the delete (peace out), id -> ', req.params.id);

  Pets.findByIdAndRemove(req.params.id, function (err) {
    if (err){
      console.log(err);
      res.sendStatus(500);
    } else {
      console.log('pet deleted');
      res.sendStatus(200);
    }// end if else
  });// end findByIdAndRemove

});// end delete /

module.exports = router;
