const clickService = require("../services/click.service")

class ClickController {
    async prepare(req, res, next){
        try {
          const result = await clickService.prepare(req.body)
          res.set({headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}).send(result)
        } catch (error) {
            next(error)
    }
}
    async complete (req, res, next) {
        try {  
        } catch (error) {
            next(error)
        }
      }

    async complete (req, res, next) {
        try {  
        } catch (error) {
            next(error)
        }
      }
    }

module.exports = new ClickController()