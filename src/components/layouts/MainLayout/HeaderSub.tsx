import { FC } from "react";
import { useRouter } from "next/router";

// components
import { IconSvg } from "@root/components/commons";
import Link from "next/link";

const HeaderSub: FC = () => {
  const router = useRouter();

  return (
    <div className="hidden lg:block bg-neutral-100 page-spacing">
      <div className="flex justify-between items-center">
        {/* logo */}
        <IconSvg
          icon="logo-jordan"
          className="link p-[6px]"
          width={36}
          height={36}
          onClick={() => router.push("/jordan")}
        />

        {/* actions */}
        <div className="flex justify-end">
          <Link href="/retail">
            <p className="link text-xs px-3">Find a Store</p>
          </Link>
          <div className="bg-black w-[1px]" />
          <p className="link text-xs px-3">Help</p>
          <div className="bg-black w-[1px]" />
          <Link href="/membership">
            <p className="link text-xs px-3">Join Us</p>
          </Link>
          <div className="bg-black w-[1px]" />
          <Link href="/">
            <p className="link text-xs pl-3">Sign In</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderSub;
