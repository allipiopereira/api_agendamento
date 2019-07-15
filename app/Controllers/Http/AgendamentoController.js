'use strict'

  const Agendamento = use('App/Models/Agendamento')

/**
 * Resourceful controller for interacting with agendamentos
 */
class AgendamentoController {
  async store({ request, response, params }) {
    const userData = await request.only([
      'name',
      'type',
      'date'
    ])

    const date_select = await params.date

    try {
      const agendado = await Agendamento.create(userData)

      const agendados = await Agendamento.query()
        .where({
          'date': date_select
        }).fetch()

      const pass = await agendados.rows.length

      agendado.pass = pass

      return response.json({
        status: 'success',
        data: agendado
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Ops, ocorreu algum problema. Tente novamente!'
      })
    }
  }

  async show({ response, params }) {
    const date_select = await params.date
    try {
      const agendados = await Agendamento.query()
        .where({
          'date': date_select
        }).fetch()

      if (agendados.rows.length === 0) {
        return response.json({
          status: 'success',
          message: "Nenhum agendamento para essa data..."
        })
      }

      return response.json({
        status: 'success',
        data: agendados
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Ops, ocorreu algum problema. Tente novamente!'
      })
    }
  }

  /*async destroy({ response, params }) {
    const agendamento = await Agendamento.query()
      .where('id', params.id)
      .firstOrFail()

    await agendamento.delete()

    return response.json({
      status: 'success',
      message: 'Usuário deletado!',
      data: null
    })
  }*/
}

module.exports = AgendamentoController
