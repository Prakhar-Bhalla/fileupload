const express = require("express");

const fs = require("fs");

const router = express.Router();

const Gallery = require("../models/gallery.model");

const upload = require("../middlewares/upload");

router.get("/", async(req, res) => {
    try {
        const gallery = await Gallery.find().populate("user_id").lean().exec();
        res.send({gallery});
    } catch(e) {
        res.send({message: e.message});
    }
})

router.post("/", upload.array("image_urls", 5), async(req, res) => {
    try {
        const filePaths = req.files.map((file) => {
            return file.path;
        })
        const user = await Gallery.create({
            user_id : req.body.user_id,
            pictures : filePaths
        });
        res.status(201).send({user});
    } catch(e) {
        res.send({message: e.message});
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const gallery = await Gallery.findById(req.params.id);
        const pics = gallery.pictures;
        pics.forEach(pic => {
            fs.unlink(pic, (err) => {
                if(err)
                console.log(err);
                else
                console.log(`${pic} deleted`);
            });
        });
        const galleryDel = await Gallery.findByIdAndDelete(req.params.id);
        res.send({galleryDel});
    } catch(e) {
        res.send({message: e.message});
    }
})


module.exports = router;