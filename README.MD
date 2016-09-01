Wordpress + Gulp + Webpack + Composer + CriticalCSS + Linting Starter pack
===========

Before you dive in; this is a highly opinionated starter pack which gives a very smooth developer experience. There are a lot of other great options around that offer more freedom in the choice of your tools.

I use this for myself as the start of every WordPress project. It has gone trough a lot of tweaking and improving. If you have any issues or recommendations, I would love to hear them!

About
---------------
This is a starter pack for developing WordPress themes. The project structure is a borrowed slightly from the SPA setup you see with React, Angular, etc. E.g, a */src* folder for all your source files, a */build* folder for local development builds and a */dist* folder for production builds.

###Features

- WordPress as a submodule - see [wordpress-boilerplate](https://github.com/Darep/wordpress-boilerplate) on how to update WordPress
- Seperate configs for development, staging and production environments
- Gulp with browsersync
- SCSS
- JPG, PNG, SVG image minification
- Bundles SVG icons to a single file
- Webpack (ES6 🎉)
- Composer with autoloader
- Hashed production assets. No more hasseling with caching or version parameters👋
- Lint SCSS & JS files
- Critical CSS - This is automatically build for the homepage, though you could quite easily expand this to other pages


Getting started
---------------
- Clone this repo by running `git clone --recursive https://github.com/Corjen/wordpress-gulp-webpack-composer-starter-pack.git my_project_folder`
- Run ```npm install``` inside the root folder
- You need a local php server to run Wordpres. The */public* folder is the folder you need to point your server to. I use this in conjunction with this repo: [vagrant-ubuntu-16.04-php7-mysql-provision](https://github.com/Corjen/vagrant-ubuntu-16.04-php7-mysql-provision), but you could also use MAMP or another solution.
- The */src* directory is prefilled with some examples, please check ik out
- Create your theme folder in public/wp-content/themes/YOUR_THEME_NAME and add the path in `.gitignore`

Change files
------------
Your project/theme probably isn't called *example*, so we need to change it in these files:
  - ```gulpconfig.js```  - Change *example.dev* to your local development url.
  - You might also change ```package.json``` and ```src/componser.json``` to your liking
  - We use Composer to autoload classes, so we have to be aware of the namespace. Check the following files and change the namespace: ```src/functions.php```, ```src/lib/AdminSettings.php```, ```src/lib/Cleanup.php```, ```src/lib/Settings.php```. *You could of course include files in ```functions.php``` manually and remove the examples files.*
  - Change the url's in ```public/wp-config.php```. This loads a config file from the `public/config` folder based on the ```WP_ENV``` constant. This will be `dev`, `stage` or `production`. You can also use this constant in your code, which can be quite handy.
  - Change the host, database credentials and keys and salts in `public/config/development.php`, `public/config/staging.php` and `public/config/production.php`

Development
-----------

To start, run `npm start` in one console window to start gulp. Run `npm run dev` in another window to start webpack. Note: Webpack is listening to your local IP instead of localhost, to ensure you can test your JS on different devices on the same network in development. If your local IP changes, change it in `src/lib/Settings.php`.

In development, gulp will do a couple of things:
- Run [browsersync](https://www.browsersync.io/) on `http://localhost:3000` or `http://YOUR_LOCAL_IP:3000` (for live testing on other devices)
- Build your scss files to css (without browser refreshing 🎉)
- Watch for changes in your php files, images, icons, fonts, etc.. in the */src* folder
- If a change is made, it will copy the file to the buildfolder you've set in `gulpconfig.js`

Note: If you've added a new php class and you wan't it to be autoloaded by composer, you have to update the autoloader classmap. You can do this by running this command in the root folder: `cd src/ && composer install`

- Webpack will take care of your JavaScript files. You can use ES6 out of the box and import and export modules as you like. This makes it quite easy to, for instance, combine React with a WordPress site.


Building for production
-----------------------
To build for production, simply run `npm run build`.

Building for production will do a couple of tasks(in order):

**Lint**
- PHP - using [phpcs](https://github.com/squizlabs/PHP_CodeSniffer) (I prefer PSR1)
- SCSS - using [scss-lint](https://github.com/brigade/scss-lint) (using the `.scss-lint.yml` file in the root folder)
- JavaScript - using [standard](https://github.com/feross/standard)

*You can, of course, change this to your liking, or disable it at all by removing `npm run lint &&` from the build script in `package.json`*

**Test**
- You can fill in your own preferred testing utility here. Currently it's just an empty script.

**Clean**
- This will delete you */dist* folder and create a new one

**Build**
- This will run a sequence of gulp build-production tasks:
  - Bundle, minify, vendor-prefix, and hash your scss to a single file. The hashed filename can be found in `dist/css/css-assets.json`. Also, see the example in `lib/Settings.php`
  - Optimizes and compresses your svg, png and jpg's in the */img* folder
  - Bundle all the *.svg* files in */icons* into `img/icons.svg`
  - Copy all remaining theme files like php, style.css, composer.json, etc to the dist folder
  - Runs a script, that extracts the [critical css](https://www.smashingmagazine.com/2015/08/understanding-critical-css/) from your dev server homepage set in `gulpconfig.js` and puts it in `dist/css/critical.css`.

- Webpack will will generate three files:
  - `vendors[hash].js`, e.g `vendors.95fc79345faed5f17dc2.js`
  - `main[hash].js` e.g. `main.95fc79345faed5f17dc2.js`
  - `webpack-asset.json`

  The vendors file will contain the packages given in `webpack.production.config.js` in this array `vendors: []`. This is useful for packages that you don't update as often as the rest of your code. For example, if you use jQuery and React add it like this: `vendors: ['jquery', 'react']`

  Ensure the vendors script is added before the main script in your html. See the example in `lib/Settings.php`

Additional tips & tricks
------------------------

When you're developing a new project, it can be useful to build for production, commit the *dist/* folder and push in a single command. You can do that by running `npm run deploy`

Deploying
------------------------

I highly recommend using a deploy tool like [Capistrano](http://capistranorb.com/) or [DeployHQ](https://www.deployhq.com/). Alternatively, you could use (s)ftp.

You need to deploy two folders:
- `/public` to your site root
- `/dist` to your theme folder, e.g. *wp-content/themes/theme_name*
