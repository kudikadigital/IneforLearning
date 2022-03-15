import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('video', (table)=>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('idCurso').notNullable().references('id').inTable('curso');
        table.string('datapost').notNullable();
        table.string('view').notNullable();
        table.string('like').notNullable();
        table.string('desc').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('video')
}