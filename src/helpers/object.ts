export function isString(obj: any): obj is string {
  return Object.prototype.toString.call(obj) === '[object String]'
}

export function isNumber(obj: any): obj is number {
  return Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj)
}

export function isBoolean(obj: any): obj is boolean {
  return Object.prototype.toString.call(obj) === '[object Boolean]'
}

export function isEmpty(obj: any) {
  return obj === null || obj === undefined
}

export function isNotEmpty<T>(obj: any): obj is T {
  return !isEmpty(obj)
}

export function isEmptyArray(obj: any) {
  return obj === null || obj === undefined || obj.length === 0
}

export function isNotEmptyArray<T>(obj: any): obj is T {
  return !isEmptyArray(obj)
}

export function flattenTree<T>(tree: T[], childResolver: { (t: T): T[] | undefined }): T[] {
  return tree.reduce((newTree, t) => {
    const child = childResolver(t)
    newTree.push(t)
    if (child) {
      newTree.push(...flattenTree(child, childResolver))
    }
    return newTree
  }, [] as T[])
}

export function pick<T extends Object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur]
    return prev
  }, {} as Pick<T, K>)
}

export function toSnake(str:string):string{
  const firstLetter = str.slice(0,1)
  const leftStr = str.slice(1)
  return firstLetter.toLowerCase() + leftStr.replace(/([A-Z])/g,"_$1").toLowerCase();
}

export function toStudly(str:string):string{
  const firstLetter = str.slice(0,1)
  const leftStr = str.slice(1)
  return firstLetter.toUpperCase() + leftStr.replace(/[-_](\w)/g, ($0,$1)=>{
    return $1.toUpperCase();
  });
}

export function toSeparate(str:string):string{
  const firstLetter = str.slice(0,1)
  let leftStr = str.slice(1)
  leftStr = leftStr.replace(/(-\w|_\w)/g,($0)=>{
    return ` ${$0.slice(1).toLowerCase()}`;
  })
  return firstLetter.toLowerCase() + leftStr.replace(/([A-Z])/g, ($0)=>{
    return ` ${$0.toLowerCase()}`;
  });
}

export function toNamespace(str:string):string{
  const namespace = str.replace(/\/+/g,'\\')
  return namespace.replace(/\\\\+/,'\\');
}

export function getActionPath(action:API.ActionTableItem):string{
  if(isNotEmpty(action.controller.module.bind_domain)){
    return `${action.controller.route_name  }/${  action.route_name}`
  }
    return `${action.controller.module.route_name  }/${ action.controller.route_name  }/${  action.route_name}`
}

export function getClassName(str:string):string{
  return <string>str.split('\\').pop()
}
