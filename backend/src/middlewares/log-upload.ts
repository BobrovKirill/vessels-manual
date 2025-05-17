export default (config, { strapi }) => {
  return async (ctx, next) => {
    if (ctx.path.startsWith('/upload')) {
      console.log('📤 Upload request detected');
    }
    await next();
  };
};