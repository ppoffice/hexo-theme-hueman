const Migration = require('hexo-component-inferno/lib/core/migrate').Migration;

module.exports = class extends Migration {
  constructor() {
    super('1.0.0', null);
  }

  upgrade(config) {
    // TODO: upgrade config
    return config;
  }
};
