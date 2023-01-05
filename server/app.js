// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here

app.use(express.json());
app.use((req, res, next) => {
  console.log('Body', req.body);
  next();
});


app.get("/artists/latest/albums", (req, res) => {
  let resBody = JSON.stringify(getAlbumsForLatestArtist());
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  return res.end(resBody);
});

app.get("/artists/latest", (req, res) => {
  let resBody = JSON.stringify(getLatestArtist());
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  return res.end(resBody);
});

app.get("/artists/:artistId/albums", (req, res) => {
  res.status(200).json(getAlbumsByArtistId(req.params.artistId));
});

app.get("/artists/:artistId/songs", (req, res) => {
  res.status(200).json(getSongsByArtistId(req.params.artistId));
});

app.get("/artists/:artistId", (req, res) => {
  res.status(200).json(getArtistByArtistId(req.params.artistId));
});

app.get("/artists", (req, res) => {
  let resBody = JSON.stringify(getAllArtists());
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.write(resBody);
  res.end();
  return;
});

app.patch("/artists/:artistId", (req, res) => {
  res.status(200)
    .json(
      editArtistByArtistId(
        req.params.artistId,
        req.body)
    );
});

app.post('/artists/:artistId/albums', (req, res) => {
  res.status(201).json(addAlbumByArtistId(req.params.artistId, req.body));
});

app.post('/artists', (req, res) => {
  let resBody = JSON.stringify(addArtist(req.body));
  res.statusCode = 201;
  res.setHeader("Content-Type", "application/json");
  res.write(resBody);
  res.end();
  return;
});

app.delete('/artists/:artistId', (req, res) => {
  deleteArtistByArtistId(req.params.artistId);
  res.status(200).json({ "message": "Successfully deleted" });
});

app.get("/albums/:albumId/songs", (req, res) => {
  res.status(200).json(getSongsByAlbumId(req.params.albumId));
});

app.get('/albums/:albumId', (req, res) => {
  res.status(200).json(getAlbumByAlbumId(req.params.albumId));
});

app.get('/albums', (req, res) => {
  let startsWith = (req.query.startsWith.toUpperCase());
  res.status(200).json(getFilteredAlbums(startsWith));
});

app.post('/albums/:albumId/songs', (req, res) => {
  res.status(201).json(addSongByAlbumId(req.params.albumId, req.body));
});

app.put('/albums/:albumId', (req, res) => {
  res.status(200).json(editAlbumByAlbumId(req.params.albumId, req.body));
});

app.delete('/albums/:albumId', (req, res) => {
  deleteAlbumByAlbumId(req.body.albumId);
  res.status(200).json({ "message": "Successfully deleted" });
});

app.get("/songs/:songId", (req, res) => {
  res.status(200).json(getSongBySongId(req.params.songId));
});

app.put("/songs/:songId", (req, res) => {
  res.status(200).json(editSongBySongId(req.params.songId, req.body));
});

app.delete("/songs/:songId", (req, res) => {
  deleteSongBySongId(req.params.songId);
  res.status(200).json({ "message": "Successfully deleted" });
});


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
