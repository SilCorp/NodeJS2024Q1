import http from "node:http";
import HTTP_METHOD from "../constants/http-methods";
import DB, { NotFoundError } from "../database/database";
import parseRequestBody from "../helpers/parseRequestBody";
import User from "../interfaces/user";
import { validate as uuidValidate } from "uuid";
import validateUser from "../helpers/validateUser";

export async function usersHandler(
  req: http.IncomingMessage,
  res: http.ServerResponse,
) {
  const [userId, ...rest] = req.url.split("/").slice(3);

  // Check for correct path
  if (rest.length > 0 || rest.join("").length > 0) {
    res.statusCode = 404;
    res.end("The end point doesn't exist");
    return;
  }

  if (userId) {
    const isValidUserId = uuidValidate(userId);
    if (!isValidUserId) {
      res.statusCode = 400;
      res.end("Provided user id is not valid");
      return;
    }

    switch (req.method) {
      case HTTP_METHOD.GET: {
        try {
          const users = await DB.getById(userId);
          res.statusCode = 200;
          res.end(JSON.stringify(users));
        } catch (e) {
          if (e instanceof NotFoundError) {
            res.statusCode = 404;
            res.end("User not found");
          }
        }
        break;
      }
      case HTTP_METHOD.PUT: {
        try {
          const user = (await parseRequestBody(req)) as User;
          const updatedUser = await DB.update(userId, user);
          res.statusCode = 200;
          res.end(JSON.stringify(updatedUser));
        } catch (e) {
          if (e instanceof NotFoundError) {
            res.statusCode = 404;
            res.end("User not found");
          }
        }
        break;
      }
      case HTTP_METHOD.DELETE: {
        try {
          const deletedUser = await DB.delete(userId);
          res.statusCode = 204;
          res.end(JSON.stringify(deletedUser));
        } catch (e) {
          if (e instanceof NotFoundError) {
            res.statusCode = 404;
            res.end("User not found");
          }
        }
        break;
      }
    }

    return;
  }

  switch (req.method) {
    case HTTP_METHOD.GET: {
      const users = await DB.getAll();
      res.statusCode = 200;
      res.end(JSON.stringify(users));
      break;
    }
    case HTTP_METHOD.POST: {
      try {
        const user = (await parseRequestBody(req)) as User;

        try {
          validateUser(user);
        } catch (e) {
          res.statusCode = 400;
          res.end(e.message);
          return;
        }

        const createdUser = await DB.create(user);
        res.statusCode = 201;
        res.end(JSON.stringify(createdUser));
      } catch (e) {
        if (e instanceof NotFoundError) {
          res.statusCode = 404;
          res.end("User not found");
          return;
        }

        throw e;
      }
      break;
    }
  }
}
