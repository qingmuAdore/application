# Application
Unified code, general use the `koa middleware`

- constructor(options)
attach the context with options field

ctx.options


- use(middleware)
 add middleware (the same as koa.use)

add middleware

- exec(handleFn)
handle function

handleFn(err,ctx)
