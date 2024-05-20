/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('usuarios',
        (table) => {
            table.increments('id')
            table.text('nome')
            table.text('email')
            table.text('senha')
            table.timestamp("created_at").defaultTo(
                knex.fn.now()
            );
            table.timestamp("updated_at").defaultTo(
                knex.fn.now()
            );

        }
    ).then(() => {
        console.log('Tabela de usuarios criada!!')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('usuarios')
        .then(() => {
            console.log('Deletado tabela de usuarios')
        })
};
