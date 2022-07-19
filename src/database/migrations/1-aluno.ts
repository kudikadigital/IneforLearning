import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('aluno', (table)=>{
        table.increments('idAluno').primary();
        table.string('imgAluno').notNullable();
        table.string('nomeAluno').notNullable();
        table.string('emailAluno').notNullable();
        table.string('userAluno').notNullable();
        table.string('telAluno').notNullable();
        table.string('enderecoAluno').notNullable(); 
        table.string('senhaAluno').notNullable();
        table.integer('nivelAluno').notNullable();
        table.string('estadoAluno').notNullable();
        table.timestamp('dataAluno').defaultTo( knex.fn.now());
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('aluno')
}

//image, name, email, whatsaap, nomeuser senha