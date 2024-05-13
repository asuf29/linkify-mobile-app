import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchBarComponent = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search users..."
        value={searchQuery}
        autoCapitalize="none"
        autoFocus={true}
        onChangeText={text => setSearchQuery(text)}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 40,
  },
  input: {
    flex: 1,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 10,
  },
});

export default SearchBarComponent;
