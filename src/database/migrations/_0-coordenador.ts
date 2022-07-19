import { Knex } from "knex";

export async function up(knex: Knex) {
    return knex.schema.createTable('coordenador', (table)=>{
        table.increments('idCoordenador').primary();
        table.string('imgCoordenador').notNullable();
        table.string('nomeCoordenador').notNullable();
        table.string('emailCoordenador').notNullable();
        table.string('telCoordenador').notNullable();
        table.string('userCoordenador').notNullable();
        table.string('descricaoCoordenador').notNullable();
        table.string('NIFCoordenador').notNullable();
        table.string('senhaCoordenador').notNullable();
        table.integer('admCoordenador').notNullable();
        table.timestamp('dataCoordenador').defaultTo( knex.fn.now());
        table.integer('estadoCoordenador').notNullable();
        table.string('enderecoCoordenador').notNullable();
        table.string('residenciaCoordenador').notNullable();
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('coordenador')
}

//image, name, email, whatsaap, desc, nomeuser, senha