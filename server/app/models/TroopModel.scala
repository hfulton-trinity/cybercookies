package models

import shared.SharedMessages.Address
import shared.SharedMessages.Cookie
import shared.SharedMessages.Troop

trait TroopModel {
  type Quantity = Int
  type Price = Double

  def newTroop(t: Troop): Unit
  def getAvailableCookies(troopN: Int): List[(Cookie, Price, Quantity)]
  def getTroopInformation(troopN: Int, password: String): Troop
  def addCookies(troopN: Int, cookieId: Int, q: Quantity): Unit
  def newCookie(troopN: Int, c: Cookie, q: Quantity, p: Price): Unit
  def getCookieInfo(cookieId: Int): Cookie
  def getAllTroops: List[Troop]
  def getAllCookies: List[Cookie]
}

object TroopModel {
  def apply(): TroopModel = new InMemoryTroop
}
