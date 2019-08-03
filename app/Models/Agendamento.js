'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agendamento extends Model {
    tweet() {
        return this.hasMany('App/Models/Tweet')
    }
}

module.exports = Agendamento
