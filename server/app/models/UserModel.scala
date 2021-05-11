package models

import shared.SharedMessages.Address
import shared.SharedMessages.Transaction
import shared.SharedMessages.User
import shared.SharedMessages.Cookie

trait UserModel {
  type Username = String
  type Password = String

  def newUser(u: User): Boolean //Is it okay to do Boolean here or how should I do checking?
  def logIn(u: Username, p: Password): Boolean
  def getUserInfo(u: Username): User
  def newTransaction(t: Transaction, l: List[(Cookie, Int, Double)]): Unit
  def myTransactions(u: Username): List[Transaction]
  def getOrders(tn: Int): List[Transaction]
  def totalSold: List[(Cookie, Int, Double)]
}

object UserModel {
  def apply(): UserModel = new InMemoryUser
}
