import { getDataListCategory } from "@/api/ApiCategory";
import styleGLobal from "@/app/layout.module.scss";
import Logo from "@/assets/logo.jpg";
import ButtonsCollection from "@/common/ButtonsCollection/ButtonsCollection";
import SidebarMenu from "@/components/ContentMenu/SidebarMenu/SidebarMenu";
import SearchTrends from "@/components/Header/HearderNavbar/SearchTrends/SearchTrends";
import {
  Box,
  Flex,
  Image,
  Input,
  MantineSize,
  Popover,
  Text,
} from "@mantine/core";
import {
  IconCategoryPlus,
  IconDots,
  IconHome,
  IconLoader2,
  IconMenu2,
  IconSearch,
  IconSend2,
  IconShoppingCartFilled,
  IconUserCircle,
  IconX
} from "@tabler/icons-react";
import Image2 from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartHeader from "./CartHeader";
import CategoryHeader from "./CategoryHeader/CategoryHeader";
import style from "./HearderNavbar.module.scss";
import SeeMoreHeader from "./SeeMoreHeader/SeeMoreHeader";

const HearderNavbar = () => {
  const dispatch = useDispatch();

  const [authUser, setAuthUser] = useState<any>(null);
  const cart = useSelector((state: any) => state.cart);;

 
  const outsideClickRef = useRef<HTMLDivElement>(null);
  const outsideMobileRef = useRef<HTMLDivElement>(null);
  const [isfocus, setIsFocus] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [coating, setCoating] = useState(false);
  const [inputSize, setInputSize] = useState<MantineSize | undefined>("xs");
  const [handelActive, setHandeActive] = useState<any>();
  const [handelSeeMore, setHandeSeeMore] = useState<any>();
  const [hiddenSideBar, setHiddenSideBar] = useState(false);

  const [valueActive, setValueActive] = useState<boolean>();
  const [seeMore, setMore] = useState(false);
  const [hiddenDrawerCategory, setHiddenDrawerCategory] = useState(false);
  const [debouncedSearchInput, setDebouncedSearchInput] = useState(searchInput);
  const [openedCart, setOpenedCart] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  
  

  const headerResponsive = [
    {
      id: 1,
      text: "Trang chủ",
      link: "/",
      icon: <IconHome size={24} />,
    },
    {
      id: 2,
      text: "Danh mục",
      link: "",
      icon: <IconCategoryPlus size={24} />,
      onClick: (e: any) => handleBox(e),
    },
   
    {
      id: 5,
      text: "Xem thêm",
      link: "",
      icon: <IconDots size={24} />,
      onClick: (e: any) => seeMoreHeader(e),
    },
  ];

  const handleBox = (e: any) => {
    setHiddenDrawerCategory(!hiddenDrawerCategory);
    if (e) {
      setMore(false);
      setValueActive(!valueActive);
      setHandeActive(e.text);
    }
  };

  const seeMoreHeader = (e: any) => {
    setMore(!seeMore);
    if (e) {
      setHiddenDrawerCategory(false);
      setValueActive(!valueActive);
      setHandeActive(e.text);
    }
  };

  const HandleSidebar = () => {
    setHiddenSideBar(!hiddenSideBar);
  };

  const handleClear = () => {
    setSearchInput("");
    setIsFocus(false);
  };

  const handleInputClick = () => {
    setIsFocus(true);
  };

  const searchInputFunction = () => (
    <>
      <Input
        value={searchInput}
        className={style.input_search}
        onChange={(e) => setSearchInput(e.target.value)}
        radius="md"
        {...(inputSize && { size: inputSize })}
        styles={{
          wrapper: { border: "none" },
          input: { border: "none", paddingRight: "55px" },
        }}
        placeholder="Bạn cần tìm gì ?"
        onClick={handleInputClick}
        onKeyDown={handleKeyDown}
        leftSection={
          isTyping ? (
            <IconLoader2 className={style.rotateLoader} size={20} />
          ) : (
            <IconSearch color="#000" size={16} />
          )
        }
      />
      {searchInput.length > 0 && (
        <Flex className={style.exit_send}>
          <IconSend2 onClick={() => handleSendClick()} size={20} />
          <IconX
            className={style.close}
            onClick={() => handleClear()}
            size={20}
          />
        </Flex>
      )}
      {isfocus && (
        <>
          <Box className={style.searchHidden}>
            {searchInput.length > 0 ? (
              <>
                
              </>
            ) : (
              <>
                <SearchTrends setIsFocus={setIsFocus} />
              </>
            )}
          </Box>
        </>
      )}
    </>
  );

  const headerResFunction = () => (
    <>
      {headerResponsive?.map((value) => {
        const Component = value.link ? Link : Box;

        return (
          <Box
            className={`${style.header_reps_container} ${
              pathname === value.link ||
              (handelActive === value.text && valueActive) ||
              (handelActive === value.text && seeMore === true)
                ? style.active
                : null
            }`}
            key={value.id}
            onClick={(e) => {
              value.onClick?.(value);
            }}
          >
            <Component className={style.content_header} href={value.link}>
              <Box>{value.icon}</Box>
              <Text mt={5} size="xs" fw={700}>
                {value.text}
              </Text>
            </Component>
          </Box>
        );
      })}
    </>
  );

const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    const fetchDataCategory = async () => {
      try {
        const response = await getDataListCategory("/0"); // Call proxy endpoint
        setDataCategory(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchDataCategory();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      if (newWindowWidth <= 801) {
        setInputSize("xs");
      } else {
        setCoating(false);
        setInputSize(undefined);
      }
    };
    const timeoutId = setTimeout(handleResize, 500);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchInput(searchInput);
      setIsTyping(false);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  useEffect(() => {
    if (debouncedSearchInput) {
      console.log(`Searching for: ${debouncedSearchInput}`);
    }
  }, [debouncedSearchInput]);

  useEffect(() => {
    setHiddenDrawerCategory(false);
    setValueActive(false);
    setMore(false);
    setHandeSeeMore(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle(styleGLobal.noScroll, hiddenDrawerCategory);
    document.body.classList.toggle(styleGLobal.noScroll, seeMore);

    return () => document.body.classList.remove(styleGLobal.noScroll);
  }, [hiddenDrawerCategory, seeMore]);

  
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      router.push(`/Search/${e.currentTarget.value}`);
      setSearchInput("");
      setIsFocus(false);
    }
  };

  const handleSendClick = (textSearch?: string) => {
    if (textSearch?.trim()) {
      router.push(`/Search/${textSearch}`);
      setSearchInput("");
      setIsFocus(false);
    } else if (searchInput.trim() !== "") {
      router.push(`/Search/${searchInput}`);
      setSearchInput("");
      setIsFocus(false);
    }
  };

  //xử lý sự kiện click out modal filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        outsideClickRef.current &&
        !outsideClickRef.current.contains(event.target as Node)
      ) {
        setIsFocus(false);
        setSearchInput("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleOutsideMobileRef = (event: MouseEvent) => {
      if (
        outsideMobileRef.current &&
        !outsideMobileRef.current.contains(event.target as Node)
      ) {
        setHiddenSideBar(false);
      }
    };
    document.addEventListener("click", handleOutsideMobileRef);

    return () => {
      document.removeEventListener("click", handleOutsideMobileRef);
    };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthUser(JSON.parse(user)); // Lưu thông tin người dùng
    }
  }, []);
 

  return (
    <>
      <Box className={style.Hearder_Navbar}>
        <nav className={style.header}>
          <Link href="/" className={style.logo}>
            <Image2 src={Logo} alt="Logo" />
          </Link>
          <Flex className={style.text_box} align="center">
            <ButtonsCollection
              ref={outsideMobileRef}
              hidden
              background
              leftIcon={<IconMenu2 size={24} />}
              onClick={() => HandleSidebar()}
            >
              Danh mục
            </ButtonsCollection>

            <Box
              ref={outsideClickRef}
              className={`${style.search} ${style.hiddenSearch}`}
            >
              {searchInputFunction()}
            </Box>

            <Popover
              position="bottom"
              shadow="md"
              opened={openedCart}
              onChange={setOpenedCart}
              classNames={{
                dropdown: style.dropdown,
              }}
            >
              <Popover.Target>
                <ButtonsCollection
                  // href="/cart"
                  hover
                  transparent
                  leftIcon={<IconShoppingCartFilled size={24} />}
                  totalItem={cart?.totalItem || null}
                  onClick={() => setOpenedCart((o) => !o)}
                >
                  Giỏ hàng
                </ButtonsCollection>
              </Popover.Target>
              <Popover.Dropdown p={0}>
                <CartHeader setOpenedCart={setOpenedCart} />
              </Popover.Dropdown>
            </Popover>

            {authUser ? (
              <Link href={"/account/user-information"}>
                <ButtonsCollection
                  background
                  hover
                  leftIcon={<Image className={style.avt} src={`${process.env.NEXT_PUBLIC_URL || "http://localhost:3001"}/${authUser?.avatar}`} />}
                >
                  <Text fw={"700"} truncate="end">
                    {authUser?.name}
                  </Text>
                </ButtonsCollection>
              </Link>
            ) : (
              <Link href={"/login"} style={{ textDecoration: "none" }}>
                <ButtonsCollection
                  background
                  hover
                  leftIcon={<IconUserCircle size={24} />}
                >
                  Đăng nhập
                </ButtonsCollection>
              </Link>
            )}
          </Flex>
          {hiddenSideBar && (
            <Box className={style.sidebarMenu}>
              <SidebarMenu dataCategory={dataCategory}/>
            </Box>
          )}
        </nav>
        {hiddenSideBar && (
          <Box
            className={`${style.total_coating} ${style.coating_tablet}`}
          ></Box>
        )}

        {isfocus && (
          <Box
            className={`${style.total_coating} ${style.coating_tablet}`}
          ></Box>
        )}
      </Box>

      <Box className={style.header_responsive}>
        <Flex justify="space-between">{headerResFunction()}</Flex>
      </Box>
      <Box
        className={`${style.mainstream} ${
          hiddenDrawerCategory ? style.drawer_visible : style.drawer_hidden
        }`}
      >
        <CategoryHeader
          
        />
      </Box>
      <Box
        className={`${style.mainstream} ${
          seeMore ? style.drawer_visible : style.drawer_hidden
        }`}
      >
        <SeeMoreHeader />
      </Box>
    </>
  );
};

export default HearderNavbar;
