
const modelContainer = document.querySelector('#role-model-container')
const form = document.querySelector('form')


const getAllModels = () => {
    axios.get('http://localhost:4000/api/role-models')
    .then((res) => {
        let models = res.data
        displayModels(models)
    })
};

const deleteModel = (id) => {
    console.log('delete id:', id)
    axios.delete(`http://localhost:4000/api/role-models/${id}`)
    .then((res) => {
        let models = res.data
        displayModels(models)

    })
};

const createModel = (newModel) => {
    axios.post('http://localhost:4000/api/role-models', newModel)
    .then((res) => {
        let models = res.data
        displayModels(models)
    })
};

const changeModelVotes = (id, type) => {
    axios.put(`http://localhost:4000/api/role-models/${id}`, {type})
    .then((res) => {
        let models =res.data
        displayModels(models)
    })
}

function createModelCard(model) {
    const modelCard = document.createElement('div')
    modelCard.classList.add('model-card')

    modelCard.innerHTML = `<img alt='model cover image' src=${model.imageURL}       
                            class="model-image"/>
                            <p class="name">${model.name}</p>
                            <p class="reason">${model.reason}</p>

                            <div class="btns-container">
                                <button onclick="changeModelVotes(${model.id}, 'minus')">-</button>
                                <p class="vote-count">Votes:${model.votes}</p>
                                <button onclick="changeModelVotes(${model.id}, 'plus')">+</button>
                            </div>
                            <button onclick="deleteModel(${model.id})">delete</button>`


    modelContainer.appendChild(modelCard)

}

function displayModels(arr) {
    console.log('made it to displaymodels:', arr)
    modelContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createModelCard(arr[i])
    }
}

function clicked(e) {
    e.preventDefault()

    let name = document.querySelector('#name')
    let reason = document.querySelector('#reason')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        name: name.value,
        reason: reason.value, 
        imageURL: imageURL.value
    }

    createModel(bodyObj)

    name.value = ''
    reason.value = ''
    imageURL.value = ''
}


form.addEventListener('submit', clicked)

getAllModels();