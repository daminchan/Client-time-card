import React from "react";
import Link from "next/link";
import CustomButton from "../button/CustomButton";

interface NavButtonProps {
  href: string;
  label: string;
  width?: string;
}

const NavButton: React.FC<NavButtonProps> = ({
  href,
  label,
  width = "150px",
}) => {
  return (
    <Link href={href} passHref>
      <CustomButton width={width}>{label}</CustomButton>
    </Link>
  );
};

export default NavButton;
