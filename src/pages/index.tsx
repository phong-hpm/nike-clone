import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import navbars from "../../getData/navbar.json";
import { useEffect } from "react";
import Image from "next/image";

const navbarsss = [
  {
    label: "Men",
    href: "https://www.nike.com/sg/men",
    cols: [
      {
        head: {
          label: "main-menu, Men, New & Featured",
        },
        body: [
          {
            label: "main-menu, Men, New & Featured, New Releases",
            href: "https://www.nike.com/sg/w/new-mens-3n82yznik1",
          },
          {
            label: "main-menu, Men, New & Featured, SNKRS Launch Calendar",
            href: "https://www.nike.com/launch",
          },
          {
            label: "main-menu, Men, New & Featured, Member Access",
            href: "https://www.nike.com/sg/w/mens-member-access-4lbtyznik1",
          },
          {
            label: "main-menu, Men, New & Featured, Air Force 1",
            href: "https://www.nike.com/sg/w/air-force-1-5sj3y",
          },
          {
            label: "main-menu, Men, New & Featured, Basic Essentials",
            href: "https://www.nike.com/sg/w/mens-back-to-basics-kkjjznik1",
          },
          {
            label: "main-menu, Men, New & Featured, Football Club Kits",
            href: "https://www.nike.com/sg/w/club-football-teams-6fu9q",
          },
          {
            label: "main-menu, Men, New & Featured, Sustainable Materials",
            href: "https://www.nike.com/sg/w/mens-sustainability-3ngp4znik1",
          },
          {
            label: "main-menu, Men, New & Featured, Top Picks Under S$140",
            href: "https://www.nike.com/sg/w/mens-low-price-shoes-7t83xznik1zy7ok",
          },
          {
            label: "main-menu, Men, New & Featured, Sale",
            href: "https://www.nike.com/sg/w/mens-sale-3yaepznik1",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Men, Shoes",
          href: "https://www.nike.com/sg/w/mens-shoes-nik1zy7ok",
        },
        body: [
          {
            label: "main-menu, Men, Shoes, Newest Sneakers",
            href: "https://www.nike.com/sg/w/new-mens-shoes-3n82yznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, All Shoes",
            href: "https://www.nike.com/sg/w/mens-shoes-nik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Lifestyle",
            href: "https://www.nike.com/sg/w/mens-lifestyle-shoes-13jrmznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Running",
            href: "https://www.nike.com/sg/w/mens-running-shoes-37v7jznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Basketball",
            href: "https://www.nike.com/sg/w/mens-basketball-shoes-3glsmznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Jordan",
            href: "https://www.nike.com/sg/w/mens-jordan-shoes-37eefznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Football",
            href: "https://www.nike.com/sg/w/mens-football-shoes-1gdj0znik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Gym and Training",
            href: "https://www.nike.com/sg/w/mens-training-gym-shoes-58jtoznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Skateboarding",
            href: "https://www.nike.com/sg/w/mens-skateboarding-shoes-8mfrfznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Tennis",
            href: "https://www.nike.com/sg/w/mens-tennis-shoes-ed1qznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, Sandals and Slides",
            href: "https://www.nike.com/sg/w/mens-sandals-slides-fl76znik1",
          },
          {
            label: "main-menu, Men, Shoes, Customise with Nike By You",
            href: "https://www.nike.com/sg/w/mens-nike-by-you-shoes-6ealhznik1zy7ok",
          },
          {
            label: "main-menu, Men, Shoes, All Sale Shoes",
            href: "https://www.nike.com/sg/w/mens-sale-shoes-3yaepznik1zy7ok",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Men, Clothing",
          href: "https://www.nike.com/sg/w/mens-clothing-6ymx6znik1",
        },
        body: [
          {
            label: "main-menu, Men, Clothing, All Clothing",
            href: "https://www.nike.com/sg/w/mens-clothing-6ymx6znik1",
          },
          {
            label: "main-menu, Men, Clothing, Tops and T-Shirts",
            href: "https://www.nike.com/sg/w/mens-tops-t-shirts-9om13znik1",
          },
          {
            label: "main-menu, Men, Clothing, Jerseys and Kits",
            href: "https://www.nike.com/sg/w/mens-kits-jerseys-3a41eznik1",
          },
          {
            label: "main-menu, Men, Clothing, Hoodies and Sweatshirts",
            href: "https://www.nike.com/sg/w/mens-hoodies-sweatshirts-6riveznik1",
          },
          {
            label: "main-menu, Men, Clothing, Jackets and Gilets",
            href: "https://www.nike.com/sg/w/mens-jackets-gilets-50r7yznik1",
          },
          {
            label: "main-menu, Men, Clothing, Pants and Leggings",
            href: "https://www.nike.com/sg/w/mens-trousers-tights-2kq19znik1",
          },
          {
            label: "main-menu, Men, Clothing, Tracksuits",
            href: "https://www.nike.com/sg/w/mens-tracksuits-1ll2wznik1",
          },
          {
            label: "main-menu, Men, Clothing, Compression and Base Layer",
            href: "https://www.nike.com/sg/w/mens-compression-baselayer-4pwbznik1",
          },
          {
            label: "main-menu, Men, Clothing, Shorts",
            href: "https://www.nike.com/sg/w/mens-shorts-38fphznik1",
          },
          {
            label: "main-menu, Men, Clothing, Caps",
            href: "https://www.nike.com/sg/w/mens-hats-visors-headbands-52r49znik1",
          },
          {
            label: "main-menu, Men, Clothing, Socks",
            href: "https://www.nike.com/sg/w/mens-socks-7ny3qznik1",
          },
          {
            label: "main-menu, Men, Clothing, Bags and Backpacks",
            href: "https://www.nike.com/sg/w/mens-bags-backpacks-9xy71znik1",
          },
          {
            label: "main-menu, Men, Clothing, Accessories and Equipment",
            href: "https://www.nike.com/sg/w/accessories-equipment-awwpw",
          },
          {
            label: "main-menu, Men, Clothing, All Sale Clothing",
            href: "https://www.nike.com/sg/w/mens-sale-clothing-3yaepz6ymx6znik1",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Men, Shop By Sport",
        },
        body: [
          {
            label: "main-menu, Men, Shop By Sport, Running",
            href: "https://www.nike.com/sg/running",
          },
          {
            label: "main-menu, Men, Shop By Sport, Football",
            href: "https://www.nike.com/sg/football",
          },
          {
            label: "main-menu, Men, Shop By Sport, Basketball",
            href: "https://www.nike.com/sg/basketball",
          },
          {
            label: "main-menu, Men, Shop By Sport, Gym and Training",
            href: "https://www.nike.com/sg/w/mens-training-gym-58jtoznik1",
          },
          {
            label: "main-menu, Men, Shop By Sport, Yoga",
            href: "https://www.nike.com/sg/w/mens-yoga-anrljznik1",
          },
          {
            label: "main-menu, Men, Shop By Sport, Skateboarding",
            href: "https://www.nike.com/sg/w/skateboarding-8mfrf",
          },
          {
            label: "main-menu, Men, Shop By Sport, Tennis",
            href: "https://www.nike.com/sg/w/tennis-ed1q",
          },
          {
            label: "main-menu, Men, Shop By Sport, Golf",
            href: "https://www.nike.com/sg/w/mens-golf-23q9wznik1",
          },
          // {
          //   label: "main-menu, Men, Shop By Brand",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, Nike Sportswear",
          //   href: "https://www.nike.com/sg/sportswear",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, NikeLab",
          //   href: "https://www.nike.com/sg/nikelab",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, Nike By You",
          //   href: "https://www.nike.com/sg/nike-by-you",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, Jordan",
          //   href: "https://www.nike.com/sg/jordan",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, ACG",
          //   href: "https://www.nike.com/sg/w/acg-93bsd",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, NBA",
          //   href: "https://www.nike.com/sg/w/mens-nba-teams-1vofiznik1",
          // },
          // {
          //   label: "main-menu, Men, Shop By Brand, Nike SB",
          //   href: "https://www.nike.com/sg/w/skateboarding-8mfrf",
          // },
        ],
      },
      {
        head: {
          label: "main-menu, Men, Icons",
        },
        body: [
          {
            label: "main-menu, Men, Icons, Air Force 1",
            href: "https://www.nike.com/sg/w/mens-air-force-1-shoes-5sj3yznik1zy7ok",
          },
          {
            label: "main-menu, Men, Icons, Pegasus",
            href: "https://www.nike.com/sg/w/mens-pegasus-running-shoes-37v7jz8nexhznik1zy7ok",
          },
          {
            label: "main-menu, Men, Icons, Blazer",
            href: "https://www.nike.com/sg/w/mens-blazer-shoes-9gw3aznik1zy7ok",
          },
          {
            label: "main-menu, Men, Icons, Air Jordan 1",
            href: "https://www.nike.com/sg/w/jordan-1-shoes-4fokyzy7ok",
          },
          {
            label: "main-menu, Men, Icons, Air Max",
            href: "https://www.nike.com/sg/w/mens-air-max-shoes-a6d8hznik1zy7ok",
          },
        ],
      },
    ],
  },
  {
    label: "Women",
    href: "https://www.nike.com/sg/women",
    cols: [
      {
        head: {
          label: "main-menu, Women, New & Featured",
        },
        body: [
          {
            label: "main-menu, Women, New & Featured, New Releases",
            href: "https://www.nike.com/sg/w/new-womens-3n82yz5e1x6",
          },
          {
            label: "main-menu, Women, New & Featured, SNKRS Launch Calendar",
            href: "https://www.nike.com/launch",
          },
          {
            label: "main-menu, Women, New & Featured, Member Access",
            href: "https://www.nike.com/sg/w/womens-member-access-4lbtyz5e1x6",
          },
          {
            label: "main-menu, Women, New & Featured, Air Force 1",
            href: "https://www.nike.com/sg/w/air-force-1-5sj3y",
          },
          {
            label: "main-menu, Women, New & Featured, Performance Essentials",
            href: "https://www.nike.com/sg/w/womens-back-to-basics-5e1x6zkkjj",
          },
          {
            label: "main-menu, Women, New & Featured, Bra and Legging Duos",
            href: "https://www.nike.com/sg/w/womens-bras-and-leggings-5e1x6z88mej",
          },
          {
            label: "main-menu, Women, New & Featured, Sustainable Materials",
            href: "https://www.nike.com/sg/w/womens-sustainability-3ngp4z5e1x6",
          },
          {
            label: "main-menu, Women, New & Featured, Top Picks Under S$140",
            href: "https://www.nike.com/sg/w/womens-low-price-shoes-5e1x6z7t83xzy7ok",
          },
          {
            label: "main-menu, Women, New & Featured, Sale",
            href: "https://www.nike.com/sg/w/womens-sale-3yaepz5e1x6",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Women, Shoes",
          href: "https://www.nike.com/sg/w/womens-shoes-5e1x6zy7ok",
        },
        body: [
          {
            label: "main-menu, Women, Shoes, All Shoes",
            href: "https://www.nike.com/sg/w/womens-shoes-5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Lifestyle",
            href: "https://www.nike.com/sg/w/womens-lifestyle-shoes-13jrmz5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Running",
            href: "https://www.nike.com/sg/w/womens-running-shoes-37v7jz5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Gym and Training",
            href: "https://www.nike.com/sg/w/womens-training-gym-shoes-58jtoz5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Jordan",
            href: "https://www.nike.com/sg/w/womens-jordan-shoes-37eefz5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Football",
            href: "https://www.nike.com/sg/w/womens-football-shoes-1gdj0z5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Basketball",
            href: "https://www.nike.com/sg/w/womens-basketball-shoes-3glsmz5e1x6zy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Skateboarding",
            href: "https://www.nike.com/sg/w/womens-skateboarding-shoes-5e1x6z8mfrfzy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Tennis",
            href: "https://www.nike.com/sg/w/womens-tennis-shoes-5e1x6zed1qzy7ok",
          },
          {
            label: "main-menu, Women, Shoes, Sandals and Slides",
            href: "https://www.nike.com/sg/w/womens-sandals-slides-5e1x6zfl76",
          },
          {
            label: "main-menu, Women, Shoes, Customise with Nike By You",
            href: "https://www.nike.com/sg/w/womens-nike-by-you-shoes-5e1x6z6ealhzy7ok",
          },
          {
            label: "main-menu, Women, Shoes, All Sale Shoes",
            href: "https://www.nike.com/sg/w/womens-sale-shoes-3yaepz5e1x6zy7ok",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Women, Clothing",
          href: "https://www.nike.com/sg/w/womens-clothing-5e1x6z6ymx6",
        },
        body: [
          {
            label: "main-menu, Women, Clothing, All Clothing",
            href: "https://www.nike.com/sg/w/womens-clothing-5e1x6z6ymx6",
          },
          {
            label: "main-menu, Women, Clothing, Performance Essentials",
            href: "https://www.nike.com/sg/w/womens-back-to-basics-5e1x6zkkjj",
          },
          {
            label: "main-menu, Women, Clothing, Sports Bras",
            href: "https://www.nike.com/sg/w/womens-sports-bras-40qgmz5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Tops and T-Shirts",
            href: "https://www.nike.com/sg/w/womens-tops-t-shirts-5e1x6z9om13",
          },
          {
            label: "main-menu, Women, Clothing, Hoodies and Sweatshirts",
            href: "https://www.nike.com/sg/w/womens-hoodies-sweatshirts-5e1x6z6rive",
          },
          {
            label: "main-menu, Women, Clothing, Jackets and Gilets",
            href: "https://www.nike.com/sg/w/womens-jackets-gilets-50r7yz5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Pants and Leggings",
            href: "https://www.nike.com/sg/w/womens-trousers-tights-2kq19z5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Tracksuits",
            href: "https://www.nike.com/sg/w/womens-tracksuits-1ll2wz5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Compression and Base Layer",
            href: "https://www.nike.com/sg/w/womens-compression-baselayer-4pwbz5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Shorts",
            href: "https://www.nike.com/sg/w/womens-shorts-38fphz5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Skirts and Dresses",
            href: "https://www.nike.com/sg/w/womens-skirts-dresses-5e1x6z8y3qp",
          },
          {
            label: "main-menu, Women, Clothing, Jerseys and Kits",
            href: "https://www.nike.com/sg/w/womens-kits-jerseys-3a41ez5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Modest Wear",
            href: "https://www.nike.com/sg/w/modest-wear-22fj5",
          },
          {
            label: "main-menu, Women, Clothing, Plus size",
            href: "https://www.nike.com/sg/w/womens-plus-size-clothing-5e1x6z6ymx6z8mjm2",
          },
          {
            label: "main-menu, Women, Clothing, Caps",
            href: "https://www.nike.com/sg/w/womens-hats-visors-headbands-52r49z5e1x6",
          },
          {
            label: "main-menu, Women, Clothing, Socks",
            href: "https://www.nike.com/sg/w/womens-socks-5e1x6z7ny3q",
          },
          {
            label: "main-menu, Women, Clothing, Bags and Backpacks",
            href: "https://www.nike.com/sg/w/womens-bags-backpacks-5e1x6z9xy71",
          },
          {
            label: "main-menu, Women, Clothing, Accessories and Equipment",
            href: "https://www.nike.com/sg/w/accessories-equipment-awwpw",
          },
          {
            label: "main-menu, Women, Clothing, All Sale Clothing",
            href: "https://www.nike.com/sg/w/womens-sale-clothing-3yaepz5e1x6z6ymx6",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Women, Shop By Sport",
        },
        body: [
          {
            label: "main-menu, Women, Shop By Sport, Running",
            href: "https://www.nike.com/sg/running",
          },
          {
            label: "main-menu, Women, Shop By Sport, Gym and Training",
            href: "https://www.nike.com/sg/w/womens-training-gym-58jtoz5e1x6",
          },
          {
            label: "main-menu, Women, Shop By Sport, Yoga",
            href: "https://www.nike.com/sg/w/womens-yoga-clothing-5e1x6z6ymx6zanrlj",
          },
          {
            label: "main-menu, Women, Shop By Sport, Football",
            href: "https://www.nike.com/sg/football",
          },
          {
            label: "main-menu, Women, Shop By Sport, Basketball",
            href: "https://www.nike.com/sg/basketball",
          },
          {
            label: "main-menu, Women, Shop By Sport, Skateboarding",
            href: "https://www.nike.com/sg/w/skateboarding-8mfrf",
          },
          {
            label: "main-menu, Women, Shop By Sport, Tennis",
            href: "https://www.nike.com/sg/w/tennis-ed1q",
          },
          {
            label: "main-menu, Women, Shop By Sport, Golf",
            href: "https://www.nike.com/sg/w/womens-golf-23q9wz5e1x6",
          },
          // {
          //   label: "main-menu, Women, Shop By Brand",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, Nike Sportswear",
          //   href: "https://www.nike.com/sg/sportswear",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, NikeLab",
          //   href: "https://www.nike.com/sg/nikelab",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, Nike By You",
          //   href: "https://www.nike.com/sg/nike-by-you",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, Jordan",
          //   href: "https://www.nike.com/sg/jordan",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, ACG",
          //   href: "https://www.nike.com/sg/w/acg-93bsd",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, NBA",
          //   href: "https://www.nike.com/sg/w/womens-nba-teams-1vofiz5e1x6",
          // },
          // {
          //   label: "main-menu, Women, Shop By Brand, Nike SB",
          //   href: "https://www.nike.com/sg/w/skateboarding-8mfrf",
          // },
        ],
      },
      {
        head: {
          label: "main-menu, Women, Icons",
        },
        body: [
          {
            label: "main-menu, Women, Icons, Air Force 1",
            href: "https://www.nike.com/sg/w/womens-air-force-1-shoes-5e1x6z5sj3yzy7ok",
          },
          {
            label: "main-menu, Women, Icons, Pegasus",
            href: "https://www.nike.com/sg/w/womens-pegasus-running-shoes-37v7jz5e1x6z8nexhzy7ok",
          },
          {
            label: "main-menu, Women, Icons, Blazer",
            href: "https://www.nike.com/sg/w/womens-blazer-shoes-5e1x6z9gw3azy7ok",
          },
          {
            label: "main-menu, Women, Icons, Air Jordan 1",
            href: "https://www.nike.com/sg/w/jordan-1-shoes-4fokyzy7ok",
          },
          {
            label: "main-menu, Women, Icons, Air Max",
            href: "https://www.nike.com/sg/w/womens-air-max-shoes-5e1x6za6d8hzy7ok",
          },
        ],
      },
    ],
  },
  {
    label: "Kids",
    href: "https://www.nike.com/sg/kids",
    cols: [
      {
        head: {
          label: "main-menu, Kids, New & Featured",
        },
        body: [
          {
            label: "main-menu, Kids, New & Featured, New Releases",
            href: "https://www.nike.com/sg/w/new-kids-3n82yzv4dh",
          },
          {
            label: "main-menu, Kids, New & Featured, Member Access",
            href: "https://www.nike.com/sg/w/kids-member-access-4lbtyzv4dh",
          },
          {
            label: "main-menu, Kids, New & Featured, Air Force 1",
            href: "https://www.nike.com/sg/w/kids-air-force-1-5sj3yzv4dh",
          },
          {
            label: "main-menu, Kids, New & Featured, Bags and Backpacks",
            href: "https://www.nike.com/sg/w/kids-bags-backpacks-9xy71zv4dh",
          },
          {
            label: "main-menu, Kids, New & Featured, Jordan",
            href: "https://www.nike.com/sg/w/kids-jordan-37eefzv4dh",
          },
          {
            label: "main-menu, Kids, New & Featured, Sale",
            href: "https://www.nike.com/sg/w/kids-sale-3yaepzv4dh",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Kids, Boys' Shoes",
          href: "https://www.nike.com/sg/w/boys-shoes-1onrazy7ok",
        },
        body: [
          {
            label: "main-menu, Kids, Boys' Shoes, Older Kids (3–6.5)",
            href: "https://www.nike.com/sg/w/older-boys-shoes-1onrazagibjzy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Younger Kids (10–2.5)",
            href: "https://www.nike.com/sg/w/little-boys-shoes-1onraz6dacezy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Baby and Toddler (1.5–9.5)",
            href: "https://www.nike.com/sg/w/baby-toddlers-boys-shoes-1onraz2j488zy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Lifestyle",
            href: "https://www.nike.com/sg/w/boys-lifestyle-shoes-13jrmz1onrazy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Running",
            href: "https://www.nike.com/sg/w/boys-running-shoes-1onraz37v7jzy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Basketball",
            href: "https://www.nike.com/sg/w/boys-basketball-shoes-1onraz3glsmzy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Jordan",
            href: "https://www.nike.com/sg/w/boys-jordan-shoes-1onraz37eefzy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Football",
            href: "https://www.nike.com/sg/w/boys-football-shoes-1gdj0z4413nzy7ok",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, Sandals and Slides",
            href: "https://www.nike.com/sg/w/boys-sandals-slides-4413nzfl76",
          },
          {
            label: "main-menu, Kids, Boys' Shoes, All Shoes",
            href: "https://www.nike.com/sg/w/boys-shoes-1onrazy7ok",
          },
          // {
          //   label: "main-menu, Kids, Boys' Clothing",
          //   href: "https://www.nike.com/sg/w/boys-clothing-1onraz6ymx6",
          // },
          // {
          //   label: "main-menu, Kids, Boys' Clothing, Tops and T-Shirts",
          //   href: "https://www.nike.com/sg/w/boys-tops-t-shirts-1onraz9om13",
          // },
          // {
          //   label: "main-menu, Kids, Boys' Clothing, Hoodies and Sweatshirts",
          //   href: "https://www.nike.com/sg/w/boys-hoodies-sweatshirts-1onraz6rive",
          // },
          // {
          //   label: "main-menu, Kids, Boys' Clothing, Pants and Leggings",
          //   href: "https://www.nike.com/sg/w/boys-trousers-tights-2kq19z4413n",
          // },
          // {
          //   label: "main-menu, Kids, Boys' Clothing, Shorts",
          //   href: "https://www.nike.com/sg/w/boys-shorts-1onraz38fph",
          // },
          // {
          //   label: "main-menu, Kids, Boys' Clothing, All Boys' Clothing",
          //   href: "https://www.nike.com/sg/w/boys-clothing-1onraz6ymx6",
          // },
        ],
      },
      {
        head: {
          label: "main-menu, Kids, Girls' Shoes",
          href: "https://www.nike.com/sg/w/girls-shoes-3aqegzy7ok",
        },
        body: [
          {
            label: "main-menu, Kids, Girls' Shoes, Older Kids (3–6.5)",
            href: "https://www.nike.com/sg/w/older-girls-shoes-3aqegzagibjzy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Younger Kids (10–2.5)",
            href: "https://www.nike.com/sg/w/little-girls-shoes-3aqegz6dacezy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Baby and Toddler (1.5–9.5)",
            href: "https://www.nike.com/sg/w/baby-toddlers-girls-shoes-2j488z3aqegzy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Lifestyle",
            href: "https://www.nike.com/sg/w/girls-lifestyle-shoes-13jrmz3aqegzy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Running",
            href: "https://www.nike.com/sg/w/girls-running-shoes-37v7jz3aqegzy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Basketball",
            href: "https://www.nike.com/sg/w/girls-basketball-shoes-3aqegz3glsmzy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Football",
            href: "https://www.nike.com/sg/w/girls-football-shoes-1gdj0z6bnmbzy7ok",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, Sandals and Slides",
            href: "https://www.nike.com/sg/w/girls-sandals-slides-6bnmbzfl76",
          },
          {
            label: "main-menu, Kids, Girls' Shoes, All Shoes",
            href: "https://www.nike.com/sg/w/girls-shoes-3aqegzy7ok",
          },
          // {
          //   label: "main-menu, Kids, Girls' Clothing",
          //   href: "https://www.nike.com/sg/w/girls-clothing-3aqegz6ymx6",
          // },
          // {
          //   label: "main-menu, Kids, Girls' Clothing, Tops and T-Shirts",
          //   href: "https://www.nike.com/sg/w/girls-tops-t-shirts-3aqegz9om13",
          // },
          // {
          //   label: "main-menu, Kids, Girls' Clothing, Sports Bras",
          //   href: "https://www.nike.com/sg/w/girls-sports-bras-3aqegz40qgm",
          // },
          // {
          //   label: "main-menu, Kids, Girls' Clothing, Hoodies and Sweatshirts",
          //   href: "https://www.nike.com/sg/w/girls-hoodies-sweatshirts-3aqegz6rive",
          // },
          // {
          //   label: "main-menu, Kids, Girls' Clothing, Pants and Leggings",
          //   href: "https://www.nike.com/sg/w/girls-trousers-tights-2kq19z6bnmb",
          // },
          // {
          //   label: "main-menu, Kids, Girls' Clothing, Shorts",
          //   href: "https://www.nike.com/sg/w/girls-shorts-38fphz3aqeg",
          // },
          // {
          //   label: "main-menu, Kids, Girls' Clothing, All Girls' Clothing",
          //   href: "https://www.nike.com/sg/w/girls-clothing-3aqegz6ymx6",
          // },
        ],
      },
      {
        head: {
          label: "main-menu, Kids, Accessories and Equipment",
          href: "https://www.nike.com/sg/w/kids-accessories-equipment-awwpwzv4dh",
        },
        body: [
          {
            label: "main-menu, Kids, Accessories and Equipment, Balls",
            href: "https://www.nike.com/sg/w/balls-580b1",
          },
          {
            label: "main-menu, Kids, Accessories and Equipment, Bags and Backpacks",
            href: "https://www.nike.com/sg/w/kids-bags-backpacks-9xy71zv4dh",
          },
          {
            label: "main-menu, Kids, Accessories and Equipment, Socks",
            href: "https://www.nike.com/sg/w/kids-socks-7ny3qzv4dh",
          },
          {
            label: "main-menu, Kids, Accessories and Equipment, Hats and Headwear",
            href: "https://www.nike.com/sg/w/kids-hats-visors-headbands-52r49zv4dh",
          },
          // {
          //   "label": "main-menu, Kids, Shop By Sport"
          // },
          // {
          //   "label": "main-menu, Kids, Shop By Sport, Running",
          //   "href": "https://www.nike.com/sg/w/kids-running-37v7jzv4dh"
          // },
          // {
          //   "label": "main-menu, Kids, Shop By Sport, Football",
          //   "href": "https://www.nike.com/sg/w/kids-football-1gdj0zv4dh"
          // },
          // {
          //   "label": "main-menu, Kids, Shop By Sport, Basketball",
          //   "href": "https://www.nike.com/sg/w/kids-basketball-3glsmzv4dh"
          // },
          // {
          //   "label": "main-menu, Kids, Shop By Sport, Gym and Training",
          //   "href": "https://www.nike.com/sg/w/kids-training-gym-58jtozv4dh"
          // },
          // {
          //   "label": "main-menu, Kids, Shop By Sport, Tennis",
          //   "href": "https://www.nike.com/sg/w/kids-tennis-ed1qzv4dh"
          // }
        ],
      },
    ],
  },
  {
    label: "Customise",
    href: "https://www.nike.com/sg/nike-by-you",
    cols: [
      {
        head: {
          label: "main-menu, Customise, Featured",
        },
        body: [
          {
            label: "main-menu, Customise, Featured, Nike By You New Releases",
            href: "https://www.nike.com/sg/w/new-nike-by-you-3n82yz6ealh",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Customise, Nike By You",
        },
        body: [
          {
            label: "main-menu, Customise, Nike By You, Men",
            href: "https://www.nike.com/sg/w/mens-nike-by-you-shoes-6ealhznik1zy7ok",
          },
          {
            label: "main-menu, Customise, Nike By You, Women",
            href: "https://www.nike.com/sg/w/womens-nike-by-you-shoes-5e1x6z6ealhzy7ok",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Customise, By Sport",
        },
        body: [
          {
            label: "main-menu, Customise, By Sport, Lifestyle",
            href: "https://www.nike.com/sg/w/nike-by-you-lifestyle-shoes-13jrmz6ealhzy7ok",
          },
          {
            label: "main-menu, Customise, By Sport, Running",
            href: "https://www.nike.com/sg/w/nike-by-you-running-shoes-37v7jz6ealhzy7ok",
          },
          {
            label: "main-menu, Customise, By Sport, Basketball",
            href: "https://www.nike.com/sg/w/nike-by-you-basketball-shoes-3glsmz6ealhzy7ok",
          },
          {
            label: "main-menu, Customise, By Sport, Football",
            href: "https://www.nike.com/sg/w/nike-by-you-football-shoes-1gdj0z6ealhzy7ok",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Customise, Icons",
        },
        body: [
          {
            label: "main-menu, Customise, Icons, Air Max",
            href: "https://www.nike.com/sg/w/nike-by-you-air-max-shoes-6ealhza6d8hzy7ok",
          },
          {
            label: "main-menu, Customise, Icons, Air Force 1",
            href: "https://www.nike.com/sg/w/nike-by-you-air-force-1-shoes-5sj3yz6ealhzy7ok",
          },
          {
            label: "main-menu, Customise, Icons, Free",
            href: "https://www.nike.com/sg/w/nike-by-you-nike-free-shoes-17422z6ealhzy7ok",
          },
          {
            label: "main-menu, Customise, Icons, Flyknit",
            href: "https://www.nike.com/sg/w/nike-by-you-flyknit-shoes-6ealhz8d752zy7ok",
          },
        ],
      },
    ],
  },
  {
    label: "Sale",
    href: "https://www.nike.com/sg/w/sale-3yaep",
    cols: [
      {
        head: {
          label: "main-menu, Sale, Featured",
        },
        body: [
          {
            label: "main-menu, Sale, Featured, Shop All Sale",
            href: "https://www.nike.com/sg/w/sale-3yaep",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Sale, Men's Sale",
          href: "https://www.nike.com/sg/w/mens-sale-3yaepznik1",
        },
        body: [
          {
            label: "main-menu, Sale, Men's Sale, Shoes",
            href: "https://www.nike.com/sg/w/mens-sale-shoes-3yaepznik1zy7ok",
          },
          {
            label: "main-menu, Sale, Men's Sale, Clothing",
            href: "https://www.nike.com/sg/w/mens-sale-clothing-3yaepz6ymx6znik1",
          },
          {
            label: "main-menu, Sale, Men's Sale, Accessories and Equipment",
            href: "https://www.nike.com/sg/w/mens-sale-accessories-equipment-3yaepzawwpwznik1",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Sale, Women's Sale",
          href: "https://www.nike.com/sg/w/womens-sale-3yaepz5e1x6",
        },
        body: [
          {
            label: "main-menu, Sale, Women's Sale, Shoes",
            href: "https://www.nike.com/sg/w/womens-sale-shoes-3yaepz5e1x6zy7ok",
          },
          {
            label: "main-menu, Sale, Women's Sale, Clothing",
            href: "https://www.nike.com/sg/w/womens-sale-clothing-3yaepz5e1x6z6ymx6",
          },
          {
            label: "main-menu, Sale, Women's Sale, Accessories and Equipment",
            href: "https://www.nike.com/sg/w/womens-sale-accessories-equipment-3yaepz5e1x6zawwpw",
          },
        ],
      },
      {
        head: {
          label: "main-menu, Sale, Kids' Sale",
          href: "https://www.nike.com/sg/w/kids-sale-3yaepzv4dh",
        },
        body: [
          {
            label: "main-menu, Sale, Kids' Sale, Shoes",
            href: "https://www.nike.com/sg/w/kids-sale-shoes-3yaepzv4dhzy7ok",
          },
          {
            label: "main-menu, Sale, Kids' Sale, Clothing",
            href: "https://www.nike.com/sg/w/kids-sale-clothing-3yaepz6ymx6zv4dh",
          },
          {
            label: "main-menu, Sale, Kids' Sale, Accessories and Equipment",
            href: "https://www.nike.com/sg/w/kids-sale-accessories-equipment-3yaepzawwpwzv4dh",
          },
        ],
      },
    ],
  },
  {
    label: "SNKRS",
    href: "https://www.nike.com/launch",
    cols: [],
  },
];

const Home: NextPage = () => {
  // const response = useQuery(gql`
  //   query {
  //     product_filters {
  //       uid
  //       product {
  //         uid
  //       }
  //     }
  //   }
  // `);

  // console.log("response", response);

  return (
    <div>
      {navbars.map(({ label, cols }) => {
        return (
          <div key={label}>
            <h3 className="ml-4 text-xl">{label}</h3>
            {cols.map(({ head, body }) => {
              return (
                <div key={head.label}>
                  <h3 className="ml-8 text-lg">{head.label}</h3>
                  {body.map(({ label, href }) => {
                    return (
                      <div key={label} className="flex">
                        <div className="grow basis-0">
                          <a className="ml-12 text-blue-600" href={href}>
                            {label}
                          </a>
                        </div>
                        <div className="grow basis-0">
                          <a className="ml-12 text-blue-600" href={href}>
                            {href?.replace("https://www.nike.com", "")}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Home;
