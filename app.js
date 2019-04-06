const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const app = express()
const port = 3000

//定義使用的模板引擎名稱，預設佈局使用的檔案'main'
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 讓Express知道設定的view engine 是 handlebars
app.set('view engine', 'handlebars')

// 讓Express 知道靜態檔案的位置
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

// render show pages
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(
    restaurant => restaurant.id === parseInt(req.params.restaurant_id, 10)
  )
  res.render('show', { restaurant: restaurant[0] }) //記得要加[0]
})

// render search results
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(
    restaurant =>
      // search by name
      restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
      // search by category
      restaurant.category.includes(keyword)
  )
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is running on localhost:${port}`)
})
