export async function up(knex) {
  await knex.schema.createTable('yaya-webhook', (table) => {
    table.increments('id')
    table.string('text')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('yaya-webhook')
}
