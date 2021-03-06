package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.UserModel
import models.TroopModel
import models._
import play.api.libs.json._
import models.Tables._

@Singleton
class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  private val model = TroopModel()

  def load = Action{ implicit request =>
    Ok(views.html.home())
  }

  def getCookies = Action { implicit request =>
    Ok(Json.toJson(model.getAllCookies.map(x => ""+x.name+": "+x.description+","+x.img_index)))
  }

}
