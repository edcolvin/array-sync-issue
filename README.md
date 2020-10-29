# Postgres Typeorm Array Type Synchronization Issue
This repo demonstrates a problem with Typeorm synchronization of array of varchars on postgres.

## Issue description
When a length is specified for an array of type varchar and synchronization is enabled, Typeorm will drop and re-add the column on startup even if there are no schema changes. 

If the length property is removed, the behavior will stop occurring. 

## Steps to reproduce the issue
1. Clone the repo.
2. Configure a test postgres database and test schema with owner test and password test.
3. npm install
4. tsc
5. Run "node dist/index.js" twice, once to create the schema, and a second time to demonstrate the issue.


## What's the expected result?
When there are no changes to the column options, Typeorm should recognize the current database schema matches the column configuration, and not drop and re-add the column.

## What's the actual result?
Every time the compiled code is executed after the initial schema creation, the console output will show the array of varchar column is removed and readded, losing any data that was stored in it.


## Additional details 
Console output for subsequent executions of index.js:

```
query: ALTER TABLE "test"."user" DROP COLUMN "roles"
query: ALTER TABLE "test"."user" ADD "roles" character varying(64) array NOT NULL
```


The roles column is defined in the user entity: 

```
 @Column({
    array: true,
    type: "character varying",
    length: 64,
  })
  roles: string[];
```


### Version Info
Postgres version (from select version()): 
PostgreSQL 11.9 (Debian 11.9-1.pgdg90+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 6.3.0-18+deb9u1) 6.3.0 20170516, 64-bit

Node version:
v12.16.3

Typeorm version:
0.2.28