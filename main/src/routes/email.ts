import express from "express";
import stores from "../data/stores";
import emailController from "../controllers/emailController";

const router = express.Router();

for (let i in stores) {
  for (let j in stores[i].templates) {
    for (let k in stores[i].templates[j]) {
      router
        .post(`/${j}/${k}`, emailController.create)
        .post(`/${j}/${k}/send-mail`, emailController.send)
        .put(`/${j}/${k}`, emailController.update)
        .delete(`/${j}/${k}`, emailController.delete);
    }
  }
}

export default router;
