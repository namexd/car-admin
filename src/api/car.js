import request from '@/utils/request'

export function getCars(params) {
  return request({
    url: '/admin/car',
    method: 'get',
    params
  })
}
export function updateCar(id,data) {
  return request({
    url: `/admin/car/${id}`,
    method: 'put',
    data
  })
}
export function getCarTest(params) {
  return request({
    url: '/admin/car-test',
    method: 'get',
    params
  })
}
export function updateCarTest(data) {
  return request({
    url: `/admin/car-test`,
    method: 'put',
    data
  })
}
export function getCarUser(params) {
  return request({
    url: '/admin/car-user',
    method: 'get',
    params
  })
}
export function updateCarUser(data) {
  return request({
    url: `/admin/car-user`,
    method: 'put',
    data
  })
}
export function addCar(data) {
  return request({
    url: '/admin/car',
    method: 'post',
    data
  })
}
export function showCar(id) {
  return request({
    url: `/admin/car/${id}`,
    method: 'get',
  })
}
export function deleteCar(data) {
  return request({
    url: `/admin/car`,
    method: 'delete',
    data,
  })
}

export function getCarBrands(params) {
  return request({
    url: '/admin/car-brand',
    method: 'get',
    params

  })
}
export function updateCarBrand(id,data) {
  return request({
    url: `/admin/car-brand/${id}`,
    method: 'put',
    data
  })
}
export function addCarBrand(data) {
  return request({
    url: '/admin/car-brand',
    method: 'post',
    data
  })
}
export function deleteCarBrand(data) {
  return request({
    url: `/admin/car-brand`,
    method: 'delete',
    data
  })
}

export function getCarModels(params) {
  return request({
    url: '/admin/car-model',
    method: 'get',
    params
  })
}
export function updateCarModel(id,data) {
  return request({
    url: `/admin/car-model/${id}/extra`,
    method: 'put',
    data
  })
}
export function updateCarModelName(id,data) {
  return request({
    url: `/admin/car-model/${id}`,
    method: 'put',
    data
  })
}
export function addCarModel(data) {
  return request({
    url: '/admin/car-model',
    method: 'post',
    data
  })
}
export function showCarModel(id) {
  return request({
    url: `/admin/car-model/${id}`,
    method: 'get',
  })
}
export function deleteCarModel(data) {
  return request({
    url: `/admin/car-model`,
    method: 'delete',
    data
  })
}

export function getCarYears(params) {
  return request({
    url: '/admin/car-year',
    method: 'get',
    params
  })
}
export function addCarYear(data) {
  return request({
    url: '/admin/car-year',
    method: 'post',
    data
  })
}
export function deleteCarYear(data) {
  return request({
    url: `/admin/car-year`,
    method: 'delete',
    data
  })
}


export function getCarVehicles(params) {
  return request({
    url: '/admin/car-vehicle',
    method: 'get',
    params
  })
}
export function updateCarVehicle(id,data) {
  return request({
    url: `/admin/car-vehicle/${id}`,
    method: 'put',
    data
  })
}
export function addCarVehicle(data) {
  return request({
    url: '/admin/car-vehicle',
    method: 'post',
    data
  })
}
export function deleteCarVehicle(data) {
  return request({
    url: `/admin/car-vehicle`,
    method: 'delete',
    data
  })
}


export function getCarSell(params) {
  return request({
    url: '/admin/car-sell',
    method: 'get',
    params
  })
}
export function updateCarSell(id) {
  return request({
    url: `/admin/car/${id}/sell`,
    method: 'put',

  })
}
export function updateCarWarehouse(id) {
  return request({
    url: `/admin/car/${id}/warehouse`,
    method: 'put',

  })
}
export function updateCarCopy(id) {
  return request({
    url: `/admin/car/${id}/copy`,
    method: 'put',

  })
}
export function sortCars(id,data) {
  return request({
    url: `/admin/car/${id}/sort`,
    method: 'put',
    data
  })
}

export function addCarSellLog(data) {
  return request({
    url: '/admin/car-sell-log',
    method: 'post',
    data
  })
}

export function getCarSellLogs(params) {
  return request({
    url: '/admin/car-sell-log',
    method: 'get',
    params
  })
}
