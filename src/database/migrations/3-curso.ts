import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('curso', (table)=>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('idProfessor').notNullable().references('id').inTable('professor');
        table.timestamp('data_inicio').defaultTo( knex.fn.now());
        table.string('image').notNullable();
        table.string('desc').notNullable();
        table.string('estado').notNullable();
        table.string('categoria').notNullable().references('id').inTable('categoria');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('curso')
}

//nome, idProfessor, data-inicio, data-fim, image, desc, estado