import ShortUniqueId from 'short-unique-id';
import URL from '../model/url.js';

//Instantiate
const uid = new ShortUniqueId();

// ------------- Generating new short URL ----------------
export async function handleGnerateNewShortURL(req, res) {
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({ msg: "URL is required" });
    }
    const redirectURL = body.url; 

    //Generating random short ID
    const shortID = uid.rnd();

    await URL.create({
        shortId: shortID,
        redirectURL: redirectURL,
        visitHistory: []
    });

    return res.render('shortid', {id:shortID});
    // return res.status(200).json({ id: shortID });
}


// ------------- Redirecting Short ID ----------------
export async function handleRedirectURL(req, res){

    const shortId = req.params.shortId;
    try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        );

        if(!entry){
            return res.status(404).json({msg:`${shortId} ID not found`});
        }

       let redirectURL = entry.redirectURL;
       
       // Prepend http:// if missing because res.redirect(entry.redirectURL) needs a valid URL scheme (http:// or https://). Without it, the browser treats www.example.com as a relative path.
       if (!/^https?:\/\//i.test(redirectURL)) {
           redirectURL = `http://${redirectURL}`;
       }
       res.redirect(redirectURL);
       
   } catch (error) {
       res.status(500).json({ error: "Internal server error" });
   }

}

