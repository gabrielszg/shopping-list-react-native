import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 135,
    marginLeft: 15,
    marginRight: 15,
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
    color: '#000',
  },

  body: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },

  btnAddNewList: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    border: 'none',
    backgroundColor: 'rgb(57, 57, 226)',
  },

  titleBtnAddNewList: {
    fontSize: 16,
    color: '#fff',
  },
});
