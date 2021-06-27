import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ExamType from 'App/Models/ExamType'
import Laboratory from './Laboratory'

export default class Exam extends BaseModel {
  public static table = 'exame'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'nome' })
  public name: string

  @column({ columnName: 'ativo', consume: Boolean })
  public active: boolean

  @column({ columnName: 'tipo_exame_id', serializeAs: null })
  public examTypeId: number

  @belongsTo(() => ExamType, {
    foreignKey: 'examTypeId'
  })
  public type: BelongsTo<typeof ExamType>

  @manyToMany(() => Laboratory, {
    pivotTable: 'laboratorio_exame',
    pivotForeignKey: 'exame_id',
    pivotRelatedForeignKey: 'laboratorio_id'
  })
  public laboratories: ManyToMany<typeof Laboratory>
}
