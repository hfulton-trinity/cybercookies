package models

import shared.SharedMessages.Address
import shared.SharedMessages.Cookie
import shared.SharedMessages.Troop
import scala.concurrent.ExecutionContext
import slick.jdbc.PostgresProfile.api._

trait TroopModel {
  type Quantity = Int
  type Price = Double

  def newTroop(t: Troop): Unit
  def getAvailableCookies(troopN: Int): List[(Cookie, Price, Quantity)]
  def getTroopInformation(troopN: Int, password: String): Troop
  def getTroopInformationFromTroop(troopN: Int): Troop
  def addCookies(troopN: Int, cookieId: Int, q: Quantity): Unit
  def newCookie(troopN: Int, c: Cookie, q: Quantity, p: Price): Unit
  def getCookieInfo(cookieId: Int): Cookie
  def getAllTroops: List[Troop]
  def getAllCookies: List[Cookie]
}

object TroopModel {
  implicit val ec: ExecutionContext = ExecutionContext.global
  def apply(): TroopModel = new InMemoryTroop
  //def apply(db: Database): TroopModel = new DatabaseTroop(db)
}
