package shared

import java.sql.Date

object SharedMessages {
  def itWorks = "It works!"

  case class Address(street: String, city: String, state: String, country: String, zip: Int, apartment: Option[Int])
  case class Cookie(name: String, description: String)
  case class Troop(n: Int, address: Address, password: String, next_restock: Date, email: String)
  case class User(username: String, password: String, email: String, full_name: String, troop_to_buy_from: Int)
  case class Transaction(customer: Int, seller: Int, deliveryMethod: String, deliveryInstructions: String, address: Address, date_ordered: Date)
}
