import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('actividadeCoordenador', (table)=>{
        table.increments('idActividadeCoordenador').primary();
        table.string('tipoActividade').notNullable();
        table.string('descActividadeCoordenador').notNullable();
        table.timestamp('dataActividade').defaultTo( knex.fn.now());
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('actividadeCoordenador')
}

