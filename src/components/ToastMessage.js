import Toast from 'react-native-toast-message';
import { Button } from 'react-native'

export function ToastMessage(props) {
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Profile Updated',
    });
  }

  return (
    <Button
      title='Show toast'
      onPress={showToast}
    />
  )
}