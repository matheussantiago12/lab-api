import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ExamService from 'App/Services/ExamService'

export default class ExamsController {
  public async index ({ response }: HttpContextContract) {
    try {
      const exams = await ExamService.getAllActives()
  
      return response.ok(exams)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar listar os exames' })
    }
  }

  public async store ({ response, request }: HttpContextContract) {
    try {
      const data: any = request.body()

      const exam = await ExamService.create(data)

      return response.ok(exam)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar cadastrar um exame' })
    }
  }

  public async associate ({ response, params }: HttpContextContract) {
    try {
      const { examId, laboratoryId } = params
  
      await ExamService.associateLaboratory(examId, laboratoryId)
  
      return response.noContent()
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar associar o exame' })
    }
  }

  public async disassociate ({ response, params }: HttpContextContract) {
    try {
      const { examId, laboratoryId } = params
  
      await ExamService.disassociateLaboratory(examId, laboratoryId)
  
      return response.noContent()
    } catch (error) {
      return response.ok({ message: error.message || 'Houve um erro ao tentar desassociar o exame' })
    }
  }

  public async update ({ response, request, params }: HttpContextContract) {
    try {
      const { id } = params
      const data: any = request.body()

      const exam = await ExamService.update(id, data)

      return response.ok(exam)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar atualizar o exame' })
    }
  }

  public async destroy ({ response, params }: HttpContextContract) {
    try {
      const { id } = params
  
      const exam = await ExamService.deactivate(id)
  
      return response.ok(exam)
    } catch (error) {
      return response.internalServerError({ message: error.message || 'Houve um erro ao tentar desativar o exame' })
    }
  }
}
