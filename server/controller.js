const { all } = require("proxy-addr")

let modelId = 4
let voteBase = 1

let allModels = [
    {
        "id": 1,
        "name": "Keith Morrison",
        "reason": "Extraordinary Storyteller",
        "votes": 4,
        "imageURL": "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_37/3006201/keitharticlepic.jpg"
      },
      {
        "id": 2,
        "name": "Lizzo",
        "reason": "Body Positivity",
        "votes": 8,
        "imageURL": "https://media.allure.com/photos/6029a898e3129c122cc8b744/16:9/w_3488,h_1962,c_limit/lizzo-lede.jpg"

      },
      {
        "id": 3,
        "name": "Leon Brides",
        "reason": "Texas State Musician",
        "votes": 2,
        "imageURL" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTOHvLhGESscGUkOj3k0obs8D7v2zIJCnxWQ&usqp=CAU"

      }
]

module.exports = {
    getAllModels: (req, res) => {
        res.status(200).send(allModels)
    },
    deleteModel: (req, res) => {
        let { id } = req.params
        let index = allModels.findIndex((item) => {
            return item.id === +id
        })
        allModels.splice(index, 1)
        res.status(200).send(allModels)
    },
    createModel: (req, res) => {
        let { name, reason, votes, imageURL} = req.body
        let newModel = {
            id: modelId,
            name,
            reason,
            votes: voteBase,
            imageURL
        }
        allModels.push(newModel)
        res.status(200).send(allModels)
        modelId++
    },
    changeModelVotes: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = allModels.findIndex((item) => {
            return item.id === +id    
        })

        let thisModel = allModels[index]

        if (type === 'plus') {
            thisModel.votes += 1
        } else if (type === 'minus') {
            thisModel.votes -= 1
        }else {
            res.status(400).send('could not edit role model')
        }

        allModels.splice(index, 1, thisModel)
        res.status(200).send(allModels)
       
    }
}