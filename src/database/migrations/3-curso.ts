import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('curso', (table)=>{
        table.increments('idCurso').primary();
        table.string('nomeCurso').notNullable();
        table.integer('idProfessor').notNullable().references('idProfessor').inTable('professor');
        table.timestamp('dataCurso').defaultTo( knex.fn.now());
        table.string('imgCurso').notNullable();
        table.string('descricaoCurso').notNullable();
        table.string('estadoCurso').notNullable();
        table.integer('curtidaCurso').notNullable();
        table.string('idCategoria').notNullable().references('idCategoria').inTable('categoria');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('curso')
}

//nome, idProfessor, data-inicio, data-fim, image, desc, estado