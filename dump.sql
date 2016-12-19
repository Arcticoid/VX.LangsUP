  CREATE TABLE bundle (
    id          INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name        VARCHAR(255)                      NOT NULL,
    description TEXT                              NOT NULL
  );

  CREATE TABLE bundle_lang (
    id        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    bundle_id INTEGER                           NOT NULL,
    key       VARCHAR(255)                      NOT NULL,
    value     TEXT                              NOT NULL,
    FOREIGN KEY (bundle_id) REFERENCES bundle (id)
  );

  CREATE TABLE user (
    id        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    login     VARCHAR(255)                      NOT NULL,
    password  VARCHAR(255)                      NOT NULL,
    first_name VARCHAR(255)                     NULL,
    last_name  VARCHAR(255)                     NULL
  );

  INSERT INTO user (id, login, password) VALUES ('1', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997');

  CREATE UNIQUE INDEX IF NOT EXISTS uniq_bundle ON bundle (name);
  CREATE UNIQUE INDEX IF NOT EXISTS uniq_bundle_key ON bundle_lang (bundle_id, key);
