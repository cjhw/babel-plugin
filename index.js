module.exports = ({ types: t }) => {
  return {
    visitor: {
      // 写逻辑的地方
      Identifier(path) {
        const parentIsIf = t.isIfStatement(path.parentPath)
        const isDebug = path.node.name === 'DEBUG'
        if (isDebug && parentIsIf) {
          // 把Identifier转换为StringLiteral
          const stringNode = t.stringLiteral('DEBUG')
          path.replaceWith(stringNode)
        }
      },
      StringLiteral(path, state) {
        const parentIsIf = t.isIfStatement(path.parentPath)
        const isDebug = path.node.value === 'DEBUG'
        if (isDebug && parentIsIf) {
          // 用户的参数在state.opts里
          // console.log(state)
          // 控制在生产环境下才能移除
          if (process.env.NODE_ENV === 'production') {
            path.parentPath.remove()
          }
        }
      },
    },
  }
}
