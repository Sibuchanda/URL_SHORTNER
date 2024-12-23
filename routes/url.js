import express from 'express';
import { handleGnerateNewShortURL, handleRedirectURL } from '../controlers/urlcontroler.js';

const router = express.Router();


router.post('/create', handleGnerateNewShortURL);
router.get("/:shortId", handleRedirectURL);





export default router;



