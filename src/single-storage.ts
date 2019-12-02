// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
  // ...
// export default class DummyClass {
//
// }

/**
 * Created by yangm on 2019/5/21.
 * 定义两个存取localStorage的方法
 */

/**
 * @para
 * saveType: {存储类型，String：'session' || 'local'}
 * key: 存储的键
 * value: 值
 * */
let namespace: string = ''

const saveToStorage = (storage: Storage, namespace:string, key: any, value: any) => {
  let savedData = storage[namespace]
  if (!savedData) {
    savedData = {}
    savedData[key] = value
  } else {
    savedData = JSON.parse(savedData)
  }
  savedData[key] = value
  storage[namespace] = JSON.stringify(savedData)
}

/**
 * @para
 * saveType: {存储类型，String：'session' || 'local'}
 * key: 取值存储的键
 * value: 取不到的默认值
 * */
const getFromStorage = (storage: Storage, namespace: string, key: any, def: any) => {
  let savedData = storage[namespace]
  if (!savedData) {
    return def
  }
  savedData = JSON.parse(savedData)
  if (savedData[key] === 'undefined' || savedData[key] === 'null') {
    return def
  }
  return savedData[key] || def
}

const initNamespace = (name: string) => {
  namespace = String(name)
}

const checkNamespace = () => {
  if (!(namespace && typeof namespace === 'string')) {
    throw new Error('必须初始化命名空间（string格式）')
  }
}

const singleStorage = {
  initNamespace,
  saveToLocal: (key: string, value: any) => {
    checkNamespace()
    saveToStorage(window.localStorage, namespace, key, value)
  },
  saveToSession: (key: string, value: any) => {
    checkNamespace()
    saveToStorage(window.sessionStorage, namespace, key, value)
  },
  getFromLoacl: (key: string, def: any) => {
    checkNamespace()
    return getFromStorage(window.localStorage, namespace, key, def)
  },
  getFromSession: (key: string, def: any) => {
    checkNamespace()
    return getFromStorage(window.sessionStorage, namespace, key, def)
  }
}

export default singleStorage

