/**
 * @author pzhang
 * @version v1.0.0
 * @description Unified code, general use the `koa middleware`
 * 
 * the code imitate the koa.application
 */

const Emitter = require('events');
const isGeneratorFunction = require('is-generator-function');
const compose = require('koa-compose');
const convert = require('koa-convert');
const helper = require('pz.helper');
const assert = require('assert');

module.exports = class Application {
    /**
     * attach the context with options field
     * 
     * @param {Object} options 
     */
    constructor(options = {}) {
        this.context = Object.assign({}, { options: options });
        this.middleware = [];
    }

    /**
     * handle function
     * 
     * @param {Function} handleFn   (err,ctx) 
     */
    exec(handleFn) {
        const fn = compose(this.middleware);
        const ctx = this.context;
        fn(ctx).then(handleFn.partial(null, ctx)).catch(handleFn.partial(null, ctx));
    }

    /**
     * add middleware (the same as koa.use)
     * 
     * @param {AsyncFunction or GeneratorFunction} fn 
     */
    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        if (isGeneratorFunction(fn)) {
            fn = convert(fn);
        }
        this.middleware.push(fn);
        return this;
    }

}