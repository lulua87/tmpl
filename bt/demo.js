;(function () {
  'use strict'
  var bt=baidu.template;
  var templateInput = document.getElementById('template')
  var dataInput = document.getElementById('data')
  var resultNode = document.getElementById('result')
  var templateDemoNode = document.getElementById('tmpl-demo')
  var templateDataNode = document.getElementById('tmpl-data')

  function renderError (title, error) {
    resultNode.innerHTML = bt(
      'tmpl-error',
      {title: title, error: error}
    )
  }

  function render (event) {
    event.preventDefault()
    var data
    try {

      data = JSON.parse(dataInput.value)
    } catch (e) {
      renderError('JSON parsing failed', e)
      return
    }
    try {
      resultNode.innerHTML = bt(
        templateInput.value,
        data
      )
      
    } catch (e) {
      renderError('Template rendering failed', e)
    }
  }

  function empty (node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild)
    }
  }

  function init (event) {
    if (event) {
      event.preventDefault()
    }
    templateInput.value = templateDemoNode.innerHTML.trim()
    dataInput.value = templateDataNode.innerHTML.trim()
    empty(resultNode)
  }

  document.getElementById('render').addEventListener('click', render)
  document.getElementById('reset').addEventListener('click', init)

  init()
}())