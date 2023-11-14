$(document).ready(function(){
  
  const numbersArr = [
    {id:'decimal', val: '.', button: '.', class:'key printKeys'},
    {id: 'zero', val: 0, button: '0', class:'key printKeys'},
    {id: 'one', val: 1, button: '1', class:'key printKeys'},
    {id: 'two', val: 2, button: '2', class:'key printKeys'},
    {id: 'three', val: 3, button: '3', class:'key printKeys'},
    {id: 'four', val: 4, button: '4', class:'key printKeys'},
    {id: 'five', val: 5, button: '5', class:'key printKeys'},
    {id: 'six', val: 6, button: '6', class:'key printKeys'},
    {id: 'seven', val: 7, button: '7', class:'key printKeys'},
    {id: 'eight', val: 8, button: '8', class:'key printKeys'},
    {id: 'nine', val: 9, button: '9', class:'key printKeys'}
  ]
  const operationsArr = [
    {id:'add', val:'+', button: '&plus;', class:'key opKeys'},
    {id:'subtract', val:'-', button: '&minus;', class:'key opKeys'},
    {id:'multiply', val:'*', button: '&times;', class:'key opKeys'},
    {id:'divide', val:'/', button: '&divide;', class:'key opKeys'},
    {id:'equals', val:'=', button:'&equals;', class:'key functionKeys'}
  ]
  const specialKeysArr = [
    {id:'clear', val:'C', button: 'C', class:'key functionKeys'},
    {id:'delete', val:'', button: '&larrb;', class:'key functionKeys'}
  ]

  const prevDisplay = $('#prevDisplay')
  const display = $('#display')
  const numbers = $('#numbers')
  const operations = $('#operations')
  const special = $('#special')
  const operators = operationsArr
                      .filter(elem => (elem.class
                        .includes('opKeys') === true))
                      .map(elem => elem.val)

  let lineUp = ''
  let lineDown = ''

  const day = $('#day')
  const night = $('#night')

  const visible = {'grid-column': '1',
                   'grid-row': '1',
                   'visibility': 'visible',
                   'color':'var(--purple)'
                  }
  const hidden = {'visibility': 'hidden'}

  const numKeys = numbersArr.reverse().map(key =>
    '<div id="' + key.id+ '" class="' + key.class+ '" value="' + key.val+ '">'+key.button+'</div>'
    )

  const operationsKeys = operationsArr.map(key =>
    '<div id="' + key.id+ '" class="' + key.class+ '" value="' + key.val+ '">'+key.button+'</div>'
    )
  
  const specialKeys = specialKeysArr.map(key =>
    '<div id="' + key.id+ '" class="' + key.class+ '" value="' + key.val+ '">'+key.button+'</div>'
    )

  numbers.html(numKeys)
  operations.html(operationsKeys)
  special.html(specialKeys)

  init()

  const keyStyle = {'width': '99',
                    'height':'99',
                    'border': '1px solid black',
                    'display': 'grid',
                    'place-content': 'center'
                  }
  const bigKeyStyle = {'width': '199'
                      }

  $('.key').css(keyStyle)
  $('#zero').css(bigKeyStyle)
  $('#clear').css(bigKeyStyle)

  $.each($('.printKeys'), function(_, value){
    value.addEventListener('click', function(){
      const val = value.attributes.value.value
      const cleanSignal = lineUp.includes('=')
      if(cleanSignal === true) {
        init()
      }
      switch(val){
        case '.':
          if(lineDown.indexOf('.') === -1){
            lineDown = lineDown + val
            lineUp = lineUp + val
          }
          break
        default:
          if(lineDown === '0') {
            lineDown = val
            lineUp = val
          } else {
            lineDown = lineDown + val
            lineUp = lineUp + val
          }
      }
      show()
    })
  })

  $.each($('.opKeys'), function(_, value){
    value.addEventListener('click', function(){
      const val = value.attributes.value.value
      const cleanSignal = lineUp.includes('=')
      if(cleanSignal === true) {
        lineUp = ''
        lineUp = lineUp + lineDown
        lineDown = ''
      }
      switch(val){
        case '-':
          if(lineUp.slice(-1) === '-'){
            lineUp = lineUp.slice(0, -1)
            lineUp = lineUp + val
            lineDown = val
          } else {
            lineUp = lineUp + val
            lineDown = val
          }
          break
        default:
          const lastValue = operators.includes(lineUp.slice(-1))
          const penultimateValue = operators.includes(lineUp.slice(-2, -1))
          if(penultimateValue === true && lastValue === true){
            lineUp = lineUp.slice(0, -2)
            lineUp = lineUp + val
            lineDown = val
          } else if(lastValue === true){
            lineUp = lineUp.slice(0, -1)
            lineUp = lineUp + val
            lineDown = val
          } else {
            lineUp = lineUp + val
            lineDown = val
          }
          break
      }
      
      show()
    })
  })


  $('#clear').on('click', function(){
    init()
  })

  $('#delete').on('click', function(){
    lineDown = lineDown.slice(0, -1)
    lineUp = lineUp.slice(0, -1)
    show()
  })

  $('#equals').on('click', function(){
    result()
    show()
  })



  function show(){
    prevDisplay.text(lineUp)
    display.text(lineDown)
  }

  function init() {
    lineUp = ''
    lineDown = '0' 
    show()
    resetLuminosity()
  }

  function result(){
    const result = eval(lineUp)
    lineUp = lineUp + '=' + result
    lineDown = result
  }

  $('#luminosity').on('click', function(){
    changeLuminosity()
  })

  function resetLuminosity(){
    luminosityState = 'day'
    day.css(hidden)
    night.css(visible)
    cssDay()
  }

  function changeLuminosity(){
    if(luminosityState === 'day'){
      day.css(visible)
      night.css(hidden)
      luminosityState = 'night'
      cssNight()
    } else {
      resetLuminosity()
    }
  }

  function cssDay(){
    $('body').css({'background-color': 'var(--ligth-grey)',
                   'color': 'var(--ligth-grey)'
                  })
    $('#calculator').css({'background-color': 'var(--medium-grey)',
                          'border-color': 'var(--purple)'
                        })    
    $('.key').css('background-color', 'var(--green)')
    $('#zero').css('background-color', 'var(--purple)')
    $('#clear').css('background-color', 'var(--purple)')
  }

  function cssNight(){
    $('body').css({'background-color': 'var(--dark-purple)',
                   'color': 'var(--dark-purple)'
                  })
    $('#calculator').css({'background-color': 'var(--grey)',
                          'border-color': 'var(--purple)'
                        })
    $('.key').css('background-color', 'var(--ligth-green)')
    $('#zero').css('background-color', 'var(--ligth-purple)')
    $('#clear').css('background-color', 'var(--ligth-purple)')
  }

})