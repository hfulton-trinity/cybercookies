package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.MsgInMemoryModel
import models._
import play.api.libs.json._

@Singleton
class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def load = { implicit request =>
    Ok(views.html.home())
  }

}
