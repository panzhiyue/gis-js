const mdclean = require('./utils.js').mdclean

function isTag(v) {
  return !!(v).content
}
const renderTags = (tags) => {
  if (!tags) {
    return ''
  }
  return Object.entries(tags)
    .map(([tag, values]) => {
      if (tag == "type") {
        return ''
      }
      if (tag == "typeName") {
        return ''
      }
      return values.map(v => {
        return `<br/>\`@${tag}\` ${isTag(v) ? v.content : v.description}`
      }).join('')
    })
    .join('')
}

const tmpl = (props) => {
  let ret = ''

  props.forEach(pr => {
    const p = pr.name
    let t = pr.description ?? ''
    t += renderTags(pr.tags)
    const n = (pr.tags&&pr.tags.typeName&&pr.tags.typeName.length)?pr.tags.typeName[0].description : pr.type?.name ?? ''
    const v = pr.values?.map(pv => `\`${pv}\``).join(', ') ?? '-'
    const d = pr.defaultValue?.value ?? ''

    ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(v)} | ${mdclean(d)} |\n`
  })
  return ret
}

module.exports = (props, opt) => {
  return `
${opt.isSubComponent || opt.hasSubComponents ? '#' : ''}## Props

  | 名称     | 描述 | 类型      | 取值范围      | 默认值     |
  | ------------- | ----------- | --------- | ----------- | ----------- |
  ${tmpl(props)}
  `
}