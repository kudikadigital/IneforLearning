import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('servico', (table)=>{
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('desc').notNullable();
        table.decimal('preco').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('servico')
}

//image, name, desc, preco