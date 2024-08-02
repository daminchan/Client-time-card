import { Button, ButtonProps } from "@chakra-ui/react";

interface CustomButtonProps extends ButtonProps {
  colorScheme?: string;
  size?: string;
  type?: "button" | "submit" | "reset";
  color?: string; // 文字色を変更可能にする
  width?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  colorScheme = "blue",
  size = "lg",
  type = "button",
  color = "white", // デフォルトの文字色を白に設定
  width = "150px",
  isDisabled = false, // デフォルトで無効化されていない
  ...props
}) => {
  return (
    <Button
      colorScheme={colorScheme}
      size={size}
      type={type}
      color={color}
      width={width} // デフォルトの幅
      isDisabled={isDisabled} // 無効化状態を設定
      opacity={isDisabled ? 0.5 : 1} // 無効化状態に応じて不透明度を変更
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
