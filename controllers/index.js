exports.testController = (req, res) => {
    switch(req.method){
        case 'GET':
            res.send('it was GET request')
            break
        case 'POST':
            const body = req.body
            res.send(body)
            break
        case 'DELETE':
            res.send('it was DELETE request')
            break
        default:
            res.send('it was default request')
    }
 }