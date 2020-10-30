# Postgres Typeorm Array Type Synchronization Issue
This repo demonstrates a problem with Typeorm synchronization of array of varchars on Postgres.

## Issue description
When using Postgres, if a length is specified for an array of type varchar and synchronization is enabled, Typeorm will drop and re-add the column on startup even if there are no schema changes. 

If the length property is removed, the behavior will stop occurring. 

### Expected Behavior
When there are no changes to the column options, Typeorm should recognize the current database schema matches the column configuration, and not drop and re-add the column during synchronization.

### Actual Behavior
When synchronizing on startup, Typeorm issues SQL queries to drop and re-add the column, even though nothing has changed.

### Steps to Reproduce
1. Configre Typeorm with a Postgres connection.
2. Enable synchronization.
3. Configure an entity with a column of type string[] and options set to { array: true, type: "character varying", length: 64 }.
4. Launch the Typeorm app to create the new column, and then restart it to trigger synchronization again.

#### To demonstrate with this repo:
1. Clone the repo.
2. Configure a postgres database 'test' and schema 'test' with owner 'test' and password 'test', or update ormconfig.json as needed.
3. npm install
4. tsc
5. Run "node dist/index.js" twice, once to create the schema, and a second time to demonstrate the issue.

### Additional Context
Tested using Postgres version (from select version()): PostgreSQL 11.9 (Debian 11.9-1.pgdg90+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 6.3.0-18+deb9u1) 6.3.0 20170516, 64-bit

Console output for subsequent executions of index.js:

```
query: ALTER TABLE "test"."user" DROP COLUMN "roles"
query: ALTER TABLE "test"."user" ADD "roles" character varying(64) array NOT NULL
```

The roles column as defined in the user entity: 

```
 @Column({
    array: true,
    type: "character varying",
    length: 64,
  })
  roles: string[];
```
