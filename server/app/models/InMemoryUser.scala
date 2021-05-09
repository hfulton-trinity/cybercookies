package models

import shared.SharedMessages.Address
import shared.SharedMessages.Transaction
import shared.SharedMessages.User
import shared.SharedMessages.Cookie

class InMemoryUser extends UserModel {
  type UserId = Int
  type TransactionId = Int
  type Quantity = Int
  type Price = Double

  private var _users: Map[UserId, User] = Map((0, User("mlewis", "password", "mlewis@trinity.edu", "Mark C. Lewis", 123)))
  private var _transactions: Map[TransactionId, Transaction] = 
    Map((0, Transaction("mlewis", 123, "mail", "mail it dummy", 
    Address("1 Trinity Pl", "San Antonio", "TX", "USA", 78212, 1), 
    new java.util.Date())))
  private var _transactionCookies: List[(TransactionId, Cookie, Quantity, Price)] = List((0, Cookie("Thin Mint", "Its a thin mint"), 4, 10.99))

  private def users = _users
  private def transactions = _transactions
  private def transactionCookies = _transactionCookies

  private def userFromUsername(u: Username): User = {
    val filteredUsers = users.filter(tup => tup._2.username == u).map(tup => tup._2)
    if(filteredUsers.isEmpty) {
      null
    } else {
      filteredUsers.head
    }
  }

  def getOrders(tn: Int): List[Transaction] = {
    transactions.filter(tup => (tup._2.seller == tn)).map(tup => tup._2).toList
  }

  def totalSold: List[(Cookie, Quantity, Price)] = {
    transactionCookies.map(tup => (tup._2, tup._3, tup._4)).toList
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

  def newTransaction(t: Transaction, l: List[(Cookie, Quantity, Price)]): Unit = {
    val newTransactionId = transactions.toList.length - 1
    _transactions = transactions + (newTransactionId -> t)
    for(i <- l) {
      _transactionCookies = (newTransactionId, i._1, i._2, i._3) :: transactionCookies
    }
  }

  def myTransactions(u: Username): List[Transaction] = {
    val uTs = transactions.filter(tup => tup._2.customer == u).map(tup => tup._2).toList
    uTs
  }
}