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
class TroopController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  def load = Action{ implicit request =>
    Ok(views.html.troop())
  }
  private val Model=TroopModel()
  // def validateTroop=Action{
  //    withJsonBody[UserData]{ud=>
  //     if(Model.validate)
    
    
  //   }

  // }




  implicit val userDataReads = Json.reads[UserData]
def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => Redirect(routes.TroopController.load())
      }
    }.getOrElse(Redirect(routes.TroopController.load()))
  }
def withSessionUsername(f: String => Result)(implicit request: Request[AnyContent]) = {
    request.session.get("username").map(f).getOrElse(Ok(Json.toJson(Seq.empty[String])))
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

