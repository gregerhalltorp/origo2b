/* eslint-disable no-var, prefer-destructuring */
var os = require('os');
var exec = require('child_process').exec;

var win32ExecStr =
  'if not exist "./__FROM__" mklink /J "./__FROM__" "./__TO__"';
var nixExecStr = 'rm -rf ./__FROM__ && ln -sf __TO__ ./__FROM__';

var isPlatformNix = os.platform() !== 'win32';

[
  ['../../babel.config.js', './babel.config.js'],
].forEach(path => {
  var to;
  var from;

  if (path && path.constructor === Array) {
    to = path[0];
    from = path[1];
  }

  if (typeof path === 'string') {
    to = path;
    from = path;
  }

  const execStr = isPlatformNix ? nixExecStr : win32ExecStr;

  // eslint-disable-next-line no-unused-expressions, no-console
  to &&
    from &&
    exec(execStr.replace(/__FROM__/g, from).replace(/__TO__/g, to)) &&
      console.log(`<<SYMLINK>> ${from} --> ${to}`);
});
