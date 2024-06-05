import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  btnDeleteAll: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    border: 'none',
    backgroundColor: 'rgb(57, 57, 226)',
    marginTop: 135,
    marginLeft: 15,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    marginHorizontal: 5,
  },

  btnDeleteAllTitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 8,
  },

  viewGrid: {
    marginTop: 20,
  },

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  floatingButtonStyle: {
    width: 70,
    height: 70,
  },
});
