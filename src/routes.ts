import { MainController } from "./controller/MainController"

export const Routes = [{
    method: "get",
    route: "/articles",
    controller: MainController,
    action: "articleAll"
}, {
    method: "get",
    route: "/articles/:id",
    controller: MainController,
    action: "articleOne"
}, {
    method: "post",
    route: "/articles",
    controller: MainController,
    action: "articleSave"
}, {
    method: "delete",
    route: "/articles/:id",
    controller: MainController,
    action: "articleRemove"
}, {
    method: "patch",
    route: "/articles/:id",
    controller: MainController,
    action: "articleUpdate"
}, {
    method: "get",
    route: "/food-advice",
    controller: MainController,
    action: "foodAdviceAll"
}, {
    method: "get",
    route: "/food-advice/:id",
    controller: MainController,
    action: "foodAdviceOne"
}, {
    method: "post",
    route: "/food-advice",
    controller: MainController,
    action: "foodAdviceSave"
}, {
    method: "delete",
    route: "/food-advice/:id",
    controller: MainController,
    action: "foodAdviceRemove"
}, {
    method: "patch",
    route: "/food-advice/:id",
    controller: MainController,
    action: "foodAdviceUpdate"
},
{
    method: "get",
    route: "/expert-profile",
    controller: MainController,
    action: "expertsAll"
},
{
    method: "get",
    route: "/expert-profile/byUserId/:id",
    controller: MainController,
    action: "expertsOneByUserId"
},
{
    method: "get",
    route: "/expert-profile/byId/:id",
    controller: MainController,
    action: "expertsOne"
},]