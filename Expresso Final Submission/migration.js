const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

db.serialize(function() {
  db.run('CREATE TABLE IF NOT EXISTS `Employee` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
           '`position` TEXT NOT NULL, ' +
           '`wage` INTEGER NOT NULL, ' +
           '`is_current_employee` INTEGER NOT NULL DEFAULT 1, ' +
           'PRIMARY KEY(`id`) )');

  db.run('CREATE TABLE IF NOT EXISTS `Timesheet` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`hours` INTEGER NOT NULL, ' +
          '`rate` INTEGER NOT NULL, ' +
          '`date` INTEGER NOT NULL, ' +
           'FOREIGN KEY(`employee_id`) REFERENCES `Employee`(`id`), ' +
           'PRIMARY KEY(`id`) )');
  
  db.run('CREATE TABLE IF NOT EXISTS `Menu` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`title` TEXT NOT NULL, ' +
           'PRIMARY KEY(`id`) )');

  db.run('CREATE TABLE IF NOT EXISTS `MenuItem` ( ' +
           '`id` INTEGER NOT NULL, ' +
           '`name` TEXT NOT NULL, ' +
           '`description` TEXT, ' +
           '`inventory` INTEGER NOT NULL, ' +
           '`price` INTEGER NOT NULL, ' +
           'PRIMARY KEY(`id`), ' +
           'FOREIGN KEY(`menu_id`) REFERENCES `Menu`(`id`) )');
});
