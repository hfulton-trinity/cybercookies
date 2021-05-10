// package controllers

// import javax.inject._
// import play.api.mvc._
// import play.api.i18n._
// import models.UserModel
// import models.TroopModel
// import models._
// import play.api.libs.json._



// import play.api.db.slick.DatabaseConfigProvider
// import scala.concurrent.ExecutionContext
// import play.api.db.slick.HasDatabaseConfigProvider
// import slick.jdbc.JdbcProfile
// import slick.jdbc.PostgresProfile.api._
// import scala.concurrent.Future


// @Singleton
// class TroopController @Inject() (protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)(implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {




// private val model=new databaseModel(db)  
//     def load=Action{implicit request=>
//         Ok(views.html.troop())}
    
//   implicit val userDataReads = Json.reads[UserData]
//   implicit val messageReads=Json.reads[MessageOut]
// implicit val messageWrites=Json.writes[MessageData]
// implicit val taskItemWrites = Json.writes[TaskItem]

//     def withJsonBody[A](f: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
//     request.body.asJson.map { body =>
//       Json.fromJson[A](body) match {
//         case JsSuccess(a, path) => f(a)
//         case e @ JsError(_) => Future.successful(Redirect(routes.databaseController.load()))
//       }
//     }.getOrElse(Future.successful(Redirect(routes.databaseController.load())))
//   }
//      def withSessionUsername(f: String => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
//     request.session.get("username").map(f).getOrElse(Future.successful(Ok(Json.toJson(Seq.empty[String]))))
//   }
//       def withSessionUserid(f: Int => Future[Result])(implicit request: Request[AnyContent]): Future[Result] = {
//     request.session.get("userid").map(userid => f(userid.toInt)).getOrElse(Future.successful(Ok(Json.toJson(Seq.empty[String]))))
//   }

















// }




package controllers

import javax.inject._
import play.api.mvc._
import play.api.i18n._
import models.UserModel
import models.TroopModel
import models._
import play.api.libs.json._
<<<<<<< HEAD
import models.Tables._
=======
import shared.SharedMessages.Stock
import shared.SharedMessages.Cookie
import shared.SharedMessages
>>>>>>> c47c0c85a99019c254c5a560db9af18c1444fac4

@Singleton
class TroopController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  def load = Action{ implicit request =>
    Ok(views.html.troop())
  }
<<<<<<< HEAD
  private val Model=TroopModel()
  // def validateTroop=Action{
  //    withJsonBody[UserData]{ud=>
  //     if(Model.validate)
    
    
  //   }

  // }




=======
  private val TModel=TroopModel()
  private val UModel=UserModel()
  implicit val cookieWrites=Json.writes[Cookie]
  implicit val stockWrites=Json.writes[Stock]
>>>>>>> c47c0c85a99019c254c5a560db9af18c1444fac4
  implicit val userDataReads = Json.reads[UserData]
  implicit val addressWrites=Json.writes[SharedMessages.Address]
  implicit val transactionWrites=Json.writes[SharedMessages.Transaction]
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

// def validate=Action{ implicit request=>
//   withJsonBody[UserData]{ ud=>
//     if(TModel.getTroopInformation(ud.username.toInt,ud.password)){
//      Ok(Json.toJson(true))
//           .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
//       } else {
//         Ok(Json.toJson(false))
//       }
//   }
// }

//   def createTroop = Action { implicit request =>
//     withJsonBody[UserData] { ud =>
//       if (TModel.createUser(ud.username, ud.password)) {
//         Ok(Json.toJson(true))
//           .withSession("username" -> ud.username, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
//       } else {
//         Ok(Json.toJson(false))
//       }
//     }
//   }

def allOrders=Action{ implicit request=>
  withSessionUsername{ username=>
    println(username.toInt)
    Ok(Json.toJson(UModel.getOrders(username.toInt)))
    //Ok(views.html.troop())
  }
}
def outStock=Action{implicit request=>
  Ok(Json.toJson(UModel.totalSold))}


def allStock=Action{implicit request=>
  withSessionUsername{ username=>
    println(username.toInt)
    Ok(Json.toJson(TModel.getAvailableCookies(username.toInt)))
}
}

def totalSales=Action{implicit request=>
  withSessionUsername{ username=>
    Ok(Json.toJson(UModel.totalSold))

  }
  }


}

