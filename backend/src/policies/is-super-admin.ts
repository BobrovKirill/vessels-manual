module.exports = (policyContext, config, { strapi }) => {
  const { user } = policyContext.state;
  console.log('Headers:', policyContext.request.header);
  console.log('State:', policyContext.state);
  console.log('User:', policyContext.state.user);
  if (!user) {
    return false;
  }

  // Является ли пользователь супер-админом
  return user.roles?.some(role => role.code === 'strapi-super-admin');
};