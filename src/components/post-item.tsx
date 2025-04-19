import { Posts } from '@models';
import { colors } from '@constants';
import { Icon } from './icon';
import { Pressable, Text, View } from 'react-native';

interface PostItemProps {
  post: Posts;
  onDelete: (postId: number) => void;
}

export function PostItem({ post, onDelete }: PostItemProps) {
  return (
    <View
      className="flex-row justify-between p-4 my-2 border border-secondary rounded-lg bg-opacity-10"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <View className="flex-1">
      <View className="flex-row items-center mb-2">
          <View className="w-6 h-6 rounded-full bg-tertiary mr-2 items-center justify-center">
            <Text className="text-primary text-xs font-bold">
              {post.user_login[0]?.toUpperCase()}
            </Text>
          </View>
          <Text className="text-tertiary font-medium text-sm">
            @{post.user_login}
          </Text>
          <Text className="text-secondary text-sm ml-2">
          • {new Date(post.created_at).
                  toLocaleString('pt-BR',
                    { 
                      day: '2-digit', 
                      month: '2-digit', 
                      year: 'numeric', 
                      hour: '2-digit', 
                      minute: '2-digit', 
                      hour12: false 
                    }).replace(',', ' às')}
          </Text>
        </View>
        <Text className="text-secondary text-base leading-6">
          {post.message}
        </Text>
      </View>

      <Pressable className="flex-row justify-end p-2" onPress={() => onDelete(post.id)}>
        <Icon icon="trash-o" color={colors.secondary} />
      </Pressable>
    </View>
  );
}
