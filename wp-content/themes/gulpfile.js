let preprocessor = 'sass', // Preprocessor (sass, less, styl); 'sass' also work with the Scss syntax in blocks/ folder.
fileswatch   = 'php,json,md,woff2' // List of files extensions for watching & hard reload

import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch } = pkg

import browserSync   from 'browser-sync'
import bssi          from 'browsersync-ssi'
import ssi           from 'ssi'
import webpackStream from 'webpack-stream'
import webpack       from 'webpack'
import TerserPlugin  from 'terser-webpack-plugin'
import gulpSass      from 'gulp-sass'
import dartSass      from 'sass'
import sassglob      from 'gulp-sass-glob'
const  sass          = gulpSass(dartSass)
import stylglob      from 'gulp-noop'
import postCss       from 'gulp-postcss'
import cssnano       from 'cssnano'
import autoprefixer  from 'autoprefixer'
import imagemin      from 'gulp-imagemin'
import changed       from 'gulp-changed'
import concat        from 'gulp-concat'
import rsync         from 'gulp-rsync'
import {deleteAsync} from 'del'

function browsersync() {
  browserSync.init({
		proxy:"http://dev.dev-arsen.ml/",
		ghostMode: false,
		notify: false,
		online: true
	})

}

function scripts() {
	return src(['twentytwentythree_child/js/*.js', '!twentytwentythree_child/js/*.min.js'])
		.pipe(webpackStream({
			mode: 'production',
			performance: { hints: false },
			plugins: [
				new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' }), // jQuery (npm i jquery)
			],
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env'],
								plugins: ['babel-plugin-root-import']
							}
						}
					}
				]
			},
			optimization: {
				minimize: true,
				minimizer: [
					new TerserPlugin({
						terserOptions: { format: { comments: false } },
						extractComments: false
					})
				]
			},
		}, webpack)).on('error', (err) => {
			this.emit('end')
		})
		.pipe(concat('app.min.js'))
		.pipe(dest('twentytwentythree_child/js'))
		.pipe(browserSync.stream())
}

function styles() {
	return src([`twentytwentythree_child/styles/${preprocessor}/*.*`, `!twentytwentythree_child/styles/${preprocessor}/_*.*`])
		.pipe(eval(`${preprocessor}glob`)())
		.pipe(eval(preprocessor)({ 'include css': true }))
		.pipe(postCss([
			autoprefixer({ grid: 'autoplace' }),
			cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
		]))
		.pipe(concat('app.min.css'))
		.pipe(dest('twentytwentythree_child/css'))
		.pipe(browserSync.stream())
}

function images() {
	return src(['twentytwentythree_child/images/src/**/*'])
		.pipe(changed('twentytwentythree_child/images/dist'))
		.pipe(imagemin())
		.pipe(dest('twentytwentythree_child/images/dist'))
		.pipe(browserSync.stream())
}

async function cleandist() {
	await deleteAsync('dist/**/*', { force: true })
}


function startwatch() {
	watch(`twentytwentythree_child/styles/${preprocessor}/**/*`, { usePolling: true }, styles)
	watch(['twentytwentythree_child/js/**/*.js', '!twentytwentythree_child/js/**/*.min.js'], { usePolling: true }, scripts)
	watch('twentytwentythree_child/images/src/**/*', { usePolling: true }, images)
	watch(`twentytwentythree_child/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browserSync.reload)
}

export { scripts, styles, images }
export let assets = series(scripts, styles, images)
export let build = series(cleandist, images, scripts, styles)

export default series(scripts, styles, images, parallel(browsersync, startwatch))
