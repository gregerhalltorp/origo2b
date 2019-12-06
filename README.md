[![Build Status](https://dev.azure.com/tcitnordic/BIT/_apis/build/status/Web%20Team%203/WebTeam3_origo2%20-%20CI?branchName=master)](https://dev.azure.com/tcitnordic/BIT/_build/latest?definitionId=609&branchName=master)

# New version of origo2 this file for documentation

You will need 
[node](https://nodejs.org/),
[yarn](https://yarnpkg.com/) and
[make](https://www.gnu.org/software/make/) to get started.

Installing `make` on windows is somewhat challenging (thanx, MS!) but here are suggestions: 
* Via [chocolatey](https://chocolatey.org/install): [make](https://chocolatey.org/packages/make)
* [mingw](http://mingw.org/)
* [msys2](https://www.msys2.org/)

```
$ clone [the repo]
$ cd [the folder]
$ make bootstrap
```

## Adding dependencies
Add dependencies using `lerna add`:
```
yarn lerna add @apollo/gateway packages/origo-gateway
yarn lerna add @apollo/gateway --scope=@tcne/origo-gateway
yarn lerna add @apollo/gateway --scope={@tcne/origo-booking,@tcne/origo-gateway}
```
