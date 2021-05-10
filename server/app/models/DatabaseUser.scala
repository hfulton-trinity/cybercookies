package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import shared.SharedMessages
import scala.concurrent.Future
import views.html.troop

class DatabaseUser(db: Database)(implicit ec: ExecutionContext) {
  type Username = String
  type Password = String

  def newUser(u: SharedMessages.User): Future[Int] = {
    db.run(Users += UsersRow(-1, u.username, u.password, u.email, u.full_name, Some(u.troop_to_buy_from)))
  }

  def logIn(u: Username, p: Password): Future[SharedMessages.User] = {
    val matches = db.run(Users.filter(userRow => userRow.username === u && userRow.password === p).result)
    matches.map(uRow => SharedMessages.User(uRow.head.username, uRow.head.password, uRow.head.email, uRow.head.fullName, uRow.head.troopToBuyFrom.get))
  }

  def getUserInfo(u: Username): Future[SharedMessages.User] = {
    val matches = db.run(Users.filter(userRow => userRow.username === u).result)
    matches.map(uRow => SharedMessages.User(uRow.head.username, uRow.head.password, uRow.head.email, uRow.head.fullName, uRow.head.troopToBuyFrom.get))
  }

  def newTransaction(t: SharedMessages.Transaction, l: List[(SharedMessages.Cookie, Int, Double)]): Future[Int] = {
    db.run(Address += AddressRow(-1, t.address.street, t.address.city, t.address.state, t.address.country, t.address.zip, t.address.apartment))

    val addyId = db.run(
      (for {
        address <- Address if address.streetAddress === t.address.street
      } yield {
        address.id
      }).result
    )

    addyId.map(id => db.run(Transaction += TransactionRow(-1, Some(t.customer), Some(t.seller), t.deliveryMethod, Some(t.deliveryInstructions), Some(id.head), t.date_ordered)))

    val tranIDcID = l.map(c => db.run(
      (for {
        trans <- Transaction if trans.customerId.get === t.customer
        cookie <- Cookie if cookie.name === c._1.name
      } yield {
        (trans.id, cookie.id, c._2, c._3)
      }).result
    ))

    tranIDcID.map(tupSeq => tupSeq.map(tup => db.run(TransactionCookie += TransactionCookieRow(-1, Some(tup.head._1), Some(tup.head._2), tup.head._3, tup.head._4))))
    
    Future(1)
  }

  def myTransactions(u: Username): Future[Seq[SharedMessages.Transaction]] = {
    val myTrans = db.run(
      (for{
        user <- Users if user.username === u
        trans <- Transaction if trans.customerId.get === user.id
        address <- Address if address.id === trans.addressId.get
      } yield {
        (trans, address)
      }).result
    )

    myTrans.map(_.map(tup => SharedMessages.Transaction(tup._1.customerId.get, tup._1.sellerId.get, tup._1.deliveryMethod, 
      tup._1.deliveryInstructions.get, 
      SharedMessages.Address(tup._2.streetAddress, tup._2.city, tup._2.state, tup._2.country, tup._2.zip, tup._2.apartmentNumber), 
      tup._1.dateOrdered)))
  }

  def getOrders(tn: Int): Future[Seq[SharedMessages.Transaction]] = {
    val myOrders = db.run(
      (for{
        troop <- Troop if troop.number === tn
        transaction <- Transaction if transaction.sellerId.get === troop.id
        address <- Address if address.id === transaction.addressId.get
      } yield {
        (transaction, address)
      }).result
    )

    myOrders.map(_.map(tup => SharedMessages.Transaction(tup._1.customerId.get, tup._1.sellerId.get, tup._1.deliveryMethod, 
      tup._1.deliveryInstructions.get, 
      SharedMessages.Address(tup._2.streetAddress, tup._2.city, tup._2.state, tup._2.country, tup._2.zip, tup._2.apartmentNumber), 
      tup._1.dateOrdered)))
  }

  def totalSold: Future[Seq[(SharedMessages.Cookie, Int, Double)]] = {
    val transCookies = db.run(
      (for {
        tc <- TransactionCookie
        cookie <- Cookie if tc.cookieId.get === cookie.id
      } yield {
        (cookie, tc.quantity, tc.price)
      }).result
    )

    transCookies.map(seq => seq.map(tup => (SharedMessages.Cookie(tup._1.name, tup._1.description), tup._2, tup._3)))
  } 
}
