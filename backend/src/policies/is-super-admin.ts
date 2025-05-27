module.exports = (policyContext, config, { strapi }) => {
  const { user } = policyContext.state;

  if (!user) {
    return false;
  }

  // Является ли пользователь супер-админом
  return user.roles?.some(role => role.code === 'strapi-super-admin');
};