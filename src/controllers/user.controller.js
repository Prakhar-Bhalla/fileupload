const express = require("express");

const fs = require("fs");

const router = express.Router();

const User = require("../models/user.model");

const upload = require("../middlewares/upload");

router.get("/", async(req, res) => {
    try {
        const users = await User.find().lean().exec();
        res.send({users});
    } catch(e) {
        res.send({message: e.message});
    }
});

router.post("/", upload.single("image_urls"), async(req, res) => {
    try {
        const user = await User.create({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            profile_pic : req.file.path
        });
        res.status(201).send({user});
    } catch(e) {
        res.send({message: e.message});
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        fs.unlink(user.profile_pic, (err) => {
            if(err)
            console.log(err);
            else
            console.log(`${user.profile_pic} deleted`);
        });
        const userDel = await User.findByIdAndDelete(req.params.id);
        res.send({userDel});
    } catch(e) {
        res.send({message: e.message});
    }
})

router.patch("/:id", upload.single("image_urls"), async(req, res) => {
    try {
        const userUpdated = await User.findById(req.params.id);
        fs.unlink(userUpdated.profile_pic, (err) => {
            if(err)
            console.log(err);
            else
            console.log(`${userUpdated.profile_pic} deleted`);
        });
        const user = {};
        if(req.file)
        {
            user.profile_pic = await User.findByIdAndUpdate(req.params.id, {$set: {profile_pic: req.file.path}}, {new: true});
        }
        if(req.body.first_name)
        {
            user.first_name = await User.findByIdAndUpdate(req.params.id, {$set: {first_name: req.body.first_name}}, {new: true});
        }
        if(req.body.last_name)
        {
            user.last_name = await User.findByIdAndUpdate(req.params.id, {$set: {last_name: req.body.last_name}}, {new: true});
        }
        res.status(201).send({user});
    } catch(e) {
        res.send({message: e.message});
    }
})

module.exports = router;