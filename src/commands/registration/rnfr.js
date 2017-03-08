const when = require('when');

module.exports = {
  directive: 'RNFR',
  handler: function ({log, command} = {}) {
    if (!this.fs) return this.reply(550, 'File system not instantiated');
    if (!this.fs.get) return this.reply(402, 'Not supported by file system');

    const fileName = command._[1];
    return when(this.fs.get(fileName))
    .then(() => {
      this.renameFrom = fileName;
      return this.reply(350);
    })
    .catch(err => {
      log.error(err);
      return this.reply(550);
    });
  },
  syntax: '{{cmd}} [name]',
  description: 'Rename from'
};
