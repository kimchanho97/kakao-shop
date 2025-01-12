import React from "react";
import Container from "../atoms/Container";
import Button from "../atoms/Button";
import Logo from "../atoms/Logo";
import logoKakao from "../../../assets/icons/logoKakao.png";
import { LogOut } from "../../../store/slices/userSlice";
import cartIcon from "../../../assets/icons/cart.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const staticServerUrl = process.env.REACT_APP_PATH || "";

export default function AuthNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.login.isLogged);
  const cartCount = useSelector((state) => state.cart.cartCount);
  const handleLoginStatus = () => {
    if (isLogged) {
      dispatch(LogOut());
    } else {
      navigate(staticServerUrl + "/login");
    }
  };

  return (
    <Container className=" fixed top-0 z-10 box-border flex h-12 w-full min-w-[1280px] items-center justify-between border-0 border-b border-solid border-zinc-300 bg-white px-10">
      <Link to={staticServerUrl + "/"}>
        <Logo src={logoKakao} alt="KakaoLogo" className="w-24" />
      </Link>
      <Container className="flex items-center">
        <Link to={staticServerUrl + "/carts"}>
          <div className=" relative ">
            <Logo src={cartIcon} alt="cartIcon" className="mr-4 w-9" />
            {/* 로그인 중 && 장바구니에 물건이 있을 때 */}
            {isLogged && cartCount > 0 && (
              <div className="absolute right-4 top-0 w-4 rounded-full bg-red-500 text-center text-xs font-bold text-white">
                {cartCount}
              </div>
            )}
          </div>
        </Link>
        <Button
          onClick={handleLoginStatus}
          className=" w-20 cursor-pointer border-0 border-l-[1px] bg-white"
        >
          {isLogged ? "로그아웃" : "로그인"}
        </Button>
      </Container>
    </Container>
  );
}
