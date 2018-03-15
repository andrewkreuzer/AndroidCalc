
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ',    registration.scope);
  }).catch(function(err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

const answer = document.querySelector('#answer');
const equation = document.querySelector('#equation');

let equationArray = [];

function mouseDown(el) {
  let targ;
  if (!el) {
      let el = window.event;
  }
  if (el.target) {
      targ = el.target;
  } else if (el.srcElement) {
      targ = el.srcElement;
  }
  actionHandler(targ);
}

function actionHandler(el) {
  if(el.className === 'btn') {
    const value = el.innerHTML;
    if(value) {
      switch(value) {
        case 'DEL': removeLastStep(); break;
        case '=': equate(); break;
        default: {
          addInput(value);
          makeEquation(equation.innerHTML);
       }
      }
    }
  }
}

function makeEquation(str) {
  if( str.length > 2 && Number(str[str.length -1]) ) {
    let e;
    for( const x of str ) {
      if (!e) {
        switch(x) {
          case '÷': e = '/'; break;
          case 'x': e = '*'; break;
          default: e = x;
        }
      } else {
        switch(x) {
          case '÷': e += '/'; break;
          case 'x': e += '*'; break;
          default: e += x;
        }
      }
    }
    addAnswer(eval(e));
 }
}

function addInput(input) {
  if(equation.innerHTML === null || equation.innerHTML === '0'){
    equation.innerHTML = input;
  } else {
    equation.innerHTML += input;
  }
}

function addAnswer(input) {
  answer.innerHTML = input;
}

function removeAnswer() {
  answer.innerHTML = '';
}

function removeLastStep() {
  equation.innerHTML = equation.innerHTML.slice(0,-1);
  if(equation.innerHTML.length > 1) {
    makeEquation(equation.innerHTML);
  } else {
    removeAnswer();
  }
}

function clearScreen() {
  equation.innerHTML = '';
  answer.innerHTML = '';
}
