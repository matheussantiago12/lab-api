import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Laboratory extends BaseModel {
  public static table = 'laboratorio'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'nome' })
  public name: string

  @column({ columnName: 'endereco' })
  public address: string

  @column({ columnName: 'ativo', consume: Boolean })
  public active: boolean
}
