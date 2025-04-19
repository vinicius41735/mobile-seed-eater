import { Input, Loading, User } from "@components";
import { api } from "@services";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { Users } from "@models";
import { AxiosResponse } from "axios";

export function UsersList() {
  const [users, setUsers] = useState<Users[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const filterUsers = users.filter(
    (user) => user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function searchUsers() {
      setLoading(true);
      try {
        const response: AxiosResponse<Users[]> = await api.get(`/users?search=${searchTerm}`);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (searchTerm) {
      searchUsers();
    }
  }, [searchTerm]);

  return (
    <View className="flex-1 bg-primary">
      <Input.Root.Search>
        <Input.Icon icon={Entypo} name="magnifying-glass" />
        <Input.Content.Search placeholder="Pesquisar Usuário" value={searchTerm} onChangeText={setSearchTerm} />

        {searchTerm.length > 0 && (
          <Input.Actions icon={Entypo} name="cross" onShowAction={() => setSearchTerm('')} /> 
        )}
      </Input.Root.Search>

      {loading ? (
        <Loading />
      ) : searchTerm.length > 0 ? (
        filterUsers.length > 0 ? (
          <FlatList
            data={filterUsers}
            keyExtractor={(item) => item.login}
            renderItem={({ item }) => <User props={item} />}
          />
        ) : (
          <Text className="text-secondary p-3 text-center">
            Nenhum usuário encontrado.
          </Text>
        )
      ) : (
        <View className="flex-1 bg-primary" />
      )}
    </View>
  );
}