import { Collapse, IconSvg } from "@root/components/commons";
import useMediaScreen from "@root/hooks/useMediaScreen";
import Link from "next/link";

const footerData = {
  menu: [
    { label: "GIFT CARDS", href: "/gift-cards" },
    { label: "FIND A STORE", href: "/retail" },
    { label: "NIKE JOURNAL", href: "/stories" },
    { label: "BECOME A MEMBER", href: "/register" },
    { label: "FEEDBACK", href: "/" },
    { label: "PROMO CODES", href: "/promo-code" },
    {
      label: "GET HELP",
      href: "/help",
      list: [
        { label: "Order Status", href: "/orders/details" },
        { label: "Shipping and Delivery", href: "/help/a/shipping-delivery-eu" },
        { label: "Returns", href: "/help/a/returns-policy-eu" },
        { label: "Payment Options", href: "/help/a/payment-options-eu" },
        { label: "Contact Us", href: "/help/#contact" },
        { label: "Nike Promo Codes Help", href: "/help/a/promo-apply-eu" },
      ],
    },
    {
      label: "ABOUT NIKE",
      href: "/",
      list: [
        { label: "News", href: "/" },
        { label: "Careers", href: "https://jobs.nike.com/" },
        { label: "Investors", href: "https://investors.nike.com/" },
        { label: "Sustainability", href: "/sustainability" },
        { label: "UK Tax", href: "/help/a/uk-tax-strategy" },
        {
          label: "UK Pension Statement",
          href: "https://assets.commerce.nikecloud.com/gethelp/nike+(uk)+benefits/nike+(uk)+limited+retirement+benefits+scheme.pdf",
        },
        {
          label: "UK Pension SIP",
          href: "https://www.nike.com/pdf/limited-retirement-benefits-scheme-statement-investment-principles-sip-en-gb.pdf",
        },
      ],
    },
    {
      label: "NIKE APPS",
      href: "/membership",
      list: [
        { label: "Nike App", href: "/nike-app" },
        { label: "Nike Run Club", href: "/nrc-app" },
        { label: "Nike Training Club", href: "/ntc-app" },
        { label: "SNKRS", href: "/launch" },
      ],
    },
  ],

  options: [
    { label: "Guides", list: [] },
    {
      label: "Terms of Use",
      href: "/https://agreementservice.svs.nike.com/gb/en_gb/rest/agreement?agreementType=termsOfUse&amp;uxId=com.nike&amp;country=GB&amp;language=en&amp;requestType=redirect",
    },
    {
      label: "Terms of Sale",
      href: "/https://agreementservice.svs.nike.com/rest/agreement?agreementType=termsOfSale&amp;uxId=com.nike.tos&amp;country=GB&amp;language=en&amp;requestType=redirect",
    },
    { label: "Company Details", href: "/https://www.nike.com/gb/help/a/company-details" },
    {
      label: "UK Modern Slavery Act Disclosure",
      href: "/https://purpose.nike.com/nike-statement-on-forced-labor",
    },
    {
      label: "Privacy & Cookie Policy",
      href: "/https://agreementservice.svs.nike.com/gb/en_gb/rest/agreement?agreementType=privacyPolicy&amp;uxId=com.nike.unite&amp;country=GB&amp;language=en&amp;requestType=redirect",
    },
    { label: "Cookie Settings", href: "#cookie_settings" },
  ],
};

const Footer = () => {
  const isScreenLG = useMediaScreen("lg");

  const directMenu = footerData.menu.filter((item) => !item.list?.length);
  const collapseMenu = footerData.menu.filter((item) => item.list?.length);
  const optionList = footerData.options;

  return (
    <div className="bg-black text-[#7e7e7e] text-xs px-5 py-10">
      <div className="flex flex-col lg:flex-row mb-3">
        <div className="grow lg:grid grid-cols-4 gap-4 mb-8">
          <div className="mb-4 lg:mb-0">
            {directMenu.map((item) => (
              <Link key={item.label} href={item.href}>
                <p
                  className={cls(
                    "mt-2 mb-4 cursor-pointer",
                    "uppercase font-medium text-sm font-['Nike-TG'] text-white"
                  )}
                >
                  {item.label}
                </p>
              </Link>
            ))}
          </div>

          {collapseMenu.map((item) => {
            if (isScreenLG)
              return (
                <div key={item.label}>
                  <Link href={item.href}>
                    <p
                      className={cls(
                        "mt-2 mb-4 cursor-pointer",
                        "uppercase font-medium text-sm font-['Nike-TG'] text-white"
                      )}
                    >
                      {item.label}
                    </p>
                  </Link>
                  {item.list?.map((link) => (
                    <p key={link.label} className=" mt-2 mb-4  cursor-pointer">
                      {link.label}
                    </p>
                  ))}
                </div>
              );

            return (
              <Collapse
                key={item.label}
                label={item.label}
                className="!border-neutral-700"
                labelClass="!py-2 font-['Nike-TG'] text-sm text-white"
                icon={<i className="g72-plus" />}
              >
                {item.list?.map((link) => (
                  <p key={link.label} className=" mt-2 mb-4 cursor-pointer">
                    {link.label}
                  </p>
                ))}
              </Collapse>
            );
          })}
        </div>

        <div className="flex gap-4 mb-8">
          <IconSvg icon="twitter" className="fill-gray-main hover:fill-white cursor-pointer" />
          <IconSvg icon="facebook" className="fill-gray-main hover:fill-white cursor-pointer" />
          <IconSvg icon="youtube" className="fill-gray-main hover:fill-white cursor-pointer" />
          <IconSvg icon="instagram" className="fill-gray-main hover:fill-white cursor-pointer" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 item-start lg:items-end">
        <div className="grow shrink basis-0 flex flex-wrap gap-8 items-end">
          <p className="text-white">
            <IconSvg icon="location" className="inline mr-2" /> United Kingdom
          </p>
          <p>© 2022 Nike, Inc. All Rights Reserved</p>
        </div>

        <div className="grow shrink basis-0 flex flex-col lg:flex-row gap-8 justify-end flex-wrap">
          {optionList.map((option) => (
            <p key={option.label} className="hover:text-white cursor-pointer">
              {option.label}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
