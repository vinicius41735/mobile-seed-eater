import { Text } from "react-native";

interface ButtonContentProps {
  title: string;
}

function Submit({ title }: ButtonContentProps){
  return (
    <Text className="text-primary text-base font-bold uppercase">
      {title}
    </Text>
  );
}

function Redirect({ title }: ButtonContentProps){
  return (
    <Text className="text-primary text-base font-bold">
      {title}
    </Text>
  );
}

function Link({ title }: ButtonContentProps){
  return (
    <Text className="text-secondary text-base font-bold text-center mt-8">
      {title}
    </Text>
  );
}

export const ButtonContent = {
  Submit,
  Redirect,
  Link
}