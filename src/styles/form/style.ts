import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
  },

  text: {
    color: '#0000ff',
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 5,
  },

  inputNameProduct: {
    width: 220,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#808080',
    textTransform: 'uppercase',
    color: '#000',
  },

  inputQuantity: {
    width: 90,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#808080',
    textTransform: 'uppercase',
    color: '#000',
  },

  viewQuantity: {
    marginLeft: 10,
  },

  btnAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    border: 'none',
    backgroundColor: 'rgb(57, 57, 226)',
  },

  btnAddTitle: {
    fontSize: 16,
    color: '#fff',
    marginHorizontal: 8,
  },
});
