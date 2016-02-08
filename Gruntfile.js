module.exports = function(grunt) {
    grunt.initConfig({
    	utm_params: '?utm_source=sitemap.duyetdev.com&utm_medium=sitemap.link&utm_campaign=sitemap.tracker',
        oss_server: '//oss.duyetdev.com',
        oss_api_key: 'ef5dacac538692d643cfc5599e8b4c6d',

        fixturesPath: 'assets',
        pkg: require('./package.json'),

        processhtml: {
            options: {
                data: {
                    utm_params: '<%= utm_params %>',
                    oss_server: '<%= oss_server %>',
                	oss_api_key: '<%= oss_api_key %>',
                	data: require('./sitemap.json')
                }
            },
            dist: {
                files: {
                    'src/views/sitemap-link.html': ['src/templates/sitemap-link.html']
                }
            }
        },

        htmlbuild: {
            dist: {
                src: 'src/index.html',
                dest: 'index.html',
                options: {
                    beautify: true,
                    sections: {
                        views: 'src/views/**/*.html',
                        layout: {
                            header: 'src/layout/header.html',
                            footer: 'src/layout/footer.html'
                        }
                    },
                    data: {},
                    styles: {
                        bundle: {
                            cwd: '<%= fixturesPath %>',
                            files: [
                                'css/*.css'
                            ]
                        },
                    },
                    scripts: {
                        bundle: [
                            '<%= fixturesPath %>/js/*.js',
                            '!**/main.js',
                        ],
                        main: '<%= fixturesPath %>/js/main.js'
                    },
                    data: {
                    }
                }
            }

        }
    });

    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-html-build');

    grunt.registerTask('default', ['processhtml', 'htmlbuild:dist'])
}
