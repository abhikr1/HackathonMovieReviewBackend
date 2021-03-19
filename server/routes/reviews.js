const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserCredential = require('../models/user-credential');
const ReviewDetails = require('../models/moviefeedbacks');


router.get('/:moviename', (req,res) => {
    console.log(req.params.moviename);
    ReviewDetails.find({ moviename: req.params.moviename })
    .then(blogs => {
        let sum = 0;
        let count = 0;
        blogs.forEach(blog => {
            console.log(blog.rating);
            sum = sum + blog.rating;
            count ++;
        })
        let avg = sum/count;
        avg = Math.round(avg * 100) / 100
        console.log(avg);
        res.status(200).send({ratingavg: avg})
        }, err => {
        console.log(`Error in finding blogs ${err}`);
    });
});



router.post('/myratings', auth.authenticate, (req, res) => {
    console.log(req.body.movie_name)
    let email;
    if (!req.session.userId) {
        res.send(401).send({ error: "Not logged in"});
    }
    if (!req.body) {
        res.status(400).send({error: "Rating Daal"});
        return;
    }

    const {movie_name, rating, description } = req.body;
    console.log(movie_name);
    console.log(rating);
    console.log(description);

    if (!rating) {
        res.status(400).send({error: "Please provide Rating"});
        return;
    }

    if (!description) {
        res.status(400).send({error: "Enter a description"});
        return;
    }
     
    email_id = UserCredential.findOne({ _id : req.session.userId}).then(User => {
        if (User) {
            email = User.email

        ReviewDetails.findOne({ email, moviename : movie_name }).then(user => {
        if (user) {
            res.status(400).send({error: "Rating for this movie is already added by the user"});
            return;
        }


        const review = new ReviewDetails({ email, moviename : movie_name, feedbackdesc : description, rating });
        console.log(email);
        console.log(description);
        console.log(rating);
        review.save().then(() => {
                res.status(201).send({message : 'Feedback Submitted'});
            });
    }).catch(() => {
        res.status(500).send({ error: "Internal Server Error" });
    });
}    
});
});
module.exports = router;