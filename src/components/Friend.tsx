import React, { memo } from "react";
import lodash from "lodash";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  };
  follow: () => void;
}

function FriendComponent({ data: { likes, name, online }, follow }: Props) {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text>
        {name} - Likes: {likes}
      </Text>

      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>

      <Text>Online em: {online}</Text>
    </View>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.data, nextProps.data);
});
