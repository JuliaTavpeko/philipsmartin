import svgSprite from 'gulp-svg-sprite';

export const sprite = () => {
    return app.gulp.src(app.path.src.icons)
        .pipe(svgSprite({
            mode: {
                symbol: {       // создаём один SVG спрайт
                    sprite: '../sprites/sprite.svg',
                    example: false,
                },
            },
            shape: {
                transform: [
                    {
                        svgo: {
                            js2svg: {pretty: true},
                            plugins: [
                                { name: 'removeViewBox', active: false },
                                { name: 'cleanupIDs', active: false }
                            ]
                        }
                    }
                ]
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.bs.stream());
};
