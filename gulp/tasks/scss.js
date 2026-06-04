import * as dartSass from 'sass'
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import mergeStream from 'merge-stream';

const sass = gulpSass(dartSass);


export function scss() {
    return app.gulp.src(app.path.src.scss)
        .pipe(app.plugins.if(app.isDev, sourcemaps.init()))

        .pipe(
            sass({
                includePaths: ['src/scss', 'node_modules'],
                quietDeps: true,
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )

        // =========================
        // MAIN CSS (ВСЕГДА ЧИСТЫЙ)
        // =========================
        .pipe(
            app.plugins.if(
                true,
                postcss([
                    autoprefixer({
                        overrideBrowserslist: ['last 2 versions', 'not dead']
                    })
                ])
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))

        // =========================
        // MIN CSS (ТОЛЬКО BUILD)
        // =========================
        .pipe(rename({ extname: ".min.css" }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                postcss([cssnano()])
            )
        )

        .pipe(
            app.plugins.if(app.isDev, sourcemaps.write('.'))
        )

        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.bs.stream());
}


export function scssParts() {
    return app.gulp.src('src/scss/parts/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                includePaths: ['src/scss', 'node_modules'],
                quietDeps: true,
                outputStyle: 'expanded'
            }).on('error', sass.logError)
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                postcss([
                    autoprefixer({
                        grid: true,
                        overrideBrowserslist: ['last 1 versions'],
                        cascade: true
                    })
                ])
            )
        )
        .pipe(rename({ extname: ".css" }))
        .pipe(sourcemaps.write('.'))
        .pipe(app.gulp.dest(app.path.build.css + '/parts'))
        .pipe(app.plugins.bs.stream());
}
