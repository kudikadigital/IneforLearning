import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('matricula', (table)=>{
        table.increments('idMatricula').primary();
        table.integer('idAluno').notNullable().references('idAluno').inTable('aluno');
        table.integer('idCurso').notNullable().references('idCurso').inTable('curso');
        table.string('comprovativoPag').notNullable();
        table.timestamp('dataMatricula').defaultTo( knex.fn.now());
        table.string('dia');
        table.string('mes')
        table.string('ano')
        table.string('hora')
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('matricula')
}
