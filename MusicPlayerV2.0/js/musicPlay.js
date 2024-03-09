let progress = document.getElementById("progress");
let ctrlIcon = document.getElementById("ctrlIcon");
let songs = [];
let currentSongIndex = 0;
let progressInterval = null;

// Load the songs from the JSON file
fetch('./json/songs.json')
    .then(response => response.json())
    .then(data => {
        songs = data.songs; // Access the songs property of the data
        loadSong(currentSongIndex); // Load the first song
    })
    .catch(error => console.error('Error:', error));

// Get the audio element, song name element, artist name element, and song image element
const song = document.getElementById('song');
const songName = document.querySelector('.song-name h1');
const artistName = document.querySelector('.artist-name h2');
const songImage = document.querySelector('.song-container img');

song.onloadedmetadata = function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

// Function to load a song
function loadSong(index) {
    if (song) {
        song.src = songs[index].songFile; // Use songFile for the song source
        songName.textContent = songs[index].name;
        artistName.textContent = songs[index].artist;
        songImage.src = songs[index].albumCover; // Use albumCover for the song image
    }
}

// Function to play or pause the song
function playPause() {
    if (ctrlIcon && ctrlIcon.classList.contains("fa-pause")) {
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        clearInterval(progressInterval); // Clear the interval when the song is paused
    } else {
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
        progressInterval = setInterval(()=>( // Set the interval when the song starts playing
            progress.value = song.currentTime
        ),500)
    }
}

// Function to play the next song
function nextSong() {
    // Increment the song index
    currentSongIndex = (currentSongIndex + 1) % songs.length;

    // Load the new song
    loadSong(currentSongIndex);

    // Play the new song
    playPause();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1) % songs.length;
    loadSong(currentSongIndex);
    playPause();
}

progress.addEventListener('change', function() {
    song.currentTime = progress.value;
    if (song.paused) {
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    } else {
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
});