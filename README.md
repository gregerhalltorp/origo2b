# ORiGO mark II

### Motivation
The original implementation of origo has reached a point where a number of sources of pain have started to appear:
1. Stale schemas - _parts of the schema may not be used often or at all but it is difficult to know which or where_
2. Namespaced separation of concern - _to avoid teams stepping on each other's toes, name spacing has been used, leading to a bloated schema_
3. Duplicated code - _name spacing allows us to avoid affecting others' code, but leads to duplications in the model_
4. Bad use of `graphql` - _using name spacing has led to teams defining their own types to define views on entities instead of 
leveraging_ `graphql` _correctly_
5. Outdated references - _the risk of breaking functionality has held off updating of the references. Some of the most important ones have not
been updated since the project was conceived_

### Solution

This new version of origo attempts to solve some of these problems through the use of new developments in the `graphql` space and a separated structure.
* A new structure where the core server implementation is common to all teams, but each team defines its own schema + resolvers and related logic in a separate folder.
* A new build system to allow each team to build their part of the schema out to a separate `graphql` server.
* `Apollo Federation` to join the separate team instances at one point and only have one exposed endpoint.

Addressing the points in the motivation:
1. `Apollo Federation` allows each team to own a part of the schema, making it their responsibility to prune unused parts of the schema.
2. By separating the teams' contributions already at the structural level, name spacing can be removed
3. Teams can still make use of the contributions of other teams since the entire schema for all teams is exposed at the federated level.
4. Using `Apollo Federation` enables referencing other `Types` in queries and extending existing `Types` without affecting previous contributions
5. A fresh start allows better control and enables us to make regular updates to this vital service

### Caveats
Since teams will be more separated in their work, more communication regarding modelling is necessary to avoid collisions. A common view of the entire graph should be introduced.

### Missing features
* Caching
* Regulating external access
* Header handling, i.e. auth-userid for bookings
* ...

## Instructions

### Setup
**TBI**

### Adding a datasource

Datasources are located in the `src/common/datasoures` folder. Once implemented, the datasource must be added in `src/common/server.js`:
```
import MyFancyDataSource from './datasources/fancy';
...
const apolloServer = new ApolloServer({
  ...
  dataSources: () => ({
    ...,
    fancy: new MyFancyDataSource(),
  }),
```
Note that at the moment, each datasource must implement its own request cache and must handle caching as it sees fit.

### Adding schemas and resolvers
`schemas/index.js` for each team must export schemas and resolver mappings as an array of modules `{typeDefs, resolvers}`, where `typeDefs` contains the schema definitions and `resolvers` contains the resolver mappings. Include the extension of the `Query` type in the schema definition.
Make sure that there are no duplications in the schema.