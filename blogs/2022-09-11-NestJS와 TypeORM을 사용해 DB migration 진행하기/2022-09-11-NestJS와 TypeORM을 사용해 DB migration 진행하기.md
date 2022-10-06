# TypeOrm

아래 설명에서 사용되는 소스 일부분의 실제 사용 예시는 아래 Github에서 받아볼 수 있다.

[https://github.com/belf-kr/todo-service](https://github.com/belf-kr/todo-service)

---

# Migration

DB를 사용해서 서버단 서비스 개발을 하다보면 DB 스키마 변경은 필연적이다. 설계를 완벽하게 해서 DB 스키마 변경을 하지 않는게 가장 좋은 상황이지만, 그럴 일은 존재하지 않는다.

TypeORM이 NestJS에서 의존적으로 작동되니 별 문제 없을것이라 생각하기 쉽지만, DB Schema 변경을 위한 TypeORM migration은 TypeORM 명령어를 직접 사용해야 한다.

물론, NestJS 서비스가 구동될 때 `TypeOrmModule.forRootAsync` 에서 사용되는 `DB_SYNCHRONIZE` 설정값을 `true`로 설정하면 TypeORM entity 코드가 변경될 때 컬럼명 정도는 자동으로 변경된다.

하지만, 이와 같은 알아서 잘 해 주겠지 식의 생각은 production 환경에서 예상하지 못한 문제를 만들어 낼 수 있다.

```json
"create-migration": "npm run typeorm migration:create -- --config src/config/typeorm/typeorm.config.ts -n",
"run-migrations": "npm run typeorm migration:run -- --config src/config/typeorm/typeorm.config.ts",
"revert-migrations": "npm run typeorm migration:revert -- --config src/config/typeorm/typeorm.config.ts ",
"generate-migrations": "npm run typeorm migration:generate -- --config src/config/typeorm/typeorm.config.ts ",
"create-migration-dev": "cross-env NODE_ENV=development npm run typeorm migration:create -- --config src/config/typeorm/typeorm.config.ts -n",
"run-migrations-dev": "cross-env NODE_ENV=development npm run typeorm migration:run -- --config src/config/typeorm/typeorm.config.ts",
"revert-migrations-dev": "cross-env NODE_ENV=development npm run typeorm migration:revert -- --config src/config/typeorm/typeorm.config.ts ",
"generate-migrations-dev": "cross-env NODE_ENV=development npm run typeorm migration:generate -- --config src/config/typeorm/typeorm.config.ts "
```

package.json 파일의 scripts 일부분이며, 예시 명령어에서는 미리 설정해둔 위 명령어를 활용하니 참고 바란다.

**아래 설명된 명령어들을 따라하기 전 TypeORM Entity 파일을 우선 변경해**둬야 서비스 실행시 문제가 생기지 않는다.

## Create migration class file

![typeorm migration 생성.png](2022-09-11-NestJS와%20TypeORM을%20사용해%20DB%20migration%20진행하기/typeorm_migration_create.png)

`npm run create-migration-dev -n CourseUsernameRename` 명령어를 사용해 `CourseUsernameRename` 라는 이름의 Class 파일을 생성한다.

![typeorm migration 클래스.png](2022-09-11-NestJS와%20TypeORM을%20사용해%20DB%20migration%20진행하기/typeorm_migration_class.png)

TypeORM이 생성해준 파일을 열어보면 up, down 메소드가 존재한다.

- up: DB 스키마 변경을 위해 실행할 SQL
- down: DB 스키마 변경 취소를 위해 실행할 SQL

실행을 원하는 SQL 구문과 이를 취소할 수 있는 SQL 구문을 각 메소드 내부에 작성한다.

## Run migration

migration은 TS 파일이 아닌 JS 파일로 실행된다. 그러므로 `dist` 폴더 내부의 JS 파일이 최신 버전의 파일임을 명확하게 할 필요가 존재한다.

아래 명령어를 순차적으로 실행한다.

`npm run prebuild`

`npm run build`

![typeorm migration 실행.png](2022-09-11-NestJS와%20TypeORM을%20사용해%20DB%20migration%20진행하기/typeorm_migration_execute.png)

`npm run run-migrations-dev` 명령어를 사용해 migration 작업을 실행한다.

![typeorm migration 실행후 로그.png](2022-09-11-NestJS와%20TypeORM을%20사용해%20DB%20migration%20진행하기/typeorm_migration_log_after_execute.png)

`typeorm_migrations` DB table 내부에 방금 실행한 migration 정보가 insert 되었음을 확인할 수 있다.

## Revert migration

migration은 TS 파일이 아닌 JS 파일로 실행된다. 그러므로 `dist` 폴더 내부의 JS 파일이 최신 버전의 파일임을 명확하게 할 필요가 존재한다.

아래 명령어를 순차적으로 실행한다.

`npm run prebuild`

`npm run build`

![typeorm migration 취소.png](2022-09-11-NestJS와%20TypeORM을%20사용해%20DB%20migration%20진행하기/typeorm_migration_cancel.png)

`npm run revert-migrations-dev` 명령어를 실행해 migration 작업을 실행한다.

## 참고

### 특정 migration class만 실행 하는것은 불가능

[TypeORM - run specific migration](https://stackoverflow.com/questions/55422188/typeorm-run-specific-migration)

migration 작업은 변경 내역들을 순차적으로 실행되어야 한다. 특정 migration class 파일만을 실행하는 것은 불가능하다.

특정 쿼리만을 실행하기 위해서는 TypeORM cli를 사용하거나, 새로운 migration class 파일을 매번 생성하는것이 올바른 방법이다.

### 참고 문서

[Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/techniques/database#migrations)

[TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.](https://typeorm.io/#/migrations)

[TypeORM - Amazing ORM for TypeScript and JavaScript (ES7, ES6, ES5). Supports MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, WebSQL databases. Works in NodeJS, Browser, Ionic, Cordova and Electron platforms.](https://typeorm.io/#/using-cli/run-migrations)

[TypeORM and MySql Configuration for NestJS](https://medium.com/swlh/typeorm-and-mysql-configuration-for-nestjs-1d368b42a15f)

[TypeORM and Mysql Configuration for NestJS - Part 2](https://medium.com/geekculture/typeorm-and-mysql-configuration-for-nestjs-part-2-30a288054330)
