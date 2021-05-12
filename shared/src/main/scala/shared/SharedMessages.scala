package shared

import java.sql.Date

object SharedMessages {
  def itWorks = "It works!"

  case class Address(street: String, city: String, state: String, country: String, zip: Int, apartment: Option[Int])
  case class Cookie(name: String, description: String, img_index: Int)
  case class Troop(n: Int, address: Address, password: String, next_restock: Date, email: String)
  case class User(username: String, password: String, email: String, full_name: String, troop_to_buy_from: Int)
  case class Transaction(customer: Int, seller: Int, deliveryMethod: String, deliveryInstructions: String, address: Address, date_ordered: Date)
  case class Stock(cookie:String,num:Int)
  case class TroopData(username:Int,address: Array[String],password:String,date:String,email:String)
  case class Troop2(username:Int,password:String)
}
