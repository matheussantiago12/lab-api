import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ExamType extends BaseModel {
  public static table = 'tipo_exame'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'descricao' })
  public description: string
}
