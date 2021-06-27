import Route from '@ioc:Adonis/Core/Route'

Route.get('/laboratories', 'LaboratoriesController.index')
Route.get('/laboratories/:examName', 'LaboratoriesController.associated')
Route.post('/laboratories', 'LaboratoriesController.store')
Route.put('/laboratories/:id', 'LaboratoriesController.update')
Route.delete('/laboratories/:id', 'LaboratoriesController.destroy')

Route.get('/exams', 'ExamsController.index')
Route.post('/exams', 'ExamsController.store')
Route.post('/exams/:examId/associate/:laboratoryId', 'ExamsController.associate')
Route.post('/exams/:examId/disassociate/:laboratoryId', 'ExamsController.disassociate')
Route.put('/exams/:id', 'ExamsController.update')
Route.delete('/exams/:id', 'ExamsController.destroy')
