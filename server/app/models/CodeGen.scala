package models

object CodeGen extends App {
  slick.codegen.SourceCodeGenerator.run(
    "slick.jdbc.PostgresProfile", 
    "org.postgresql.Driver",
    "jdbc:postgresql://localhost/cybercookies?user=khardee&password=password",
    "D:\\cybercookies\\server\\app", 
    "models", None, None, true, false
  )
}