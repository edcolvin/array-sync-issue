# Postgres Typeorm Array Type Synchronization Issue

## Overview
This repo demonstrates a problem with Typeorm synchronization of array of varchars on postgres. When a length is specified and synchronization is enabled, Typeorm will drop and re-add the column on startup even if there are no schema changes. 

## Steps to Reproduce
1. Clone the repo.
2. Configure a test postgres database and test schema with owner test and password test.
3. npm install
4. tsc
5. Run "node dist/index.js" twice, once to create the schema, and a second time to demonstrate the issue.

## Additional Information
Every time the compiled code is executed after the initial schema creation, the console output will show the roles column is added and removed, losing any data that was stored in it.

`
query: ALTER TABLE "test"."user" DROP COLUMN "roles"

query: ALTER TABLE "test"."user" ADD "roles" character varying(64) array NOT NULL
`

The roles column is defined in the user entity: 

`
  @Column({
    array: true,
    type: "character varying",
    length: 64,
  })
  roles: string[];
`

If the length property is removed, the behavior will stop occurring. 

## Version Info
Postgres version (from select version()): 
PostgreSQL 11.9 (Debian 11.9-1.pgdg90+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 6.3.0-18+deb9u1) 6.3.0 20170516, 64-bit

Node version:
v12.16.3

Typeorm version:
0.2.28