import vinylFtp from 'vinyl-ftp';
import { paths } from '../paths.js';
import dotenv from 'dotenv';

dotenv.config(); // читаем данные из .env

const ftpConfig = {
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    parallel: 5,
    log: console.log,
};

export const deploy = () => {
    const conn = vinylFtp.create(ftpConfig);
    return app.gulp.src('dist/**/*', { buffer: false })
        .pipe(conn.dest(process.env.FTP_PATH));
};
