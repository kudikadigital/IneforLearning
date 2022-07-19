import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('validarCurso', (table)=>{
        table.increments('idvalidarCurso').primary();
        table.integer('estadoValidar').notNullable();
        table.string('idCurso').notNullable().references('idCurso').inTable('curso');
        table.timestamp('dataValidar').defaultTo( knex.fn.now());
        table.string('idCoordenador').notNullable().references('idCoordenador').inTable('coordernador');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('validarCurso')
}
