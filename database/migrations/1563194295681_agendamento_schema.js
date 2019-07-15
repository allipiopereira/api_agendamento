'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendamentoSchema extends Schema {
  up () {
    this.table('agendamentos', (table) => {
      // alter table
      table.string('phone', 11).nullable().unique()
    })
  }

  down () {
    this.table('agendamentos', (table) => {
      // reverse alternations
    })
  }
}

module.exports = AgendamentoSchema
