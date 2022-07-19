import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('actividadeAluno', (table)=>{
        table.increments('idActividadeAluno').primary();
        table.string('tipoActividade').notNullable();
        table.string('descActividadeAluno').notNullable();
        table.timestamp('dataActividade').defaultTo( knex.fn.now());
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('actividadeAluno')
}

