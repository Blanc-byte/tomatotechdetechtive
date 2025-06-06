import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#43a047',
        tabBarInactiveTintColor: '#a5d6a7',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#eaffea',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: 70,
            borderTopWidth: 0,
            shadowColor: '#43a047',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: -4 },
          },
          default: {
            backgroundColor: '#eaffea',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            height: 70,
            borderTopWidth: 0,
            shadowColor: '#43a047',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: -4 },
          },
        }),
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
          fontFamily: 'System',
          letterSpacing: 0.5,
          color: '#388e3c',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? 'emoticon-happy' : 'emoticon-happy-outline'}
              size={32}
              color={color}
              style={{
                backgroundColor: focused ? '#b9f6ca' : 'transparent',
                borderRadius: 16,
                padding: 4,
                shadowColor: '#43a047',
                shadowOpacity: focused ? 0.18 : 0,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="leaf"
              size={30}
              color={color}
              style={{
                backgroundColor: focused ? '#c8e6c9' : 'transparent',
                borderRadius: 16,
                padding: 4,
                shadowColor: '#43a047',
                shadowOpacity: focused ? 0.18 : 0,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
