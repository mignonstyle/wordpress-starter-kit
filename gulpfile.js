var gulp        = require( 'gulp' );
var sass        = require( 'gulp-sass' );
var plumber     = require( 'gulp-plumber' );
var cssmin      = require( 'gulp-cssmin' );
var rename      = require( 'gulp-rename' );
var browserSync = require( 'browser-sync' );

gulp.task( 'sass', function() {
	return gulp.src( './scss/*.scss' )
	.pipe(plumber( {
		errorHandler: function( err ) {
			console.log( err.messageFormatted );
			this.emit( 'end' );
		}
	} ) )
	.pipe( sass() )
	.pipe( cssmin() )
	.pipe( rename( {suffix: '.min'} ) )
	.pipe( gulp.dest( './css/' ) )
	.pipe( browserSync.reload( {stream: true} ) );
} );

gulp.task( 'browser-sync', function() {
	browserSync( {
		proxy: "http://vccw.dev/"
	} );
} );

gulp.task( 'bs-reload', function() {
	browserSync.reload();
} );

gulp.task( 'default', ['browser-sync'], function() {
	gulp.watch( ['scss/*.scss', 'scss/**/*.scss', 'js/**/*.css'], ['sass'] );
	
	gulp.watch( "./*.php", ['bs-reload'] );
} );
