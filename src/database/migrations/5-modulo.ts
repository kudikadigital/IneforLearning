import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('modulo', (table)=>{
        table.increments('idModulo').primary();
        table.string('nomeModulo').notNullable();
        table.string('IdCurso').notNullable().references('idCurso').inTable('curso');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('modulo')
}
