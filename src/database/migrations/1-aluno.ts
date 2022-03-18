import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('aluno', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsaap').notNullable();
        table.string('nomeuser').notNullable();
        table.string('senha').notNullable();
        table.string('estado').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('aluno')
}

//image, name, email, whatsaap, nomeuser senha