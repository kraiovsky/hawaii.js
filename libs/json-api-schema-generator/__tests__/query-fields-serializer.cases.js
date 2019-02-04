module.exports = {
  serializeFields: {
    happy: [
      [undefined, 'empty array if no field passed in query'],
      ['', 'empty array if empty field passed in query'],
      ['name,test', 'array of field names passed in query'],
      ['name,test,', 'array of field names passed in query, clearing empty elements'],
      ['name', 'array with one element if only one field name passed'],
    ],
    sad: [],
  },
}
