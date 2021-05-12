package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.DatabaseUser
import models.DatabaseTroop
import models._
import play.api.libs.json._
import shared.SharedMessages
import shared.SharedMessages.Stock
import shared.SharedMessages.Cookie
import models.Tables._
import java.sql.Date
import java.util.Calendar

import play.api.db.slick.DatabaseConfigProvider
import scala.concurrent.ExecutionContext
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future

@Singleton
class CustController @Inject() (protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents) (implicit ec: ExecutionContext) 
  extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  private val model = new DatabaseUser(db)
  private val troop_model = new DatabaseTroop(db)

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

  def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a,path) => f(a)
        case e @ JsError(_) => 
          println(e)
          Future.successful(Redirect(routes.CustController.load()))
      }
    }.getOrElse(Future.successful(Redirect(routes.CustController.load())))

  }

  def withSessionUsername(f: String => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
    request.session.get("username").map(f).getOrElse{
      println("user not found in session")
      Future.successful(Ok(Json.toJson(Seq.empty[String])))
    }
  }

  def validateCustomer = Action.async { implicit request =>
    println("validate")
    withJsonBody[UserData] {ud =>
      model.validateUser(ud.username, ud.password).map {userExists =>
        if (userExists) {
          Ok(Json.toJson(true))
            .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
        } else {
          Ok(Json.toJson(false))
        }
      }
    }
  }

  def newCustomer = Action.async { implicit request =>
    println("newCustomer")
    withJsonBody[NewUserData] {ud =>
      model.newUser(SharedMessages.User(ud.user, ud.pass, ud.email, ud.name, ud.troop)).map { userExists =>
        if(userExists > 0) {
          Ok(Json.toJson(true))
            .withSession("username" -> ud.user, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
        } else {
          Ok(Json.toJson(false))
       }
      }
    }
  }

  def getTroopEmail = Action.async { implicit request =>
    println("getemail")
    withSessionUsername{ username =>

      val user = model.getUserInfo(username)
      val troop_email = user.flatMap {u =>
        troop_model.getTroopInformationNoPassword(u.troop_to_buy_from).map(t => t.email)
      }
      troop_email.map(tE => Ok(Json.toJson(tE)))
    }
  }

  def getNextDelivery = Action.async { implicit request =>
    println("getnextdelivery")
    withSessionUsername{ username =>
      val transactFut = model.myTransactions(username)
      val transaction = transactFut.map { t =>  
        t.sortBy(x => x.date_ordered).head
      }
      val deliv_date = transaction.map { transact => 
        new Date(transact.date_ordered.getTime() + 1210000000)
      }

      val dispTransact = transaction.flatMap { transact => deliv_date.map { deliv => 
          "Troop: " + transact.seller + "   Expected Delivery Date: " + deliv + "    Address for delivery: " + transact.address
        }
      }
      dispTransact.map(dT => Ok(Json.toJson(dT)))
    }
  }

  def getEstimatedDelivery = Action.async { implicit request =>
    println("getestimated")
    Future.successful(Ok(Json.toJson(false)))//""+Calendar.get(Calendar.MONTH)+"/"+Calendar.get(Calendar.DAY_OF_MONTH)+"/"+Calendar.get(Calendar.YEAR)))
    //+2wks??

    //need estimated delivery date as string
  }

  def getAvailCookies = Action.async { implicit request =>
    println("getavailablecookies")
    withSessionUsername{ username =>
      println(username)
      val getUserInfo = model.getUserInfo(username)
      getUserInfo.flatMap { ui =>
        val availCookies = troop_model.getAvailableCookies(ui.troop_to_buy_from)
        availCookies.map { aC => 
          Ok(Json.toJson(aC.map {
          case (x, price, q) => ""+x.name+": "+x.description+" Price: "+ price+ " Quantity Available: "+q+","+x.img_index
        }))
        }
      }
    }
  }

  def sendTransaction = Action.async { implicit request =>
    println("sendtrans")
    Future.successful(Ok(Json.toJson(false))) //needs to add transaction to database, should receive address and list of strings with cookie name and amounts from js
  }

  def logout = Action.async { implicit request =>
    println("logout")
    Future.successful(Ok(Json.toJson(true)).withSession(request.session - "username"))
  }

}
