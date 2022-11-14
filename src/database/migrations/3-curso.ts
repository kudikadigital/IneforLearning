import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('curso', (table)=>{
        table.increments('idCurso').primary();
        table.string('nomeCurso').notNullable();
        table.integer('idProf').notNullable().references('idProf').inTable('professor');
        table.timestamp('dataCurso').defaultTo( knex.fn.now());
        table.string('imgCurso').notNullable();
        table.string('descricaoCurso').notNullable();
        table.decimal('precoCurso').notNullable();
        table.string('estadoCurso').notNullable();
        table.integer('curtidaCurso').notNullable();
        table.string('cargaHoraria');
        table.string('aprendizadoCurso');
        table.string('arquivoCurso');
        table.integer('idCategoria').notNullable().references('idCategoria').inTable('categoria');
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('curso')
}

//nomeCurso, idProf, imgCurso, descricaoCurso, precoCurso, estadoCurso, curtidaCurso, cargaHoraria, idCategoria,aprendizadoCurso, arquivoCurso