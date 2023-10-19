import { routerType } from "../utilities";
import Home from "./home";
import Wallet from "./wallet";

const pagesData: routerType[] = [{ path: "/", element: <Home />, title: "" },{ path: "/wallet", element: <Wallet />, title: "" }];

export default pagesData;