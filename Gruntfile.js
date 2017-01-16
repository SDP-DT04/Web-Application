//Gruntfile
module.exports = function(grunt) {

    // requirejs compile options
    var compileOptions = {
        mainConfigFile: 'public/scripts/main.js',
        baseUrl: 'public/scripts',
        include: ['main'],
        out: 'dist/main.min.js',
        removeCombined: false,
        findNestedDependencies: true,

        //Removes console.logs for production
        onBuildWrite: function (moduleName, path, contents) {
            if(/(.*)js\/modules\/(.*)/.test(path)) return contents.replace(/console.log(.*);/g, ';');
            return contents;
        }
    };

    //Initializing the configuration object, required for grunt to run
    grunt.initConfig({

    // Task configuration

        init: {

        },

        //Testing
        jshint: {
            all: ['Gruntfile.js', 'server.js', 'database.js', 'routes/*.js', 'public/scripts/**/*.js'],
            server: ['server.js', 'database.js', 'routes/*.js'],
            public: ['public/scripts/**/*.js']
        },

        //Code Compilation
        //clean the distribution folder so nothing old hangs around
        clean: {
            dist: {
                src: ['dist']
            },
            css: {
                src: ['dist/*.css', 'public/stylesheets/*.css']
            },
            js: {
                src: ['dist/*.js']
            }
        },

        requirejs: {
            compile: {
                options : compileOptions //run with the compile options configured above
            }
        },

        less: {
            development: {
                options: {
                    compress: false,  // no minification in dev
                },
                files: {
                    //compiling base.less into styles.css
                    "./public/stylesheets/style.css":"./public/stylesheets/base.less"
                }
            },
            production: {
                options: {
                    cleancss: true, // clean css
                    compress: true, // minify css
                },
                files: {
                    //compiling base.less into main.min.css
                    "./dist/main.min.css": "./public/stylesheets/base.less"
                }
            }
        },

        handlebars: {
            compile: {
                options: {
                    amd: true,
                    wrapped: true
                },
                src: ["./views/**/*.handlebars"],
                dest: "./public/templates/comp/comp.handlebars.js"
            }
        },

        //Server
        nodemon: {
            dev: {
                options: {
                    file: 'server.js',
                    nodeArgs: ['--debug'],
                    watchedFolders: ['routes', 'server.js', 'database.js'],
                    env: {
                        PORT: '3300'
                    }
                }
            }
        },

        //Watchers to be executed upon file changes
        concurrent: {
          dev: {
              tasks: ['nodemon:dev', 'watch'],
              options: {
                  logConcurrentOutput: true
              }
          }
        },

        watch: {
            less: {
                // Watch all .less files from the styles directory)
                files: ['public/styles/*.less'],
                tasks: ['clean:css', 'less'],
                // Reloads the browser
                options: {
                    livereload: true
                }
            },
            requirejs: {
                // Watch only main.js so that we do not constantly recompile the .js files
                files: ['public/scripts/main.js'],
                tasks: ['clean:js', 'requirejs'],
                // Reloads the browser
                options: {
                    livereload: true
                }
            }
        }
    });

    //Load all of our dev dependencies for grunt to run
    require('load-grunt-tasks')(grunt);

    // Task definitions, you can type the first argument into the command line to execute the corresponding task
    // eg.) grunt server runs nodemon:dev, default runs everything

    //task registration follows the same pattern as their definitions\

    //default - run everything
    grunt.registerTask('default', []);

    //compilation
    grunt.registerTask('comp', ['requirejs', 'less'])
    grunt.registerTask('comp-clean', ['clean:css']);
    grunt.registerTask('comp-requirejs', ['requirejs']);
    grunt.registerTask('comp-less', ['less']);
    grunt.registerTask('comp-less-dev', ['less:development']);
    grunt.registerTask('comp-less-prod', ['less:production']);
    grunt.registerTask('comp-hbs', ['handlebars']);

    //testing
    grunt.registerTask('test', ['jshint:all']) //this line will include all testing frameworks
    grunt.registerTask('test-jshint', ['jshint:all']);
    grunt.registerTask('test-public-jshint', ['jshint:public']);
    grunt.registerTask('test-server-jshint', ['jshint:server']);

    //server
    grunt.registerTask('server', ['nodemon:dev']);

    //watchers
    grunt.registerTask('watch',['watch'])
    grunt.registerTask('',[''])

    //helpers - use this to run several tasks at once during development
    grunt.registerTask('devmode',['concurrent:dev'])
    grunt.registerTask('init-dev',['init'])


};