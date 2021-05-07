package models

import shared.SharedMessages.Address
import shared.SharedMessages.Transaction
import shared.SharedMessages.User

trait UserModel {
  type Username = String
  type Password = String

  def newUser(u: User): Unit //Is it okay to do Boolean here or how should I do checking?
  def logIn(u: Username, p: Password): Boolean
  def getUserInfo(u: Username): User
  def newTransaction(t: Transaction): Unit
  def myTransactions(u: Username): List[Transaction]
}

object UserModel {
  def apply(): UserModel = new InMemoryUser
}
