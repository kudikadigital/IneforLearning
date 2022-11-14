import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('actividadeProf', (table)=>{
        table.increments('idActividadeProf').primary();
        table.string('tipoActividade').notNullable();
        table.string('descActividadeProf').notNullable();
        table.timestamp('dataActividade').defaultTo( knex.fn.now());
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('actividadeProf')
}

