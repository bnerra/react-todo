
const mockData = 
[
  {
      "id": 1,
      "title": "first-todo, now updated",
      "createdAt": "2019-01-03T21:16:34.403Z",
      "updatedAt": "2019-01-03T22:40:56.466Z",
      "todoItems": [
          {
              "id": 1,
              "content": "first todo item, inside first todo",
              "complete": false,
              "createdAt": "2019-01-03T22:04:07.723Z",
              "updatedAt": "2019-01-03T22:04:07.723Z",
              "todoId": 1
          }
      ]
  },
  {
      "id": 2,
      "title": "another-todo",
      "createdAt": "2019-01-03T21:16:53.372Z",
      "updatedAt": "2019-01-03T21:16:53.372Z",
      "todoItems": [
        {
          "id": 1,
          "content": "first todo item, inside second todo",
          "complete": false,
          "createdAt": "2019-01-05T21:08:07.723Z",
          "updatedAt": "2019-01-05T21:08:07.723Z",
          "todoId": 1
        }
      ]
  }
]

export default mockData;