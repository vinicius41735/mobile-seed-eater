import { colors } from "@constants";
import { TextInput, TextInputProps } from "react-native";

function Field({ ...rest }: TextInputProps){
  return (
    <TextInput
      className="flex-1 text-secondary text-base font-regular"
      placeholderTextColor={colors.secondary}
      {...rest}
    />
  );
}

function Search({ ...rest }: TextInputProps){
  return (
    <TextInput
      className="flex-1 py-3 pl-2 text-secondary font-semibold text-xl"
      placeholderTextColor={colors.secondary}
      { ...rest }
    />
  );
}

export const InputContent = {
  Field,
  Search
}