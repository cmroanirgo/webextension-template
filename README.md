# WebExtension Boilerplate/Template

This is a simple project to give a basic skeleton of a WebExtension that is ready to go for Firefox and Chrome. Other platforms are exceedingly easy to add (details below).


## Installation

Either download or clone this repo and `cd` to it.

```
npm install
```

This will install around 50MB of webpack and related modules in order to develop.

1. Edit `package.json` and change the 'TODO' entries, and version number
2. Edit `src/manifest.firefox.json` and change the 'id'
3. Update the icons. (A modified sketch file, originally by [Bharani, & Email This](https://www.emailthis.me) is provided in resources)

You are ready to build.

## Usage

Building

```
npm run build
```

Debug (non-minified) builds are available using:

```
npm run build:debug
```

Watching
```
npm run watch
```

**Note: ** It is important that you run `npm run build` to generate a final minified version, rather than relying on the last watch output.


### Adding New Target Platforms

If you wish to develop for Edge or Opera then:

1. Edit `webpack.config.js` and add an appropriate target.
2. If necessary, add a platform specific manifest (like manifest.firefox.json) in `src/`


## Testing

### Chrome

1. Go to [chrome://extensions/](chrome://extensions/)
2. Click `Load Unpacked Extension` and select the `build/chrome` folder

Note: Chrome will keep this extension loaded after shutting down Chrome.

### Firefox

1. Go to [about:debugging#addons](about:debugging#addons)
2. Click 'Load Temporary add-on' and select any file in the 'build/firefox' folder

Note: Firefox will always unload this extension loaded after shutting down Firefox.

## Credits

Thanks to the inspirational work by Bharani, and his [Email This](https://www.emailthis.me) boilerplate. Some of his code has been used (and credited) in this project, but will be morphed and removed over time.
The primary differences between the two projects:

1. Removal of language support. Ironic.
2. Removal of Opera support. It's basically the same as Chrome, but easy to add back in, if need be.
3. Removal grunt to use webpack. This allows the code to better minified
4. Addition of a jquery-like module (notjquery.js) which allows for most common jquery functions, without the seperate (& large) download

