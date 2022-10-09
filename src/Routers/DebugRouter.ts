import { Router } from "express"
import { ExpressApp } from "../Components/express"
import { getEndPoints } from "../Utils/getEndpoints"

//the debug router
export const DebugRouter = Router()

//the debug methods here
DebugRouter.get("/routes", (req, res) => {
  //send all endpoints
  return res.json(getEndPoints(ExpressApp))
})
