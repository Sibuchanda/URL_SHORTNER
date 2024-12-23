import express from 'express';
import URL from '../model/url.js';

const router = express.Router();

router.get('/', async (req,res) => {
    const allUrls = await URL.find({});
     return res.render('home', {urls: allUrls});    
})


export default router;



