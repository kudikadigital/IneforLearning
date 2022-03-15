import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('curso', (table)=>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('idProfessor').notNullable().references('id').inTable('professor');
        table.string('data_inicio').notNullable();
        table.string('data_fim').notNullable();
        table.string('image').notNullable();
        table.string('desc').notNullable();
        table.string('estado').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('curso')
}

//nome, idProfessor, data-inicio, data-fim, image, desc, estado