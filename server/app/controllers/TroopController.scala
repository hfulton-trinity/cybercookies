package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.UserModel
import models.TroopModel
import models._
import play.api.libs.json._



import play.api.db.slick.DatabaseConfigProvider
import scala.concurrent.ExecutionContext
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.Future
import shared.SharedMessages
import shared.SharedMessages.Troop
import java.sql.Date
import shared.SharedMessages.Address
import shared.SharedMessages.TroopData


@Singleton
class TroopController @Inject() (protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {




private val model= new DatabaseTroop(db)  
private val UModel= new DatabaseUser(db)
    def load=Action{implicit request=>
        Ok(views.html.troop())
      }
    
  implicit val userDataReads = Json.reads[UserData]
    implicit val addressDataReads = Json.reads[SharedMessages.Address]
      implicit val adressDataWrites = Json.writes[SharedMessages.Address]
       implicit val cookieDataReads = Json.reads[SharedMessages.Cookie]
      implicit val cookieDataWrites = Json.writes[SharedMessages.Cookie]
       implicit val troopDataReads = Json.reads[SharedMessages.Troop]
      implicit val troopDataWrites = Json.writes[SharedMessages.Troop]
       implicit val transactionDataReads = Json.reads[SharedMessages.Transaction]
      implicit val transactionDataWrites = Json.writes[SharedMessages.Transaction]
       implicit val stockDataReads = Json.reads[SharedMessages.Stock]
      implicit val stockDataWrites = Json.writes[SharedMessages.Stock]
      implicit val troopDataReads2=Json.reads[SharedMessages.TroopData]


  // implicit val messageReads=Json.reads[MessageOut]
// implicit val messageWrites=Json.writes[MessageData]
// implicit val taskItemWrites = Json.writes[TaskItem]

    def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => Future.successful(Redirect(routes.TroopController.load()))
      }
    }.getOrElse(Future.successful(Redirect(routes.TroopController.load())))
  }

     def withSessionUsername(f: String => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
    request.session.get("username").map(f).getOrElse(Future.successful(Ok(Json.toJson(Seq.empty[String]))))
  }
      def withSessionUserid(f: Int => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
    request.session.get("userid").map(userid => f(userid.toInt)).getOrElse(Future.successful(Ok(Json.toJson(Seq.empty[String]))))
  }

def validate  = Action.async { implicit request =>
    withJsonBody[UserData] { ud =>
      model.logIn(ud.username.toInt,ud.password).map { ouserId =>
        ouserId match {
          case true => 
            Ok(Json.toJson(true))
             .withSession("username" -> ud.toString, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
          case false =>
            Ok(Json.toJson(false))
        }
      }
    }
  }


def createTroop = Action { implicit request =>
  //val some:Option[Int]=Some(15)
  //val x=some.getOrElse(15)
    withJsonBody[TroopData] { ud => 
      model.newTroop(Troop(ud.username.toInt, Address(ud.address(0), ud.address(1), ud.address(2), "USA", ud.address(3).toInt, Some(15)), ud.password, new Date(2021, 5, 25), ud.email)).map {ouserId =>// returns a Boolean
        ouserId match {
          case true => 
            Ok(Json.toJson(true))
             .withSession("username" -> ud.username.toString, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
          case false =>
            Ok(Json.toJson(false))
        }
    }
}}

def allOrders= TODO


def outStock= TODO

  def allStock = TODO

  def totalSales= TODO

  def addStock= TODO
}



// package controllers

// import javax.inject._
// import play.api.mvc._
// import play.api.i18n._
// import models.UserModel
// import models.TroopModel
// import models._
// import play.api.libs.json._
// import models.Tables._
// import shared.SharedMessages.Stock
// import shared.SharedMessages.Cookie
// import shared.SharedMessages

// @Singleton
// class TroopController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
//   def load = Action{ implicit request =>
//     Ok(views.html.troop())
//   }

//   private val TModel=TroopModel()
// //private val TModel= new DatabaseTroop
//   private val UModel=UserModel()
//   implicit val cookieWrites=Json.writes[Cookie]
//   implicit val cookieReads=Json.reads[Cookie]
//   implicit val stockWrites=Json.writes[Stock]
//   implicit val stockReads=Json.reads[Stock]
//   implicit val userDataReads = Json.reads[UserData]
//   implicit val addressWrites=Json.writes[SharedMessages.Address]
//   implicit val transactionWrites=Json.writes[SharedMessages.Transaction]
// def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
//     request.body.asJson.map { body =>
//       Json.fromJson[A](body) match {
//         case JsSuccess(a, path) => f(a)
//         case e @ JsError(_) => Redirect(routes.TroopController.load())
//       }
//     }.getOrElse(Redirect(routes.TroopController.load()))
//   }
// def withSessionUsername(f: String => Result)(implicit request: Request[AnyContent]) = {
//     request.session.get("username").map(f).getOrElse(Ok(Json.toJson(Seq.empty[String])))
//   }

// def validate=Action{ implicit request=>
//   withJsonBody[UserData]{ ud=>
//     if(TModel.getTroopInformation(ud.username.toInt,ud.password)){//defined correctly in database model
//      Ok(Json.toJson(true))
//           .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
//       } else {
//         Ok(Json.toJson(false))
//       }
//   }
// }

//   def createTroop = Action { implicit request =>
//     withJsonBody[UserData] { ud =>
//       if (TModel.newTroop(ud.username.toInt, ud.password)) {//need to create troop 
//         Ok(Json.toJson(true))
//           .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
//       } else {
//         Ok(Json.toJson(false))
//       }
//     }
//   }

// def allOrders=Action{ implicit request=>
//   withSessionUsername{ username=>
//     println(username.toInt)
//     Ok(Json.toJson(UModel.getOrders(username.toInt)))
//     //Ok(views.html.troop())
//   }
// }
// def outStock=Action{implicit request=>
//   Ok(Json.toJson(UModel.totalSold))}


// def allStock=Action{implicit request=>
//   withSessionUsername{ username=>
//     println(username.toInt)
//     Ok(Json.toJson(TModel.getAvailableCookies(username.toInt)))
// }
// }

// def totalSales=Action{implicit request=>
//   withSessionUsername{ username=>
//     Ok(Json.toJson(UModel.totalSold))

//   }
//   }

//   def addStock= Action{implicit request=>
//   withSessionUsername{username=>
//     withJsonBody[Stock]{St=>
//       TModel.addCookies(username.toInt,St.num,St.cost.toInt)
//       Ok(Json.toJson(true))
//     }

//   }}

// }

