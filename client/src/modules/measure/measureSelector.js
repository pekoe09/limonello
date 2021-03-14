import { createSelector } from 'reselect'

const getMeasures = state => {
  let measures = state.measures.byId
  return measures
}
const getMeasureTypes = state => {
  let measureTypes = state.measureTypes.byId
  return measureTypes
}

const makeGetMeasuresWithType = () => createSelector(
  [getMeasures, getMeasureTypes],
  (measures, measureTypes) => {
    console.log('mapping measures', measures)
    console.log(measureTypes)
    let measuresWithType = []
    if (measures && Object.keys(measures).length > 0) {
      console.log(Object.entries(measures))
      measuresWithType = Object.entries(measures).map(m => {
        m[1].measureType = measureTypes[m[1].measureType]
        return m[1]
      })
    }
    console.log('mapped measures', measuresWithType)
    return measuresWithType
  }
)

export {
  makeGetMeasuresWithType
}