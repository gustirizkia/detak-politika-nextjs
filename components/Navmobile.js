import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "splide-nextjs/react-splide";
import "splide-nextjs/splide/dist/css/themes/splide-default.min.css";
import logo from "../public/logo.png";
import { APIURL, JwtToken } from "./api/base_url";

export default function Navmobile() {
  const [showInputSearch, setInputShow] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const textInput = useRef(null);
  const route = useRouter();

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleFetchData = () => {
    axios
      .get(APIURL + "kategori", {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        setTempData(ress.data.data);
        console.log(ress.data.data);
      })
      .catch((err) => {
        console.log("Server Error", err);
      });
  };

  const handleSearch = () => {
    axios
      .get(APIURL + "artikel?keyword=" + keyword, {
        headers: {
          "Jwt-Key": JwtToken,
        },
      })
      .then((ress) => {
        console.log("response success", ress);
        route.push(`/search/${keyword}`);
      });
  };

  const handleShowInput = () => {
    textInput.current?.focus();
    if (showInputSearch) {
      setInputShow(false);
    } else {
      setInputShow(true);
    }
  };

  const tagSearchShow = () => {
    return (
      <>
        <div className="my-2">
          <div className=" items-center border-2 rounded-full px-1 focus-within:border-pink-500  overflow-x-hidden  py-1 w-full border-gray-400 flex ">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="text-gray-500 w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              className="w-full focus:outline-none focus:ring-0 "
              autoFocus
              ref={textInput}
              placeholder="Cari berita . . ."
              onChange={(e) => {
                setKeyword(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className="w-52 
          "
        >
          <Link href="/">
            <Image src={logo} layout="responsive" alt="Detakpolitika.com" />
          </Link>
        </div>
        <div onClick={handleShowInput}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="text-gray-500 w-10 h-10 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      {!showInputSearch || tagSearchShow()}
      <Splide
        hasTrack={false}
        options={{
          gap: "16px",
          drag: "free",
          pagination: false,
          arrows: false,
          type: "loop",
          autoWidth: true,
        }}
      >
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Home</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Politik</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Ekonomi</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Hukum</Link>
          </div>
        </SplideSlide>
        <SplideSlide>
          <div className="inline-block font-bold font-popins hover:text-pink-500">
            <Link href="">Parlemen</Link>
          </div>
        </SplideSlide>
      </Splide>
    </>
  );
}
