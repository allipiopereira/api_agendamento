'use strict'

const Route = use('Route')

Route.post('agendar/:date', 'AgendamentoController.store')

Route.get('agendados/:date','AgendamentoController.show'
)

//Route.delete('delete/:id', 'AgendamentoController.destroy')

Route.post('files', params => 'FileController.store')

Route.get('files/:id', 'FileController.show')