import { MainController } from "./controller/MainController"

export const Routes = [{
    method: "get",
    route: "/api/v1/articles",
    controller: MainController,
    action: "articleAll"
}, {
    method: "get",
    route: "/api/v1/articles/:id",
    controller: MainController,
    action: "articleOne"
}, {
    method: "post",
    route: "/api/v1/articles",
    controller: MainController,
    action: "articleSave"
}, {
    method: "delete",
    route: "/api/v1/articles/:id",
    controller: MainController,
    action: "articleRemove"
}, {
    method: "patch",
    route: "/api/v1/articles/:id",
    controller: MainController,
    action: "articleUpdate"
}, {
    method: "get",
    route: "/api/v1/food-advice",
    controller: MainController,
    action: "foodAdviceAll"
}, {
    method: "get",
    route: "/api/v1/food-advice/:id",
    controller: MainController,
    action: "foodAdviceOne"
}, {
    method: "post",
    route: "/api/v1/food-advice",
    controller: MainController,
    action: "foodAdviceSave"
}, {
    method: "delete",
    route: "/api/v1/food-advice/:id",
    controller: MainController,
    action: "foodAdviceRemove"
}, {
    method: "patch",
    route: "/api/v1/food-advice/:id",
    controller: MainController,
    action: "foodAdviceUpdate"
},
{
    method: "get",
    route: "/api/v1/expert-profile",
    controller: MainController,
    action: "expertsAll"
},
{
    method: "get",
    route: "/api/v1/expert-profile/byUserId/:id",
    controller: MainController,
    action: "expertsOneByUserId"
},
{
    method: "get",
    route: "/api/v1/expert-profile/byId/:id",
    controller: MainController,
    action: "expertsOne"
},]