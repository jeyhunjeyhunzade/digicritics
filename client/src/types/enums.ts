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

export enum LikeAction {
  LIKED = "LIKED",
  UNLIKED = "UNLIKED",
}

export enum AuthAction {
  REGISTER_REQUIRED = "REGISTER_REQUIRED",
}

export enum Transformation {
  AUTO_500 = "w_500,f_auto",
  AUTO_W500_QLTY50 = "w_500,f_auto,q_50",
}
