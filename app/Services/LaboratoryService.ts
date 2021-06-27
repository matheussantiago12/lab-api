import Exam from 'App/Models/Exam'
import Laboratory from 'App/Models/Laboratory'

type CreateParams = {
  name: string
  address: string
}

type UpdateParams = {
  name: string
  address: string
  active: boolean
}

export default class LaboratoryService {
  public static async getAllActives () {
    const laboratories = await Laboratory
      .query()
      .where('active', true)

    return laboratories
  }

  public static async getAssociatedLaboratoriesByExamName (name: string) {
    const exam = await Exam
      .query()  
      .where('name', decodeURIComponent(name))
      .preload('laboratories')
      .first()
      
    if (!exam) {
      throw new Error('O exame informado não foi encontrado!')
    }

    return exam.laboratories
  }

  public static async create (data: CreateParams) {
    const laboratory = new Laboratory()

    laboratory.name = data.name
    laboratory.address = data.address
    laboratory.active = true

    await laboratory.save()

    return laboratory
  }

  public static async update (id: number, data: UpdateParams) {
    const laboratory = await Laboratory.findOrFail(id)

    laboratory.name = data.name
    laboratory.address = data.address
    laboratory.active = data.active

    await laboratory.save()

    return laboratory
  }

  public static async deactivate (id: number) {
    const laboratory = await Laboratory.findOrFail(id)

    laboratory.active = false

    await laboratory.save()

    return laboratory
  }
}