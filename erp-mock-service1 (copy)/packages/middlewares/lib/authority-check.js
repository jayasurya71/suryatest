function permit(rules) {
  return (req, res, next) => {
    const { permissions, features } = rules;

    const { currentClient, currentUser } = req;
    let isFeaturesEnabled = true;
    let isPermissionsAllowed = true;

    if (features.length) {
      isFeaturesEnabled = features.every(feature => currentClient.isEnabled(feature));
    }
    if (!isFeaturesEnabled) {
      res.sendStatus(403);
      return;
    }

    // If a route is non-authenticated, currentUser will be empty
    if (permissions.length && currentUser) {
      isPermissionsAllowed = permissions.every((permission) => {
        if (permission.includes('|')) {
          const _permissions = permission.split('|');
          return _permissions.reduce((acc, curr) => acc || currentUser.hasPermission(curr), false);
        }
        return currentUser.hasPermission(permission);
      });
    }
    if (!isPermissionsAllowed) {
      res.sendStatus(403);
      return;
    }
    next();
  };
}

module.exports = permit;
