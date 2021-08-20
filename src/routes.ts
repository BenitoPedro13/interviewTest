import {UserController} from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/read",
    controller: UserController,
    action: "getAll"
},{
    method: "get",
    route: "/read/:id",
    controller: UserController,
    action: "getOne"
},
{
    method: "put",
    route: "/update/:id",
    controller: UserController,
    action: "update"
}, {
    method: "post",
    route: "/create",
    controller: UserController,
    action: "create"
}, {
    method: "delete",
    route: "/delete/:id",
    controller: UserController,
    action: "delete"
}];