module.exports = function(grunt) {
    grunt.initConfig({
    	utm_params: '?utm_source=sitemap.duyetdev.com&utm_medium=sitemap.link&utm_campaign=sitemap.tracker',

        fixturesPath: 'assets',
        pkg: require('./package.json'),

        processhtml: {
            options: {
                data: {
                	utm_params: '<%= utm_params %>',
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
