export const server = (done) => {
    app.plugins.bs.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        open: false,
        notify: false,
        port: 3000,
    });
}
