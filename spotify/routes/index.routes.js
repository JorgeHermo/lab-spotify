const router = require("express").Router();

const SpotifyWebApi = require('spotify-web-api-node')

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

// Retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

/* GET home page */

router.get("/", (req, res, next) => {
    res.render("index");
});

router.get("/artist-search", (req, res, next) => {

    console.log(req.query)
    const { artist } = req.query

    spotifyApi
        .searchArtists(artist)
        .then(data => {
            const info = data.body.artists.items
            console.log('The received data from the API: ', data.body.artists.items);
            res.render('artist-search-results', { info })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
})

router.get('/albums/:artistId', (req, res, next) => {
    const { artistId } = req.params
    console.log(artistId)
    spotifyApi
        .getArtistAlbums(artistId)
        .then(data => {
            const albumInfo = data.body.items
            console.log('The received data from the API: ', data.body.items);
            res.render('albums', { albumInfo })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err))
});

router.get('/tracks/:tracksId', (req, res, next) => {
    const { tracksId } = req.params
    console.log(tracksId)
    spotifyApi
        .getArtistAlbums(tracksId)
        .then(data => {
            const tracks = data.body.items
            console.log('The received data from the API: ', data.body.items);
            res.render('tracks', { tracks })
        })
        .catch(err => console.log('The error while searching artists occurred: ', err))
})

module.exports = router;