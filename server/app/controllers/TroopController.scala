package controllers

def newTroop = Action {
//NEEDS WORK
  withJsonBody[TroopData] {ud =>
    if(TroopModel.logIn(ud.no, ud.password)){
      Ok(Json.toJson(true))
        .withSession("no" -> ud.no, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
    } else {
      Ok(Json.toJson(false))
    }
  }
}

def validateTroop = Action {
  withJsonBody[TroopData] {ud =>
    if(TroopModel.logIn(ud.no, ud.password)){
      Ok(Json.toJson(true))
        .withSession("no" -> ud.no, "csrfToken" -> play.filters.csrf.CSRF.getToken.map(_.value).getOrElse(""))
    } else {
      Ok(Json.toJson(false))
    }
  }
}
