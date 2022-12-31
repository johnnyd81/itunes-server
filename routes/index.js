const express = require('express')
const router = express.Router()

//the array below will be populated when the user selects a favourite item
const favouriteItems = []

//the function below creates a random id for each favourite item
const aId = () => {
  return Math.floor(Math.random() * Date.now())
}
router.get('/', (req, res) => {
  //the if else statement determines if the favourites list is populated or not and sends the items if they are available
  if (favouriteItems.length === 0) {
    res.send({
      message: 'You currently have no favourites in your favourites list',
    })
  } else {
    res.send({ data: favouriteItems })
  }
})

router.post('/addItem', (req, res) => {
  const id = aId()
  //the Object assign method creates a new object using the req.body and the id created by the aId function
  const newFavourite = Object.assign({ id: id }, req.body)
  //I used an array method called push to add my new favourite item to the favouritesList array
  favouriteItems.push(newFavourite)

  res.send({ data: favouriteItems })
})

router.delete('/delete/:id', (req, res) => {
  const favouriteItem = req.params.id * 1 //by multiplying by 1 the id converts to a number
  for (let i = 0; i < favouriteItems.length; i++) {
    if (favouriteItems[i].id === favouriteItem) {
      //I used the splice array method to remove the item with the matching id
      favouriteItems.splice(i, 1)
    }
  }

  return res.send({ data: favouriteItems })
})

//the declaration below exports the router module
module.exports = router
