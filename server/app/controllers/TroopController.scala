package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.UserModel
import models.TroopModel
import models._
import play.api.libs.json._

@Singleton
class TroopController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def load = Action{ implicit request =>
    Ok(views.html.troop())
  }
/*
def newTroop = Action {
//NEEDS WORK
  withJsonBody[TroopData] {ud =>
    if(TroopModel.logIn(ud.no, ud.password)){
      Ok(Json.toJson(true))
        .withSession("no" -> ud.no, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
    } else {
      Ok(Json.toJson(false))
    }
  }
}

def validateTroop = Action {
  withJsonBody[TroopData] {ud =>
    if(TroopModel.logIn(ud.no, ud.password)){
      Ok(Json.toJson(true))
        .withSession("no" -> ud.no, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
    } else {
      Ok(Json.toJson(false))
    }
  }
}
*/
}

