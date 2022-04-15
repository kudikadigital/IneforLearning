import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('video', (table)=>{
        table.increments('idVideo').primary();
        table.string('nomeVideo').notNullable();
        table.string('srcVideo').notNullable();
        table.string('idModulo').notNullable().references('idModulo').inTable('modulo');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('video')
}

