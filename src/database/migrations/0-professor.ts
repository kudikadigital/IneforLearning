import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('professor', (table)=>{
        table.increments('idProf').primary();
        table.string('imgProf').notNullable();
        table.string('nomeProf').notNullable();
        table.string('emailProf').notNullable();
        table.string('telProf').notNullable();
        table.string('userProf').notNullable();
        table.string('descricaoProf').notNullable();
        table.string('NIFProf').notNullable();
        table.string('senhaProf').notNullable();
        table.integer('admProf').notNullable();
        table.timestamp('dataProf').defaultTo( knex.fn.now());
        table.integer('estadoProf').notNullable();
        table.string('enderecoProf').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('professor')
}

//image, name, email, whatsaap, desc, nomeuser, senha