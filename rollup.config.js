import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import vue from 'rollup-plugin-vue';

const LIBRARY_NAME = 'VueHelloRollup';

const sourcemap = true;
const plugins = [
	vue({
		css: 'dist/vue-hello-rollup.css'
	}),
	resolve({
		module: false,
		browser: true,
		customResolveOptions: {

		}
	}),
	commonjs(),
	babel({
		exclude: 'node_modules/**'
	})
];
const pluginsWithMinify = plugins.slice(0);

const defaultConfig = {
	input: 'src/index.js'
};

if (process.env.NODE_ENV === 'production') {
	pluginsWithMinify.push(minify());
	pluginsWithMinify.push(postcss());
}

if (process.env.NODE_ENV === 'development') {
	defaultConfig.input = 'dev/main.js';
	defaultConfig.watch = {
		include: ['src/**', 'dev/**']
	};

	plugins.push(livereload());
	plugins.push(serve({
		contentBase: '.',
		open: true
	}));
}

export default [
	Object.assign({}, defaultConfig, {
		output: [
			{
				file: 'dist/vue-hello-rollup.common.js',
				format: 'cjs',
				sourcemap
			},
			{
				file: 'dist/vue-hello-rollup.es.js',
				format: 'es',
				sourcemap
			}
		],
		plugins
	}),
	Object.assign({}, defaultConfig, {
		output: {
			file: 'dist/vue-hello-rollup.js',
			format: 'iife',
			name: LIBRARY_NAME,
			sourcemap
		},
		plugins
	}),
	Object.assign({}, defaultConfig, {
		output: {
			file: 'dist/vue-hello-rollup.min.js',
			format: 'iife',
			name: LIBRARY_NAME,
			sourcemap
		},
		plugins: pluginsWithMinify
	})
];
