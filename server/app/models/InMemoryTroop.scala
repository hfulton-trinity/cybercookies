package models

import shared.SharedMessages.Address
import shared.SharedMessages.Cookie
import shared.SharedMessages.Troop
import java.util.Date

class InMemoryTroop extends TroopModel {
  type CookieId = Int
  type TroopId = Int

  private var _troops: Map[TroopId, Troop] = List((0, Troop(123, Address("1 Trinity Pl", "San Antonio", "TX", "USA", 78212, -1), "test", new Date(2020, 5, 2), "trinity@trinity.edu"))).toMap
  private var _troopCookies: List[(TroopId, CookieId, Quantity, Price)] = List((0, 0, 5, 10.99))
  private var _cookies: Map[CookieId, Cookie] = List((0, Cookie("Thin Mint", "Its a thin mint."))).toMap

  private def troops = _troops
  private def troopCookies = _troopCookies
  private def cookies = _cookies

  private def getTroopFromTroopN(tN: Int): Troop = {
    val validTroops = troops.filter(tup => (tup._2.n == tN)).map(tup => tup._2).toArray
    
    if(validTroops.length < 1) {
      null
    } else {
      validTroops(0)
    }
  }

  private def getTroopIdFromTroopN(tN: Int): Int = {
    val validTroops = troops.filter(tup => (tup._2.n == tN)).map(tup => tup._1).toArray
    
    if(validTroops.length < 1) {
      -1
    } else {
      validTroops(0)
    }
  }

  def getAllCookies: List[Cookie] = {
    cookies.map(tup => tup._2).toList
  }
  
  def getAllTroops: List[Troop] = {
    troops.map(tup => tup._2).toList
  }

  def newTroop(t: Troop): Unit = {
    val tId: TroopId = troops.toList.length-1
    _troops = troops + (tId -> t)
  }

  def getAvailableCookies(troopN: Int): List[(Cookie, Price, Quantity)] = {
    val troop = getTroopFromTroopN(troopN)

    if(troop == null) {
      List()
    } else {
      val tCs = troopCookies.filter(tc => (tc._1 == troop.n))
      val cookieList = for(tc <- tCs) yield {
        (cookies(tc._2), tc._4, tc._3)
      }
      cookieList
    }
  }
  def getTroopInformation(troopN: Int, password: String): Troop = {
    val validTroops = troops.filter(tup => (tup._2.n == troopN) && (tup._2.password == password)).map(tup => tup._2).toList
    
    if(validTroops.length < 1) {
      null
    } else {
      validTroops(0)
    }
  }
  def addCookies(troopN: Int, cookieId: Int, q: Quantity): Unit = {
    val troopId = getTroopIdFromTroopN(troopN)
    val currentTC = troopCookies.filter(tc => {
      tc._1 == troopId && tc._2 == cookieId
    })

    _troopCookies = troopCookies.patch(
      troopCookies.indexOf(currentTC(0)),
      List((troopId, cookieId, currentTC(0)._3 + q, currentTC(0)._4)),
      1)
  }
  def newCookie(troopN: Int, c: Cookie, q: Quantity, p: Price): Unit = {
    val troopId = getTroopIdFromTroopN(troopN)
    val cId: CookieId = cookies.toList.length-1
    _cookies = cookies + (cId -> c)

    _troopCookies = (troopId, cId, q, p) :: troopCookies
  }
  def getCookieInfo(cookieId: Int): Cookie = {
    cookies(cookieId)
  }
}
