let team;

if (process.argv.length > 2) {
  switch (process.argv[2]) {
    case 'team1':
      team = 'team1';
      break;
    case 'team2':
      team = 'team2';
      break;
    case 'team4':
      team = 'team4';
      break;
    case 'teamCRM':
      team = 'teamCRM';
      break;
    case 'team3':
    default:
      team = 'team3';
  }
}

const indexToRequire = `./src/${team}/index`;

require('core-js/stable');
require('regenerator-runtime/runtime');
require('@babel/register');
require(indexToRequire);
