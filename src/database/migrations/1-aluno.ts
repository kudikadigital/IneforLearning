import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('aluno', (table)=>{
        table.increments('idAluno').primary();
        table.string('imgAluno').notNullable();
        table.string('nomeAluno').notNullable();
        table.string('emailAluno').notNullable();
        table.string('telAluno').notNullable();
        table.string('enderecoAluno').notNullable(); 
        table.string('senhaAluno').notNullable();
        table.string('estadoAluno').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('aluno')
}

//image, name, email, whatsaap, nomeuser senha