import React, { useEffect, useState, useCallback } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@services";
import { colors } from "@constants";
import { Input, Loading, SinglePost } from "@components";
import { Posts } from "@models";

export function Feed() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const fetchPosts = useCallback(async (pageToFetch: number) => {
    setLoading(true);
    try {
      const storageToken = await AsyncStorage.getItem('token');

      if (storageToken) {
        api.defaults.headers['x-session-token'] = storageToken;
      }
      
      const response = searchTerm
        ? await api.get(`/posts?search=${searchTerm}`)
        : await api.get(`/posts?page=${pageToFetch}`);
      const filteredPosts = response.data.filter((posts: Posts) => posts.post_id === null);

      if (searchTerm) {
        setPosts(filteredPosts);
      } else {
        setPosts((prevPosts) => pageToFetch === 0 ? filteredPosts : [...prevPosts, ...filteredPosts]);
      }
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 500) {
        Alert.alert("Erro", "Não foi possível carregar mais posts. Tente novamente mais tarde.");
        setHasError(true);
      }
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, [searchTerm]);

  const handleRefresh = useCallback(() => {
    setPage(0);
    setPosts([]);
    setHasError(false);
    fetchPosts(0);
  }, [fetchPosts]);

  useEffect(() => {
    if (page > 0) {
      fetchPosts(page);
    }
  }, [page, fetchPosts]);

  useEffect(() => {
    if (searchTerm) {
      setPage(0);
      setPosts([]);
      fetchPosts(0);
    } else {
      handleRefresh();
    }
  }, [searchTerm, fetchPosts, handleRefresh]);

  const loadMorePosts = () => {
    if (!isFetching && !searchTerm && !hasError) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filterPosts = posts.filter(
    (post) => post.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View className="flex-1 bg-primary">
      <Input.Root.Search>
        <Input.Icon icon={Entypo} name="magnifying-glass" />
        <Input.Content.Search placeholder="Pesquisar Postagem" value={searchTerm} onChangeText={setSearchTerm} />

        {searchTerm.length > 0 && (
          <Input.Actions icon={Entypo} name="cross" onShowAction={() => setSearchTerm('')} /> 
        )}
      </Input.Root.Search>

      {loading && posts.length === 0 ? (
        <Loading />
      ) : searchTerm.length > 0 ? (
        filterPosts.length > 0 ? (
          <FlatList
            data={filterPosts}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => <SinglePost props={item} />}
          />
        ) : (
          <Text className="text-secondary p-3 text-center">
            Nenhuma Postagem Encontrada.
          </Text>
        )
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => <SinglePost props={item} />}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isFetching ? <Loading /> : null}
        />
      )}

      <Pressable
        className="bg-secondary w-16 h-16 rounded-full items-center justify-center absolute right-4 bottom-24"
        onPress={handleRefresh}
      >
        <Entypo name="cycle" size={24} color={colors.primary} />
      </Pressable>

      <Pressable
        className="bg-secondary w-16 h-16 rounded-full items-center justify-center absolute right-4 bottom-4"
        onPress={() => navigation.navigate("NewPost", {
          screen: "NewPost"
        })}
      >
        <Entypo name="plus" size={24} color={colors.primary} />
      </Pressable>
    </View>
  );
}
