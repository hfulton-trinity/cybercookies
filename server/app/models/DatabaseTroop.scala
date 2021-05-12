package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.ExecutionContext
import models.Tables._
import shared.SharedMessages
import scala.concurrent.Future
import views.html.troop

class DatabaseTroop(db: Database)(implicit ec: ExecutionContext) {
  type Quantity = Int
  type Price = Double

  def newCookieNoTroop(c: SharedMessages.Cookie): Unit = {
    db.run(Cookie += CookieRow(-1, c.name, c.description, c.img_index))
  }

  def newTroop(t: SharedMessages.Troop): Future[Int] = {
    val addyTroopRow =
      db.run(
        (for {
          troopRow <- Troop if troopRow.number === t.n && troopRow.password === t.password
          address <- Address if address.id === troopRow.addressId.getOrElse(-1)
        } yield {
          (address, troopRow)
        }).result
      )
    
    addyTroopRow.flatMap{ tRow => 
      if(tRow.isEmpty) {
        val addy = t.address

        db.run(Address += AddressRow(-1, addy.street, addy.city, addy.state, addy.country, addy.zip, addy.apartment))
        val troopRowFut = db.run(
          (for {
            address <- Address if address.streetAddress === addy.street
          } yield {
            address.id
          }).result)

        val i = troopRowFut.flatMap(seq => db.run(Troop += TroopRow(-1, t.n, Some(seq.head), t.password, t.next_restock, t.email)))
        i.map{s => println(s); s}
      } else {
        Future(0)
      }
    }
  }

  def getAvailableCookies(troopN: Int): Future[Seq[(SharedMessages.Cookie, Price, Quantity)]] = {
    val cookiesFuture = db.run(
      (for {
        troop <- Troop if troop.number === troopN
        troopCookie <- TroopCookies if troopCookie.troopId === troop.id
        cookie <- Cookie if cookie.id === troopCookie.cookieId
      } yield {
        (cookie, troopCookie)
      }).result
    )

    cookiesFuture.map(_.map(tup => (SharedMessages.Cookie(tup._1.name, tup._1.description, tup._1.imageindex), tup._2.price, tup._2.quantity)))
  }

  def logIn(troopN: Int, password: String): Future[Int] = {
    println(troopN,password)
    val addyTroopRow =
      db.run(
        (for {
          troopRow <- Troop if troopRow.number === troopN && troopRow.password === password
          address <- Address if address.id === troopRow.addressId.getOrElse(-1)
        } yield {
          (address, troopRow)
        }).result
      )
    addyTroopRow.map{out=>println(out);out.length}
  }

  def getTroopInformation(troopN: Int, password: String): Future[SharedMessages.Troop] = {
    val addyTroopRow =
      db.run(
        (for {
          troopRow <- Troop if troopRow.number === troopN && troopRow.password === password
          address <- Address if address.id === troopRow.addressId.getOrElse(-1)
        } yield {
          (address, troopRow)
        }).result
      )
    
    addyTroopRow.map(_.map(tup => 
      (SharedMessages.Troop(tup._2.number, 
        SharedMessages.Address(tup._1.streetAddress, tup._1.city, tup._1.state, tup._1.country, tup._1.zip, tup._1.apartmentNumber), 
        tup._2.password, tup._2.nextRestock, tup._2.email))).head)
  }

  def getTroopInformationNoPassword(troopN: Int): Future[SharedMessages.Troop] = {
    val addyTroopRow =
      db.run(
        (for {
          troopRow <- Troop if troopRow.number === troopN
          address <- Address if address.id === troopRow.addressId.getOrElse(-1)
        } yield {
          (address, troopRow)
        }).result
      )
    
    addyTroopRow.map(_.map(tup => 
      (SharedMessages.Troop(tup._2.number, 
        SharedMessages.Address(tup._1.streetAddress, tup._1.city, tup._1.state, tup._1.country, tup._1.zip, tup._1.apartmentNumber), 
        tup._2.password, tup._2.nextRestock, tup._2.email))).head)
  }


  def addCookies(troopN: Int, cookieId: Int, q: Quantity): Future[Int] = {
    val cookies = db.run(Cookie.filter(c => c.id === cookieId).result)
    cookies.flatMap(c => db.run(Cookie += CookieRow(-1, c.head.name, c.head.description, c.head.imageindex)))

    val tIDtcID = db.run(
      (for{
        troop <- Troop if troop.number === troopN
        troopCookie <- TroopCookies if troopCookie.cookieId === cookieId && troopCookie.troopId == troop.id
      } yield {
        (troop.id, troopCookie.price)
      }).result
    )

    tIDtcID.flatMap(tup => db.run(TroopCookies += TroopCookiesRow(-1, Some(tup.head._1), Some(cookieId), q, tup.head._2)))
  }

  def newCookie(troopN: Int, c: SharedMessages.Cookie, q: Quantity, p: Price): Future[Int] = {
    db.run(Cookie += CookieRow(-1, c.name, c.description, c.img_index))

    val tIDcID = db.run(
      (for{
        troop <- Troop if troop.number === troopN
        cookie <- Cookie if cookie.name === c.name
      } yield {
        (troop.id, cookie.id)
      }).result
    )
    
    tIDcID.flatMap(tup => db.run(TroopCookies += TroopCookiesRow(-1, Some(tup.head._1), Some(tup.head._2), q, p)))
  }

  def getCookieInfo(cookieId: Int): Future[SharedMessages.Cookie] = {
    val c = db.run(
      (for {
      cookie <- Cookie if cookie.id === cookieId
      } yield {
        cookie
      }).result
    )

    c.map(c => SharedMessages.Cookie(c.head.name, c.head.description, c.head.imageindex))
  }

  def getAllTroops: Future[Seq[SharedMessages.Troop]] = {
    val allTroops =
      db.run(
        (for {
          troopRow <- Troop
          address <- Address if address.id === troopRow.addressId.getOrElse(-1)
        } yield {
          (address, troopRow)
        }).result
      )
    
    allTroops.map(_.map(tup => 
      (SharedMessages.Troop(tup._2.number, 
        SharedMessages.Address(tup._1.streetAddress, tup._1.city, tup._1.state, tup._1.country, tup._1.zip, tup._1.apartmentNumber), 
        tup._2.password, tup._2.nextRestock, tup._2.email))))
  }

  def getAllCookies: Future[Seq[SharedMessages.Cookie]] = {
    val cookies = db.run(Cookie.map(cookieRow => cookieRow).result)
    cookies.map(cookieRow => cookieRow.map(cR => SharedMessages.Cookie(cR.name, cR.description, cR.imageindex)))
  }

  def outOfStock: Future[Seq[SharedMessages.Cookie]] = {
    val allTroops =
      db.run(
        (for {
          troopCookie <- TroopCookies if troopCookie.quantity === 0
          cookie <- Cookie if troopCookie.cookieId.getOrElse(-1) === cookie.id
        } yield {
          cookie
        }).result
      )
      
    allTroops.map{seq => println(seq); seq.map(cR => SharedMessages.Cookie(cR.name, cR.description, cR.imageindex))}
  }

  def getCookieId(n: String): Future[Int] = {
    val cID = db.run(
      (for{ 
        c <- Cookie if c.name === n
      } yield {
        c.id
      }).result
    )

    cID.map{ seq =>
      if(seq.nonEmpty) {
        seq.head
      } else {
        -1
      }
    }
  }
}
