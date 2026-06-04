const isProd = process.argv.includes('--build');
const isDev = !isProd;

export { isProd, isDev };
