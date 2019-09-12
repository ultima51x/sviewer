# sviewer
This is an app which acts as a library visualizer (with "columns") for Spotify.

## Development Instructions
```
npm run dev:electron
npm run dev:webpack
```

## Build Instructions
For production builds that will be packaged:
```
npm build
```
Then follow instructions in https://electronjs.org/docs/tutorial/application-distribution.

## TODO

There's a lot to do if I ever get around to it:

* How to hookup webpack dev server and eslint
* Get babel working with electron?
* Add spotify branding
* Add loading screen on refresh
* Figure out debugging w/ node
* Async await
* Basic refactoring
* Sort ignore "The, A"
* Get rest of tracks...
* On close, on open save and read from filesystem
* CSS sourcemaps
* Search
* Multiple Select
* Adding albums
* Removing albums
* Album List view
	* Cache Cover
* Double click to go
