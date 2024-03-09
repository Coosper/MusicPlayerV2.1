const fs = require('fs');

// Read the songs.json file
const readSongs = () => {
  try {
    const songsData = fs.readFileSync('songs.json', 'utf8');
    const songs = JSON.parse(songsData);
    return songs;
  } catch (err) {
    console.error('Error reading songs.json:', err);
    return [];
  }
};

// Write to the songs.json file
const writeSongs = (songs) => {
  try {
    const songsData = JSON.stringify(songs, null, 2);
    fs.writeFileSync('songs.json', songsData, 'utf8');
    console.log('songs.json updated successfully');
  } catch (err) {
    console.error('Error writing to songs.json:', err);
  }
};

// Add a new song to the songs.json file
const addSong = (song) => {
  const songs = readSongs();
  songs.push(song);
  writeSongs(songs);
};

// Remove a song from the songs.json file
const removeSong = (songId) => {
  const songs = readSongs();
  const updatedSongs = songs.filter((song) => song.id !== songId);
  writeSongs(updatedSongs);
};

// Update a song in the songs.json file
const updateSong = (songId, updatedSong) => {
  const songs = readSongs();
  const updatedSongs = songs.map((song) => {
    if (song.id === songId) {
      return { ...song, ...updatedSong };
    }
    return song;
  });
  writeSongs(updatedSongs);
};

module.exports = {
  readSongs,
  addSong,
  removeSong,
  updateSong,
};
