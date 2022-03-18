import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('modulo', (table)=>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('IdCurso').notNullable().references('id').inTable('IdCurso');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('modulo')
}
