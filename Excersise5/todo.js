import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { List } from 'react-native-paper';

function Todo({ id, title, completed }) {
  async function toggleComplete() {
    await firestore()
      .collection('todos')
      .doc(id)
      .update({
        completed: !completed,
      });
  }

  return (
    <List.Item
      title={title}
      onPress={toggleComplete}
      left={(props) => (
        <List.Icon {...props} icon={completed ? 'check' : 'cancel'} />
      )}
    />
  );
}

export default Todo;
