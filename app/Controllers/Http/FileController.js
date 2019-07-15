'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')


/**
 * Resourceful controller for interacting with files
 */
class FileController {
  async store ({ request, response, params }) {
    try {
      if (!request.file(params.file)) return

      // CAPTURA O ARQUIVO DA REQUISIÇÃO E O RENOMEIA PARA ENVIAR A PASTA LOCAL
      const upload = request.file('file', { size: '2mb' })
      const filename = `${Date.now()}.${upload.subtype}`

      // SALVA O ARQUIVO
      await upload.move(Helpers.tmpPath('uploads'), {
        name: filename
      })

      // CASO TENHA ERROS EM ENVIAR O ARQUIVO PARA A PASTA, A API EMITE UM ERRO(catch(err))
      if (!upload.moved()) {
        throw upload.error()
      }

      // SALVA OS DADOS DO ARQUIVO NA TABELA FILE
      const file = await File.create({
        file: filename,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message: 'Erro no upload do arquivo'
      })
    }
  }

  async show({ params, response }){
    const file = await File.findOrFail(params.id)

    

    return Helpers.tmpPath(`uploads/${file.file}`)
  }
}

module.exports = FileController
