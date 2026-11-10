# Hooriya — Auto-play Portfolio

## Run in VS Code
1. Open this folder in VS Code (File > Open Folder).
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` > **Open with Live Server**.
4. Click **Tap to play** (browsers need one tap before sound can start).

Opening `index.html` by double-click also works, but Live Server is recommended.

## Files
- `index.html` — structure and all text (3 scenes: Hello, Services, Connect)
- `css/style.css` — design (colours are variables at the top of the file)
- `js/main.js` — timeline (`run()` function), typing text, layout
- `assets/hooriya.webp` — cut-out photo with lime border
- `assets/music.mp3` — background audio
- `assets/original/hoor7.jpeg` — your original photo

## Easy edits
- **Hello overlap:** in `js/main.js`, change `HELLO_OVERLAP` (smaller = more of Hello hidden behind the photo).
- **Typing text:** the three `typeTo("...")` lines in `run()`.
- **Links:** the `<a class="lk">` items in `index.html` (Portfolio, GitHub, LinkedIn).
- **Timing:** every `at(seconds, ...)` call in `run()`; the times match the audio.
- **New photo:** replace `assets/hooriya.webp` (transparent PNG/WebP works best).

## Recording for LinkedIn
Open `index.html?clean` (with Live Server: add `?clean` to the address). This hides the sound and replay buttons so your screen recording is clean. Tap play, then record. Hello appears about 1 second after the tap.

## Note
The audio comes from your reference video. If it is a licensed or trending track, check its rights before publishing the site publicly, or replace `assets/music.mp3` with your own audio.
