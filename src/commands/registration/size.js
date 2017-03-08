const when = require('when');

module.exports = {
  directive: 'SIZE',
  handler: function ({log, command} = {}) {
    if (!this.fs) return this.reply(550, 'File system not instantiated');
    if (!this.fs.get) return this.reply(402, 'Not supported by file system');

    return when(this.fs.get(command._[1]))
    .then(fileStat => {
      return this.reply(213, {message: fileStat.size});
    })
    .catch(err => {
      log.error(err);
      return this.reply(550);
    });
  },
  syntax: '{{cmd}} [path]',
  description: 'Return the size of a file',
  flags: {
    feat: 'SIZE'
  }
}
