import User from "../interfaces/user";

function validateUser(user: User) {
  if (!user.username && typeof user.username !== "string") {
    throw new Error("Username is required");
  }
  if (!user.age && typeof user.age !== "number") {
    throw new Error("Age is required");
  }
  if (!user.hobbies && !Array.isArray(user.hobbies)) {
    throw new Error("Hobbies is required");
  }
}

export default validateUser;
