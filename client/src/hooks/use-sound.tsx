import { useEffect, useRef } from 'react';
// @ts-ignore
import { Howl } from 'howler';

// Sound URLs - using base64 encoded simple sounds
const sounds = {
  click: 'data:audio/wav;base64,UklGRjYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRIAAADu/wAA7v8AAO7/AADu/wAA',
  hover: 'data:audio/wav;base64,UklGRjYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRIAAADu/wAA7v8AAO7/AADu/wAA',
  success: 'data:audio/wav;base64,UklGRjYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRIAAADu/wAA7v8AAO7/AADu/wAA',
  error: 'data:audio/wav;base64,UklGRjYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YRIAAADu/wAA7v8AAO7/AADu/wAA',
};

export type SoundType = keyof typeof sounds;

export function useSound(soundType: SoundType, volume = 0.25) {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [sounds[soundType]],
      volume,
      html5: true,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, [soundType, volume]);

  const play = () => {
    try {
      soundRef.current?.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  return play;
}

// Global sound effects hook
export function useSoundEffects() {
  const clickSound = useSound('click', 0.2);
  const hoverSound = useSound('hover', 0.1);
  const successSound = useSound('success', 0.3);
  const errorSound = useSound('error', 0.3);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.classList.contains('clickable')) {
        clickSound();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [clickSound]);

  return { clickSound, hoverSound, successSound, errorSound };
}