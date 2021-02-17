const mix = require('laravel-mix');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

var webpackConfig = {
    module: {
        rules: [
            {
                test: /\..s(c|a)ss$/,
                use: [
                        'vue-style-loader',
                        'css-loader',
                    {
                        loader: 'sass-loader',
                        // Requires sass-loader@^7.0.0
                        options: {
                            implementation: require('sass'),
                            indentedSyntax: true // optional
                        },
                        // Requires sass-loader@^8.0.0
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true // optional
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new VuetifyLoaderPlugin({ 
            match (originalTag, { kebabTag, camelTag, path, component }) {
                if (kebabTag.startsWith('core-')) {
                    return [
                    camelTag,
                    `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
                    ]
                }
            }
        })
    ],
    resolve: {
        extensions: ['.js','.vue','.plugins'],
        alias: {
            '@': __dirname + '/resources'
        }
    },
}

mix.webpackConfig(webpackConfig);
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');