import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('categoria', (table)=>{
        table.increments('idCategoria').primary();
        table.string('nomeCategoria').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('categoria')
}

//nome, idProfessor, data-inicio, data-fim, image, desc, estado