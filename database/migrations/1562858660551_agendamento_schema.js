'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendamentoSchema extends Schema {
  up () {
    this.create('agendamentos', (table) => {
      table.increments()
      table.string('name', 150).notNullable().unique()
      table.string('cpf', 14).nullable().unique()
      table.integer('pass').notNullable()
      table.enu('type', ['RG', 'CPF','DRC', 'ECE', 'EAC', 'ESC', 'FZD']).notNullable()
      table.date('date').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('agendamentos')
  }
}

module.exports = AgendamentoSchema
