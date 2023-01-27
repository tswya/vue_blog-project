import axios from 'axios'

export default request = (config) => {
  const { url, params, dataType, showLoading } = config
  // let url = config.url
  // let params = config.params || {}
  // let dataType = config.dataType
  dataType = dataType ? 'form' : dataType
  // let showLoading = config.showLoading
  showLoading = showLoading ? true : showLoading
}
