import { createGulpEsbuild } from 'gulp-esbuild';
import sourcemaps from 'gulp-sourcemaps';

const esbuildDev = createGulpEsbuild({ incremental: true });
const esbuildBuild = createGulpEsbuild({ incremental: false });

export const scripts = () => {
    return app.gulp.src(app.path.src.js, {  encoding: false })
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.bs.stream());
}
