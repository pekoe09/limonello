import LimonelloButton from './components/LimonelloButton'
import LimonelloDataTable from './components/common/LimonelloDataTable'
import withCrud from '.withCRUD'
import entityServices from './services/entityServices'
const {
  getAll,
  getOne,
  getByPage,
  getCount,
  addEntity,
  updateEntity,
  removeEntity
} = entityServices

export {
  LimonelloButton,
  LimonelloDataTable,
  withCrud,
  getAll,
  getByPage,
  getOne,
  getCount,
  addEntity,
  updateEntity,
  removeEntity
}