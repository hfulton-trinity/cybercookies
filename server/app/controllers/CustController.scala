package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.UserModel
import models.TroopModel
import models._
import play.api.libs.json._

@Singleton
class CustController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def load = Action{ implicit request =>
    Ok(views.html.cust())
  }
/*
  //Figure out database interactions

  implicit val custDataReads = Json.reads[CustData]
  implicit val troopDataReads = Json.reads[TroopData]

  def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a,path) => f(a)
        case e @ JsError(_) => Redirect(routes.Application.load())
      }
    }.getOrElse(Redirect(routes.Application.load()))

  }

  def withSessionUsername(f: String => Result)(implicit request: Request[AnyContent]) = {
    request.session.get("username").map(f).getOrElse(Ok(Json.toJson(Seq.empty[String])))
  }

  def validateCustomer = Action { implicit request =>
    withJsonBody[CustData] {ud =>
      if(UserModel.logIn(ud.username, ud.password)){
        Ok(Json.toJson(true))
          .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
      } else {
        Ok(Json.toJson(false))
      }
    }
  }

  def newCustomer = Action { implicit request =>
  //NEEDS WORK
    withJsonBody[CustData] {ud =>
      if(UserModel.logIn(ud.username, ud.password)){
        Ok(Json.toJson(true))
          .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
      } else {
        Ok(Json.toJson(false))
      }
    }
  }
  */
}
