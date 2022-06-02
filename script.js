let form = document.getElementById('form')
let textInput = document.getElementById('textInput')
let dateInput = document.getElementById('dateInput')
let priceInput = document.getElementById('priceInput')
let msg = document.getElementById('msg')
let tarefa = document.getElementById('tarefa')
let add = document.getElementById('add')

form.addEventListener('submit', e => {
  e.preventDefault()
  formValidacao()
})

let formValidacao = () => {
  if (textInput.value === '') {
    console.log('erro')
    msg.innerHTML = 'Tarefa precisa ser adicionada'
  } else {
    console.log('Tarefa adicionada com sucesso')
    msg.innerHTML = ''
    receberDados()
    add.setAttribute('data-bs-dismiss', 'modal')
    add.click()
    ;(() => {
      add.setAttribute('data-bs-dismiss', '')
    })()
  }
}

let data = []

let receberDados = () => {
  data.push({
    texto: textInput.value,
    date: dateInput.value,
    price: priceInput.value
  })

  localStorage.setItem('data', JSON.stringify(data))
  console.log(data)

  criarTarefas()
}

let criarTarefas = () => {
  tarefa.innerHTML = ''
  data.map((x, y) => {
    return (tarefa.innerHTML += `
    <div id=${y}>
          
          <span class="texto">${x.texto}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.price}</p>
          
  
          <span class="options">
            
            <i onClick= "editarTarefa(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="excluirTarefa(this);criarTarefas()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `)
  })

  resetarForm()
}

/* <input type="checkbox" id="checkbox"></input> */

let resetarForm = () => {
  textInput.value = ''
  dateInput.value = ''
  priceInput.value = ''
}

let excluirTarefa = e => {
  e.parentElement.parentElement.remove()

  data.splice(e.parentElement.parentElement.id, 1)

  localStorage.setItem('data', JSON.stringify(data))

  console.log(data)
}

let editarTarefa = e => {
  let tarefaSelecionada = e.parentElement.parentElement

  textInput.value = tarefaSelecionada.children[0].innerHTML
  dateInput.value = tarefaSelecionada.children[1].innerHTML
  priceInput.value = tarefaSelecionada.children[2].innerHTML

  excluirTarefa(e)
}

;(() => {
  data = JSON.parse(localStorage.getItem('data')) || []
  console.log(data)
  criarTarefas()
})()
