import {$authHost, $host} from "./index";


export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createBook = async (book) => {
    const {data} = await $authHost.post('api/book', book)
    return data
}

export const delBook = async (id) => {
    const {data} = await $authHost.post('api/book/del/'+ id)
    return data
}

export const setDescription = async (_id, text) => {
    const {data} = await $authHost.post('api/book/update', _id, text)
    return data
}

export const fetchBooks = async (typeId, brandId, page, limit) => {
    const {data} = await $host.get('api/book', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneBook = async (id) => {
    const {data} = await $host.get('api/book' + '/'+id)
    return data
}

// ------ library ------- //

export const addToBasket = async (bookId) => {
    const {response} = await $authHost.post('api/basket', bookId)
    return response
}

export const deleteFromBasket = async (id) => {
    const {response} = await $authHost.post('api/basket/delete', {id:id})
    return response
}

export const getBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}


export const updateAmount = async (_id, _amount) => {
    const {data} = await $authHost.post('api/book/update/'+_id, {_id, _amount})
    return data
}
