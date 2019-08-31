/*jshint esversion: 6 */
var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const observe = require('observe');
const cors = require('cors');
const { parse, stringify } = require('flatted/cjs');

const app = express();
app.use(cors());
const port = 3200;

app.use(bodyParser.text());
app.use(bodyParser.json());

app.post('/', function (request, res) {
    res.setHeader('Content-Type', 'application/json');
     
    res.send(request.body);
    console.log(request.body);
    console.log('Got One!');
});

app.post('/getArtistById', function(req, res) {
    axios.post('http://localhost:8000/getArtistById', {
        artist: req.body.artist
    }).then(function(response) {
        res.setHeader('Content-Type', 'application/json');
        res.send(response.data.Data);
        console.log(response.data.Data);
    });
});

app.post('/getPaintingImages', (req, res) => {

    let finalresult = {};

    axios.post('http://localhost:8000/getPaintingImages', {
        painting: req.body.painting
    }).then(function (response) {
        res.setHeader('Content-Type', 'application/json');
         
        res.send(response.data);
    }).catch(function (error) {
        finalresult = error;
        console.log("error");
        res.setHeader('Content-Type', 'application/json');
         
        res.send(error);
    });
});

app.get('/getAllPainting', (req, res) => {
    console.log('Requesting Data');
    let finalResult = [];
    axios.get('http://localhost:8000/getAllPainting')
    .then(function (response) {
        for (const i of response.data.Data){
            axios.post('http://localhost:8000/getPaintingImages', {
                painting: i.id
            }).then (function (imageListResponse) {
                finalResult.push({
                    id: i.id,
                    name: i.name,
                    url: imageListResponse.data.Data[0].url
                });
                res.setHeader('Content-Type', 'application/json');
                 
                res.send({
                    status_code: 200,
                    data: finalResult
                });
                console.log('Delivered :-)');
            }).catch(function (error) {
                console.log('Error Fetching Images');
                res.setHeader('Content-Type', 'application/json');
                 
                res.send('error fetching Images');
            });
        }
    }).catch(function (error) {
        finalresult = error;
        console.log("error");
        res.setHeader('Content-Type', 'application/json');
         
        res.send(error);
    });
});

app.get('/getAllArtist', (req, res) =>{
    
});

app.post('/getArtistPaintings', (req, res) => {
    let finalResult = {};

    axios.post('http://localhost:8000/getArtistPaintings', {
        artist: req.body.artist
    }).then(function(artistPaintingListResponse) {
        if (artistPaintingListResponse.data.Data.length > 0){
            finalResult.artistName = artistPaintingListResponse.data.Data[0].artist.name;
            finalResult.length = artistPaintingListResponse.data.Data.length;
        }
        finalResult.paintings = [];
        for (let i of artistPaintingListResponse.data.Data){
            axios.post('http://localhost:8000/getPaintingImages', {
                painting: i.id
            }).then(function(response) {
                finalResult.paintings.push({
                    id: i.id,
                    url: response.data.Data[0].url,
                    name: i.name
                });
                if (finalResult.paintings.length === finalResult.length){
                    res.setHeader('Content-Type', 'application/json');
                    res.send({
                        status_code: 200,
                        data: finalResult.paintings
                    });
                }
            });
        }
    });
});

app.post('/getPaintingById', (req, res) => {
    let requestsFinished = 0;
    const requestsObserver = observe(requestsFinished);
    let finalResult = {};

    requestsObserver.on('change', function (change) {
        if (requestsFinished > 1) {
            res.setHeader('Content-Type', 'application/json');
             
            res.send(finalResult);
        }
    });
    axios.post('http://localhost:8000/getPaintingById', {
        painting: req.body.painting
    }).then(function (response) {
        // Painting Name
        finalResult.name = response.data.Data.name;
        finalResult.artistName = response.data.Data.artist.name;
        finalResult.artistId = response.data.Data.artist.id;
        finalResult.story = response.data.Data.story;
        finalResult.video = response.data.Data.video;
        // Fetch Artist Image
        axios.post('http://localhost:8000/getArtistById', {
            artist: finalResult.artistId
        }).then(function(resultResponse) {
            finalResult.artistImageUrl = resultResponse.data.Data.image;
        }).catch(function (error){

        });

        // Fetch Paining Images and Push it Here,
        finalResult.paintingImages = [];
        axios.post('http://localhost:8000/getPaintingImages', {
            painting: req.body.painting
        }).then(function (imagesResponse) {
            for (const image of imagesResponse.data.Data)
            {
                finalResult.paintingImages.push(image);
            }
            requestsObserver.set(requestsFinished++);
        }).catch(function(error) {

        });

        // Fetch Other Paintings By the Artist
        finalResult.otherPaintingsByArtist = [];
        axios.post('http://localhost:8000/getArtistPaintings', {
            artist: finalResult.artistId
        }).then(function (paintingResponse) {
            for (const painting of paintingResponse.data.Data) {
                // This is Where we Get the ID of the Image
                // So this is where we fetch Images Urls
                axios.post('http://localhost:8000/getPaintingImages', {
                    painting: painting.id
                }).then( function(paintingImageResponse) {
                    finalResult.otherPaintingsByArtist.push({
                        id: painting.id,
                        url: paintingImageResponse.data.Data[0].url,
                        paintingName: painting.name
                    });
                    requestsObserver.set(requestsFinished++);
                }).catch(function(error) {
                    console.log("error");
                    res.setHeader('Content-Type', 'application/json');
                     
                    res.send(error);
                });
            }
            requestsFinished++;
        }).catch(function (error) {
            console.log("error");
            res.setHeader('Content-Type', 'application/json');
             
            res.send(error);
        });

    }).catch(function (error) {
        console.log("error");
        res.setHeader('Content-Type', 'application/json');
         
        res.send(error);
    });
});

app.listen(
    port,
    () => {
        console.log(`Example app listening on port ${port}!`);
    }
);