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

## Features to add
* Schema overview
  - Voyager
  - Generated schema file
* Generated schema file, generate on pre-commit
* Use @deprecated, ensure that breaking changes are notified - use @deprecated, check for deprecate and accept removal of field with @deprecated easier
* Generate docs with breaking changes
* Register usage (how much and who)
* Move to a managed schema instead of the service list - graph manager or homegrown?
  - reverse engineer a bit
  - what gets sent on register service?
  - how does the polling work, what gets sent back
  - how is this merged?
  - How does it look in graph manager

## Stuff that needs fixin'
* Headers pass through OR context

## More stuff
* Loggning - flytta Sebastians jobb i checkout till ett repo och ta in det i origo2 för att kunna ha traceId mellan apparna
* Snackis: CI och CD - plus strategier för versioner osv.
* LaunchDarkly - hämta allt och lägg på context eller låt varje resolver sköta det själv?
* Loglevel-lyssnare som lyssnar på loglevel-flagga i LD


Istället för att bara exportera server: exportera "constructor" och ha två saker i returnerat objekt 