import nunjucksRender from 'gulp-nunjucks-render';
import webpHtml from 'gulp-webp-html-nosvg';
import htmlbeautify from 'gulp-html-beautify';

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(nunjucksRender())
        .pipe(
            webpHtml()
        )
        .pipe(htmlbeautify({
            indent_size: 4,
            preserve_newlines: true,
            end_with_newline: true,
            max_preserve_newlines: 1,
            unformatted: ['code', 'pre', 'em', 'strong'],
        }))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.bs.stream());
}

