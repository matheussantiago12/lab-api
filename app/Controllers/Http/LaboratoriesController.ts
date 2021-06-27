import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Laboratory from 'App/Models/Laboratory'
import LaboratoryService from 'App/Services/LaboratoryService'

export default class LaboratoriesController {
  public async index ({ response, request }: HttpContextContract) {
    try {
      const { examName } = request.qs()

      let laboratories: Laboratory[]

      if (examName) {
        laboratories = await LaboratoryService.getAssociatedLaboratoriesByExamName(examName)
      } else {
        laboratories = await LaboratoryService.getAllActives()
      }

      return response.ok(laboratories)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao listar os laboratórios!' })
    }
  }

  public async associated ({ response, params }: HttpContextContract) {
    try {
      const { examName } = params

      const laboratories = await LaboratoryService.getAssociatedLaboratoriesByExamName(examName)

      return response.ok(laboratories)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar listar os laboratórios' })
    }
  }

  public async store ({ response, request }: HttpContextContract) {
    try {
      const data: any = request.body()

      const laboratory = await LaboratoryService.create(data)

      return response.ok(laboratory)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar cadastrar um laboratório' })
    }
  }

  public async update ({ response, request, params }: HttpContextContract) {
    try {
      const { id } = params
      const data: any = request.body()
  
      const laboratory = await LaboratoryService.update(id, data)
  
      return response.ok(laboratory)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar atualizar o laboratório' })
    }
  }

  public async destroy ({ response, params }: HttpContextContract) {
    try {
      const { id } = params
  
      const laboratory = await LaboratoryService.deactivate(id)
  
      return response.ok(laboratory)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar desativar o exame' })
    }
  }
}
