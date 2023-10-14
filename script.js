console.log("Welcome to Spotify");


let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let gif = document.getElementById('gif');
let songItemContainer = document.getElementById('songItemContainer');
let baseUrl = "localhost:9024/songs";

let songs = [
    { songName: "Salam-e-Ishq 1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", time: "05:34" },
    { songName: "Salam-e-Ishq 9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", time: "05:34" },
]

songs.forEach((element, i) => {
    let newSongItem = document.createElement("div");
    newSongItem.className = "songItem";

    let img = document.createElement("img");
    img.src = element.coverPath;
    img.alt = "1";

    let songName = document.createElement("span");
    songName.className = "songName";
    songName.textContent = element.songName;

    let songListPlay = document.createElement("span");
    songListPlay.className = "songlistplay";

    let timestamp = document.createElement("span");
    timestamp.className = "timestamp";
    timestamp.textContent = element.time;

    let playButton = document.createElement("i");
    playButton.id = i + 1;
    playButton.className = "far songItemPlay fa-play-circle";

    timestamp.appendChild(playButton);
    songListPlay.appendChild(timestamp);
    newSongItem.appendChild(img);
    newSongItem.appendChild(songName);
    newSongItem.appendChild(songListPlay);

    songItemContainer.appendChild(newSongItem);
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})


audioElement.addEventListener('timeupdate', () => {
    progress = parseInt(audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

const changeSong = (index) => {
    audioElement.src = `songs/${index}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    masterSongName.innerText = songs[index-1].songName;
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        changeSong(songIndex);
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex == 9) { 
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    changeSong(songIndex);
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex == 1) {
        songIndex = 9;
    } else {
        songIndex -= 1;
    }
    changeSong(songIndex);
})