export enum Status {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export enum Languages {
  EN = "en",
  RU = "ru",
}

export enum ProfileTableCategories {
  REVIEWNAME = "",
}

export enum UserStatus {
  USER = "USER",
  ADMIN = "ADMIN",
  BLOCKED = "BLOCKED",
}

export enum AdminTableAction {
  MAKEADMIN = "MAKEADMIN",
  MAKEUSER = "MAKEUSER",
  BLOCK = "BLOCK",
  UNBLOCK = "UNBLOCK",
  DELETE = "DELETE",
}

//TODO: make categories dynamically
export enum Category {
  SPORT = "Sport",
  MOVIE = "Movies",
  GAMING = "Gaming",
  ANIME = "Anime",
  TECH = "Technology",
  CITIES = "Cities",
}

export enum LikeAction {
  LIKED = "LIKED",
  UNLIKED = "UNLIKED",
}

export enum AuthAction {
  REGISTER_REQUIRED = "REGISTER_REQUIRED",
}
