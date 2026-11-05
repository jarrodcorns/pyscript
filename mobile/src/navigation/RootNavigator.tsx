import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaywallScreen } from '../screens/PaywallScreen';
import { DayScreen } from '../screens/DayScreen';
import { ArticleScreen } from '../screens/ArticleScreen';
import { MainTabs } from './MainTabs';
import { useAppStore } from '../store/appStore';
import { colors } from '../theme';
import type { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.cream,
    primary: colors.forest,
    card: colors.paper,
    text: colors.ink,
    border: colors.line,
  },
};

export function RootNavigator() {
  const { hydrated, unlocked, hydrate } = useAppStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.forest} />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator>
        {!unlocked ? (
          <Stack.Screen name="Paywall" options={{ headerShown: false }}>
            {() => <PaywallScreen />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen
              name="Day"
              component={DayScreen}
              options={({ route }) => ({
                title: `Day ${route.params.day}`,
                headerTintColor: colors.forest,
              })}
            />
            <Stack.Screen
              name="Article"
              component={ArticleScreen}
              options={{
                title: 'Learn',
                headerTintColor: colors.forest,
              }}
            />
            <Stack.Screen name="Paywall" options={{ title: 'Unlock Program' }}>
              {({ navigation }) => (
                <PaywallScreen
                  dismissible
                  onDismiss={() => navigation.goBack()}
                  onUnlocked={() => navigation.goBack()}
                />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
  },
});
