import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('video', (table)=>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('src').notNullable();
        table.string('idModulo').notNullable().references('id').inTable('modulo');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('video')
}

