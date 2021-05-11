package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.UserModel
import models.TroopModel
import models._
import play.api.libs.json._
import shared.SharedMessages
import shared.SharedMessages.Stock
import shared.SharedMessages.Cookie
import models.Tables._
import java.sql.Date
import java.util.Calendar

@Singleton
class CustController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val model = UserModel()
  private val troop_model = TroopModel()
  private val date: Calendar = Calendar.getInstance()

  def load = Action{ implicit request =>
    Ok(views.html.cust())
  }

  //Figure out database interactions

  implicit val userDataReads = Json.reads[UserData]
  implicit val newUserDataReads = Json.reads[NewUserData]
  implicit val cookieWrites=Json.writes[Cookie]
  implicit val cookieReads=Json.reads[Cookie]
  implicit val stockWrites=Json.writes[Stock]
  implicit val stockReads=Json.reads[Stock]
  implicit val addressWrites=Json.writes[SharedMessages.Address]
  implicit val transactionWrites=Json.writes[SharedMessages.Transaction]

  def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a,path) => f(a)
        case e @ JsError(_) => Redirect(routes.CustController.load())
      }
    }.getOrElse(Redirect(routes.CustController.load()))

  }

  def withSessionUsername(f: String => Result)(implicit request: Request[AnyContent]) = {
    request.session.get("username").map(f).getOrElse(Ok(Json.toJson(Seq.empty[String])))
  }

  def validateCustomer = Action { implicit request =>
    withJsonBody[UserData] {ud =>
      if(model.logIn(ud.username, ud.password)){
        Ok(Json.toJson(true))
          .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
      } else {
        Ok(Json.toJson(false))
      }
    }
  }

  def newCustomer = Action { implicit request =>
    withJsonBody[NewUserData] {ud =>
      if(model.newUser(SharedMessages.User(ud.user, ud.pass, ud.email, ud.name, ud.troop))){
        Ok(Json.toJson(true))
          .withSession("username" -> ud.user, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
      } else {
        Ok(Json.toJson(false))
      }
    }
  }

  def getTroopEmail = Action { implicit request =>
    withSessionUsername{ username =>
      val user = model.getUserInfo(username)
      val troop_email = troop_model.getTroopInformationNoPassword(user.troop_to_buy_from).email
      Ok(Json.toJson(troop_email))
    }
  }

  def getNextDelivery = Action { implicit request =>
    withSessionUsername{ username =>
      val transact = model.myTransactions(username).sortBy(x => x.date_ordered).head
      val deliv_date = new Date(transact.date_ordered.getTime() + 1210000000)
      val dispTransact = "Troop: " + transact.seller + "   Expected Delivery Date: " + deliv_date + "    Address for delivery: " + transact.address
      Ok(Json.toJson(dispTransact))
    }
  }

  def getEstimatedDelivery = Action { implicit request =>
    Ok(Json.toJson(""+Calendar.get(Calendar.MONTH)+"/"+Calendar.get(Calendar.DAY_OF_MONTH)+"/"+Calendar.get(Calendar.YEAR)))
    //+2wks??

    //need estimated delivery date as string
  }

  def getAvailCookies = Action { implicit request =>
    withSessionUsername{ username =>
      Ok(Json.toJson(troop_model.getAvailableCookies(model.getUserInfo(username).troop_to_buy_from).map {
        case (x,price,q) => ""+x.name+": "+x.description+" Price: "+ price+ " Quantity Available: "+q+","+x.img_index
      }))
    }
  }

  def sendTransaction = ??? //needs to add transaction to database, should receive address and list of strings with cookie name and amounts from js

  def logout = Action { implicit request =>
    Ok(Json.toJson(true)).withSession(request.session - "username")
  }

}
