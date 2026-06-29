import { expect, test } from 'vitest';
import { useGameStore } from '../lib/store';

test('Zustand store initial state', () => {
  const state = useGameStore.getState();
  expect(state.loaderProgress).toBe(0);
  expect(state.isReady).toBe(false);
  expect(state.currentTheme).toBeNull();
  expect(state.selectedRegionId).toBe('choosing-territory');
  expect(state.selectedRoleId).toBeNull();
});

test('Zustand store actions', () => {
  const store = useGameStore;
  
  // Test loader actions
  store.getState().setLoaderProgress(50);
  expect(store.getState().loaderProgress).toBe(50);
  
  store.getState().setReady(true);
  expect(store.getState().isReady).toBe(true);

  // Test audio actions
  store.getState().playTheme('/test.mp3');
  expect(store.getState().currentTheme).toBe('/test.mp3');
  
  store.getState().stopTheme();
  expect(store.getState().currentTheme).toBeNull();

  // Test selections
  store.getState().selectRegion('bundok-pulag');
  expect(store.getState().selectedRegionId).toBe('bundok-pulag');
  
  store.getState().selectRole('mandirigma');
  expect(store.getState().selectedRoleId).toBe('mandirigma');
});
