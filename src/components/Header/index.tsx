"use client";
import { useBoolean } from "@/hooks/useBoolean";
import clsx from "clsx";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const [openSidebar, { toggle: toggleSidebar }] = useBoolean();

  const linkStyles = "text-[20px]";

  useEffect(() => {
    if ("Notification" in window) {
      // Request permission
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          // Create a notification
          const notification = new Notification("Welcome bro!", {
            body: "Do you have an idea? click me to connect",
            icon: "/favicon-32.png", // Optional icon
            // Other options like sound, vibration, etc.
          });

          // Handle notification clicks and closures
          notification.onclick = function () {
            // Redirect to a specific URL or perform other actions
            window.open("https://vantuan2404.github.io/Tuan/");
          };

          notification.onerror = function () {
            console.error("Error displaying notification");
          };

          notification.onclose = function () {
            console.log("Notification closed");
          };
        }
      });
    } else {
      alert("Why did you refuse? I am really disappointed in you.");
    }
  }, []);

  return (
    <>
      <header
        className="flex items-center justify-between w-full p-4 fixed top-0 left-0 z-20
    "
      >
        <Link href="#" className="text-[20px] text-white uppercase font-bold ">
          Ng.
        </Link>
        <div
          onClick={toggleSidebar}
          className="w-8 h-8 bg-[var(--main-clr)] cursor-pointer"
        ></div>
      </header>
      <div
        className={clsx(
          "sidebar w-full h-full z-[100] right-0 fixed top-0 translate-x-full  flex items-start transition-delay",
          {
            ["!translate-x-0 transition-delay"]: openSidebar,
          }
        )}
      >
        <div
          onClick={toggleSidebar}
          className="w-[calc(100%_-_500px)] cursor-pointer h-full bg-black/[0.9]"
        />
        <div className="bar w-[500px] h-full bg-white/[0.25] backdrop-blur-[30px] flex items-center justify-center flex-col gap-6">
          <Link className={linkStyles} href="#">
            About us
          </Link>
          <Link className={linkStyles} href="#">
            Showcases
          </Link>
          <Link className={linkStyles} href="#">
            Contact
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
