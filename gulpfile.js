// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path } from "./gulp/config/paths.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Импорт задач
import { clean } from "./gulp/tasks/clean.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { copy } from "./gulp/tasks/copy.js";
import { scss, scssParts } from "./gulp/tasks/scss.js";
import { sprite } from "./gulp/tasks/sprite.js";
import { scripts } from "./gulp/tasks/scripts.js";
import { images, svg } from "./gulp/tasks/images.js";
import { fontsCopy } from "./gulp/tasks/fonts.js";


// Наблюдатель за изменениями в файлах
function watcher() {
    gulp.watch(path.watch.html, html);

    gulp.watch(path.watch.scss, scss);
    gulp.watch('src/scss/parts/**/*.scss', scssParts);

    gulp.watch(path.watch.js, scripts);
    gulp.watch(path.watch.images, svg);
    gulp.watch(path.watch.icons, sprite);
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.images, images);
}

const styles = gulp.parallel(scss, scssParts);

const mainTasks = gulp.parallel(copy, html, styles, scripts, images, svg, sprite, fontsCopy);

const dev = gulp.series(clean, mainTasks, gulp.parallel(watcher, server));

const build = gulp.series(clean, mainTasks);

// Экспорт сценариев
export { dev }
export { build }

// Выполнение сценария по умолчанию
gulp.task('default', dev);
