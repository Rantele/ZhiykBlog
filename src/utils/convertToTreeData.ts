const convertToTreeData = (data: any, pid: any) => {
  const result = []
  let temp = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].parentId === pid) {
      const obj = { ...data[i], children: [] }
      temp = convertToTreeData(data, data[i].id)
      if (temp.length > 0) {
        obj.children = temp
      }
      result.push(obj)
    }
  }
  return result
}

export default convertToTreeData
