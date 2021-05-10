package models
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.jdbc.PostgresProfile
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(Address.schema, Cookie.schema, Transaction.schema, TransactionCookie.schema, Troop.schema, TroopCookies.schema, Users.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Address
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param streetAddress Database column street_address SqlType(varchar), Length(50,true)
   *  @param city Database column city SqlType(varchar), Length(40,true)
   *  @param state Database column state SqlType(varchar), Length(40,true)
   *  @param country Database column country SqlType(varchar), Length(40,true)
   *  @param zip Database column zip SqlType(int4)
   *  @param apartmentNumber Database column apartment_number SqlType(int4), Default(None) */
  case class AddressRow(id: Int, streetAddress: String, city: String, state: String, country: String, zip: Int, apartmentNumber: Option[Int] = None)
  /** GetResult implicit for fetching AddressRow objects using plain SQL queries */
  implicit def GetResultAddressRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]]): GR[AddressRow] = GR{
    prs => import prs._
    AddressRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<[Int], <<?[Int]))
  }
  /** Table description of table address. Objects of this class serve as prototypes for rows in queries. */
  class Address(_tableTag: Tag) extends profile.api.Table[AddressRow](_tableTag, "address") {
    def * = (id, streetAddress, city, state, country, zip, apartmentNumber) <> (AddressRow.tupled, AddressRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(streetAddress), Rep.Some(city), Rep.Some(state), Rep.Some(country), Rep.Some(zip), apartmentNumber)).shaped.<>({r=>import r._; _1.map(_=> AddressRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6.get, _7)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column street_address SqlType(varchar), Length(50,true) */
    val streetAddress: Rep[String] = column[String]("street_address", O.Length(50,varying=true))
    /** Database column city SqlType(varchar), Length(40,true) */
    val city: Rep[String] = column[String]("city", O.Length(40,varying=true))
    /** Database column state SqlType(varchar), Length(40,true) */
    val state: Rep[String] = column[String]("state", O.Length(40,varying=true))
    /** Database column country SqlType(varchar), Length(40,true) */
    val country: Rep[String] = column[String]("country", O.Length(40,varying=true))
    /** Database column zip SqlType(int4) */
    val zip: Rep[Int] = column[Int]("zip")
    /** Database column apartment_number SqlType(int4), Default(None) */
    val apartmentNumber: Rep[Option[Int]] = column[Option[Int]]("apartment_number", O.Default(None))
  }
  /** Collection-like TableQuery object for table Address */
  lazy val Address = new TableQuery(tag => new Address(tag))

  /** Entity class storing rows of table Cookie
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(40,true)
   *  @param description Database column description SqlType(varchar), Length(1000,true) */
  case class CookieRow(id: Int, name: String, description: String)
  /** GetResult implicit for fetching CookieRow objects using plain SQL queries */
  implicit def GetResultCookieRow(implicit e0: GR[Int], e1: GR[String]): GR[CookieRow] = GR{
    prs => import prs._
    CookieRow.tupled((<<[Int], <<[String], <<[String]))
  }
  /** Table description of table cookie. Objects of this class serve as prototypes for rows in queries. */
  class Cookie(_tableTag: Tag) extends profile.api.Table[CookieRow](_tableTag, "cookie") {
    def * = (id, name, description) <> (CookieRow.tupled, CookieRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(name), Rep.Some(description))).shaped.<>({r=>import r._; _1.map(_=> CookieRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(40,true) */
    val name: Rep[String] = column[String]("name", O.Length(40,varying=true))
    /** Database column description SqlType(varchar), Length(1000,true) */
    val description: Rep[String] = column[String]("description", O.Length(1000,varying=true))
  }
  /** Collection-like TableQuery object for table Cookie */
  lazy val Cookie = new TableQuery(tag => new Cookie(tag))

  /** Entity class storing rows of table Transaction
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param customerId Database column customer_id SqlType(int4), Default(None)
   *  @param sellerId Database column seller_id SqlType(int4), Default(None)
   *  @param deliveryMethod Database column delivery_method SqlType(varchar), Length(40,true)
   *  @param deliveryInstructions Database column delivery_instructions SqlType(varchar), Length(100,true), Default(None)
   *  @param addressId Database column address_id SqlType(int4), Default(None)
   *  @param dateOrdered Database column date_ordered SqlType(date) */
  case class TransactionRow(id: Int, customerId: Option[Int] = None, sellerId: Option[Int] = None, deliveryMethod: String, deliveryInstructions: Option[String] = None, addressId: Option[Int] = None, dateOrdered: java.sql.Date)
  /** GetResult implicit for fetching TransactionRow objects using plain SQL queries */
  implicit def GetResultTransactionRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[String], e3: GR[Option[String]], e4: GR[java.sql.Date]): GR[TransactionRow] = GR{
    prs => import prs._
    TransactionRow.tupled((<<[Int], <<?[Int], <<?[Int], <<[String], <<?[String], <<?[Int], <<[java.sql.Date]))
  }
  /** Table description of table transaction. Objects of this class serve as prototypes for rows in queries. */
  class Transaction(_tableTag: Tag) extends profile.api.Table[TransactionRow](_tableTag, "transaction") {
    def * = (id, customerId, sellerId, deliveryMethod, deliveryInstructions, addressId, dateOrdered) <> (TransactionRow.tupled, TransactionRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), customerId, sellerId, Rep.Some(deliveryMethod), deliveryInstructions, addressId, Rep.Some(dateOrdered))).shaped.<>({r=>import r._; _1.map(_=> TransactionRow.tupled((_1.get, _2, _3, _4.get, _5, _6, _7.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column customer_id SqlType(int4), Default(None) */
    val customerId: Rep[Option[Int]] = column[Option[Int]]("customer_id", O.Default(None))
    /** Database column seller_id SqlType(int4), Default(None) */
    val sellerId: Rep[Option[Int]] = column[Option[Int]]("seller_id", O.Default(None))
    /** Database column delivery_method SqlType(varchar), Length(40,true) */
    val deliveryMethod: Rep[String] = column[String]("delivery_method", O.Length(40,varying=true))
    /** Database column delivery_instructions SqlType(varchar), Length(100,true), Default(None) */
    val deliveryInstructions: Rep[Option[String]] = column[Option[String]]("delivery_instructions", O.Length(100,varying=true), O.Default(None))
    /** Database column address_id SqlType(int4), Default(None) */
    val addressId: Rep[Option[Int]] = column[Option[Int]]("address_id", O.Default(None))
    /** Database column date_ordered SqlType(date) */
    val dateOrdered: Rep[java.sql.Date] = column[java.sql.Date]("date_ordered")

    /** Foreign key referencing Address (database name transaction_address_id_fkey) */
    lazy val addressFk = foreignKey("transaction_address_id_fkey", addressId, Address)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Troop (database name transaction_seller_id_fkey) */
    lazy val troopFk = foreignKey("transaction_seller_id_fkey", sellerId, Troop)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Users (database name transaction_customer_id_fkey) */
    lazy val usersFk = foreignKey("transaction_customer_id_fkey", customerId, Users)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Transaction */
  lazy val Transaction = new TableQuery(tag => new Transaction(tag))

  /** Entity class storing rows of table TransactionCookie
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param transactionId Database column transaction_id SqlType(int4), Default(None)
   *  @param cookieId Database column cookie_id SqlType(int4), Default(None)
   *  @param quantity Database column quantity SqlType(int4)
   *  @param price Database column price SqlType(float8) */
  case class TransactionCookieRow(id: Int, transactionId: Option[Int] = None, cookieId: Option[Int] = None, quantity: Int, price: Double)
  /** GetResult implicit for fetching TransactionCookieRow objects using plain SQL queries */
  implicit def GetResultTransactionCookieRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Double]): GR[TransactionCookieRow] = GR{
    prs => import prs._
    TransactionCookieRow.tupled((<<[Int], <<?[Int], <<?[Int], <<[Int], <<[Double]))
  }
  /** Table description of table transaction_cookie. Objects of this class serve as prototypes for rows in queries. */
  class TransactionCookie(_tableTag: Tag) extends profile.api.Table[TransactionCookieRow](_tableTag, "transaction_cookie") {
    def * = (id, transactionId, cookieId, quantity, price) <> (TransactionCookieRow.tupled, TransactionCookieRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), transactionId, cookieId, Rep.Some(quantity), Rep.Some(price))).shaped.<>({r=>import r._; _1.map(_=> TransactionCookieRow.tupled((_1.get, _2, _3, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column transaction_id SqlType(int4), Default(None) */
    val transactionId: Rep[Option[Int]] = column[Option[Int]]("transaction_id", O.Default(None))
    /** Database column cookie_id SqlType(int4), Default(None) */
    val cookieId: Rep[Option[Int]] = column[Option[Int]]("cookie_id", O.Default(None))
    /** Database column quantity SqlType(int4) */
    val quantity: Rep[Int] = column[Int]("quantity")
    /** Database column price SqlType(float8) */
    val price: Rep[Double] = column[Double]("price")

    /** Foreign key referencing Cookie (database name transaction_cookie_cookie_id_fkey) */
    lazy val cookieFk = foreignKey("transaction_cookie_cookie_id_fkey", cookieId, Cookie)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Transaction (database name transaction_cookie_transaction_id_fkey) */
    lazy val transactionFk = foreignKey("transaction_cookie_transaction_id_fkey", transactionId, Transaction)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table TransactionCookie */
  lazy val TransactionCookie = new TableQuery(tag => new TransactionCookie(tag))

  /** Entity class storing rows of table Troop
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param number Database column number SqlType(int4)
   *  @param addressId Database column address_id SqlType(int4), Default(None)
   *  @param password Database column password SqlType(varchar), Length(20,true)
   *  @param nextRestock Database column next_restock SqlType(date)
   *  @param email Database column email SqlType(varchar), Length(40,true) */
  case class TroopRow(id: Int, number: Int, addressId: Option[Int] = None, password: String, nextRestock: java.sql.Date, email: String)
  /** GetResult implicit for fetching TroopRow objects using plain SQL queries */
  implicit def GetResultTroopRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[String], e3: GR[java.sql.Date]): GR[TroopRow] = GR{
    prs => import prs._
    TroopRow.tupled((<<[Int], <<[Int], <<?[Int], <<[String], <<[java.sql.Date], <<[String]))
  }
  /** Table description of table troop. Objects of this class serve as prototypes for rows in queries. */
  class Troop(_tableTag: Tag) extends profile.api.Table[TroopRow](_tableTag, "troop") {
    def * = (id, number, addressId, password, nextRestock, email) <> (TroopRow.tupled, TroopRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(number), addressId, Rep.Some(password), Rep.Some(nextRestock), Rep.Some(email))).shaped.<>({r=>import r._; _1.map(_=> TroopRow.tupled((_1.get, _2.get, _3, _4.get, _5.get, _6.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column number SqlType(int4) */
    val number: Rep[Int] = column[Int]("number")
    /** Database column address_id SqlType(int4), Default(None) */
    val addressId: Rep[Option[Int]] = column[Option[Int]]("address_id", O.Default(None))
    /** Database column password SqlType(varchar), Length(20,true) */
    val password: Rep[String] = column[String]("password", O.Length(20,varying=true))
    /** Database column next_restock SqlType(date) */
    val nextRestock: Rep[java.sql.Date] = column[java.sql.Date]("next_restock")
    /** Database column email SqlType(varchar), Length(40,true) */
    val email: Rep[String] = column[String]("email", O.Length(40,varying=true))

    /** Foreign key referencing Address (database name troop_address_id_fkey) */
    lazy val addressFk = foreignKey("troop_address_id_fkey", addressId, Address)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table Troop */
  lazy val Troop = new TableQuery(tag => new Troop(tag))

  /** Entity class storing rows of table TroopCookies
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param troopId Database column troop_id SqlType(int4), Default(None)
   *  @param cookieId Database column cookie_id SqlType(int4), Default(None)
   *  @param quantity Database column quantity SqlType(int4)
   *  @param price Database column price SqlType(float8) */
  case class TroopCookiesRow(id: Int, troopId: Option[Int] = None, cookieId: Option[Int] = None, quantity: Int, price: Double)
  /** GetResult implicit for fetching TroopCookiesRow objects using plain SQL queries */
  implicit def GetResultTroopCookiesRow(implicit e0: GR[Int], e1: GR[Option[Int]], e2: GR[Double]): GR[TroopCookiesRow] = GR{
    prs => import prs._
    TroopCookiesRow.tupled((<<[Int], <<?[Int], <<?[Int], <<[Int], <<[Double]))
  }
  /** Table description of table troop_cookies. Objects of this class serve as prototypes for rows in queries. */
  class TroopCookies(_tableTag: Tag) extends profile.api.Table[TroopCookiesRow](_tableTag, "troop_cookies") {
    def * = (id, troopId, cookieId, quantity, price) <> (TroopCookiesRow.tupled, TroopCookiesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), troopId, cookieId, Rep.Some(quantity), Rep.Some(price))).shaped.<>({r=>import r._; _1.map(_=> TroopCookiesRow.tupled((_1.get, _2, _3, _4.get, _5.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column troop_id SqlType(int4), Default(None) */
    val troopId: Rep[Option[Int]] = column[Option[Int]]("troop_id", O.Default(None))
    /** Database column cookie_id SqlType(int4), Default(None) */
    val cookieId: Rep[Option[Int]] = column[Option[Int]]("cookie_id", O.Default(None))
    /** Database column quantity SqlType(int4) */
    val quantity: Rep[Int] = column[Int]("quantity")
    /** Database column price SqlType(float8) */
    val price: Rep[Double] = column[Double]("price")

    /** Foreign key referencing Cookie (database name troop_cookies_cookie_id_fkey) */
    lazy val cookieFk = foreignKey("troop_cookies_cookie_id_fkey", cookieId, Cookie)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
    /** Foreign key referencing Troop (database name troop_cookies_troop_id_fkey) */
    lazy val troopFk = foreignKey("troop_cookies_troop_id_fkey", troopId, Troop)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.Cascade)
  }
  /** Collection-like TableQuery object for table TroopCookies */
  lazy val TroopCookies = new TableQuery(tag => new TroopCookies(tag))

  /** Entity class storing rows of table Users
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param username Database column username SqlType(varchar), Length(20,true)
   *  @param password Database column password SqlType(varchar), Length(20,true)
   *  @param email Database column email SqlType(varchar), Length(40,true)
   *  @param fullName Database column full_name SqlType(varchar), Length(40,true)
   *  @param troopToBuyFrom Database column troop_to_buy_from SqlType(int4), Default(None) */
  case class UsersRow(id: Int, username: String, password: String, email: String, fullName: String, troopToBuyFrom: Option[Int] = None)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[Int], <<[String], <<[String], <<[String], <<[String], <<?[Int]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = (id, username, password, email, fullName, troopToBuyFrom) <> (UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(username), Rep.Some(password), Rep.Some(email), Rep.Some(fullName), troopToBuyFrom)).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3.get, _4.get, _5.get, _6)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column username SqlType(varchar), Length(20,true) */
    val username: Rep[String] = column[String]("username", O.Length(20,varying=true))
    /** Database column password SqlType(varchar), Length(20,true) */
    val password: Rep[String] = column[String]("password", O.Length(20,varying=true))
    /** Database column email SqlType(varchar), Length(40,true) */
    val email: Rep[String] = column[String]("email", O.Length(40,varying=true))
    /** Database column full_name SqlType(varchar), Length(40,true) */
    val fullName: Rep[String] = column[String]("full_name", O.Length(40,varying=true))
    /** Database column troop_to_buy_from SqlType(int4), Default(None) */
    val troopToBuyFrom: Rep[Option[Int]] = column[Option[Int]]("troop_to_buy_from", O.Default(None))
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))
}
