import { Loading, PostItem } from '@components';
import { useAuth } from '@contexts';
import { api } from '@services';
import React, { useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Posts, Users } from '@models';

export function Profile() {
  const { userLogin } = useAuth();
  const [user, setUser] = useState<Users | null>(null);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function verifyPosts() {
    setLoading(true);
    try {
      const responseUser = await api.get(`/users/${userLogin}`);
      const dataUser = responseUser.data;
      setUser(dataUser);

      const responsePosts = await api.get(`/users/${userLogin}/posts`);
      const dataPots: Posts[] = responsePosts.data;
      setPosts(dataPots);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      verifyPosts();
    }, [userLogin])
  );

  async function handleResponse(id: number) {
    try {
      await api.delete(`/posts/${id}`);
  
      Alert.alert(
        "Post excluído",
        "O post foi excluído com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {
              setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            }
          }
        ]
      );
    } catch (error) {
      console.log("Erro ao excluir o post:", error);
      Alert.alert("Erro", "Ocorreu um erro ao excluir o post. Tente novamente.");
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <View className="flex-1 bg-primary">
      <View className="items-center justify-center p-4">
      <View className="w-24 h-24 rounded-full bg-tertiary mb-4 items-center justify-center">
          <Text className="text-primary text-4xl font-bold">
            {user?.name[0]?.toUpperCase()}
          </Text>
        </View>
        <Text className="text-secondary font-bold text-3xl">{user?.name}</Text>
        <Text className="text-tertiary font-medium text-xl">@{user?.login}</Text>
      </View>

      <View className="border-b border-secondary" />

      <FlatList
        className="flex-1 px-4"
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem post={item} onDelete={handleResponse} />
        )}
        ListEmptyComponent={
          <Text className="text-secondary text-center mt-10">Nenhuma postagem/resposta sua ainda.</Text>
        }
      />
    </View>
  );
}