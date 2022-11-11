const convertToArrData = (tree: any) => {
  let arrs: any = []
  let result: any = []
  arrs = arrs.concat(tree)
  // 把数组中每一项全部拉平
  while (arrs.length) {
    let first = arrs.shift() // 弹出第一个元素
    // 直到每一项数据都没有children
    if (first.children) {
      //如果有children
      arrs = arrs.concat(first.children)
      delete first['children']
    }
    result.push(first)
  }
  return result
}

export default convertToArrData
