import Exam from 'App/Models/Exam'
import Laboratory from 'App/Models/Laboratory'

type CreateParams = {
  name: string
  examTypeId: 1 | 2
}

type UpdateParams = {
  name: string
  examTypeId: 1 | 2
  active: boolean
}

export default class ExamService {
  public static async getAllActives () {
    const exams = await Exam
      .query()
      .preload('type')
      .where('active', true)

    return exams
  }

  public static async create (data: CreateParams) {
    const exam = new Exam()

    exam.name = data.name
    exam.examTypeId = data.examTypeId
    exam.active = true

    await exam.save()

    return exam
  }

  public static async update (id: number, data: UpdateParams) {
    const exam = await Exam.findOrFail(id)

    exam.name = data.name
    exam.examTypeId = data.examTypeId
    exam.active = data.active

    await exam.save()

    return exam
  }

  public static async deactivate (id: number) {
    const exam = await Exam.findOrFail(id)

    exam.active = false

    await exam.save()

    return exam
  }

  public static async associateLaboratory (examId: number, laboratoryId: number) {
    const exam = await Exam.findOrFail(examId)
    const laboratory = await Laboratory.findOrFail(laboratoryId)

    if (!exam.active) {
      throw new Error('O exame deve estar ativo para associar à um laboratório!')
    }

    if (!laboratory.active) {
      throw new Error('O laboratório deve estar ativo para ser associado à um exame!')
    }

    await exam
      .related('laboratories')
      .save(laboratory)
  }

  public static async disassociateLaboratory (examId: number, laboratoryId: number) {
    const exam = await Exam.findOrFail(examId)
    const laboratory = await Laboratory.findOrFail(laboratoryId)

    if (!exam.active) {
      throw new Error('O exame informado não está ativo!')
    }

    if (!laboratory.active) {
      throw new Error('O laboratório informado não está ativo!')
    }

    await exam
      .related('laboratories')
      .detach([laboratoryId])
  }
}