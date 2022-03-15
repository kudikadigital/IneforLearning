import { Knex } from "knex";
export async function up(knex: Knex) {
    return knex.schema.createTable('aluno-curso', (table)=>{
        table.increments('id').primary();
        table.integer('idAluno').notNullable().references('id').inTable('aluno');
        table.integer('idCurso').notNullable().references('id').inTable('curso');
    })
}
export async function down(knex: Knex) {
    return knex.schema.dropTable('aluno-curso')
}
