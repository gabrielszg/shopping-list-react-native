import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 180,
    marginHorizontal: 15,
  },

  viewList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },

  viewCheckboxName: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textName: {
    width: 200,
    fontSize: 20,
    color: '#000',
  },

  textNameStrikethrough: {
    textDecorationLine: 'line-through',
    width: 200,
    fontSize: 20,
    color: '#000',
  },

  textQuantity: {
    fontSize: 20,
    color: '#000',
  },
});
