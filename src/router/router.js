import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
// import Header from "@/base/header/header";

Vue.use(Router);
// const router = new Router({
//     routes:[]
// })
let base = `${process.env.BASE_URL}`;

const welcomePage = () => import("@/views/welcomePage");
// const helloWorld = () => import("@/components/HelloWorld");
// const FeatureTrait = () => import('@/components/welcome/FeatureTrait')
const Login = () => import("@/views/Login");
const LoginChild = () => import("@/components/login/LoginChild");
const RegisterChild = () => import("@/components/login/RegisterChild");
const DataImport = () => import("@/views/DataImport");
const router = new Router({
  mode: "history",
  base: base,
  routes: [
    {
      path: "/",
      name: "welcomePage",
      component: welcomePage
      // meta: {
      //   requireAuth: true
      // }
    },
    // {
    //   path: "/s",
    //   name: "helloWorld",
    //   component: helloWorld
    // },
    {
      path: "/login",
      name: "login",
      component: Login,
      children: [
        {
          path: "/",
          component: LoginChild
        },
        {
          path: "/register",
          component: RegisterChild
        }
      ]
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "data-import",
          name: "data-import",
          component: DataImport,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
});

export default router;
