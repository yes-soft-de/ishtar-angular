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

app.post('/getArtistById', function (req, res) {
    axios.post('http://localhost:8000/getArtistById', {
        artist: req.body.artist
    }).then(function (response) {
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
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(response.data);
    }).catch(function (error) {
        finalresult = error;
        console.log("error");
        console.log(error);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(error);
    });
});

app.get('/getAllPainting', (req, res) => {

    imagesLength = 0;
    currentLength = 0;

    console.log('Requesting Data');
    let finalResult = [];
    axios.get('http://localhost:8000/getAllPainting')
        .then(function (response) {
            imagesLength = response.data.Data.length;
            for (const i of response.data.Data){
                finalPaintings = [];
                axios.post('http://localhost:8000/getPaintingImages' , {
                    painting: i.id
                }).then(function(imagesResponse) {
                    console.log(`Got a Response!   ${stringify(imagesResponse.data)}`);
                    if (imagesResponse.data.Data.length > 0){
                        finalPaintings.push({
                            id: i.id,
                            name: i.name,
                            url: imagesResponse.data.Data[0].url
                        });
                        if (finalPaintings.length === imagesLength) {
                            res.send(JSON.stringify({
                                status_code: 200,
                                data: finalPaintings
                            }));
                        } else {
                            console.log(`${finalPaintings.length} , ${imagesLength}`);
                        }
                    } else {
                        finalPaintings.push({
                            id: i.id,
                            name: i.name,
                            url: "FAKER"
                        });
                        if (finalPaintings.length === imagesLength) {
                            res.send(JSON.stringify({
                                status_code: 200,
                                data: finalPaintings
                            }));
                        } else {
                            console.log(`${finalPaintings.length} , ${imagesLength}`);
                        }
                    }
                    
                }).catch(function(error) {
                    console.log(stringify(error));
                    res.send(JSON.stringify(error));
                });
            }
            
        }).catch(function (error) {
            console.log(stringify(error));
            res.send(JSON.stringify(error));
        });
});

app.post('/getArtistPaintings', (req, res) => {
    let finalResult = {};

    axios.post('http://localhost:8000/getArtistPaintings', {
        artist: req.body.artist
    }).then(function (artistPaintingListResponse) {
        if (artistPaintingListResponse.data.Data.length > 0) {
            finalResult.artistName = artistPaintingListResponse.data.Data[0].artist.name;
            finalResult.length = artistPaintingListResponse.data.Data.length;
        }
        finalResult.paintings = [];
        for (let i of artistPaintingListResponse.data.Data) {
            axios.post('http://localhost:8000/getPaintingImages', {
                painting: i.id
            }).then(function (response) {
                finalResult.paintings.push({
                    id: i.id,
                    url: response.data.Data[0].url,
                    name: i.name
                });
                if (finalResult.paintings.length === finalResult.length) {
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

app.get('/getAllArtType', function (req, res) {
    axios.get('http://localhost:8000/getAllArtType').then(function (response) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(response.data);
        res.send(JSON.stringify(response.data), 200);
    }).catch(function (error) {
        console.log(JSON.stringify(error));
    });
});

app.get('/getAllArtist', function (req, res) {
    axios.get('http://localhost:8000/getAllArtist').then(function (response) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        console.log(response.data);
        res.send(JSON.stringify(response.data), 200);
    }).catch(function (error) {
        console.log(JSON.stringify(error));
    });
});

app.post('/createPainting', function (req, res) {
    console.log(stringify(req.body));
    requestParams = {
        name: req.body.name,
        artist: req.body.artist,
        artType: 1,
        addingDate: "1995-01-01",
        deminsions: req.body.deminsions,
        state: req.body.state,
        colorsType: req.body.colorsType,
        price: req.body.price,
        story: req.body.story
    };

    finalResult = {};
    addingDate = '1996-01-01';
    
    axios.post('http://localhost:8000/createPainting', requestParams
    ).then(function (data2) {
        console.log('inserting Painting: ' + JSON.stringify(data2.data));
        axios.post('http://localhost:8000/createImage', {
            artist: requestParams.artist,
            url: req.body.imageUrl,
            addingDate: addingDate,
            painting: data2.data.Data.id
        }).then(function (imgResponse) {
            console.log('inserting Image' + stringify(imgResponse.data));
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                status_code: 200,
                msg: imgResponse.data
            })).catch(function (error) {
                console.log(stringify(error.body));
            });
        }).catch(function (error) {
            console.log(stringify(error));
        });
    }).catch(function (error0) {
        console.log(error0);
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
        }).then(function (resultResponse) {
            finalResult.artistImageUrl = resultResponse.data.Data.image;
        }).catch(function (error) {

        });

        // Fetch Paining Images and Push it Here,
        finalResult.paintingImages = [];
        axios.post('http://localhost:8000/getPaintingImages', {
            painting: req.body.painting
        }).then(function (imagesResponse) {
            for (const image of imagesResponse.data.Data) {
                finalResult.paintingImages.push(image);
            }
            requestsObserver.set(requestsFinished++);
        }).catch(function (error) {

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
                }).then(function (paintingImageResponse) {
                    finalResult.otherPaintingsByArtist.push({
                        id: painting.id,
                        url: paintingImageResponse.data.Data[0].url,
                        paintingName: painting.name
                    });
                    requestsObserver.set(requestsFinished++);
                }).catch(function (error) {
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