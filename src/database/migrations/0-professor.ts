import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('professor', (table)=>{
        table.increments('idProf').primary();
        table.string('imgProf').notNullable();
        table.string('nomeProf').notNullable();
        table.string('emailProf').notNullable();
        table.string('telProf').notNullable();
        table.string('descricaoProf').notNullable();
        table.string('NIFProf').notNullable();
        table.string('senhaProf').notNullable();
        table.decimal('admProf').notNullable();
        table.decimal('dataProf').notNullable();
        table.decimal('estadoProf').notNullable();
        table.decimal('enderecoProf').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('professor')
}

//image, name, email, whatsaap, desc, nomeuser, senha