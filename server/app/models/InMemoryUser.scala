package models

import shared.SharedMessages.Address
import shared.SharedMessages.Transaction
import shared.SharedMessages.User
class InMemoryUser extends UserModel {
  type UserId = Int
  type TransactionId = Int

  private var _users: Map[UserId, User] = Map[UserId, User]()
  private var _transactions: Map[TransactionId, Transaction] = Map[TransactionId, Transaction]()

  private def users = _users
  private def transactions = _transactions

  private def userFromUsername(u: Username): User = {
    val filteredUsers = users.filter(tup => tup._2.username == u).map(tup => tup._2)
    if(filteredUsers.isEmpty) {
      null
    } else {
      filteredUsers.head
    }
  }

  def newUser(u: User): Unit = {
    val newUserId: UserId = users.toList.length - 1
    _users = users + (newUserId -> u)
  }
  def logIn(u: Username, p: Password): Boolean = {
    val user = userFromUsername(u)
    ((user != null) && (user.password == p))
  }
  def getUserInfo(u: Username): User = {
    userFromUsername(u)
  }
  def newTransaction(t: Transaction): Unit = {
    val newTransactionId = transactions.toList.length - 1
    _transactions = transactions + (newTransactionId -> t)
  }
  def myTransactions(u: Username): List[Transaction] = {
    val uTs = transactions.filter(tup => tup._2.customer == u).map(tup => tup._2).toList
    uTs
  }
}