import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('professor', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsaap').notNullable();
        table.string('desc').notNullable();
        table.string('senha').notNullable();
        table.decimal('adm').notNullable();
        table.decimal('estado').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('professor')
}

//image, name, email, whatsaap, desc, nomeuser, senha