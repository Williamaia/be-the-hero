exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
      table.increments();

      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('value').notNullable();

      table.string('covid_id').notNullable();
      
      table.foreign('covid_id').references('id').inTable('covid');
    });
  };
  
  exports.down = function(knex) {
    knex.schema.dropTable('incidents');
  };
  