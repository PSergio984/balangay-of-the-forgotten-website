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

test('Zustand store slice independence', () => {
  const store = useGameStore;
  
  // Reset states
  store.getState().setLoaderProgress(0);
  store.getState().setReady(false);
  store.getState().selectRegion('choosing-territory');
  store.getState().selectRole(null);
  store.getState().stopTheme();
  store.getState().setAudioPlaying(false);

  // Modify loader progress, check if selections/audio remain untouched
  store.getState().setLoaderProgress(75);
  expect(store.getState().selectedRegionId).toBe('choosing-territory');
  expect(store.getState().selectedRoleId).toBeNull();
  expect(store.getState().currentTheme).toBeNull();
  expect(store.getState().isAudioPlaying).toBe(false);

  // Modify region selection, check if loader remains untouched
  store.getState().selectRegion('dagat-kabisayaan');
  expect(store.getState().loaderProgress).toBe(75);
  expect(store.getState().isReady).toBe(false);

  // Modify audio playing, check if selections remain untouched
  store.getState().setAudioPlaying(true);
  expect(store.getState().selectedRegionId).toBe('dagat-kabisayaan');
});

test('Zustand store subscription reactivity', () => {
  const store = useGameStore;
  let triggerCount = 0;
  let lastSeenProgress = 0;

  // Subscribe to store updates
  const unsubscribe = store.subscribe((state) => {
    triggerCount++;
    lastSeenProgress = state.loaderProgress;
  });

  // Perform updates
  store.getState().setLoaderProgress(15);
  expect(triggerCount).toBe(1);
  expect(lastSeenProgress).toBe(15);

  store.getState().setLoaderProgress(30);
  expect(triggerCount).toBe(2);
  expect(lastSeenProgress).toBe(30);

  // Clean up subscription
  unsubscribe();

  // Perform update after unsubscribe
  store.getState().setLoaderProgress(45);
  expect(triggerCount).toBe(2); // Should not increase
  expect(lastSeenProgress).toBe(30); // Should remain same
});

test('Simulated game user journey sequence', () => {
  const store = useGameStore;

  // User enters the site, loading progressive sequence
  store.getState().setLoaderProgress(0);
  store.getState().setLoaderVisible(true);
  store.getState().setLoaderMounted(true);
  
  store.getState().setLoaderProgress(50);
  expect(store.getState().loaderProgress).toBe(50);
  expect(store.getState().isReady).toBe(false);

  store.getState().setLoaderProgress(100);
  store.getState().setFlash(true);
  store.getState().setLoaderVisible(false);
  store.getState().setReady(true);

  expect(store.getState().isReady).toBe(true);
  expect(store.getState().isLoaderVisible).toBe(false);

  // User starts ambient audio theme
  store.getState().setAudioPlaying(true);
  expect(store.getState().isAudioPlaying).toBe(true);

  // User navigates and selects a region on the map
  store.getState().selectRegion('daragang-magayon');
  store.getState().playTheme('/audio/maps/daragang-magayon.mp3');
  expect(store.getState().selectedRegionId).toBe('daragang-magayon');
  expect(store.getState().currentTheme).toBe('/audio/maps/daragang-magayon.mp3');

  // User clicks a character class card
  store.getState().selectRole('babaylan');
  store.getState().playTheme('/audio/roles/babaylan.mp3');
  expect(store.getState().selectedRoleId).toBe('babaylan');
  expect(store.getState().currentTheme).toBe('/audio/roles/babaylan.mp3');

  // User deselects the character class card (custom character theme stops)
  store.getState().selectRole(null);
  store.getState().stopTheme();
  expect(store.getState().selectedRoleId).toBeNull();
  expect(store.getState().currentTheme).toBeNull();
});
